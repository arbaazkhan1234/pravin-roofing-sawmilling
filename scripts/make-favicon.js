// One-off: crops just the roofline+window mark out of the full logo (not the
// "PRAVIN" wordmark, which is unreadable at favicon sizes), squares it up on
// a transparent canvas, and writes the icon files Next.js's app/ directory
// convention picks up automatically (icon.png, apple-icon.png) plus a
// hand-built favicon.ico for browsers that still request that path directly.
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = path.join(__dirname, "../public/images/logo.png");
const APP_DIR = path.join(__dirname, "../src/app");

// Region containing just the roof+window mark, excluding the wordmark below.
const CROP = { left: 70, top: 0, width: 816, height: 248 };

async function run() {
  const markSquareTransparent = await sharp(SRC)
    .extract(CROP)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // app/icon.png — Next.js auto-serves this as the site favicon <link>.
  await sharp(markSquareTransparent).toFile(path.join(APP_DIR, "icon.png"));

  // app/apple-icon.png — iOS home-screen bookmark icon. Solid bone
  // background instead of transparent, since iOS applies its own mask and
  // transparency there tends to look like a rendering glitch.
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: "#f5f1ea",
    },
  })
    .composite([{ input: markSquareTransparent, gravity: "center" }])
    .png()
    .toFile(path.join(APP_DIR, "apple-icon.png"));

  // favicon.ico — legacy path some browsers request directly regardless of
  // <link> tags. Modern ICO format allows embedding a PNG bitstream as-is;
  // build a minimal single-image ICO container by hand (sharp/libvips can't
  // write .ico itself).
  const icoSourcePng = await sharp(markSquareTransparent)
    .resize(48, 48)
    .png()
    .toBuffer();
  const ico = buildIco(icoSourcePng, 48, 48);
  fs.writeFileSync(path.join(APP_DIR, "favicon.ico"), ico);

  console.log("Wrote icon.png, apple-icon.png, favicon.ico");
}

function buildIco(pngBuffer, width, height) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(width === 256 ? 0 : width, 0);
  entry.writeUInt8(height === 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image data size
  entry.writeUInt32LE(6 + 16, 12); // offset to image data

  return Buffer.concat([header, entry, pngBuffer]);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
