import * as validator from '@packrat/validations';
import {
  bulkAddItemsGlobalService,
  parseCSVData,
  fetchFromS3,
} from '../../services/item/item.service';
import { User } from '../../drizzle/methods/User';
import { Context } from 'hono';

export const importNotifiedETL = async (c: Context) => {
  const body = await c.req.json<validator.ImportNotifiedETL>();
  const file_name = body.file_key;
  const bucket_name = body.bucket_name;
  const spider_name = body.spider_name;

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

  const userClass = new User();
  const user = await userClass.getAdminId();

  let ownerId = '';

  if (user) {
    ownerId = user.id;
    console.log('User ID:', ownerId);
  } else {
    console.log('No user found.');
  }

  try {
    const fileData = await fetchFromS3(
      `${endpoint}/${bucket_name}/${file_name}`,
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
      itemsToInsert as any,
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
