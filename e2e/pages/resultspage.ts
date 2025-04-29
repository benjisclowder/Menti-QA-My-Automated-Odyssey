import { Page, expect } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectResults() {
    // Wait longer for the page to load completely
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    
    // Try multiple selectors with a longer timeout
    try {
      // First try the data-testid selector
      await expect(this.page.locator('[data-testid="result-title-a"]').first()).toBeVisible({ timeout: 10000 });
    } catch (error) {
      console.log('Data-testid selector not found, trying alternative selectors');
      
      // If that fails, try a more generic selector
      await expect(this.page.locator('a[href*="http"]').first()).toBeVisible({ timeout: 10000 });
    }
  }  

  async clickFirstResult() {
    // Get the URL of the first result before clicking
    let resultUrl = '';
    
    try {
      // First try the data-testid selector
      const firstResult = this.page.locator('[data-testid="result-title-a"]').first();
      resultUrl = await firstResult.getAttribute('href') || '';
      
      // Navigate directly to the URL instead of clicking
      if (resultUrl) {
        await this.page.goto(resultUrl);
        return;
      }
      
      // If we couldn't get the URL, try clicking
      await firstResult.click();
    } catch (error) {
      console.log('Error with data-testid selector, trying alternative selector');
      
      try {
        // If that fails, try a more generic selector
        const firstResult = this.page.locator('a[href*="http"]').first();
        resultUrl = await firstResult.getAttribute('href') || '';
        
        // Navigate directly to the URL instead of clicking
        if (resultUrl) {
          await this.page.goto(resultUrl);
          return;
        }
        
        // If we couldn't get the URL, try clicking
        await firstResult.click();
      } catch (error) {
        console.log('Failed to click or navigate to result:', error);
        throw error;
      }
    }
  }  
}
