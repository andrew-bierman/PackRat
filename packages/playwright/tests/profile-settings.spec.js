import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://packrat.world/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('zoot3@email.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Menu' }).hover();
  await page.getByRole('button', { name: ' Profile' }).click();
  await page.goto('https://packrat.world/profile');
  await page.getByRole('button', { name: '󰢻' }).click();
  await page.locator('#name').click();
  await page.locator('#name').fill('QA Tester');
  await page.getByRole('button', { name: 'Update profile' }).click();
  const successMessage = await page.locator('text=Confirmed! Your submission was successful.');
  await expect(successMessage).toBeVisible({ timeout: 10000 });
  await page.reload();
  await page.goto('https://packrat.world/profile/settings');
});