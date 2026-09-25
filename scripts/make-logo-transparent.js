// One-off: strips the near-white background out of the client-supplied
// logo.png (which is opaque RGBA, not actually transparent) so it can sit
// cleanly on any background — dark hero, nav scrim, or bone on scroll —
// without showing as a white box. Does not touch the logo's own colors.
const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "../public/images/logo.png");
const OUT = path.join(__dirname, "../public/images/logo-transparent.png");

const LOW = 195; // channel-min below this => fully opaque (real logo ink)
const HIGH = 245; // channel-min above this => fully transparent (background)

async function run() {
  const img = sharp(SRC).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const minChannel = Math.min(r, g, b);

    let alpha;
    if (minChannel <= LOW) alpha = 255;
    else if (minChannel >= HIGH) alpha = 0;
    else alpha = Math.round(255 * (1 - (minChannel - LOW) / (HIGH - LOW)));

    data[i + 3] = alpha;
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(OUT);

  console.log("wrote", OUT);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
