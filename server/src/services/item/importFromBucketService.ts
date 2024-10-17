import * as CryptoJS from 'crypto-js';
import { parseStringPromise } from 'xml2js';
import Papa from 'papaparse';

interface CSVType {
  name: string;
  weight: number;
  quantity: number;
  unit: string;
  type: 'Essentials' | 'Food' | 'Water';
  ownerId: string;
  image_urls: string;
}

function getSignatureKey(
  key: string,
  dateStamp: string,
  regionName: string,
  serviceName: string,
) {
  const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
  const kRegion = CryptoJS.HmacSHA256(regionName, kDate);
  const kService = CryptoJS.HmacSHA256(serviceName, kRegion);
  const kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
  return kSigning;
}

function generateAWSHeaders(
  url: string,
  method: string,
  service: string,
  region: string,
  accessKey: string,
  secretKey: string,
  sessionToken: string,
  algorithm: string,
  x_amz_token: string,
) {
  const amzDate = new Date()
    .toISOString()
    .replace(/[:-]/g, '')
    .replace(/\.\d{3}/, '');
  const dateStamp = amzDate.slice(0, 8);
  const canonicalUri = new URL(url).pathname;
  const canonicalQueryString = '';
  const payloadHash = CryptoJS.SHA256('').toString(CryptoJS.enc.Hex);
  const canonicalHeaders =
    `host:${new URL(url).hostname}\nx-amz-date:${amzDate}\n` +
    (sessionToken ? `x-amz-security-token:${sessionToken}\n` : '');
  const signedHeaders =
    'host;x-amz-date' + (sessionToken ? `;${x_amz_token}` : '');
  const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${CryptoJS.SHA256(canonicalRequest).toString(CryptoJS.enc.Hex)}`;

  const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
  const signature = CryptoJS.HmacSHA256(stringToSign, signingKey).toString(
    CryptoJS.enc.Hex,
  );
  const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return {
    host: new URL(url).hostname,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
    Authorization: authorizationHeader,
    ...(sessionToken && { 'x-amz-security-token': sessionToken }),
  };
}

export async function fetchFromS3(
  url: string,
  method: string,
  service: string,
  region: string,
  accessKey: string,
  secretKey: string,
  sessionToken: string,
  algorithm: string,
  x_amz_token: string,
) {
  const headers = generateAWSHeaders(
    url,
    method,
    service,
    region,
    accessKey,
    secretKey,
    sessionToken,
    algorithm,
    x_amz_token,
  );

  const response = await fetch(url, {
    method,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from S3: ${response.statusText}`);
  }

  const data = await response.text();
  return data;
}

export async function listBucketContents(
  endpoint: string,
  bucket: string,
  directory: string,
  method: string,
  service: string,
  region: string,
  accessKey: string,
  secretKey: string,
  sessionToken: string,
  algorithm: string,
  x_amz_token: string,
) {
  const listData = await fetchFromS3(
    `${endpoint}/${bucket}`,
    method,
    service,
    region,
    accessKey,
    secretKey,
    sessionToken,
    algorithm,
    x_amz_token,
  );

  const bucketOptions = [
    { label: 'bucket 1', value: 'rei' },
    { label: 'bucket 2', value: 'sierra' },
    { label: 'bucket 3', value: 'cabelas' },
    { label: 'bucket 4', value: 'moosejaw' },
    { label: 'bucket 5', value: 'backcountry' },
    { label: 'bucket 6', value: 'patagonia' },
  ];

  directory =
    bucketOptions.find((item) => item.label === directory)?.value || '';

  const parsedListData = await parseStringPromise(listData);
  const contents = parsedListData.ListBucketResult.Contents;

  const fileNames = contents
    .filter((item) => item.Key[0].startsWith(`${directory}/`))
    .map((item) => item.Key[0]);

  return fileNames.sort().reverse()[0]; // Get the latest file name
}

export async function parseCSVData(fileData: string, ownerId: string) {
  return new Promise<CSVType[]>((resolve, reject) => {
    const itemsToInsert = [];

    Papa.parse(fileData, {
      header: true,
      complete: (results) => {
        try {
          for (const [index, item] of results.data.entries()) {
            if (
              index === results.data.length - 1 &&
              Object.values(item).every((value) => value === '')
            ) {
              continue;
            }

            if (isNaN(Number(item.weight)) || Number(item.weight) <= 0) {
              continue;
            }

            itemsToInsert.push({
              name: item.name,
              weight: item.weight || 0,
              unit: item.weight_unit || 'g',
              type: 'Essentials',
              ownerId,
              image_urls: item.image_urls,
            });
          }
          resolve(itemsToInsert);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error),
    });
  });
}
