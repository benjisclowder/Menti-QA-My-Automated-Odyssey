import { test as base, expect, Page } from '@playwright/test';
import { SearchPage } from '../page-ojects/pages/example.search.page';

// Declare the types of your fixtures
type Fixtures = {
  searchPage: SearchPage;
  page: Page;
};

// Extend the base test with your fixtures
export const test = base.extend<Fixtures>({
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  page: async ({ page }, use) => {
    await use(page);
  },
});

export { expect }; 