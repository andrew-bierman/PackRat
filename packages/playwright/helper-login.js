const helperLogin = async (page) => {
  console.log('Navigating to Login Page for Signing in');
  await page.goto('https://packrat.world/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Get Started' }).click();

  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('zoot3@email.com');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('12345678');
  await page.getByRole('button', { name: 'Sign In' }).click();
  console.log('Waiting for dashboard to load...');
  
};
module.exports = { helperLogin };
