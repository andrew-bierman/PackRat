import type { AnyRouter } from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { MiddlewareHandler } from 'hono';
import { createContext } from './context';

type tRPCOptions = Omit<
  FetchHandlerRequestOptions<AnyRouter>,
  'req' | 'endpoint'
> &
  Partial<Pick<FetchHandlerRequestOptions<AnyRouter>, 'endpoint'>>;

const honoTRPCServer = ({
  endpoint = '/api/trpc',
  ...rest
}: tRPCOptions): MiddlewareHandler => {
  return async (honoCTX, next) =>
    fetchRequestHandler({
      ...rest,
      endpoint,
      req: honoCTX.req.raw,
      createContext: createContext(honoCTX),
    });
};

export { honoTRPCServer };
