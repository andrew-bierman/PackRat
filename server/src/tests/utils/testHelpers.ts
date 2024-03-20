import * as dotenv from 'dotenv';
import { Miniflare } from 'miniflare';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import jwt from 'hono/jwt';
import superjson from 'superjson';
import app, { Bindings } from '../../index';
import { readMigrationFiles } from 'drizzle-orm/migrator';
import { createDb } from '../../db/client';
import { AppRouter } from '../../routes/trpcRouter';

const JWT_SECRET = 'test';

export const createMiniflare = () => {
  return new Miniflare({
    kvPersist: false,
    d1Persist: false,
    r2Persist: false,
    cachePersist: false,
    durableObjectsPersist: false,
    liveReload: false,
    workers: [
      {
        name: 'api',
        bindings: {
          JWT_SECRET: 'test',
          SENDGRID_API_KEY: 'test',
          SENDGRID_FROM_EMAIL: 'test',
          WEATHER_URL: 'test',
          WEATHER_WEEK_URL: 'test',
          OPENWEATHER_KEY: 'test',
          MAPBOX_ACCESS_TOKEN: 'test',
          OSM_URI: 'test',
          GOOGLE_CLIENT_ID: 'test',
          GOOGLE_CLIENT_SECRET: 'test',
          STMP_EMAIL: 'test',
          STMP_PASSWORD: 'test',
        },
        d1Databases: {
          DB: process.env.DATABASE_ID || '12345',
        },
        modules: true,
        scriptPath: './dist/index.js',
        compatibilityDate: '2023-09-22',
      },
    ],
  });
};

export async function getBindings({
  miniflare,
}: {
  miniflare: Miniflare;
}): Promise<Bindings> {
  return await miniflare.getBindings();
}

export async function getDb({ miniflare }: { miniflare: Miniflare }) {
  return await miniflare.getD1Database('DB');
}

export async function getDrizzleDb({ miniflare }: { miniflare: Miniflare }) {
  return createDb(await getDb({ miniflare }));
}

export async function executeSql(
  sql: string,
  { miniflare }: { miniflare: Miniflare },
) {
  const normalized = sql
    .replace(/--.*\n/g, '')
    .replace(/[\n\t]/g, '')
    .trim();

  if (!normalized) {
    return undefined;
  }

  const db = await getDb({ miniflare });
  return await db.exec(normalized);
}

export async function migrateDb({ miniflare }: { miniflare: Miniflare }) {
  const files = readMigrationFiles({ migrationsFolder: './migrations' });
  for (let i = 0; i < files.length; i++) {
    const migrationMeta = files[i];
    for (let j = 0; j < migrationMeta.sql.length; j++) {
      await executeSql(migrationMeta.sql[j], { miniflare });
    }
  }
}

export async function createSessionToken({
  userId = 'test-user',
}: {
  userId?: string;
}) {
  const payload = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    sub: userId,
  };
  const algorithm = 'HS256';
  return await jwt.sign(payload, JWT_SECRET, algorithm);
}

export function createTRPCClient({
  miniflare,
  userId,
  url = 'http://localhost:3000/trpc',
}: {
  miniflare: Miniflare;
  userId?: string;
  url?: string;
}) {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url,
        async headers() {
          return {
            authorization: userId
              ? 'Bearer ' + (await createSessionToken({ userId }))
              : undefined,
          };
        },
        fetch: async (resource, options) =>
          app.fetch(
            new Request(resource, options),
            await getBindings({ miniflare }),
          ),
      }),
    ],
    transformer: undefined,
  });
}

export async function setupTest() {
  const miniflare = createMiniflare();
  await migrateDb({ miniflare });
  const db = await getDb({ miniflare });
  const drizzleDb = await getDrizzleDb({ miniflare });
  const caller = createTRPCClient({ miniflare });
  return { miniflare, db, drizzleDb, caller };
}

export async function teardownTest({ miniflare }: { miniflare: Miniflare }) {
  await miniflare.dispose();
}
