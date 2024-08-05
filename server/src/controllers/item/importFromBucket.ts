import { protectedProcedure } from '../../trpc';
import { bulkAddItemsGlobalService } from '../../services/item/item.service';
import * as CryptoJS from 'crypto-js';
import { parseStringPromise } from 'xml2js';
import Papa from 'papaparse';
import { z } from 'zod';

interface CSVType {
  name: string;
  claimed_weight: number;
  quantity: number;
  claimed_weight_unit: string;
  type: string;
  ownerId: string;
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
  const kRegion = CryptoJS.HmacSHA256(regionName, kDate);
  const kService = CryptoJS.HmacSHA256(serviceName, kRegion);
  const kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
  return kSigning;
}

function generateAWSHeaders(
  url,
  method,
  service,
  region,
  accessKey,
  secretKey,
  sessionToken,
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
    'host;x-amz-date' + (sessionToken ? ';x-amz-security-token' : '');
  const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

  const algorithm = 'AWS4-HMAC-SHA256';
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

export const importFromBucket = async (c) => {
  const { directory } = await c.req.query();

  const endpoint = c.env.BUCKET_ENDPOINT;
  const bucket = c.env.BUCKET_NAME;
  const method = 'GET';
  const region = c.env.BUCKET_REGION;
  const service = c.env.BUCKET_SERVICE;
  const accessKeyId = c.env.BUCKET_ACCESS_KEY_ID;
  const secretKey = c.env.BUCKET_SECRET_KEY;
  const sessionToken = c.env.BUCKET_SESSION_TOKEN;

  // Generate AWS Headers for listing bucket contents
  const listHeaders = generateAWSHeaders(
    endpoint + '/' + bucket,
    method,
    service,
    region,
    accessKeyId,
    secretKey,
    sessionToken,
  );

  try {
    // Fetch data from bucket to list contents
    const listResponse = await fetch(`${endpoint}/${bucket}`, {
      method,
      headers: listHeaders,
    });
    const listData = await listResponse.text();

    // Parse XML response
    const parsedListData = await parseStringPromise(listData);
    const contents = parsedListData.ListBucketResult.Contents;

    // Extract and log file names
    const fileNames = contents
      .filter((item) => item.Key[0].startsWith(`${directory}/`))
      .map((item) => item.Key[0]);

    // console.log('File names in backcountry directory:', fileNames);

    // Sort file names to get the latest one
    const latestFileName = fileNames.sort().reverse()[0];

    if (!latestFileName) {
      throw new Error('No files found in the backcountry directory');
    }

    // console.log('Latest file name:', latestFileName);

    // Generate AWS Headers for fetching the latest file
    const fileHeaders = generateAWSHeaders(
      `${endpoint}/${bucket}/${latestFileName}`,
      method,
      service,
      region,
      accessKeyId,
      secretKey,
      sessionToken,
    );

    // Fetch the specific CSV file
    const fileResponse = await fetch(
      `${endpoint}/${bucket}/${latestFileName}`,
      {
        method,
        headers: fileHeaders,
      },
    );
    const fileData = await fileResponse.text();

    // Check for errors in the file response
    if (fileResponse.status !== 200) {
      console.error('Error fetching file:', fileData);
      return c.json({ error: 'Error fetching file', details: fileData });
    }

    let parsedCSVData = null;

    Papa.parse(fileData, {
      header: true,
      complete: function (results) {
        parsedCSVData = results.data;
      },
      error: function (error) {
        console.error('Error parsing CSV file:', error);
      },
    });

    return c.json({ message: 'File content logged', data: parsedCSVData });
  } catch (err) {
    console.error('Error:', err);
    return c.json({ error: 'An error occurred' });
  }
};

export function importFromBucketRoute() {
  return protectedProcedure
    .input(z.object({ directory: z.string(), ownerId: z.string() }))
    .mutation(async (opts) => {
      const { directory, ownerId } = opts.input;
      const { env, executionCtx }: any = opts.ctx;

      const endpoint = env.BUCKET_ENDPOINT;
      const bucket = env.BUCKET_NAME;
      const method = 'GET';
      const region = env.BUCKET_REGION;
      const service = env.BUCKET_SERVICE;
      const accessKeyId = env.BUCKET_ACCESS_KEY_ID;
      const secretKey = env.BUCKET_SECRET_KEY;
      const sessionToken = env.BUCKET_SESSION_TOKEN;

      // Generate AWS Headers for listing bucket contents
      const listHeaders = generateAWSHeaders(
        `${endpoint}/${bucket}`,
        method,
        service,
        region,
        accessKeyId,
        secretKey,
        sessionToken,
      );

      try {
        const listResponse = await fetch(`${endpoint}/${bucket}`, {
          method,
          headers: listHeaders,
        });

        if (!listResponse.ok) {
          throw new Error('Failed to list bucket contents');
        }

        const listData = await listResponse.text();

        // Parse XML response
        const parsedListData = await parseStringPromise(listData);
        const contents = parsedListData.ListBucketResult.Contents;

        // Extract and log file names
        const fileNames = contents
          .filter((item) => item.Key[0].startsWith(`${directory}/`))
          .map((item) => item.Key[0]);

        // Sort file names to get the latest one
        const latestFileName = fileNames.sort().reverse()[0];

        if (!latestFileName) {
          throw new Error('No files found in the directory');
        }

        // Generate AWS Headers for fetching the latest file
        const fileHeaders = generateAWSHeaders(
          `${endpoint}/${bucket}/${latestFileName}`,
          method,
          service,
          region,
          accessKeyId,
          secretKey,
          sessionToken,
        );

        // Fetch the specific CSV file
        const fileResponse = await fetch(
          `${endpoint}/${bucket}/${latestFileName}`,
          {
            method,
            headers: fileHeaders,
          },
        );

        if (!fileResponse.ok) {
          throw new Error('Failed to fetch the latest file');
        }

        const fileData = await fileResponse.text();

        return new Promise((resolve, reject) => {
          Papa.parse(fileData, {
            header: true,
            complete: async function (results) {
              try {
                const itemsToInsert = [];

                for (const [index, item] of results.data.entries()) {
                  if (
                    index === results.data.length - 1 &&
                    Object.values(item).every((value) => value === '')
                  ) {
                    continue;
                  }

                  itemsToInsert.push({
                    name: item.name,
                    weight: item.claimed_weight || 0,
                    quantity: item.quantity || 1,
                    unit: item.claimed_weight_unit || 'g',
                    type: 'Essentials',
                    ownerId,
                  });
                }

                const insertedItems = await bulkAddItemsGlobalService(
                  itemsToInsert,
                  executionCtx,
                );

                return resolve(insertedItems);
              } catch (error) {
                console.error('Error in bulkAddItemsGlobalService:', error);

                return reject(
                  new Error(`Failed to add items: ${error.message}`),
                );
              }
            },
            error: function (error) {
              console.error('Error parsing CSV file:', error);
              reject(error);
            },
          });
        });
      } catch (err) {
        console.error('Error:', err);
        throw new Error(`An error occurred: ${err.message}`);
      }
    });
}
