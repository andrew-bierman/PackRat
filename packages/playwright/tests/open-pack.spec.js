import { test, expect } from '@playwright/test';

test('Open pack', async ({ page }) => {
  await page.goto('https://packrat.world/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('testerj@email.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('87654321');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Menu' }).hover();
  await page.getByRole('button', { name: 'Packs' }).click();
  await page.goto('https://packrat.world/packs');
  await page.waitForLoadState('load');
  await page.getByRole('link', { name: 'Yiojgvj' }).click();
  await page.goto('https://packrat.world/pack/dwpr1nxfm6a8u1ssdovy5afd');
  await page.waitForLoadState('load');
});