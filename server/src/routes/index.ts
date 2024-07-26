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
import * as CryptoJS from 'crypto-js';
import { parseStringPromise } from 'xml2js';
import Papa from 'papaparse';
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

const helloRouter = new Hono();

function generateAWSHeaders(
  url,
  method,
  service,
  region,
  accessKey,
  secretKey,
  sessionToken,
) {
  const amzDate = new Date()
    .toISOString()
    .replace(/[:-]/g, '')
    .replace(/\.\d{3}/, '');
  const dateStamp = amzDate.slice(0, 8);
  const canonicalUri = new URL(url).pathname;
  const canonicalQueryString = '';
  const payloadHash = CryptoJS.SHA256('').toString(CryptoJS.enc.Hex);
  const canonicalHeaders =
    `host:${new URL(url).hostname}\nx-amz-date:${amzDate}\n` +
    (sessionToken ? `x-amz-security-token:${sessionToken}\n` : '');
  const signedHeaders =
    'host;x-amz-date' + (sessionToken ? ';x-amz-security-token' : '');
  const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

  console.log('Canonical Request:', canonicalRequest);

  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${CryptoJS.SHA256(canonicalRequest).toString(CryptoJS.enc.Hex)}`;

  console.log('String to Sign:', stringToSign);

  const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
  const signature = CryptoJS.HmacSHA256(stringToSign, signingKey).toString(
    CryptoJS.enc.Hex,
  );
  const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return {
    host: new URL(url).hostname,
    'x-amz-date': amzDate,
    'x-amz-content-sha256': payloadHash,
    Authorization: authorizationHeader,
    ...(sessionToken && { 'x-amz-security-token': sessionToken }),
  };
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
  const kRegion = CryptoJS.HmacSHA256(regionName, kDate);
  const kService = CryptoJS.HmacSHA256(serviceName, kRegion);
  const kSigning = CryptoJS.HmacSHA256('aws4_request', kService);
  return kSigning;
}

helloRouter.get('/', async (c) => {
  const endpoint =
    'https://a0adf59e1ef3edc3d2bbc2ff272474bc.r2.cloudflarestorage.com';
  const bucket = 'packrat-scrapy-bucket';
  const method = 'GET';
  const region = 'auto';
  const service = 's3';
  const accessKeyId = '1d8b0d85792acd42af61de935c4a1c40';
  const secretKey =
    'e4e9897a4bd4333a6c94846cefcb549bcb386c681ab72dcd00f4f213415a0d5d';
  const sessionToken = '';

  // Generate AWS Headers for listing bucket contents
  const listHeaders = generateAWSHeaders(
    endpoint + '/' + bucket,
    method,
    service,
    region,
    accessKeyId,
    secretKey,
    sessionToken,
  );

  try {
    // Fetch data from bucket to list contents
    const listResponse = await fetch(`${endpoint}/${bucket}`, {
      method,
      headers: listHeaders,
    });
    const listData = await listResponse.text();

    // Parse XML response
    const parsedListData = await parseStringPromise(listData);
    const contents = parsedListData.ListBucketResult.Contents;

    // Extract and log file names
    const fileNames = contents
      .filter((item) => item.Key[0].startsWith('backcountry/'))
      .map((item) => item.Key[0]);

    console.log('File names in backcountry directory:', fileNames);

    // Select a specific file to read
    const fileName = 'backcountry/backcountry_2024-07-24T08-59-25.csv';

    // Generate AWS Headers for fetching the specific file
    const fileHeaders = generateAWSHeaders(
      `${endpoint}/${bucket}/${fileName}`,
      method,
      service,
      region,
      accessKeyId,
      secretKey,
      sessionToken,
    );

    // Fetch the specific CSV file
    const fileResponse = await fetch(`${endpoint}/${bucket}/${fileName}`, {
      method,
      headers: fileHeaders,
    });
    const fileData = await fileResponse.text();

    // Check for errors in the file response
    if (fileResponse.status !== 200) {
      console.error('Error fetching file:', fileData);
      return c.json({ error: 'Error fetching file', details: fileData });
    }

    // Parse the CSV file using PapaParse
    Papa.parse(fileData, {
      header: true,
      complete: function (results) {
        console.log('Parsed CSV file contents:', results.data);
      },
      error: function (error) {
        console.error('Error parsing CSV file:', error);
      },
    });

    return c.json({ message: 'File content logged' });
  } catch (err) {
    console.error('Error:', err);
    return c.json({ error: 'An error occurred' });
  }
});

const testapi = new Hono();
router.route('/hello', helloRouter);

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
