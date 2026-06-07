import { test, expect } from '@playwright/test';


test('HomePage renders', async ({ page }) => {
  await page.goto('/');

  // Expect HomePage to render a "h2".
  //await expect(page.locator('h2').first()).toBeVisible(); Before a longer time out i sgiven to wait for the API response.
  await expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 });

});
//npx playwright test tests/homepage.spec.js --headed
/*
npx playwright test tests/homepage.spec.js               # headless, terminal output only
npx playwright test tests/homepage.spec.js --headed      # opens real browser, you watch it run
npx playwright test tests/homepage.spec.js --ui          # opens Playwright UI, run/inspect tests manually
npx playwright test                                      # runs all test files in tests/ folder, headless
*/