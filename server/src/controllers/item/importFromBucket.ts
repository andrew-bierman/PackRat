import { protectedProcedure } from '../../trpc';
import {
  bulkAddItemsGlobalService,
  parseCSVData,
  listBucketContents,
  fetchFromS3,
} from '../../services/item/item.service';
import { z } from 'zod';

async function importItemsFromBucket(directory, ownerId, env, executionCtx) {
  const {
    BUCKET_ENDPOINT: endpoint,
    BUCKET_NAME: bucket,
    BUCKET_REGION: region,
    BUCKET_SERVICE: service,
    BUCKET_ACCESS_KEY_ID: accessKeyId,
    BUCKET_SECRET_KEY: secretKey,
    BUCKET_SESSION_TOKEN: sessionToken,
    AWS_SIGN_ALGORITHM: algorithm,
    X_AMZ_SECURITY_TOKEN: x_amz_token,
  } = env;

  const method = 'GET';

  try {
    const latestFileName = await listBucketContents(
      endpoint,
      bucket,
      directory,
      method,
      service,
      region,
      accessKeyId,
      secretKey,
      sessionToken,
      algorithm,
      x_amz_token,
    );

    if (!latestFileName) {
      throw new Error('No files found in the directory');
    }

    const fileData = await fetchFromS3(
      `${endpoint}/${bucket}/${latestFileName}`,
      method,
      service,
      region,
      accessKeyId,
      secretKey,
      sessionToken,
      algorithm,
      x_amz_token,
    );

    const itemsToInsert = await parseCSVData(fileData, ownerId);
    const insertedItems = await bulkAddItemsGlobalService(
      itemsToInsert,
      executionCtx,
    );

    return insertedItems;
  } catch (err) {
    console.error('Error:', err);
    throw err; // Let the calling function handle the error
  }
}

export const importFromBucket = async (c) => {
  const { directory, ownerId } = await c.req.query();

  try {
    const insertedItems = await importItemsFromBucket(
      directory,
      ownerId,
      c.env,
      c.executionCtx,
    );

    return c.json({
      message: 'Items inserted successfully',
      data: insertedItems,
    });
  } catch (err) {
    return c.json({ error: 'An error occurred' });
  }
};

export function importFromBucketRoute() {
  return protectedProcedure
    .input(z.object({ directory: z.string(), ownerId: z.string() }))
    .mutation(async (opts) => {
      const { directory, ownerId } = opts.input;
      const { env, executionCtx } = opts.ctx;

      try {
        const insertedItems = await importItemsFromBucket(
          directory,
          ownerId,
          env,
          executionCtx,
        );

        return insertedItems;
      } catch (err) {
        console.error('Error:', err);
        throw new Error(`An error occurred: ${err.message}`);
      }
    });
}
