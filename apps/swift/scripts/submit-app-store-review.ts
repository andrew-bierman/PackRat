#!/usr/bin/env bun
/**
 * Submit an uploaded build for App Store review.
 *
 * Waits for the build to finish processing, creates (or reuses) the App Store
 * version record, attaches the build, sets release notes, and submits. The
 * version releases automatically once Apple approves it.
 *
 * Usage:
 *   bun apps/swift/scripts/submit-app-store-review.ts \
 *     --platform IOS|MAC_OS --version 2.2.4 --build 2026102101 \
 *     [--whats-new "Bug fixes and improvements."]
 *
 * Required env:
 *   APPLE_ASC_API_KEY_ID     App Store Connect API key id
 *   APPLE_ASC_API_ISSUER_ID  App Store Connect API issuer id
 *   APPLE_ASC_API_KEY_PATH   Path to AuthKey_<id>.p8 (default:
 *                            ~/.appstoreconnect/private_keys/AuthKey_<id>.p8)
 *   ASC_APP_ID               App Store Connect app id (default: 6499243187)
 */

import { createPrivateKey, sign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: {
    platform: { type: 'string' },
    version: { type: 'string' },
    build: { type: 'string' },
    'whats-new': { type: 'string', default: 'Bug fixes and improvements.' },
  },
});

const platform = values.platform;
const versionString = values.version;
const buildNumber = values.build;
const whatsNew = values['whats-new'] ?? 'Bug fixes and improvements.';
if (!platform || !['IOS', 'MAC_OS'].includes(platform) || !versionString || !buildNumber) {
  console.error('Usage: --platform IOS|MAC_OS --version <x.y.z> --build <number>');
  process.exit(1);
}

const keyId = process.env.APPLE_ASC_API_KEY_ID;
const issuerId = process.env.APPLE_ASC_API_ISSUER_ID;
if (!keyId || !issuerId) {
  console.error('APPLE_ASC_API_KEY_ID and APPLE_ASC_API_ISSUER_ID are required.');
  process.exit(1);
}
const keyPath =
  process.env.APPLE_ASC_API_KEY_PATH ??
  join(homedir(), '.appstoreconnect', 'private_keys', `AuthKey_${keyId}.p8`);
const privateKey = createPrivateKey(readFileSync(keyPath, 'utf8'));
const appId = process.env.ASC_APP_ID || '6499243187';

const b64 = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url');

// ES256 JWT; `ieee-p1363` gives the raw r||s signature JOSE expects (not DER).
function token(): string {
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: 'ES256', kid: keyId, typ: 'JWT' });
  const body = b64({ iss: issuerId, iat: now, exp: now + 1100, aud: 'appstoreconnect-v1' });
  const signature = sign('sha256', Buffer.from(`${head}.${body}`), {
    key: privateKey,
    dsaEncoding: 'ieee-p1363',
  }).toString('base64url');
  return `${head}.${body}.${signature}`;
}

type Resource = { id: string; attributes?: Record<string, unknown> };
type Doc = { data?: Resource | Resource[] | null; errors?: unknown[] };

// Apple's API returns sporadic 5xx under load; nothing persists on a 5xx, so retry.
async function api(request: { method: string; path: string; body?: object }): Promise<Doc> {
  const { method, path, body } = request;
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`https://api.appstoreconnect.apple.com${path}`, {
      method,
      headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    const doc: Doc = text ? JSON.parse(text) : {};
    if (res.ok) return doc;
    if (res.status >= 500 && attempt < 5) {
      await Bun.sleep(attempt * 5000);
      continue;
    }
    throw new Error(`${method} ${path} → ${res.status} ${JSON.stringify(doc.errors ?? text)}`);
  }
}

const get = (path: string) => api({ method: 'GET', path });
const post = (path: string, body: object) => api({ method: 'POST', path, body });
const patch = (path: string, body: object) => api({ method: 'PATCH', path, body });

const list = (doc: Doc): Resource[] => (Array.isArray(doc.data) ? doc.data : []);
const one = (doc: Doc): Resource | null => (Array.isArray(doc.data) ? null : (doc.data ?? null));

