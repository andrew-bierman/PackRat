import { Elysia } from 'elysia';
import { trailConditionRoutes } from './reports';
import { trailIndexRoutes } from './trails';

export const trailConditionsRoutes = new Elysia({ prefix: '/trail-conditions' })
  .use(trailIndexRoutes)
  .use(trailConditionRoutes);
