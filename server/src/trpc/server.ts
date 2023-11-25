import type { AnyRouter } from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { MiddlewareHandler } from 'hono';
// import { devtoolsLink } from "trpc-client-devtools-link"
import { getPrismaClient } from '../prisma';

type tRPCOptions = Omit<
  FetchHandlerRequestOptions<AnyRouter>,
  'req' | 'endpoint'
> &
  Partial<Pick<FetchHandlerRequestOptions<AnyRouter>, 'endpoint'>>;

const honoTRPCServer = ({
  endpoint = '/api/trpc',
  ...rest
}: tRPCOptions): MiddlewareHandler => {
  return async (honoCTX, next) => {
    const env = honoCTX.env;
    const prisma = getPrismaClient(env.PRISMA_DATA_PROXY_URI as string);

    const trpcContext = {
      prisma,
      env,
    };
    console.log('HIIIIIIIII', env);
    const res = fetchRequestHandler({
      ...rest,
      endpoint,
      req: honoCTX.req.raw,
      createContext: () => trpcContext,
    });

    return res;
  };
};

export { honoTRPCServer };
