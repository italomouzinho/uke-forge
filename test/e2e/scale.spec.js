import { test, expect } from '@playwright/test';

// ── Helper: check no horizontal overflow on the page body ──
async function assertNoHScroll(page, label) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow, `Horizontal scroll detected: ${label}`).toBe(false);
}

// ── Helper: navigate to a tab via JS — works at any viewport size.
//    On viewports ≤860px the header .tabs are hidden (display:none) so clicking
//    them times out; calling showTab() directly is the correct substitute.
async function switchTab(page, tab) {
  await page.evaluate((t) => showTab(t), tab);
}

// ── Helper: open the sidebar drawer and wait for the CSS animation (0.25s) to
//    finish before inspecting positions of sidebar elements.
async function openDrawerAndWait(page) {
  await page.click('#hamburger');
  // Wait until the sidebar's left edge is on-screen (transition finished)
  await page.waitForFunction(() => {
    const sb = document.getElementById('sidebar');
    return sb.getBoundingClientRect().left >= 0;
  });
}

// ── Helper: build a G-major I–IV–V–I progression and add it to the song.
//    On viewports ≤860px the sidebar is an off-screen drawer so sidebar
//    controls (key grid, mode segs, prog chips, perform-btn) cannot be
//    clicked via UI.  We drive them with JS so this helper works at any
//    viewport width.
async function buildAndAddToSong(page) {
  await switchTab(page, 'chords');

  // Set mode to Major via JS (mode segs live in the sidebar, off-screen on mobile/landscape)
  await page.evaluate(() => {
    const btn = document.querySelector('button.seg[data-v="major"]');
    if (btn) setMode('major', btn);
  });

  // Select the G key (key grid is also in the sidebar)
  await page.evaluate(() => {
    const gBtn = Array.from(document.querySelectorAll('.kp'))
      .find(b => b.textContent.trim() === 'G');
    if (gBtn) gBtn.click();
  });

  // Click the I–IV–V–I preset chip (also in the sidebar)
  await page.evaluate(() => {
    const chip = Array.from(document.querySelectorAll('#prog-chips button.chip'))
      .find(b => b.textContent.includes('I — IV — V — I'));
    if (chip) chip.click();
  });

  // Chord cards render in #ch-out inside <main> — visible at any viewport
  await expect(page.locator('#ch-out .cc')).toHaveCount(4);

  // "Add to song" is also inside <main>, so it is visible and clickable
  await page.click('button:has-text("Add to song")');
}

// ── 1.3× font-scale suite ──
// Uses 390×844 (portrait mobile) so we can test the mobile layout at enlarged text.
test.describe('Font scale 1.3×', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Simulate 1.3× font scale by increasing document font size
    await page.addStyleTag({ content: 'html { font-size: 130% !important; }' });
  });

  test('Chords tab: no horizontal scroll at 1.3× font scale', async ({ page }) => {
    await switchTab(page, 'chords');
    await assertNoHScroll(page, 'Chords tab at 130%');
  });

  test('Chords tab: key grid accessible in drawer at 1.3× scale', async ({ page }) => {
    // On mobile (390px) the key grid lives in the sidebar drawer.
    // Open the drawer and verify the kp buttons are rendered and have an
    // adequate tap-target height even at enlarged text.
    await openDrawerAndWait(page);
    const buttons = page.locator('.kp');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    let visible = 0;
    for (let i = 0; i < count; i++) {
      const box = await buttons.nth(i).boundingBox();
      if (!box) continue;
      visible++;
      // Tap-target height must stay usable even at 1.3× font scale
      expect(box.height, `kp button ${i} too short at 130% scale`).toBeGreaterThan(30);
    }
    // At least some kp buttons must be rendered and accessible
    expect(visible, 'No kp buttons visible in open drawer at 130% scale').toBeGreaterThan(0);
  });

  test('Song tab: no horizontal scroll at 1.3× font scale', async ({ page }) => {
    await switchTab(page, 'song');
    await assertNoHScroll(page, 'Song tab at 130%');
  });

  test('Explore tab: no horizontal scroll at 1.3× font scale', async ({ page }) => {
    await switchTab(page, 'explore');
    await assertNoHScroll(page, 'Explore tab at 130%');
  });

  test('Transpose tab: no horizontal scroll at 1.3× font scale', async ({ page }) => {
    await switchTab(page, 'transpose');
    await assertNoHScroll(page, 'Transpose tab at 130%');
  });

  test('Navigation controls are reachable at 1.3× scale', async ({ page }) => {
    // On ≤860px viewports the header .tabs row is display:none; navigation is
    // the hamburger + drawer chips. Verify the hamburger is tall enough to tap.
    const hamburger = page.locator('#hamburger');
    const hBox = await hamburger.boundingBox();
    expect(hBox).not.toBeNull();
    if (hBox) {
      expect(hBox.height, 'hamburger too small at 130% scale').toBeGreaterThan(24);
    }

    // Open the drawer and verify each navigation chip is a comfortable tap target
    await openDrawerAndWait(page);
    const chips = page.locator('#sidebar .chip');
    const count = await chips.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const box = await chips.nth(i).boundingBox();
      if (!box) continue;
      expect(box.height, `sidebar chip ${i} too small at 130% scale`).toBeGreaterThan(24);
    }
  });
});

// ── Landscape orientation suite ──
test.describe('Landscape orientation (844×390)', () => {
  test.use({ viewport: { width: 844, height: 390 } });

  test('App renders without horizontal scroll in landscape', async ({ page }) => {
    await page.goto('/');
    await assertNoHScroll(page, 'landscape default');
  });

  test('Performance overlay is usable in landscape', async ({ page }) => {
    await page.goto('/');
    await buildAndAddToSong(page);

    // Navigate to Song tab
    await switchTab(page, 'song');
    await expect(page.locator('#song-list')).not.toBeEmpty();

    // At 844px (≤860px breakpoint) the perform-btn lives in the sidebar drawer.
    // Call startPerformance() via JS rather than trying to click an off-screen button.
    await page.evaluate(() => startPerformance());
    const overlay = page.locator('#perf-overlay');
    await expect(overlay).toBeVisible();

    // Overlay must not cause horizontal scroll
    await assertNoHScroll(page, 'perf overlay in landscape');

    // Overlay should fill the landscape screen (position:fixed;inset:0)
    const box = await overlay.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThan(700);  // fills 844px width
      expect(box.height).toBeGreaterThan(300); // fills 390px height
    }

    // Exit performance mode via the visible Exit button inside the overlay
    await page.click('button:has-text("Exit")');
    await expect(overlay).not.toBeVisible();
  });

  test('Chord tab renders without horizontal scroll in landscape', async ({ page }) => {
    await page.goto('/');
    await switchTab(page, 'chords');
    await assertNoHScroll(page, 'Chords tab landscape');
  });

  test('No clipped header in landscape', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    const box = await header.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      // Header should span the full landscape width
      expect(box.width).toBeGreaterThan(700);
      // Header must sit at the top and not consume more than 100px
      expect(box.y + box.height).toBeLessThan(100);
    }
  });
});
