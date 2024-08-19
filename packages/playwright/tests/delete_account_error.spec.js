import { test, expect } from '@playwright/test';
test.setTimeout(60000);

test('delete account error', async ({ page }) => {
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
  await page.getByRole('button', { name: 'Delete account' }).click();

  // Verify the error message for invalid email format
  const emailErrorMessage = page.locator(
    'text= Invalid literal value, expected "delete"',
  );
  await expect(emailErrorMessage).toBeVisible({ timeout: 50000 }); // Adjust the timeout as needed
});
