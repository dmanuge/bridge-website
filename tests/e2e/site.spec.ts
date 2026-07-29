import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const productionRoutes = [
  { name: "home", path: "/" },
  { name: "hotel-financing", path: "/hotel-financing" },
  { name: "consumer-brands", path: "/consumer-brands" },
  { name: "success-stories", path: "/success-stories" },
  { name: "story-dog-sauce", path: "/success-stories/dog-sauce" },
  { name: "story-triumph-systems", path: "/success-stories/triumph-systems" },
  { name: "how-it-works", path: "/how-it-works" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
  { name: "not-found", path: "/does-not-exist" },
] as const;

test("production routes use the shared shell and are accessible", async ({
  page,
}) => {
  for (const route of productionRoutes) {
    await page.goto(route.path);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(
      page.locator("header").getByLabel("Bridge home"),
    ).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter(
        (violation) =>
          violation.impact === "serious" || violation.impact === "critical",
      ),
      `${route.path} has serious accessibility violations`,
    ).toEqual([]);
  }
});

test("canonical fonts, colors, and radii are applied", async ({ page }) => {
  await page.goto("/success-stories");

  const bodyFont = await page
    .locator("body")
    .evaluate((element) => getComputedStyle(element).fontFamily);
  const headingFont = await page
    .locator("main h1")
    .evaluate((element) => getComputedStyle(element).fontFamily);
  const transparentHeaderColor = await page
    .locator(".header")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  const cardRadius = await page
    .locator(".surface-card")
    .first()
    .evaluate((element) => getComputedStyle(element).borderRadius);

  expect(bodyFont).toContain("DM Sans");
  expect(headingFont).toContain("Source Serif 4");
  expect(transparentHeaderColor).toBe("rgba(0, 0, 0, 0)");
  expect(cardRadius).toBe("8px");

  await page.evaluate(() => window.scrollTo(0, 100));
  await expect(page.locator(".header")).toHaveAttribute(
    "data-scrolled",
    "true",
  );
  const scrolledHeaderColor = await page
    .locator(".header")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(scrolledHeaderColor).toBe("rgb(9, 25, 53)");
});

test("desktop and mobile navigation expose the same destinations", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(page.locator('.desktop-nav a[href="/about"]')).toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/success-stories/dog-sauce");
  await page.locator(".mobile-nav summary").click();
  const mobileNavigation = page.getByRole("navigation", {
    name: "Mobile navigation",
  });
  await expect(mobileNavigation).toBeVisible();
  await expect(
    mobileNavigation.getByRole("link", { name: "Success Stories" }),
  ).toHaveAttribute("aria-current", "page");
  await expect(
    mobileNavigation.getByRole("link", { name: "About" }),
  ).toBeVisible();
  await expect(
    mobileNavigation.getByRole("link", { name: "Get Started" }),
  ).toBeVisible();
});

test("production routes match visual baselines", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  test.skip(
    testInfo.project.name !== "chromium",
    "Visual baselines run once in Chromium.",
  );

  for (const viewport of [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    for (const route of productionRoutes) {
      await page.goto(route.path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(
        `${route.name}-${viewport.name}.png`,
        {
          animations: "disabled",
          fullPage: true,
          maxDiffPixelRatio: 0.01,
          timeout: 20_000,
        },
      );
    }
  }
});
