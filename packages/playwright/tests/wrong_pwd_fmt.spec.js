import { test, expect } from '@playwright/test';

test('invalid login with wrong password format shows error message', async ({ page }) => {
  await page.goto('https://packrat.world/');
  await page.getByRole('link', { name: 'Get Started' }).click();

  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('zoot3@email.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify the error message for invalid email format
  const passwordErrorMessage = page.locator('text=String must contain at least 7 character(s)');
  await expect(passwordErrorMessage).toBeVisible({ timeout: 50000 }); // Adjust the timeout as needed
});
