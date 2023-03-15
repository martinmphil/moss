import { test, expect } from "@playwright/test";

test.describe("app root", () => {
  test("smoke test cf London school TDD", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/greenstem/i);
    await expect(page.locator("#crux")).toHaveText(/crux/i);
    await expect(page.locator("#emailAddr")).toHaveText(/emailAddr/i);
  });
});

// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
