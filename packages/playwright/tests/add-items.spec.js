import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.pages.dev/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('zoot3@email.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('button', { name: ' Packs' }).click();
  await page.getByRole('link', { name: 'Quantity field testing' }).click();
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByPlaceholder('Item Name').fill('items88888');
  await page.getByPlaceholder('Weight').click();
  await page.getByPlaceholder('Weight').fill('5');
  await page.getByPlaceholder('Quantity').fill('5');
  await page.getByPlaceholder('Quantity').click();
  await page.getByLabel('Add Item').getByText('Essentials').click();
  await page.getByRole('button', { name: 'Add Item' }).click();
});