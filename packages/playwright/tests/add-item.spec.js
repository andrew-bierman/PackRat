import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.pages.dev/pack/lxupicy18yl1woljm4ll24l4');
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByPlaceholder('Item Name').fill('item78');
  await page.getByPlaceholder('Weight').click();
  await page.getByPlaceholder('Weight').fill('3');
  await page.getByPlaceholder('Quantity').click();
  await page.getByPlaceholder('Quantity').fill('3');
  await page.getByLabel('Add Item').getByText('Essentials').click();
  await page.getByRole('button', { name: 'Add Item' }).click();
});
