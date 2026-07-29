import { chromium } from "@playwright/test";

const url = process.argv[2] ?? "http://127.0.0.1:4321";
const width = Number(process.argv[3] ?? 1440);
const height = Number(process.argv[4] ?? 1000);
const reference = url.includes("v10-two-doors-full");
const selectors = reference
  ? [
      ".b-hero",
      ".bx-statband",
      ".doors",
      ".succ",
      ".cream",
      ".doc",
      ".closing",
      ".bx-foot",
    ]
  : [
      ".two-doors",
      ".proof-band",
      ".doors-section",
      ".successes",
      ".process-section",
      ".documentary",
      ".final-cta",
      ".footer",
    ];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(url);
await page.evaluate(() => document.fonts.ready);

const report = await page.evaluate((items) => {
  const sections = Object.fromEntries(
    items.map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return [selector, null];
      const rect = element.getBoundingClientRect();
      return [
        selector,
        {
          top: Math.round(rect.top + scrollY),
          height: Math.round(rect.height),
          bottom: Math.round(rect.bottom + scrollY),
        },
      ];
    }),
  );
  const documentaryImage = document.querySelector(
    ".documentary__image img, .doc .prt",
  );
  const finalButton = document.querySelector(
    ".final-cta .button, .closing .go",
  );
  const disclosure = document.querySelector(".final-cta .disclosure");
  const header = document.querySelector(".header, .bx-nav");
  const logo = document.querySelector(".header .wordmark, .bx-nav .bx-logo");
  const heroHeading = document.querySelector(".door h2, .b-pan h2");
  const typography = Object.fromEntries(
    [
      ".door h2",
      ".door__amount",
      ".proof-band strong",
      ".b-pan h2",
      ".b-pan .bx-amt",
      ".bx-statband b",
    ].map((selector) => {
      const element = document.querySelector(selector);
      if (!element) return [selector, null];
      const style = getComputedStyle(element);
      return [
        selector,
        {
          family: style.fontFamily,
          size: style.fontSize,
          weight: style.fontWeight,
          style: style.fontStyle,
          opticalSizing: style.fontOpticalSizing,
          variationSettings: style.fontVariationSettings,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
        },
      ];
    }),
  );
  const details = Object.fromEntries(
    [
      ".doors-section__intro",
      ".path-door",
      ".ledger__header",
      ".ledger__row",
      ".process-card",
      ".process-section__copy",
      ".process",
      ".documentary__content",
      ".footer__grid",
      ".footer__brand",
      ".footer nav",
      ".footer__legal",
      ".doors .intro-line",
      ".doors .door",
      ".bx-tr",
      ".tcard",
      ".miles-wrap > div:first-child",
      ".bx-miles",
      ".doc .txt",
      ".bx-foot .cols",
      ".bx-foot .cols > div",
      ".bx-foot .fine",
    ].map((selector) => [
      selector,
      [...document.querySelectorAll(selector)].map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          top: Math.round(rect.top + scrollY),
          height: Math.round(rect.height),
          bottom: Math.round(rect.bottom + scrollY),
        };
      }),
    ]),
  );

  return {
    pageHeight: document.documentElement.scrollHeight,
    pageWidth: document.documentElement.scrollWidth,
    horizontalOverflow: [...document.querySelectorAll("body *")]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          selector:
            element.classList.length > 0
              ? `${element.tagName.toLowerCase()}.${[...element.classList].join(".")}`
              : element.tagName.toLowerCase(),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter(({ left, right }) => left < -1 || right > innerWidth + 1)
      .slice(0, 20),
    overflowOutsideLedger: [...document.querySelectorAll("body *")]
      .filter((element) => !element.closest(".ledger--two-doors"))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          selector:
            element.classList.length > 0
              ? `${element.tagName.toLowerCase()}.${[...element.classList].join(".")}`
              : element.tagName.toLowerCase(),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter(({ left, right }) => left < -1 || right > innerWidth + 1)
      .slice(0, 20),
    sections,
    documentaryImage: documentaryImage
      ? {
          currentSrc: documentaryImage.currentSrc,
          naturalWidth: documentaryImage.naturalWidth,
          height: Math.round(documentaryImage.getBoundingClientRect().height),
        }
      : null,
    finalButton: finalButton
      ? {
          background: getComputedStyle(finalButton).backgroundColor,
          display: getComputedStyle(finalButton).display,
        }
      : null,
    disclosure: disclosure
      ? {
          display: getComputedStyle(disclosure).display,
          height: Math.round(disclosure.getBoundingClientRect().height),
        }
      : null,
    typography,
    fonts: {
      sourceSerifLoaded:
        document.fonts.check('16px "Source Serif 4"') ||
        document.fonts.check('16px "Source Serif 4 Variable"'),
      dmSansLoaded: document.fonts.check('16px "DM Sans"'),
    },
    header:
      header && logo && heroHeading
        ? {
            position: getComputedStyle(header).position,
            background: getComputedStyle(header).backgroundColor,
            top: Math.round(header.getBoundingClientRect().top),
            logoLeft: Math.round(logo.getBoundingClientRect().left),
            heroTextLeft: Math.round(heroHeading.getBoundingClientRect().left),
          }
        : null,
    details,
  };
}, selectors);

await page.evaluate(() => scrollTo(0, 1200));
await page.waitForTimeout(100);
report.headerAfterScroll = await page.evaluate(() => {
  const header = document.querySelector(".header, .bx-nav");
  if (!header) return null;
  return {
    top: Math.round(header.getBoundingClientRect().top),
    position: getComputedStyle(header).position,
    background: getComputedStyle(header).backgroundColor,
  };
});

console.log(JSON.stringify(report, null, 2));
await browser.close();
