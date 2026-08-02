import { mkdir } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const outputDir = new URL("../assets/generated/", import.meta.url);
const images = [
  "assets/images/two-doors/858ef286-b08c-4169-aeb2-55c1ee3b246e.png",
  "assets/images/two-doors/a04e0f5f-047c-49c2-88c5-4b4333acdd1d.png",
  "assets/images/two-doors/be69f9c1-7438-47e6-83c8-25ed034e13f0.png",
  "assets/images/two-doors/1f8217b8-4668-4789-b359-dfe0461e6373.png",
  "assets/images/two-doors/call_1svIn8t98wTq4Hha0anEes8i.png",
  "assets/images/two-doors/f7ac3e21-bdf0-4528-a15e-f2ca14a0c3ef.png",
  "assets/images/two-doors/3ae784ca-ec3e-4b88-ab0b-e22fecce574a.png",
  "assets/images/two-doors/e90ee696-420e-4909-bb0d-7ef91c7d0405.png",
  "assets/images/two-doors/95976158-986f-4d44-b7f6-c6be9b034dd7.png",
  "assets/images/two-doors/tapestry-hotel-left-half.png",
  "assets/images/two-doors/tapestry-retailer-right-half.png",
  "assets/images/two-doors/d48e5ee5-1662-4de3-8727-773851c125d8.png",
  "assets/images/two-doors/08bc4260-b224-4358-86ae-04c150a2b660.png",
  "assets/images/two-doors/0023710f-db6b-427c-8837-379c7fc76680.png",
  "assets/images/two-doors/474da058-2745-4afb-8806-daa0978c9263.png",
  "assets/images/two-doors/67d9c6af-e6fd-4cc9-a22a-095a6785b9da.png",
  "assets/images/two-doors/fedbca3a-7428-4a02-8837-a2ae17bab9ed.png",
  "assets/images/two-doors/two-doors-crane.jpg",
  "assets/images/two-doors/two-doors-ware.jpg",
  "assets/images/two-doors/two-doors-hotel2.jpg",
  "assets/images/two-doors/hotel-room-mediterranean-coded-tapestry.png",
  "assets/images/two-doors/two-doors-crane2.jpg",
  "assets/images/two-doors/two-doors-box.jpg",
  "assets/images/brand/hotel-construction-sunrise.png",
  "assets/images/brand/consumer-brand-operations.png",
  "assets/images/two-doors/c3594866-c5c8-4978-a189-dcab0bdae851.png",
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
