import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test/e2e',
  timeout: 30000,
  // 1 worker prevents port-3000 contention when running multiple Chrome instances
  workers: 1,
  use: {
    baseURL: 'http://localhost:3000',
    // Chromium pre-installed at /opt/pw-browsers/chromium
    launchOptions: {
      executablePath: '/opt/pw-browsers/chromium',
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
