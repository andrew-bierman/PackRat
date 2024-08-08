import { test, expect } from '@playwright/test';

test('Update profile without name shows error message', async ({ page }) => {
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
  await page.locator('#name').fill('');
  await page.getByRole('button', { name: 'Update profile' }).click();

  // Verify the error message for the empty name field
  const nameErrorMessage = page.locator('text=String must contain at least 1 character(s)');
  await expect(nameErrorMessage).toBeVisible({ timeout: 10000 }); // Adjust the timeout as needed
});