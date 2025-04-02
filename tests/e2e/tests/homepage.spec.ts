import { test, expect, Page } from '@playwright/test';

test('Verify homepage loads correctly', async ({ page }: { page: Page }) => {
  await page.goto('https://opensea.io');
  await expect(page).toHaveTitle(/OpenSea/i);
});

test.describe('Smoke Tests', () => {
  test('Basic homepage test', async ({ page }: { page: Page }) => {
    await page.goto('https://opensea.io');
    await expect(page).toHaveTitle(/OpenSea/i);
  });
});

test.skip('Advanced feature test', async ({ page }: { page: Page }) => {
  await page.goto('https://opensea.io');
  await expect(page.locator('.feature')).toBeVisible();
});