// 1. Wait for the build to finish processing (up to 45 minutes).
let build: Resource | undefined;
for (let i = 0; i < 90; i++) {
  const doc = await get(
    `/v1/builds?filter[app]=${appId}&filter[version]=${buildNumber}` +
      `&filter[preReleaseVersion.platform]=${platform}&fields[builds]=processingState`,
  );
  build = list(doc)[0];
  const state = build?.attributes?.processingState;
  console.log(`build ${buildNumber} (${platform}): ${state ?? 'not visible yet'}`);
  if (state === 'VALID') break;
  if (state === 'FAILED' || state === 'INVALID')
    throw new Error(`Build ${buildNumber} is ${state}`);
  await Bun.sleep(30000);
}
if (!build || build.attributes?.processingState !== 'VALID') {
  throw new Error(`Build ${buildNumber} did not finish processing`);
}

// 2. Find or create the version record.
let version = list(
  await get(
    `/v1/apps/${appId}/appStoreVersions?filter[platform]=${platform}` +
      `&filter[versionString]=${versionString}&fields[appStoreVersions]=appStoreState`,
  ),
)[0];
if (!version) {
  version =
    one(
      await post('/v1/appStoreVersions', {
        data: {
          type: 'appStoreVersions',
          attributes: { platform, versionString, releaseType: 'AFTER_APPROVAL' },
          relationships: { app: { data: { type: 'apps', id: appId } } },
        },
      }),
    ) ?? undefined;
}
if (!version) throw new Error(`Could not create ${platform} ${versionString}`);
const versionState = version.attributes?.appStoreState;
console.log(`version ${versionString} (${platform}): ${version.id} ${versionState ?? ''}`);

// Only an editable version can take a build; anything else is already submitted or shipped.
const EDITABLE_STATES = Object.freeze([
  'PREPARE_FOR_SUBMISSION',
  'DEVELOPER_REJECTED',
  'REJECTED',
  'METADATA_REJECTED',
] as const);
if (versionState && !(EDITABLE_STATES as readonly unknown[]).includes(versionState)) {
  console.log(`✓ ${platform} ${versionString} is already ${versionState}; nothing to submit.`);
  process.exit(0);
}

// 3. Attach the build. The PATCH can 204 without attaching on a fresh version
//    record, so read it back via the sub-resource and retry until it sticks.
const attached = async () => one(await get(`/v1/appStoreVersions/${version.id}/build`))?.id;
for (let i = 0; i < 10 && (await attached()) !== build.id; i++) {
  await patch(`/v1/appStoreVersions/${version.id}/relationships/build`, {
    data: { type: 'builds', id: build.id },
  });
  await Bun.sleep(20000);
}
if ((await attached()) !== build.id) throw new Error('Build did not attach to the version');
console.log('build attached');

// 4. Release notes for every locale.
const locales = await get(`/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations`);
for (const loc of list(locales)) {
  await patch(`/v1/appStoreVersionLocalizations/${loc.id}`, {
    data: { type: 'appStoreVersionLocalizations', id: loc.id, attributes: { whatsNew } },
  });
}

// 5. Submit for review, reusing an open draft submission if one exists.
const draft = list(
  await get(
    `/v1/apps/${appId}/reviewSubmissions?filter[platform]=${platform}` +
      '&filter[state]=READY_FOR_REVIEW&fields[reviewSubmissions]=state',
  ),
)[0];
const submission =
  draft ??
  one(
    await post('/v1/reviewSubmissions', {
      data: {
        type: 'reviewSubmissions',
        attributes: { platform },
        relationships: { app: { data: { type: 'apps', id: appId } } },
      },
    }),
  );
if (!submission) throw new Error('Could not create review submission');
await post('/v1/reviewSubmissionItems', {
  data: {
    type: 'reviewSubmissionItems',
    relationships: {
      reviewSubmission: { data: { type: 'reviewSubmissions', id: submission.id } },
      appStoreVersion: { data: { type: 'appStoreVersions', id: version.id } },
    },
  },
});
const submitted = one(
  await patch(`/v1/reviewSubmissions/${submission.id}`, {
    data: { type: 'reviewSubmissions', id: submission.id, attributes: { submitted: true } },
  }),
);
console.log(`✓ ${platform} ${versionString} (${buildNumber}): ${submitted?.attributes?.state}`);
