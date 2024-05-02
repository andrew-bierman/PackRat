import type { AnyRouter } from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { MiddlewareHandler, Context } from 'hono';
import { createContext } from './context';

interface ExtendedContext extends Context {
  d1: D1Database;
}

type tRPCOptions = Omit<
  FetchHandlerRequestOptions<AnyRouter>,
  'req' | 'endpoint'
> &
  Partial<Pick<FetchHandlerRequestOptions<AnyRouter>, 'endpoint'>>;

const honoTRPCServer = ({
  endpoint = '/api/trpc',
  ...rest
}: tRPCOptions): MiddlewareHandler => {
  return async (honoCTX: ExtendedContext, next) => {
    return fetchRequestHandler({
      ...rest,
      endpoint,
      req: honoCTX.req.raw,
      createContext: createContext(honoCTX),
    });
  };
};

export { honoTRPCServer };
