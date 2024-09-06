import { Hono } from 'hono';
import querystring from 'querystring';

const router = new Hono();

router.get('/', async (c) => {
  const params = c.req.query();
  console.log('Received data:', params);

  return c.json({ message: 'Data received successfully!', data: params });
});

router.get('/test', async (c) => {
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

export default router;
