import { Hono } from 'hono';
import type { AnyRouter } from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { MiddlewareHandler } from 'hono';
import { appRouter } from './routes/trpcRouter';

type tRPCOptions = Omit<
  FetchHandlerRequestOptions<AnyRouter>,
  'req' | 'endpoint'
> &
  Partial<Pick<FetchHandlerRequestOptions<AnyRouter>, 'endpoint'>>;

const trpcServer = ({
  endpoint = '/trpc',
  ...rest
}: tRPCOptions): MiddlewareHandler => {
  return async (c) => {
    const res = fetchRequestHandler({
      ...rest,
      endpoint,
      req: c.req.raw,
    });
    return res;
  };
};

const app = new Hono();

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
  }),
);

export default app;
