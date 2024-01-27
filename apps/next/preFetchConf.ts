import { appRouter } from "server/src/routes/trpcRouter";
import { createServerSideHelpers } from '@trpc/react-query/server';

export const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {},
    transformer: undefined,
});