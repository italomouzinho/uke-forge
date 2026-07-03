import { test, expect } from '@playwright/test';

test.describe('Keyboard navigation (I3-8)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('button.tab[data-tab="explore"]');
    await expect(page.locator('#panel-explore')).toBeVisible();
  });

  test('roving tabindex: only one fret cell has tabindex=0', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');
    const cells = container.locator('[role="button"][data-st][data-f]');

    // Collect all tabindex values
    const tabindices = await cells.evaluateAll(els =>
      els.map(el => el.getAttribute('tabindex'))
    );

    // Exactly one should be "0"
    const focusable = tabindices.filter(t => t === '0');
    expect(focusable).toHaveLength(1);

    // All others should be "-1"
    const unfocusable = tabindices.filter(t => t === '-1');
    expect(unfocusable.length).toBe(tabindices.length - 1);
  });

  test('ArrowRight moves focus to next string', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    // Focus the currently-focusable cell
    const focused = container.locator('[role="button"][tabindex="0"]');
    const stBefore = parseInt(await focused.getAttribute('data-st'));

    await focused.focus();
    await page.keyboard.press('ArrowRight');

    // Re-query focused element
    const newFocused = container.locator('[role="button"][tabindex="0"]');
    const stAfter = parseInt(await newFocused.getAttribute('data-st'));

    if (stBefore < 3) {
      expect(stAfter).toBe(stBefore + 1);
    } else {
      // At rightmost string, stays at 3
      expect(stAfter).toBe(3);
    }
  });

  test('ArrowDown moves focus to next fret', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    const focused = container.locator('[role="button"][tabindex="0"]');
    const fBefore = parseInt(await focused.getAttribute('data-f'));

    await focused.focus();
    await page.keyboard.press('ArrowDown');

    const newFocused = container.locator('[role="button"][tabindex="0"]');
    const fAfter = parseInt(await newFocused.getAttribute('data-f'));

    if (fBefore < 12) {
      expect(fAfter).toBe(fBefore + 1);
    } else {
      expect(fAfter).toBe(12);
    }
  });

  test('Enter on focused cell toggles aria-pressed and updates chord', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    const focused = container.locator('[role="button"][tabindex="0"]');
    await focused.focus();

    const pressedBefore = await focused.getAttribute('aria-pressed');
    expect(pressedBefore).toBe('false'); // starts unselected

    // Press Enter to toggle on
    await page.keyboard.press('Enter');

    // Verify toggle
    const pressedAfter = await focused.getAttribute('aria-pressed');
    expect(pressedAfter).toBe('true');

    // Chord name should update from "Awaiting input"
    await expect(page.locator('#exp-chord-name')).not.toContainText('Awaiting input');
  });

  test('Space on focused cell toggles aria-pressed', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    const focused = container.locator('[role="button"][tabindex="0"]');
    await focused.focus();

    const pressedBefore = await focused.getAttribute('aria-pressed');

    await page.keyboard.press('Space');

    const pressedAfter = await focused.getAttribute('aria-pressed');
    expect(pressedAfter).toBe(pressedBefore === 'true' ? 'false' : 'true');
  });

  test('ArrowLeft moves focus to previous string', async ({ page }) => {
    const container = page.locator('#exp-fretboard-container');

    // First navigate right to ensure we're not at leftmost string
    const focused = container.locator('[role="button"][tabindex="0"]');
    await focused.focus();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    const afterRight = container.locator('[role="button"][tabindex="0"]');
    const stMid = parseInt(await afterRight.getAttribute('data-st'));

    await page.keyboard.press('ArrowLeft');

    const afterLeft = container.locator('[role="button"][tabindex="0"]');
    const stFinal = parseInt(await afterLeft.getAttribute('data-st'));

    if (stMid > 0) {
      expect(stFinal).toBe(stMid - 1);
    } else {
      expect(stFinal).toBe(0);
    }
  });
});
