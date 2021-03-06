// @ts-check
import { devices } from '@playwright/test';

const config = {
  // testDir: './tests/specs',
  // testMatch: 'post-meeting-page-full-material.js',
  // testMatch: 'post-meeting-page-NO-material.js',
  // testMatch: 'post-meeting-page-full-material-transitions.js',
  // testMatch: 'post-meeting-page-full-karaoke-mode.js',
  // testMatch: 'test.example.js',
  testMatch: 'simple-API-test.js',
  timeout: 300 * 1000,
  expect: {
    timeout: 5000
  },
  globalSetup: "./utils/global-setup",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
  workers: 1,
  reporter: 'html',
  use: {
    headless: false,
    actionTimeout: 0,
    storageState: './state.json',
    permissions: ['camera', 'microphone'],
    // baseURL: 'https://demo-ai-wi.lab.nordigy.ru/welcome',
    trace: 'on-first-retry',
    extraHTTPHeaders: {
    }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],
  outputDir: 'test-results/',
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
