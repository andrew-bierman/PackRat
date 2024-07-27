import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.pages.dev/');
  await page.getByRole('button', { name: 'Menu' }).click();
  await page.getByRole('button', { name: ' About' }).click();
  await page.goto('https://packrat.world/about');
});