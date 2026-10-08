import { Elysia } from 'elysia';
import { trailConditionRoutes } from './reports';
import { trailIndexRoutes } from './trails';
import { tripTrailConditionRoutes } from './trip';

export const trailConditionsRoutes = new Elysia({ prefix: '/trail-conditions' })
  .use(trailIndexRoutes)
  .use(tripTrailConditionRoutes)
  .use(trailConditionRoutes);
