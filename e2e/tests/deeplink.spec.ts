import { expect, test } from '@playwright/test';
import { ResultsPage } from '../pages/resultspage';

test('Go directly to search results page for "playwright"', async ({ page }) => {
  const results = new ResultsPage(page);

  await page.goto('https://duckduckgo.com/?q=playwright');
  await results.expectResults();
});
