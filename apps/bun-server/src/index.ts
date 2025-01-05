import { Elysia } from 'elysia';
import { Hono } from 'hono';
// import { app as api } from 'server/src'
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';
import { renderTrpcPanel } from 'trpc-panel';
// import { appRouter } from 'server/src/routes/trpcRouter';
// import { html } from '@elysiajs/html';

const elysia = new Elysia()
  // .use(html())
  .get('/', () => '/Hello from Elysia!')
  // .get('panel', () => renderTrpcPanel(appRouter, { url: 'http://localhost:3000/api/trpc' }))
  .listen(8086);

const workers = new Hono().get('*', (c) => c.text('Hello from worker Hono!'));

const main = new Hono()
  .use('*', prettyJSON()) // With options: prettyJSON({ space: 4 })
  .use(logger())
  .use('*', cors())
  // .use('/panel', async (ctx, next) => {
  //     return ctx.render(
  //       renderTrpcPanel(appRouter, { url: 'http://localhost:3000/api/trpc' }),
  //     );
  //   })
  .get('/', (c) => c.text('/Hello from Hono in root!'))
  // .mount('/:wild', api.handle)
  .mount('/workers', workers.fetch)
  .mount('/elysia', elysia.fetch)
  .get('*', (c) => c.text('Fallback from Hono in Main!'))
  .onError((err, c) => {
    console.error(`${err}`);
    return c.text('Custom Error Message', 500);
  });

serve(
  {
    // fetch: main.fetch,
    port: 8085,
    ...main,
  },
  (info) => {
    console.log('Server started on port ->', info.port);
  },
);

export default main;
