import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const sourceRoot = fileURLToPath(new URL("../src/", import.meta.url));
const allowedExtensions = new Set([".astro", ".css", ".ts"]);
const violations = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (allowedExtensions.has(extname(entry.name))) files.push(path);
  }
  return files;
}

const files = await walk(sourceRoot);
for (const file of files) {
  const path = relative(root, file);
  const contents = await readFile(file, "utf8");
  const isTokens = path === "src/styles/tokens.css";
  const isGlobal = path === "src/styles/global.css";
  const isLayout = path === "src/layouts/BaseLayout.astro";

  if (!isTokens) {
    const colorPattern = /#[0-9a-f]{3,8}\b|(?:rgb|hsl)a?\(/gi;
    for (const match of contents.matchAll(colorPattern)) {
      if (isLayout && match[0].toLowerCase() === "#04112a") continue;
      violations.push(`${path}: raw color ${match[0]}`);
    }
  }

  if (!isTokens && !isGlobal && /font-family\s*:\s*["']/i.test(contents)) {
    violations.push(`${path}: literal font family`);
  }

  if (
    /<(?:BaseLayout|SiteHeader|SiteFooter|ProofBand|ProcessSteps|ResultsLedger|FinalCta)\b[^>]*\bvariant=/s.test(
      contents,
    )
  ) {
    violations.push(`${path}: deprecated design variant`);
  }

  if (path.startsWith("src/pages/") && path.endsWith(".astro")) {
    const isApi = path.startsWith("src/pages/api/");
    const delegatesToVersionPage =
      /import\s+\w+\s+from\s+["']@\/pages\/version-[2-5]\.astro["']/.test(
        contents,
      );
    const delegatesToShell =
      /<(?:BaseLayout|FinancingPage)\b/.test(contents) ||
      delegatesToVersionPage;
    if (!isApi && !delegatesToShell) {
      violations.push(`${path}: page does not use BaseLayout`);
    }

    const duplicatePrimitive =
      /^\s*\.(?:button|display|section-title|eyebrow|lede|surface-card|page-hero)(?:\W|$)/m;
    if (duplicatePrimitive.test(contents)) {
      violations.push(`${path}: duplicates a global design primitive`);
    }
  }
}

if (violations.length) {
  console.error("Brand system policy failed:\n");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log("Brand system policy passed.");
}
