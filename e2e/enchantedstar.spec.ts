import { test, expect } from "@playwright/test";

test("real user can log in", async ({ page }) => {
  test.skip(
    process.env.EMAIL === undefined || process.env.PASSWORD === undefined
  );

  const email = process.env.EMAIL ? process.env.EMAIL : "dummy_email_address";

  const password = process.env.PASSWORD
    ? process.env.PASSWORD
    : "dummy_password";

  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "log in" }).click();
  await page.getByRole("textbox", { name: "name@host.com" }).fill(email);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "submit" }).click();

  await expect(page).toHaveURL("/#");
  await expect(page.locator("#prelim")).toHaveText(
    /hello enchantedstarcouk@gmail.com/i
  );
  await expect(page).toHaveURL("/#");
});
