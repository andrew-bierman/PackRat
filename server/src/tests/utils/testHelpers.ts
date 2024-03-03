// testHelpers.ts
import { Miniflare } from 'miniflare';
import { createCaller } from '../../routes/trpcRouter';
import { createContextInner } from '../../trpc/context';

export async function setupTest() {
  process.env.NODE_ENV = 'test';
  // await mongoose.connect(process.env.MONGODB_URI ?? '');

  // const mf = new Miniflare({
  //   d1Databases: ["DB"],
  // });

  const ctx = await createContextInner({});
  const caller = createCaller(ctx);
  return { caller };
}

export async function teardownTest() {
  // await mongoose.disconnect();
}
