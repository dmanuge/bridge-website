import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const sourceUrl = new URL(
  "../concepts/v10-two-doors-full.html",
  import.meta.url,
);
const outputUrl = new URL("../assets/images/two-doors/", import.meta.url);
const source = await readFile(sourceUrl, "utf8");
const assets = ["crane", "ware", "hotel2", "room", "crane2", "box"];

await mkdir(outputUrl, { recursive: true });

for (const name of assets) {
  const expression = new RegExp(
    `--ph-${name}:\\s*url\\("data:image/jpeg;base64,([^"]+)"\\)`,
  );
  const match = source.match(expression);

  if (!match?.[1]) {
    throw new Error(`Unable to find embedded Two Doors asset: ${name}`);
  }

  await writeFile(
    fileURLToPath(new URL(`two-doors-${name}.jpg`, outputUrl)),
    Buffer.from(match[1], "base64"),
  );
}

console.log(`Extracted ${assets.length} Two Doors reference images.`);
