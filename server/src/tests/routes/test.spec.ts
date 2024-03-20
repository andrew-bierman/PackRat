import { Miniflare } from 'miniflare';
import {
  getDb,
  getBindings,
  migrateDb,
  createMiniflare,
  createTRPCClient,
} from '../utils/testHelpers';

describe('T4 App API Server', () => {
  // in case we have parallelized tests...
  let serverId = 0;
  let servers: Miniflare[] = [];
  beforeEach(async () => {
    serverId = serverId + 1;
    servers[serverId] = createMiniflare();
    await migrateDb({ miniflare: servers[serverId] });
  });
  afterEach(async () => {
    await servers[serverId]?.dispose();
  });
  test('has cloudflare bindings', async () => {
    const miniflare = servers[serverId];
    const db = await getDb({ miniflare });
    expect(db).toBeTruthy();
  });
  test('has env vars', async () => {
    const miniflare = servers[serverId];
    const bindings = await getBindings({ miniflare });
    expect(bindings.JWT_SECRET).toBeTruthy();
  });
  test('can make api requests to the mocked api server', async () => {
    const miniflare = servers[serverId];
    const res = await miniflare.dispatchFetch('http://localhost:8787/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            hello
          }
        `,
      }),
    });
    expect(res.status).toBe(404);
  });
  test('can call hono and trpc routes directly', async () => {
    const miniflare = servers[serverId];
    const client = createTRPCClient({ miniflare });
    const res = await client.hello1.world.query();
    console.log({ res });
    expect(res).toBe('Hello world!');
  });
});
