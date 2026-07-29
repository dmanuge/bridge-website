import { mkdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const outputDir = new URL("../assets/generated/", import.meta.url);
const images = [
  "assets/images/two-doors/two-doors-crane.jpg",
  "assets/images/two-doors/two-doors-ware.jpg",
  "assets/images/two-doors/two-doors-hotel2.jpg",
  "assets/images/two-doors/two-doors-room.jpg",
  "assets/images/two-doors/two-doors-crane2.jpg",
  "assets/images/two-doors/two-doors-box.jpg",
  "assets/images/brand/hotel-construction-sunrise.png",
  "assets/images/brand/consumer-brand-operations.png",
  "assets/images/brand/customer-story-founder.png",
  "assets/images/wins/groundbreaking.png",
  "assets/images/wins/hampton-refi.png",
  "assets/images/wins/comfort-suites.png",
  "assets/images/wins/dog-sauce.png",
  "assets/images/wins/ice-cream.png",
  "assets/stories/triumph-hero-brand.png",
];
const widths = [480, 800, 1200, 1600];

await mkdir(outputDir, { recursive: true });

await Promise.all(
  images.flatMap((image) => {
    const input = fileURLToPath(new URL(image, root));
    const name = basename(image, extname(image));
    return widths.flatMap((width) => [
      sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(join(outputDir.pathname, `${name}-${width}.webp`)),
      sharp(input)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 52, effort: 5 })
        .toFile(join(outputDir.pathname, `${name}-${width}.avif`)),
    ]);
  }),
);

console.log(`Generated responsive variants for ${images.length} images.`);
