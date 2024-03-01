// testHelpers.ts
import mongoose from 'mongoose';
import { createCaller } from '../../routes/trpcRouter';
import { createContextInner } from '../../trpc/context';

export async function setupTest() {
  process.env.NODE_ENV = 'test';
  // await mongoose.connect(process.env.MONGODB_URI ?? '');
  const ctx = await createContextInner({});
  const caller = createCaller(ctx);
  return { caller };
}

export async function teardownTest() {
  // await mongoose.disconnect();
}
