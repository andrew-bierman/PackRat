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
  await page.getByRole('button', { name: ' Profile' }).click();
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('combobox').first().click();
  await page.getByLabel('celsius').click();
  await page.getByRole('combobox').nth(1).click();
  await page.getByLabel('kg').click();
  await page.getByRole('button', { name: 'Update profile' }).click();
});