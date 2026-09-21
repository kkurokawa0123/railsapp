import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// console.log("BASE_URL:", process.env.BASE_URL);

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  timeout: 150_000,

  expect: {
    timeout: 5_000,
  },

  fullyParallel: false,
  workers: 1,
  retries: 0,

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:8000",

    browserName: "chromium",
    headless: false,
    launchOptions: {
      slowMo: 1000,
    },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
