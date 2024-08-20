const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');


(async () => {
  // Directory to save screenshots
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }


  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();


  // Capture console logs and page errors
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error));


  // Define resolutions and pages
  const resolutions = [
    { width: 1920, height: 1080, name: 'desktop' },
    { width: 3440, height: 1440, name: 'big desktop screen' },
    { width: 1280, height: 800, name: 'tablet' },
    { width: 1366, height: 1024, name: 'iPad Pro'},
    { width: 375, height: 667, name: 'small mobile' },
    { width: 390, height: 844, name: 'Android mobile'},
    { width: 393, height: 852, name: 'iPhone'},
    { width: 430, height: 932, name: 'iPhone Pro Max'},
    { width: 1366, height: 768, name: 'laptop'},
  ];


  const pages = [
    { url: 'https://packrat.world/profile/zjo2f4g2f51lo2wr3l6va63a', name: 'other-users-profile (full-screen)'},
 
    // Add more pages as needed
  ];


  // Function to perform login
  const login = async () => {
    console.log('Navigating to login page...');
    await page.goto('https://packrat.world/sign-in', { waitUntil: 'networkidle' });


    console.log('Filling login form...');
    await page.locator('input[type="email"]').fill('zoot3@email.com'); // Replace with actual username field selector and value
    await page.locator('input[type="password"]').fill('12345678'); // Replace with actual password field selector and value
    await page.getByRole('button', { name: 'Sign In' }).click();// Replace with actual login button selector
    await page.getByRole('link', { name: ' 0724 testing 19.91lb  1 ' }).click();
    await page.goto('https://packrat.world/pack/vx7g8a8j6ull12ijzcoz7igy');
    await page.getByRole('link', { name: 'View Profile' }).click();
    await page.goto('https://packrat.world/profile/zjo2f4g2f51lo2wr3l6va63a');

  
   
  };


  // Perform login
  await login();


  // Take screenshots for each resolution and page
  for (const resolution of resolutions) {
    await page.setViewportSize({ width: resolution.width, height: resolution.height });
    for (const { url, name } of pages) {
      try {
        console.log(`Navigating to ${url} at ${resolution.name} resolution...`);
        await page.goto(url, { waitUntil: 'networkidle' });
       
        await page.screenshot({ path: path.join(screenshotsDir, `${name}-${resolution.name}.png`), fullPage: true});
      } catch (error) {
        console.error(`Failed to navigate to ${url}:`, error);
      }
    }
  }


  console.log('Closing browser...');
  await browser.close();
})();


