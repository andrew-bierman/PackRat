import { appRouter } from '../../routes/trpcRouter';
import { createCallerFactory } from '../../trpc';
import { createId } from '@paralleldrive/cuid2';
import { DbClient } from '../../db/client';
import { env } from 'cloudflare:test';
import { faker } from '@faker-js/faker';

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
  username: 'test',
  userFavoritePacks: [],
  id: createId(),
};

const createCaller = createCallerFactory(appRouter);

export async function setupTest(env: Record<string, any>) {
  const { DB, ...rest } = env;
  // const db = await createDb(env.DB)
  await DbClient.init(env.DB);
  const ctx = {
    user: TEST_USER,
    env: rest,
    // db
  };

  const caller = createCaller(ctx);
  return caller;
}

export type trpcCaller = Awaited<ReturnType<typeof setupTest>>;

export const generateMockUser = async (
  user = {
    email: faker.internet.email(),
    name: faker.person.firstName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
) => {
  const caller = await setupTest(env);

  const testUser = await caller.signUp(user);

  return testUser;
};
