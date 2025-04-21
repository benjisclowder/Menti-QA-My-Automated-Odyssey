import { Page, expect } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectResults() {
    await expect(this.page).toHaveURL(/q=/);
    await expect(this.page.locator('[data-testid="result-title-a"]').first()).toBeVisible();
  }  

  async clickFirstResult() {
    const firstResult = this.page.locator('[data-testid="result-title-a"]').first();
    await firstResult.click();
  }  
}
