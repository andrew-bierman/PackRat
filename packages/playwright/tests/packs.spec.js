import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.pages.dev/packs');
  await page.getByRole('link', { name: 'testiiiiing' }).click();
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByPlaceholder('Item Name').fill('aaaaaaaaaaaa');
  await page.getByPlaceholder('Weight').click();
  await page.getByPlaceholder('Weight').fill('22');
  await page.getByPlaceholder('Weight').click();
  await page.getByPlaceholder('Weight').fill('2');
  await page.getByPlaceholder('Quantity').click();
  await page.getByPlaceholder('Quantity').fill('2');
  await page.getByText('Food').click();
  await page.getByRole('button', { name: 'Add Item' }).click();
});