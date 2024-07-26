import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.world/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('zoot3@email.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('button', { name: ' Packs' }).click();
  await page.goto('https://packrat.world/packs');
  await page.getByRole('link', { name: 'Quantity field' }).click();
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.getByPlaceholder('Item Name').fill('bagpack');
  await page.getByPlaceholder('Weight').click();
  await page.getByPlaceholder('Weight').fill('0.5');
  await page.getByPlaceholder('Quantity').click();
  await page.getByPlaceholder('Quantity').fill('1');
  await page.getByLabel('Essentials').click();
  await page.getByRole('button', { name: 'Add Item' }).click();
  await page.goto('https://packrat.world/pack/jfxuhkd3zflt4ddavnyhh3so');
});