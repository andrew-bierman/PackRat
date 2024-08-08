import packRoutes from './packRoutes';
import itemRoutes from './itemRoutes';
import tripRoutes from './tripRoutes';
import weatherRoutes from './weatherRoutes';
import geoCodeRoutes from './geoCodeRoutes';
import getParkRoutes from './getParkRoutes';
import getTrailRoutes from './getTrailRoutes';
import osmRoutes from './osmRoutes';
import passwordResetRoutes from './passwordResetRoutes';
import openAiRoutes from './openAiRoutes';
import templateRoutes from './templateRoutes';
import favoriteRouters from './favoriteRoutes';
import userRoutes from './userRoutes';
import mapPreviewRouter from './mapPreviewRouter';
import healthRoutes from './healthRoutes';
import { Hono } from 'hono';
import querystring from 'querystring';

const router = new Hono();

// use routes
router.route('/user', userRoutes);
router.route('/pack', packRoutes);
router.route('/item', itemRoutes);
router.route('/trip', tripRoutes);
router.route('/weather', weatherRoutes);
router.route('/geocode', geoCodeRoutes);
router.route('/getparks', getParkRoutes);
router.route('/gettrails', getTrailRoutes);
router.route('/osm', osmRoutes);
router.route('/password-reset', passwordResetRoutes);
router.route('/openai', openAiRoutes);
router.route('/template', templateRoutes);
router.route('/favorite', favoriteRouters);
router.route('/mapPreview', mapPreviewRouter);
router.route('/health', healthRoutes);

const testapi = new Hono();

testapi.get('/', async (c) => {
  const params = c.req.query();
  console.log('Received data:', params);

  return c.json({ message: 'Data received successfully!', data: params });
});

testapi.get('/test', async (c) => {
  try {
    const postData = querystring.stringify({
      project: 'PackRat',
      spider: 'backcountry',
    });

    const response = await fetch('http://localhost:6800/schedule.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData,
    });

    const responseData = await response.json();

    if (responseData.status === 'ok') {
      console.log('Scraping initiated', responseData);
      return c.json({
        message: 'Scraping initiated successfully!',
        response: responseData,
      });
    } else {
      console.error('Error from Scrapyd:', responseData);
      return c.json({
        message: 'Failed to initiate scraping',
        error: responseData,
      });
    }
  } catch (error) {
    console.error('Error initiating scraping:', error);
    return c.json({
      message: 'Failed to initiate scraping',
      error: error.toString(),
    });
  }
});

router.route('/testapi', testapi);

// Also listen to /api for backwards compatibility
router.route('/api/user', userRoutes);
router.route('/api/pack', packRoutes);
router.route('/api/item', itemRoutes);
router.route('/api/trip', tripRoutes);
router.route('/api/weather', weatherRoutes);
router.route('/api/geocode', geoCodeRoutes);
router.route('/api/getparks', getParkRoutes);
router.route('/api/gettrails', getTrailRoutes);
router.route('/api/osm', osmRoutes);
router.route('/api/password-reset', passwordResetRoutes);
router.route('/api/openai', openAiRoutes);
router.route('/api/template', templateRoutes);
router.route('/api/favorite', favoriteRouters);
router.route('/api/openai', openAiRoutes);
router.route('/api/mapPreview', mapPreviewRouter);

export default router;
