import { test, expect } from "@playwright/test";

test("initial mark up", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/candidate/i);
  await expect(page.locator("#greeting")).toHaveText(/Please wait.../i);
  await expect(page.locator("#crux")).toBeHidden();
});
