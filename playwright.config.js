import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'fs';

// Use the pre-installed binary when available (local dev); fall back to
// Playwright's own download location when running in CI after
// `npx playwright install chromium --with-deps`.
const LOCAL_CHROMIUM = '/opt/pw-browsers/chromium';

export default defineConfig({
  testDir: './test/e2e',
  timeout: 30000,
  // 1 worker prevents port-3000 contention when running multiple Chrome instances
  workers: 1,
  use: {
    baseURL: 'http://localhost:3000',
    launchOptions: {
      executablePath: existsSync(LOCAL_CHROMIUM) ? LOCAL_CHROMIUM : undefined,
    },
  },
  webServer: {
    // python3 -m http.server is reliable and has no external dependencies
    command: 'python3 -m http.server 3000',
    url: 'http://localhost:3000',
    // Never reuse to avoid stale servers from previous runs
    reuseExistingServer: false,
    timeout: 10000,
  },
  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile',
      use: {
        ...devices['iPhone 14'],
        viewport: { width: 390, height: 844 },
      },
    },
  ],
});
