import mapPreviewRouter from './mapPreviewRouter';
import { type Context, Hono, type Next } from 'hono';

const router = new Hono();

router.route('/mapPreview', mapPreviewRouter);

const helloRouter = new Hono();
helloRouter.get('/', (c: Context, next: Next) => {
  return c.text('Hello, world!');
});
router.route('/hello', helloRouter);

export default router;
