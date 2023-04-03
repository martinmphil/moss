import { test, expect } from "@playwright/test";

test("catalog loads", async ({ page }) => {
  await page.route(
    "https://5jjaawclpd.execute-api.eu-west-1.amazonaws.com/candidate-email",
    async (route) => {
      const json = { body: "dummy_email" };
      await route.fulfill({ json });
    }
  );
  await page.route(
    "https://5jjaawclpd.execute-api.eu-west-1.amazonaws.com/catalog",
    async (route) => {
      const json = { body: "dummy_catalog" };
      await route.fulfill({ json });
    }
  );
  await page.goto(
    "/#id_token=dummy_id_token.abc.&access_token=dummy_access_token.abc.123&expires_in=72000&token_type=Bearer"
  );
  await expect(page).toHaveURL("/#");
  await expect(page.locator("#greeting")).toHaveText(/dummy_email/i);
  await expect(page.locator("#crux")).toHaveText(/dummy_catalog/i);
});

test("catalog server error", async ({ page }) => {
  await page.route(
    "https://5jjaawclpd.execute-api.eu-west-1.amazonaws.com/candidate-email",
    async (route) => {
      const json = { body: "dummy_email" };
      await route.fulfill({ json });
    }
  );
  await page.route(
    "https://5jjaawclpd.execute-api.eu-west-1.amazonaws.com/catalog",
    async (route) => {
      const json = { message: "Internal Server Error" };
      await route.fulfill({ json });
    }
  );
  await page.goto(
    "/#id_token=dummy_id_token.abc.&access_token=dummy_access_token.abc.123&expires_in=72000&token_type=Bearer"
  );
  await expect(page).toHaveURL("/#");
  await expect(page.locator("#greeting")).toHaveText(/dummy_email/i);
  await expect(page.locator("#crux")).toHaveText(
    /please report a fault occured.*:.*:/i
  );
  await page.getByRole("link", { name: "Reload app" }).click();
  await expect(page.getByRole("link", { name: "log in" })).toHaveAttribute(
    "href",
    /https:\/\/greenstem-oak.auth.eu-west-1.amazoncognito.com\/login\?client_id=436e4o5lvauijk8o366vus7k1v&response_type=token&redirect_uri=/i
  );
});
