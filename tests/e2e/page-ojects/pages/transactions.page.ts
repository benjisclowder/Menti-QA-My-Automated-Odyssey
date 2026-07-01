import { Page, Locator } from '@playwright/test';

export class TransactionsPage {
  readonly page: Page;
  readonly activityTab: Locator;
  readonly transactionsList: string;
  readonly firstTransaction: string;
  readonly transactionDetails: string;
  readonly searchInput: string;
  readonly filterButton: Locator;
  readonly noTransactionsMessage: string;

  constructor(page: Page) {
    this.page = page;
    this.activityTab = page.getByRole('button', { name: /activity/i });
    this.transactionsList = '[data-testid="transaction-list"]';
    this.firstTransaction = '[data-testid="transaction-list-item"]:first-child';
    this.transactionDetails = '[data-testid="transaction-details"]';
    this.searchInput = 'input[placeholder*="Search"]';
    this.filterButton = page.getByRole('button', { name: /filter/i });
    this.noTransactionsMessage = '[data-testid="empty-state"]';
  }

  async goto() {
    await this.page.goto('https://portfolio.metamask.io');
  }

  async clickActivityTab() {
    await this.activityTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForTransactionsList() {
    await this.page.waitForSelector(this.transactionsList, { timeout: 10000 });
  }

  async getTransactionCount(): Promise<number> {
    const transactions = await this.page.locator('[data-testid="transaction-list-item"]').count();
    return transactions;
  }

  async clickFirstTransaction() {
    await this.page.waitForSelector(this.firstTransaction);
    await this.page.click(this.firstTransaction);
  }

  async searchTransaction(searchTerm: string) {
    await this.page.fill(this.searchInput, searchTerm);
    await this.page.keyboard.press('Enter');
  }

  async clickFilterButton() {
    await this.filterButton.click();
  }

  async selectFilter(filterType: string) {
    await this.page.getByRole('option', { name: filterType }).click();
  }

  async isNoTransactionsMessageVisible(): Promise<boolean> {
    return await this.page.locator(this.noTransactionsMessage).isVisible();
  }

  async getFirstTransactionType(): Promise<string | null> {
    const typeLocator = this.page.locator(`${this.firstTransaction} [data-testid="transaction-type"]`);
    return await typeLocator.textContent();
  }

  async getFirstTransactionAmount(): Promise<string | null> {
    const amountLocator = this.page.locator(`${this.firstTransaction} [data-testid="transaction-amount"]`);
    return await amountLocator.textContent();
  }

  async waitForTransactionDetails() {
    await this.page.waitForSelector(this.transactionDetails, { timeout: 5000 });
  }
}
