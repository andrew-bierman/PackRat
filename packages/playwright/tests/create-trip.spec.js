import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.pages.dev/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('zoot3@email.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByText('Create a Trip').click();
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('manila ');
  await page.locator('.css-175oi2r > div > ._dsp-flex > p').first().click();
  await page.getByPlaceholder('Start date - End date').click();
  await page.getByRole('button', { name: '17' }).nth(1).click();
  await page.getByRole('button', { name: '20' }).nth(1).click();
  await page.goto(
    'https://packrat.pages.dev/trip/create?id=lxupicy18yl1woljm4ll24l4',
  );
});
