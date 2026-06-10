import { test, expect } from '@playwright/test';



test.describe("ArticlePage ", ()=> {
test('ArticlePage renders', async ({ page }) => {
await page.goto('/');//homepage
await page.locator('h2').first().waitFor({ timeout: 15000 });//wait for articles to load.
await page.locator('h2').first().click();//clicks on first article- ArticlePage reders which uses /articles/:id

//assert
//ArticlePage renders body-html via dangerouslSetInnerHTML, that output will contain varius elements, you cant predict exactly whats there but you can assert on the url /articles/sommething.
await expect(page).toHaveURL(/\/articles\/\d+/);
//That checks the URL contains /articles/ followed by a number — confirming navigation worked

});

test('ArticlePage tags are clickable', async ({page}) => {
await page.goto('/');//homepage
await page.locator('h2').first().waitFor({ timeout: 15000 });
await page.locator('h2').first().click();

await page.locator('a[href*="?tag="] span').first().click();//This finds a span inside any <a> whose href contains ?tag= — that's guaranteed to be your tag links

//locator('a[href*="?tag="] span') is a CSS selector that chains elements. a[href*="?tag="] means "an anchor tag whose href contains ?tag=", then span means "a span inside that anchor". Standard CSS selector syntax — Playwright uses it to drill into the DOM precisely. a[href*="?tag="] span specifically targets links that contain a <span> inside them, which are only your mapped tag links, not the NavBar links.


//assert

await expect(page).toHaveURL(/\?tag=/);

})

test('author link navigates to profile', async ({ page }) => {
  await page.goto('/');
  await page.locator('h2').first().waitFor({ timeout: 15000 });
  await page.locator('h2').first().click();
  await page.locator('a[href*="/profile/"]').click();
  await expect(page).toHaveURL(/\/profile\//);
});

})