import { test, expect } from '@playwright/test';

test.describe('Sidebar persistence (I3-7)', () => {
  // On desktop (1280x800) the sidebar is part of the grid layout and always visible.
  // On mobile (390x844) it is a slide-in drawer opened via the hamburger button.

  test('desktop: sidebar stays visible while building a progression', async ({ page }) => {
    await page.goto('/');

    // On desktop, sidebar is always in the layout — verify it's visible
    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toBeVisible();

    // Set Major mode and pick G key
    await page.click('button.seg[data-v="major"]');
    await page.click('.kp:has-text("G")');

    // Sidebar should still be visible
    await expect(sidebar).toBeVisible();

    // Click a preset progression
    await page.click('#prog-chips button.chip:has-text("I — IV — V — I")');

    // Sidebar still visible after progression built
    await expect(sidebar).toBeVisible();

    // The chord section within the sidebar should be shown
    await expect(page.locator('#sb-chords')).toBeVisible();
  });

  test('desktop: sidebar chords section shows preset progression chips', async ({ page }) => {
    await page.goto('/');

    // On the Chords tab, sb-chords should be visible
    await expect(page.locator('#sb-chords')).toBeVisible();

    // Preset chips should be rendered
    const chips = page.locator('#prog-chips button.chip');
    await expect(chips.first()).toBeVisible();
  });

  test('desktop: sidebar switches section on tab change', async ({ page }) => {
    await page.goto('/');

    // Initially on Chords tab — sb-chords visible
    await expect(page.locator('#sb-chords')).toBeVisible();

    // Switch to Song tab
    await page.click('button.tab[data-tab="song"]');
    await expect(page.locator('#sb-song')).toBeVisible();
    await expect(page.locator('#sb-chords')).not.toBeVisible();

    // Switch back to Chords — sb-chords returns
    await page.click('button.tab[data-tab="chords"]');
    await expect(page.locator('#sb-chords')).toBeVisible();
  });

  // Mobile-only: hamburger / drawer behavior
  test('mobile: hamburger opens sidebar drawer', async ({ page, isMobile }) => {
    // Skip on desktop viewport where drawer mechanism is not active
    test.skip(!isMobile, 'drawer behavior only applies on mobile viewport');

    await page.goto('/');

    // On mobile, sidebar starts off-screen
    const sidebar = page.locator('#sidebar');
    await expect(sidebar).not.toHaveClass(/\bopen\b/);

    // Open via hamburger
    await page.click('#hamburger');
    await expect(sidebar).toHaveClass(/\bopen\b/);

    // Build a progression — sidebar should NOT auto-close during interaction
    await page.click('button.seg[data-v="major"]');
    await page.click('.kp:has-text("G")');
    await expect(sidebar).toHaveClass(/\bopen\b/);
  });
});
