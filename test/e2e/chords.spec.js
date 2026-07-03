import { test, expect } from '@playwright/test';

test.describe('Chord progression builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Chords tab is default; ensure we're on it
    await expect(page.locator('button.tab[data-tab="chords"]')).toHaveClass(/\bon\b/);
  });

  test('key and mode selection updates key grid', async ({ page }) => {
    // Switch to Major mode
    await page.click('button.seg[data-v="major"]');
    await expect(page.locator('button.seg[data-v="major"]')).toHaveClass(/\bon\b/);

    // The key grid should still render 12 key buttons
    const keys = page.locator('#key-grid .kp');
    await expect(keys).toHaveCount(12);
  });

  test('selecting key and major preset builds chord progression', async ({ page }) => {
    // Switch to Major mode
    await page.click('button.seg[data-v="major"]');

    // Click the G key in the key grid
    // In major mode, G is displayed as "G" (no accidental)
    await page.click('.kp:has-text("G")');

    // Click the "I — IV — V — I" preset
    await page.click('#prog-chips button.chip:has-text("I — IV — V — I")');

    // The chord output area should appear (ch-empty hides, ch-out shows)
    await expect(page.locator('#ch-out')).toBeVisible();
    await expect(page.locator('#ch-empty')).not.toBeVisible();

    // Should show chord cards; G major I—IV—V—I gives G, C, D, G
    const cards = page.locator('#ch-out .cc');
    await expect(cards).toHaveCount(4);
    await expect(cards.first().locator('.cc-name')).toContainText('G');
  });

  test('preset progression chips exist for major and minor modes', async ({ page }) => {
    // Minor mode (default)
    const minorChips = page.locator('#prog-chips button.chip');
    await expect(minorChips).toHaveCount(5); // 5 minor presets

    // Major mode
    await page.click('button.seg[data-v="major"]');
    const majorChips = page.locator('#prog-chips button.chip');
    await expect(majorChips).toHaveCount(5); // 5 major presets
  });

  test('play button on chord card does not throw console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    // Build a progression first
    await page.click('button.seg[data-v="major"]');
    await page.click('.kp:has-text("G")');
    await page.click('#prog-chips button.chip:has-text("I — IV — V — I")');

    // Click play on the first chord card
    const playBtn = page.locator('#ch-out .cc .cc-play').first();
    await expect(playBtn).toBeVisible();
    await playBtn.click();

    // Allow time for audio context to initialize
    await page.waitForTimeout(200);
    expect(errors).toHaveLength(0);
  });
});
