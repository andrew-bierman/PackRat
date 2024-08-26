const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { helperLogin } = require('./helper-login');

(async () => {
  const filename = path.basename(__filename, path.extname(__filename));
  const screenshotsDir = path.join(__dirname, 'screenshots', filename);
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await chromium.launch({ headless: false });

  // Perform login and get authenticated context
  const { context, page } = await helperLogin(browser);

  // Capture console logs
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  // Capture page errors
  page.on('pageerror', (error) => console.error('PAGE ERROR:', error));

  const resolutions = [
    // { width: 1920, height: 1080, name: 'desktop' },
    // { width: 3440, height: 1440, name: 'big desktop screen' },
    // { width: 1280, height: 800, name: 'tablet' },
    // { width: 1366, height: 1024, name: 'iPad Pro' },
    { width: 375, height: 667, name: 'small mobile' },
    { width: 390, height: 844, name: 'Android mobile' },
    { width: 393, height: 852, name: 'iPhone' },
    { width: 430, height: 932, name: 'iPhone Pro Max' },
    { width: 1366, height: 768, name: 'laptop' },
  ];

  const pages = [
    {
      url: 'https://packrat.world/',
      name: 'landing-page',
    },
  ];

  for (const resolution of resolutions) {
    for (const { url, name } of pages) {
      try {
        const pageInContext = await context.newPage();
        await pageInContext.setViewportSize({
          width: resolution.width,
          height: resolution.height,
        });
        console.log(`Navigating to ${url} at ${resolution.name} resolution...`);
        await pageInContext.goto(url, { waitUntil: 'networkidle' });
        console.log(
          `Taking full-page screenshot of ${url} at ${resolution.name} resolution...`,
        );
        await pageInContext.screenshot({
          path: path.join(screenshotsDir, `${name}-${resolution.name}.png`),
          fullPage: true,
        });
        await pageInContext.close();
      } catch (error) {
        console.error(`Failed to navigate to ${url}:`, error);
      }
    } 
  }

  console.log('Closing browser...');
  await context.close();
  await browser.close();
})();
