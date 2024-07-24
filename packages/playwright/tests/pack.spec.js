import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.pages.dev/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('zoot3@email.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByText('Create a Pack').click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('testiiiiiing');
  await page.getByRole('button', { name: 'Add Pack' }).click();
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByPlaceholder('Item Name').fill('iteeeeeeeeem1234');
  await page.getByPlaceholder('Weight').click();
  await page.getByPlaceholder('Weight').fill('2');
  await page.getByPlaceholder('Quantity').click();
  await page.getByPlaceholder('Quantity').fill('2');
  await page.getByText('Essentials').click();
  await page.getByRole('button', { name: 'Add Item' }).click();
});
