import { test, expect } from '@playwright/test';

test('Pack name already exists', async ({ page }) => {
  await page.goto('https://packrat.world/');
  await page.getByRole('link', { name: 'Get Started' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('zoot3@email.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('12345678');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByText('Create a Pack').click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('hit');
  await page.getByRole('button', { name: 'Add Pack' }).click();

  // Verify the error message for invalid email format
  const nameErrorMessage = page.locator('text=A pack with the same name already exists');
  await expect(nameErrorMessage).toBeVisible({ timeout: 50000 }); // Adjust the timeout as needed

  const packnameErrorMessage = page.locator('text=Pack already exists');
  await expect(packnameErrorMessage).toBeVisible({ timeout: 50000 }); // Adjust the timeout as needed

});