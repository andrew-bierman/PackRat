import { test, expect } from '@playwright/test';

test('invalid login with empty fields shows error message', async ({
  page,
}) => {
  await page.goto('https://packrat.world/');
  await page.getByRole('link', { name: 'Get Started' }).click();

  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify the error message for invalid email format
  const emailErrorMessage = page.locator('text=Email is required');
  await expect(emailErrorMessage).toBeVisible({ timeout: 50000 }); // Adjust the timeout as needed

  // Verify the error message for invalid email format
  const passwordErrorMessage = page.locator('text=Password is required');
  await expect(passwordErrorMessage).toBeVisible({ timeout: 50000 }); // Adjust the timeout as needed
});
