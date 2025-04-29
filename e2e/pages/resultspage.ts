import { Page, expect } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectResults() {
    // Wait for the page to load completely
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    
    await expect(this.page.locator('a[href*="http"]').first()).toBeVisible({ timeout: 10000 });
  }  

  async clickFirstResult() {
    // Get the URL of the first result before clicking
    const firstResult = this.page.locator('a[href*="http"]').first();
    const resultUrl = await firstResult.getAttribute('href') || '';
    
    // Navigate to the URL
    if (resultUrl) {
      await this.page.goto(resultUrl);
    } else {
      // If we couldn't get the URL, try clicking
      await firstResult.click();
    }
  }  
}
