import { expect, test, type Route } from "@playwright/test";

test("core visitor journey communicates positioning and hierarchy", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("climate-responsive");
  await expect(page.getByText("Architect · Designer · Founder · Researcher")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Studio COKA", exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Architecture leads. The wider work extends the impact.",
    }),
  ).toBeVisible();
});

test("primary navigation remains usable on mobile", async ({ page }) => {
  await page.goto("/");

  const menu = page.getByRole("button", { name: "Open navigation" });
  if (await menu.isVisible()) {
    const mobileNav = page.locator("#mobile-navigation");
    await expect(mobileNav).toHaveAttribute("aria-hidden", "true");

    await menu.click();
    await expect(mobileNav).toHaveAttribute("aria-hidden", "false");
    await expect(
      page
        .getByRole("navigation", { name: "Mobile navigation" })
        .getByRole("link", { name: "Work", exact: true }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(mobileNav).toHaveAttribute("aria-hidden", "true");
  }
});

test("enquiry form can complete a successful business conversion", async ({ page }) => {
  await page.route("**/api/enquiries", async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Thank you. Your enquiry has been sent." }),
    });
  });

  await page.goto("/");
  await page.getByRole("link", { name: /Invite Crystal to speak/ }).click();
  await expect(page.getByLabel("What would you like to discuss?")).toHaveValue(
    "Speaking engagement",
  );
  await page.getByLabel("Name").fill("Ada Example");
  await page.getByLabel("Email").fill("ada@example.com");
  await page
    .getByLabel("Tell us a little about the opportunity")
    .fill(
      "We are planning a climate-responsive hospitality project in Enugu and would like to discuss scope and timing.",
    );
  await page.getByRole("button", { name: "Send enquiry" }).click();

  await expect(page.getByRole("status")).toContainText("Thank you. Your enquiry has been sent.");
});

test("critical external destinations are real links", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /Visit Studio COKA/ }).first()).toHaveAttribute(
    "href",
    "https://studiocoka.com/",
  );
  await expect(page.getByRole("link", { name: /Follow Crystal's work/ })).toHaveAttribute(
    "href",
    "https://ng.linkedin.com/in/crystal-kizor",
  );
});
