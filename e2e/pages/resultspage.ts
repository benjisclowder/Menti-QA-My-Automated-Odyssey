import { Page, expect } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectResults() {
    await this.page.waitForLoadState('networkidle');
    
    const currentUrl = this.page.url();
    
    if (currentUrl.includes('static-pages/418.html')) {
      // If we're on the anti-bot page, try to navigate back to the search
      const searchInput = this.page.locator('input[name="q"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('playwright');
        await searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle');
      }
    }
    
    await expect(this.page.locator('[data-testid="result-title-a"]').first()).toBeVisible();
  }  

  async clickFirstResult() {
    const firstResult = this.page.locator('[data-testid="result-title-a"]').first();
    await firstResult.click();
  }  
}
