import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://duckduckgo.com');
  }

  async search(term: string) {
    await this.page.fill('input[name="q"]', term);
    await this.page.keyboard.press('Enter');
  }
}
