import { Hono } from 'hono';

const router = new Hono();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health routes
 */

/**
 * @swagger
 * /health:
 * get:
 *  tags:
 *   - Health
 * summary: Get health status
 * responses:
 *  200:
 *   description: Successful response
 *  content:
 *  application/json:
 *  schema:
 *  type: object
 */
router.get('/', (c) => {
  return c.json({ status: 'ok' });
});

export default router;
