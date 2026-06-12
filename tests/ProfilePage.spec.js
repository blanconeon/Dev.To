import { test, expect } from '@playwright/test';

test.describe("ProfilePage", ()=> {
test("ProfilePage renders- h3 github username", async ({page})=> {
await page.goto('/profile/jess');//homepage
await page.locator('h3').first().waitFor({ timeout: 15000 });//wait for profile to load.
//assert
await expect(page.locator('h3').first()).toBeVisible();
})


})

//No need to change the code. The profile username h2 is the first one, article titles come after. Use .nth(1) to target the second h2 — that's the first article title: