import { test, expect } from '@playwright/test';

test('all 5 tabs navigate correctly', async ({ page }) => {
  await page.goto('/');
  const tabNames = ['Chords', 'Explore', 'Patterns', 'Song', 'Transpose'];
  for (const tab of tabNames) {
    // data-tab values are lowercase
    const tabKey = tab.toLowerCase();
    await page.click(`button.tab[data-tab="${tabKey}"]`);
    // Active tab gets the "on" class
    await expect(page.locator(`button.tab[data-tab="${tabKey}"]`)).toHaveClass(/\bon\b/);
  }
});

test('tab panels show correct content per tab', async ({ page }) => {
  await page.goto('/');

  // Chords tab (default)
  await expect(page.locator('#panel-chords')).toBeVisible();

  // Explore
  await page.click('button.tab[data-tab="explore"]');
  await expect(page.locator('#panel-explore')).toBeVisible();

  // Patterns
  await page.click('button.tab[data-tab="patterns"]');
  await expect(page.locator('#panel-patterns')).toBeVisible();

  // Song
  await page.click('button.tab[data-tab="song"]');
  await expect(page.locator('#panel-song')).toBeVisible();

  // Transpose
  await page.click('button.tab[data-tab="transpose"]');
  await expect(page.locator('#panel-transpose')).toBeVisible();
});
