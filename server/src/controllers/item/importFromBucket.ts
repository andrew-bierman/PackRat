import { protectedProcedure } from '../../trpc';
import {
  bulkAddItemsGlobalService,
  parseCSVData,
  listBucketContents,
  fetchFromS3,
} from '../../services/item/item.service';
import { z } from 'zod';

export const importFromBucket = async (c) => {
  const { directory, ownerId } = await c.req.query();

  const endpoint = c.env.BUCKET_ENDPOINT;
  const bucket = c.env.BUCKET_NAME;
  const method = 'GET';
  const region = c.env.BUCKET_REGION;
  const service = c.env.BUCKET_SERVICE;
  const accessKeyId = c.env.BUCKET_ACCESS_KEY_ID;
  const secretKey = c.env.BUCKET_SECRET_KEY;
  const sessionToken = c.env.BUCKET_SESSION_TOKEN;
  const algorithm = c.env.AWS_SIGN_ALGORITHM;
  const x_amz_token = c.env.X_AMZ_SECURITY_TOKEN;

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
      throw new Error('No files found in the backcountry directory');
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
      c.executionCtx,
    );

    return c.json({
      message: 'Items inserted successfully',
      data: insertedItems,
    });
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

      try {
        const latestFileName = await listBucketContents(
          env.BUCKET_ENDPOINT,
          env.BUCKET_NAME,
          directory,
          'GET',
          env.BUCKET_SERVICE,
          env.BUCKET_REGION,
          env.BUCKET_ACCESS_KEY_ID,
          env.BUCKET_SECRET_KEY,
          env.BUCKET_SESSION_TOKEN,
          env.AWS_SIGN_ALGORITHM,
          env.X_AMZ_SECURITY_TOKEN,
        );

        if (!latestFileName) {
          throw new Error('No files found in the directory');
        }

        const fileData = await fetchFromS3(
          `${env.BUCKET_ENDPOINT}/${env.BUCKET_NAME}/${latestFileName}`,
          'GET',
          env.BUCKET_SERVICE,
          env.BUCKET_REGION,
          env.BUCKET_ACCESS_KEY_ID,
          env.BUCKET_SECRET_KEY,
          env.BUCKET_SESSION_TOKEN,
          env.AWS_SIGN_ALGORITHM,
          env.X_AMZ_SECURITY_TOKEN,
        );

        const itemsToInsert = await parseCSVData(fileData, ownerId);
        const insertedItems = await bulkAddItemsGlobalService(
          itemsToInsert,
          executionCtx,
        );

        return insertedItems;
      } catch (err) {
        console.error('Error:', err);
        throw new Error(`An error occurred: ${err.message}`);
      }
    });
}
