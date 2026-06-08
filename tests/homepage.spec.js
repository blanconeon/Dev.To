import { test, expect } from '@playwright/test';



test.describe("HomePage", ()=> {
test('HomePage renders', async ({ page }) => {
  await page.goto('/');
   // Expect HomePage to render a "h2".
  //await expect(page.locator('h2').first()).toBeVisible(); Before a longer time out i sgiven to wait for the API response.
  await expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 });

});

test('Prev button is disabled on page 1', async ({ page }) => {
  await page.goto('/');
  await page.locator('h2').first().waitFor({ timeout: 15000 }); // It waits for the first h2 to appear in the DOM before moving on to the button assertion. Without it, Playwright might check for the button before the page has finished loading and the buttons haven't rendered yet.
  await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled();
});

test("prev is enabled on page 2", async ({page})=> {

  await page.goto('/');
  await page.locator('h2').first().waitFor({ timeout: 15000 });
 //act
  await page.getByRole('button', { name: 'Next' }).click();
//assert
await expect(page.getByRole('button', { name: 'Previous' })).toBeEnabled();
})
   
})

test.describe("SearchBar", ()=> {
test("search by tagg-type react, click radio, submit, see articles load", async ({page})=> {
 await page.goto('/');
 await page.locator('h2').first().waitFor({ timeout: 15000 });

 await page.getByRole('textbox').fill('react');
 await page.getByRole('radio').first().click(); // selects tag radio
 await page.getByRole('button', {name: 'Search'}).click();

 //assert
 await expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 });
})

test("search by username- type jess, click radio, submit, see articles", async ({page})=> {
await page.goto('/');
 await page.locator('h2').first().waitFor({ timeout: 15000 });

 await page.getByRole('textbox').fill('jess');
 await page.getByRole('radio').last().click(); // selects tag radio
 await page.getByRole('button', {name: 'Search'}).click();

 //assert
 await expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 });


})
})

test.describe("NavBar", () => {
  test("clicking Javascript loads articles", async ({ page }) => {
    await page.goto('/');
    await page.locator('h2').first().waitFor({ timeout: 15000 });

    await page.getByRole('link', { name: 'Javascript', exact: true }).click();
                                                // exact: true is needed as other jsvascript tags appear when other articles are loaded. extact: true compares for an exact Javascript with capital J.
     // assert
    await expect(page.locator('h2').first()).toBeVisible({ timeout: 15000 });
  });
});





//npx playwright test tests/homepage.spec.js --headed
/*
npx playwright test tests/homepage.spec.js               # headless, terminal output only
npx playwright test tests/homepage.spec.js --headed      # opens real browser, you watch it run
npx playwright test tests/homepage.spec.js --ui          # opens Playwright UI, run/inspect tests manually
npx playwright test                                      # runs all test files in tests/ folder, headless
*/