import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.pages.dev/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('jew@email.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('button', { name: ' Packs' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('testing123789');
  await page.getByLabel('Is Public').click();
  await page.getByLabel('Yes').click();
  await page.getByRole('button', { name: 'Add Pack' }).click();
});
