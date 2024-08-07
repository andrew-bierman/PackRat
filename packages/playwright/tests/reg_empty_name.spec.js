import { test, expect } from '@playwright/test';

test('Register new account name field empty', async ({ page }) => {
  await page.goto('https://packrat.world/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.getByRole('link', { name: 'Don\'t have an account? Sign up' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('admin123@email.com');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('admin123');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Sign Up' }).click();

 // Verify the error message for the empty name field
 const nameErrorMessage = page.locator('text=Required');
 await expect(nameErrorMessage).toBeVisible({ timeout: 10000 }); // Adjust the timeout as needed
});
  
