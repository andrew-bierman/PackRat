import { appRouter } from '../routes/trpcRouter';
import { createCallerFactory } from '../trpc';
import { createId } from '@paralleldrive/cuid2';
import { DbClient } from '../db/client';
import { User as UserRepository } from '../drizzle/methods/User';

const TEST_USER = {
  email: 'test@test.com',
  name: 'test',
  code: 'test',
  createdAt: new Date().toISOString(),
  googleId: 'test',
  is_certified_guide: false,
  password: 'test',
  passwordResetToken: 'test',
  passwordResetTokenExpiration: new Date(),
  preferredWeather: 'test',
  preferredWeight: 'test',
  profileImage: 'test',
  role: 'user' as const,
  token: 'test',
  updatedAt: new Date().toISOString(),
  username: 'test_user',
  userFavoritePacks: [],
  id: createId(),
};

const createCaller = createCallerFactory(appRouter);

export async function setupTest(
  env: Record<string, any>,
  executionCtx: ExecutionContext,
) {
  const { DB, ...rest } = env;
  // const db = await createDb(env.DB)
  await DbClient.init(env.DB);

  await new UserRepository().create(TEST_USER);

  // const ctx: any = {
  //   user: TEST_USER,
  //   env: {
  //     ...rest,
  //     GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  //     GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  //     STMP_EMAIL: process.env.STMP_EMAIL,
  //     STMP_PASSWORD: process.env.STMP_PASSWORD,
  //     JWT_SECRET: process.env.JWT_SECRET,
  //     SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY,
  //     MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  //     OSM_URI: process.env.OSM_URI,
  //     WEATHER_URL: process.env.WEATHER_URL,
  //     WEATHER_WEEK_URL: process.env.WEATHER_WEEK_URL,
  //     OPENWEATHER_KEY: process.env.OPENWEATHER_KEY,
  //     OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  //     // add the rest of the required properties here...
  //   },
  // };

  const ctx: any = {
    user: TEST_USER,
    env: rest,
    executionCtx,
    // db
  };

  const caller = createCaller(ctx);
  return caller;
}

export type trpcCaller = Awaited<ReturnType<typeof setupTest>>;
