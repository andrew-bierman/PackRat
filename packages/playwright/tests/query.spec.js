import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.world/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('zoot3@email.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByPlaceholder('Search by park, city, or trail').click();
  await page.getByPlaceholder('Search by park, city, or trail').fill('los angeles');
  await page.getByText('Los Angelescity').click();
  await page.goto('https://packrat.pages.dev/destination/query?osmType=R&osmId=207359&name=Los%20Angeles');
  await page.waitForLoadState('load');

});