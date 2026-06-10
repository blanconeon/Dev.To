import { test, expect } from '@playwright/test';

test.describe("ProfilePage", ()=> {
test("ProfilePage renders- h3 github username", async ({page})=> {
await page.goto('/profile/jess');//homepage
await page.locator('h3').first().waitFor({ timeout: 15000 });//wait for profile to load.
//assert
await expect(page.locator('h3').first()).toBeVisible();
})


})