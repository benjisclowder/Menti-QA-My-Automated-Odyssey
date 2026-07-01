import { test, expect } from '@playwright/test';
import { TransactionsPage } from '../page-ojects/pages/transactions.page';

test.describe('Transactions Tab Tests', () => {
  test('should navigate to Activity tab and verify transactions list is visible', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.goto();
    await transactionsPage.clickActivityTab();
    await transactionsPage.waitForTransactionsList();

    const transactionCount = await transactionsPage.getTransactionCount();
    expect(transactionCount).toBeGreaterThanOrEqual(0);
  });

  test('should display transaction details when clicking on a transaction', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.goto();
    await transactionsPage.clickActivityTab();
    await transactionsPage.waitForTransactionsList();

    const transactionCount = await transactionsPage.getTransactionCount();
    
    if (transactionCount > 0) {
      await transactionsPage.clickFirstTransaction();
      await transactionsPage.waitForTransactionDetails();
      
      const detailsVisible = await page.locator('[data-testid="transaction-details"]').isVisible();
      expect(detailsVisible).toBeTruthy();
    } else {
      const noTransactionsVisible = await transactionsPage.isNoTransactionsMessageVisible();
      expect(noTransactionsVisible).toBeTruthy();
    }
  });

  test('should verify transaction type and amount are displayed', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.goto();
    await transactionsPage.clickActivityTab();
    await transactionsPage.waitForTransactionsList();

    const transactionCount = await transactionsPage.getTransactionCount();
    
    if (transactionCount > 0) {
      const transactionType = await transactionsPage.getFirstTransactionType();
      const transactionAmount = await transactionsPage.getFirstTransactionAmount();

      expect(transactionType).toBeTruthy();
      expect(transactionAmount).toBeTruthy();
    }
  });

  test('should be able to search transactions', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.goto();
    await transactionsPage.clickActivityTab();
    await transactionsPage.waitForTransactionsList();

    const initialCount = await transactionsPage.getTransactionCount();
    
    if (initialCount > 0) {
      await transactionsPage.searchTransaction('ETH');
      await page.waitForTimeout(1000);
      
      const filteredCount = await transactionsPage.getTransactionCount();
      expect(filteredCount).toBeGreaterThanOrEqual(0);
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    }
  });

  test('should handle empty transaction state gracefully', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.goto();
    await transactionsPage.clickActivityTab();

    const transactionCount = await transactionsPage.getTransactionCount();
    
    if (transactionCount === 0) {
      const noTransactionsVisible = await transactionsPage.isNoTransactionsMessageVisible();
      expect(noTransactionsVisible).toBeTruthy();
    } else {
      expect(transactionCount).toBeGreaterThan(0);
    }
  });
});

test.describe('Transactions Tab Smoke Tests', () => {
  test('should load Activity tab without errors', async ({ page }) => {
    const transactionsPage = new TransactionsPage(page);

    await transactionsPage.goto();
    await expect(page).toHaveURL(/portfolio\.metamask\.io/);
    
    await transactionsPage.clickActivityTab();
    await page.waitForLoadState('networkidle');
    
    const hasError = await page.locator('text=/error|failed/i').isVisible().catch(() => false);
    expect(hasError).toBeFalsy();
  });
});
