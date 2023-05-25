import { test, expect } from "@playwright/test";

const gatewayUrl = "https://jwdqdupcfi.execute-api.eu-west-1.amazonaws.com/";

test("listings loads", async ({ page }) => {
  await page.route(gatewayUrl + "candidate-email", async (route) => {
    const json = { body: "dummy_email" };
    await route.fulfill({ json });
  });
  await page.route(gatewayUrl + "listings", async (route) => {
    const json = { body: "dummy_listings" };
    await route.fulfill({ json });
  });
  await page.goto(
    "/#id_token=dummy_id_token.abc.&access_token=dummy_access_token.abc.123&expires_in=72000&token_type=Bearer"
  );
  await expect(page).toHaveURL("/#");
  await expect(page.locator("#prelim")).toHaveText(/dummy_email/i);
  await expect(page.locator("#crux")).toHaveText(/dummy_listings/i);
});

test("listings internal server error", async ({ page }) => {
  await page.route(gatewayUrl + "candidate-email", async (route) => {
    const json = { body: "dummy_email" };
    await route.fulfill({ json });
  });
  await page.route(gatewayUrl + "listings", async (route) => {
    const json = { message: "Internal Server Error" };
    await route.fulfill({ json });
  });
  await page.goto(
    "/#id_token=dummy_id_token.abc.&access_token=dummy_access_token.abc.123&expires_in=72000&token_type=Bearer"
  );
  await expect(page).toHaveURL("/#");
  await expect(page.locator("#prelim")).toHaveText(/dummy_email/i);
  await expect(page.locator("#crux")).toHaveText(
    /tell your administrator an error occurred.*:.*:/i
  );
  await page.getByRole("link", { name: "Reload app" }).click();
  await expect(page.getByRole("link", { name: "log in" })).toHaveAttribute(
    "href",
    /https:\/\/greenstem-oak.auth.eu-west-1.amazoncognito.com\/login\?.*client_id=/i
  );
});

test("listings databank error", async ({ page }) => {
  await page.route(gatewayUrl + "candidate-email", async (route) => {
    const json = { body: "dummy_email" };
    await route.fulfill({ json });
  });
  await page.route(gatewayUrl + "listings", async (route) => {
    const json = { error: "dummy error message" };
    await route.fulfill({ json });
  });

  await page.goto(
    "/#id_token=dummy_id_token.abc.&access_token=dummy_access_token.abc.123&expires_in=72000&token_type=Bearer"
  );
  await expect(page).toHaveURL("/#");
  await expect(page.locator("#prelim")).toHaveText(/dummy_email/i);
  await expect(page.locator("#crux")).toHaveText(
    /tell your administrator an error occurred.*:.*:/i
  );
  await page.getByRole("link", { name: "Reload app" }).click();
  await expect(page.getByRole("link", { name: "log in" })).toHaveAttribute(
    "href",
    /https:\/\/greenstem-oak.auth.eu-west-1.amazoncognito.com\/login\?.*client_id=/i
  );
});
