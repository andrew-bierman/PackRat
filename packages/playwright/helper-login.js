const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// This function performs login and returns an authenticated page context
const helperLogin = async (browser) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Logging in...');
  await page.goto('https://packrat.world/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('zoot3@email.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Sign In' }).click();

  console.log('Login successful, waiting for dashboard to load...');
  await page.waitForSelector('text="Feed"', {
    waitUntil: 'networkidle',
  });
  return { context, page };
};

module.exports = { helperLogin };
