/**
 * Integration test example for the `post` router
 */
import { inferProcedureInput } from '@trpc/server';
// import { createContextInner } from '@trpc/server/dist/createContext';
import { AppRouter, createCaller } from '../routes/trpcRouter';
import { generateMock } from '@anatine/zod-mock';
import * as validator from '../middleware/validators/index';
import mongoose from 'mongoose';

// Trpc testing reference: https://github.com/trpc/examples-next-prisma-starter/blob/main/src/server/routers/post.test.ts

beforeEach(async () => {
  console.log('before all');
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.MONGODB_URI ?? '');
});

afterEach(async () => {
  console.log('after all');
  await mongoose.disconnect();
});

test('test user sign up', async () => {
  const caller = createCaller({});

  const mockUser = generateMock(validator.userSignUp);

  const signUp = await caller.signUp(mockUser);

  // SendGrid is not working in test environment, but otherwise this test passes. Short term solution is to comment out the sendWelcomeEmail function in userSignUp.ts.

  expect(signUp.id).toBeDefined();
  expect(signUp.username).toBe(mockUser.username);
  expect(signUp.email).toBe(mockUser.email.toLowerCase());
});

test('add 1 + 1', async () => {
  expect(1 + 1).toEqual(2);
});
