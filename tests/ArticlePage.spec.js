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

await page.locator('span').first().click();//tags are in a 'span'

//assert

await expect(page).toHaveURL(/\?tag=/);

})

})