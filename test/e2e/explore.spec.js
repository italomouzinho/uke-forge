import { test, expect } from '@playwright/test';

test.describe('Explore fretboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('button.tab[data-tab="explore"]');
    await expect(page.locator('#panel-explore')).toBeVisible();
  });

  test('fretboard renders SVG with clickable fret cells', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');
    await expect(container).toBeVisible();

    // There should be rect elements with role="button"
    const cells = container.locator('[role="button"][data-st][data-f]');
    // 4 strings × 13 positions (frets 0-12) = 52 cells
    expect(await cells.count()).toBeGreaterThan(0);
  });

  test('clicking a fret cell toggles it and updates chord analysis', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    // Initially "Awaiting input"
    await expect(page.locator('#exp-chord-name')).toContainText('Awaiting input');

    // Click a fret cell: string 0, fret 2
    const cell = container.locator('[data-st="0"][data-f="2"]');
    await cell.click();

    // After clicking, chord name should update (no longer "Awaiting input")
    const chordName = page.locator('#exp-chord-name');
    await expect(chordName).not.toContainText('Awaiting input');
  });

  test('only one fret cell has tabindex=0 at a time (roving tabindex)', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    // Count cells with tabindex="0"
    const focusableCells = container.locator('[role="button"][tabindex="0"]');
    await expect(focusableCells).toHaveCount(1);
  });

  test('ArrowRight key moves focus to next string', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    // Focus the initially-focused cell (tabindex=0)
    const focusedCell = container.locator('[role="button"][tabindex="0"]');
    await focusedCell.first().focus();

    // Get current string
    const stBefore = await focusedCell.first().getAttribute('data-st');

    // Press ArrowRight
    await page.keyboard.press('ArrowRight');

    // After navigation, still only one tabindex=0
    const newFocused = container.locator('[role="button"][tabindex="0"]');
    await expect(newFocused).toHaveCount(1);

    // String index should have increased (unless already at string 3)
    const stAfter = await newFocused.first().getAttribute('data-st');
    if (parseInt(stBefore) < 3) {
      expect(parseInt(stAfter)).toBe(parseInt(stBefore) + 1);
    }
  });

  test('Enter/Space on focused cell toggles aria-pressed', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    const focusedCell = container.locator('[role="button"][tabindex="0"]');
    await focusedCell.first().focus();

    const pressedBefore = await focusedCell.first().getAttribute('aria-pressed');

    // Press Enter to toggle
    await page.keyboard.press('Enter');

    await expect(focusedCell.first()).toHaveAttribute(
      'aria-pressed',
      pressedBefore === 'true' ? 'false' : 'true'
    );
  });
});
