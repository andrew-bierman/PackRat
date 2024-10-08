const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { url } = require('inspector');

(async () => {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Capture console logs
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
  // Capture page errors
  page.on('pageerror', (error) => console.error('PAGE ERROR:', error));

  const resolutions = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 3440, height: 1440, name: 'big desktop screen' },
    { width: 1280, height: 800, name: 'tablet' },
    { width: 1366, height: 1024, name: 'iPad Pro' },
    { width: 375, height: 667, name: 'small mobile' },
    { width: 390, height: 844, name: 'Android mobile' },
    { width: 393, height: 852, name: 'iPhone' },
    { width: 430, height: 932, name: 'iPhone Pro Max' },
    { width: 1366, height: 768, name: 'laptop' },
  ];

  const pages = [
    { url: 'https://packrat.world/sign-in', name: 'log in' },
    { url: 'https://packrat.world/register', name: 'register' },
  ];

  for (const resolution of resolutions) {
    await page.setViewportSize({
      width: resolution.width,
      height: resolution.height,
    });
    for (const { url, name } of pages) {
      try {
        console.log(`Navigating to ${url} at ${resolution.name} resolution...`);
        await page.goto(url, { waitUntil: 'networkidle' });
        console.log(
          `Taking full-page screenshot of ${url} at ${resolution.name} resolution...`,
        );
        await page.screenshot({
          path: path.join(screenshotsDir, `${name}-${resolution.name}.png`),
          fullPage: false,
        });
      } catch (error) {
        console.error(`Failed to navigate to ${url}:`, error);
      }
    }
  }

  console.log('Closing browser...');
  await browser.close();
})();
