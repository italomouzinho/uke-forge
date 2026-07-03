import { test, expect } from '@playwright/test';

test.describe('Song builder + Performance mode', () => {
  // Build a progression and add it to the song before song-related tests
  async function buildAndAddToSong(page) {
    // Go to Chords tab
    await page.click('button.tab[data-tab="chords"]');
    // Set major mode and pick a key
    await page.click('button.seg[data-v="major"]');
    await page.click('.kp:has-text("G")');
    // Pick a preset
    await page.click('#prog-chips button.chip:has-text("I — IV — V — I")');
    // Wait for chord cards to appear
    await expect(page.locator('#ch-out .cc')).toHaveCount(4);
    // Click "+ Add to song" in the sidebar
    await page.click('button:has-text("Add to song")');
  }

  test('song tab is empty initially', async ({ page }) => {
    await page.goto('/');
    await page.click('button.tab[data-tab="song"]');
    await expect(page.locator('#song-empty')).toBeVisible();
    await expect(page.locator('#song-list')).toBeEmpty();
  });

  test('building a progression and adding to song creates a section', async ({ page }) => {
    await page.goto('/');
    await buildAndAddToSong(page);

    // Navigate to Song tab
    await page.click('button.tab[data-tab="song"]');

    // Empty message should be hidden, song list should have a section
    await expect(page.locator('#song-empty')).not.toBeVisible();
    await expect(page.locator('#song-list')).not.toBeEmpty();
  });

  test('Performance mode overlay appears and can be exited', async ({ page }) => {
    await page.goto('/');
    await buildAndAddToSong(page);

    // Navigate to Song tab
    await page.click('button.tab[data-tab="song"]');

    // Wait for section to appear
    await expect(page.locator('#song-list')).not.toBeEmpty();

    // Click Performance mode button
    await page.click('#perform-btn');

    // Overlay should be visible
    const overlay = page.locator('#perf-overlay');
    await expect(overlay).toBeVisible();

    // Exit performance mode
    await page.click('button:has-text("Exit")');
    await expect(overlay).not.toBeVisible();
  });

  test('Performance mode overlay shows chord cards', async ({ page }) => {
    await page.goto('/');
    await buildAndAddToSong(page);

    await page.click('button.tab[data-tab="song"]');
    await expect(page.locator('#song-list')).not.toBeEmpty();

    await page.click('#perform-btn');
    await expect(page.locator('#perf-overlay')).toBeVisible();

    // Chord cards should be displayed in perf view
    const perfChords = page.locator('#perf-chords .cc');
    await expect(perfChords).toHaveCount(4); // I—IV—V—I = 4 chords

    await page.click('button:has-text("Exit")');
  });

  test('Escape key exits performance mode', async ({ page }) => {
    await page.goto('/');
    await buildAndAddToSong(page);

    await page.click('button.tab[data-tab="song"]');
    await expect(page.locator('#song-list')).not.toBeEmpty();

    await page.click('#perform-btn');
    await expect(page.locator('#perf-overlay')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('#perf-overlay')).not.toBeVisible();
  });
});
