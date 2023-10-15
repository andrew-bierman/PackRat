import { TRPCError, initTRPC } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import { TRPCPanelMeta } from 'trpc-panel';

type CombinedMeta = OpenApiMeta & TRPCPanelMeta;

const t = initTRPC.meta<CombinedMeta>().create(); /* 👈 */

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
