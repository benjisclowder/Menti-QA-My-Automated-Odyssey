import { test, expect } from '@playwright/test';
import { SearchPage } from '../page-ojects/pages/search.page';

test('search for "cats" on OpenSea and open the first result', async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.search('cats');
  await searchPage.openFirstResult();

  await expect(page).toHaveURL(/\/assets\//);
}); 