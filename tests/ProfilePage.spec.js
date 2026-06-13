import { test, expect } from '@playwright/test';

test.describe("ProfilePage", ()=> {
test("ProfilePage renders- h3 github username", async ({page})=> {
await page.goto('/profile/jess');//homepage
await page.locator('h3').first().waitFor({ timeout: 15000 });//wait for profile to load.
//assert
await expect(page.locator('h3').first()).toBeVisible();
});

test("profile renders articles, checks second h2 is visisble", async ({page})=>{  
await page.goto('/profile/jess');// prifile jess
await page.locator('h3').first().waitFor({ timeout: 15000 });//wait for profile to load.
// assert
await expect(page.locator('h2').nth(1)).toBeVisible({ timeout: 15000 });
});

test('Prev button is disabled on page 1', async ({ page }) => {
  await page.goto('/profile/jess'); // profile jess
  await page.locator('h3').first().waitFor({ timeout: 15000 });//wait for profile to load.
  await page.locator('h2').nth(1).waitFor({ timeout: 15000 });// wait for articles to load
  // assert
  await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled();
});

test("prev is enabled on page 2", async ({page})=> {

  await page.goto('/profile/jess');
  await page.locator('h3').first().waitFor({ timeout: 15000 });//wait for profile to load.
  await page.locator('h2').nth(1).waitFor({ timeout: 15000 });// wait for articles to load 

 //act
await page.getByRole('button', { name: 'Next' }).click();
//assert
await expect(page.getByRole('button', { name: 'Previous' })).toBeEnabled();
});
})

