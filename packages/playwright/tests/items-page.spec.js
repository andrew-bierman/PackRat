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
  await page.locator('div').filter({ hasText: /^Items$/ }).first().click();
  await page.goto('https://packrat.world/items');
});