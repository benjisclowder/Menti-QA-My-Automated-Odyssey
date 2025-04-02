// ✅ Project: Menti-QA-My-Automated-Odyssey
// 📂 File: tests/e2e/pages/SearchPage.ts
import { Page } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput = 'input[type="search"]';
  readonly firstResult = '[data-testid="AssetCell"]:first-child';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://opensea.io');
  }

  async search(term: string) {
    await this.page.fill(this.searchInput, term);
    await this.page.keyboard.press('Enter');
  }

  async openFirstResult() {
    await this.page.waitForSelector(this.firstResult);
    await this.page.click(this.firstResult);
  }
}
