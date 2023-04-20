import { test, expect } from "@playwright/test";

const gatewayUrl = "https://0swp0tsvvj.execute-api.eu-west-1.amazonaws.com/";

test("initial mark up", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/candidate/i);
  await expect(page.locator("#prelim")).toHaveText(/ /i);
  await expect(page.locator("#crux")).toHaveText(/log in/i);
  await expect(page.getByRole("link", { name: "log in" })).toHaveAttribute(
    "href",
    /https:\/\/greenstem-oak.auth.eu-west-1.amazoncognito.com\/login\?client_id=/i
  );
});

test("successful fetch email and log out", async ({ page }) => {
  await page.route(gatewayUrl + "candidate-email", async (route) => {
    const json = { body: "dummy_email" };
    await route.fulfill({ json });
  });
  await page.goto(
    "/#id_token=dummy_id_token.abc.&access_token=dummy_access_token.abc.123&expires_in=72000&token_type=Bearer"
  );
  await expect(page).toHaveURL("/#");
  await expect(page.locator("#prelim")).toHaveText(/dummy_email/i);
  await page.getByRole("button", { name: "Log-out" }).click();
  await expect(page.locator("#prelim")).toHaveText(/ /i);
  await expect(page.locator("#crux")).toHaveText(/log in/i);
  await expect(page.getByRole("link", { name: "log in" })).toHaveAttribute(
    "href",
    /https:\/\/greenstem-oak.auth.eu-west-1.amazoncognito.com\/login\?client_id=/i
  );
});

test("unauthorised fetch email", async ({ page }) => {
  await page.route(gatewayUrl + "candidate-email", async (route) => {
    const json = { message: "Unauthorized" };
    await route.fulfill({ json });
  });
  await page.goto(
    "/#id_token=dummy_id_token.abc.&access_token=dummy_access_token.abc.123&expires_in=72000&token_type=Bearer"
  );
  await expect(page).toHaveURL("/#");
  await expect(page.locator("#prelim")).toHaveText(/ /i);
  await expect(page.locator("#crux")).toHaveText(
    /tell your administrator an error occurred.*:.*:/i
  );
  await page.getByRole("link", { name: "Reload app" }).click();
  await expect(page.getByRole("link", { name: "log in" })).toHaveAttribute(
    "href",
    /https:\/\/greenstem-oak.auth.eu-west-1.amazoncognito.com\/login\?client_id=/i
  );
});

test("empty fetch email", async ({ page }) => {
  await page.route(gatewayUrl + "candidate-email", async (route) => {
    const json = { body: "" };
    await route.fulfill({ json });
  });
  await page.goto(
    "/#id_token=dummy_id_token.abc.&access_token=dummy_access_token.abc.123&expires_in=72000&token_type=Bearer"
  );
  await expect(page).toHaveURL("/#");
  await expect(page.locator("#prelim")).toHaveText(/ /i);
  await expect(page.locator("#crux")).toHaveText(
    /tell your administrator an error occurred.*:.*:/i
  );
  await page.getByRole("link", { name: "Reload app" }).click();
  await expect(page.getByRole("link", { name: "log in" })).toHaveAttribute(
    "href",
    /https:\/\/greenstem-oak.auth.eu-west-1.amazoncognito.com\/login\?client_id=/i
  );
});
