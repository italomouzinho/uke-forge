import { test, expect } from '@playwright/test';

test.describe('Transpose regression pack (I3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('button.tab[data-tab="transpose"]');
    await expect(page.locator('#panel-transpose')).toBeVisible();
  });

  // Helper: fill input and click Transpose →
  async function transpose(page, text) {
    const input = page.locator('#tx-in');
    await input.fill(text);
    await page.click('button:has-text("Transpose →")');
  }

  // Helper: shift N semitones up by clicking "Shift up"
  async function shiftUp(page, semitones) {
    for (let i = 0; i < semitones; i++) {
      await page.click('button[aria-label="Shift up"]');
    }
  }

  test('I3-3: extended qualities Cmaj9, C13 transpose correctly (+2 st)', async ({ page }) => {
    // Shift up by 2 first, then fill + transpose
    await shiftUp(page, 2);
    await transpose(page, 'Cmaj9 C13');

    // txChord uses flat spellings; C +2 → D
    await expect(page.locator('#tx-out')).toContainText('Dmaj9');
    await expect(page.locator('#tx-out')).toContainText('D13');
  });

  test('I3-3: slash chords D/F# transpose correctly (+2 st)', async ({ page }) => {
    await shiftUp(page, 2);
    await transpose(page, 'D/F#');
    // D +2 = E, F# +2 = G# → displayed as Ab (txChord uses dispNote/flat)
    // D → E, F# → Ab (G#)
    await expect(page.locator('#tx-out')).toContainText('E/Ab');
  });

  test('I3-5: Roman numerals i and IV are not transposed (preserved as plain text)', async ({ page }) => {
    await shiftUp(page, 2);
    await transpose(page, 'i IV');

    // "i IV" is not a chord line (no A-G chord tokens), not PIMA → plain text, not transposed
    const outputText = await page.locator('#tx-out').textContent();
    expect(outputText).toContain('i');
    expect(outputText).toContain('IV');
  });

  test('I3-4: "A A A A" is recognized as chord line not PIMA', async ({ page }) => {
    await shiftUp(page, 2);
    await transpose(page, 'A A A A');

    // "A A A A" → isChordLine (100% chord tokens) → each A shifted +2 → B
    await expect(page.locator('#tx-out')).toContainText('B B B B');
  });

  test('I3-6: E minor key grid shows F# (not Gb) for the F#/Gb note', async ({ page }) => {
    // The Transpose UI itself uses txChord (always flat).
    // This test verifies key spelling in the Chords tab key grid instead,
    // which uses scaleNote(). Navigate there.
    await page.click('button.tab[data-tab="chords"]');

    // Default mode is Minor; click E in the key grid
    // Minor mode is default ('on' by default)
    await expect(page.locator('button.seg[data-v="minor"]')).toHaveClass(/\bon\b/);

    // Click E key
    await page.click('.kp:has-text("E")');

    // In E minor, the F#/Gb slot should display as F# (sharp preference)
    const keyButtons = page.locator('#key-grid .kp');
    const allTexts = await keyButtons.allTextContents();
    // Should contain F# but not Gb
    expect(allTexts).toContain('F#');
    expect(allTexts).not.toContain('Gb');
  });

  test('transpose output appears after clicking Transpose button', async ({ page }) => {
    await transpose(page, 'Am F C G');
    const output = page.locator('#tx-out');
    // The output div should no longer show the placeholder
    await expect(output).not.toContainText('Transposed chart will appear here');
    // It should contain transposed chord text
    const text = await output.textContent();
    expect(text).toBeTruthy();
  });

  test('shift display shows correct value', async ({ page }) => {
    await expect(page.locator('#st-box')).toContainText('0 st');
    await shiftUp(page, 3);
    await expect(page.locator('#st-box')).toContainText('+3 st');
  });
});
