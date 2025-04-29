import { test } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { ResultsPage } from '../pages/resultspage';

test('Search for "cats" on DuckDuckGo', async ({ page }) => {
  const home = new HomePage(page);
  const results = new ResultsPage(page);

  await home.goto();
  await home.search('cats');
  await results.expectResults();
  await results.clickFirstResult();
});
