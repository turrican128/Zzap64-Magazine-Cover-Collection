import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const THUMBS_DIR = path.join(ROOT, "public", "covers", "_thumbs");
const OUT = path.join(ROOT, "public", "og-image.jpg");

const W = 1200;
const H = 630;

const COVER_W = 130;
const COVER_H = 180;
const GAP = 10;

// Pick representative issues spread across the run.
const FEATURED_ISSUES = [1, 16, 32, 48, 64, 80, 96, 107];

async function main() {
  const files = await readdir(THUMBS_DIR);
  const featured = FEATURED_ISSUES.map((n) => {
    const prefix = `Zzap${String(n).padStart(3, "0")}-`;
    return files.find((f) => f.startsWith(prefix));
  }).filter(Boolean);

  if (featured.length === 0) {
    throw new Error(`No cover thumbnails found in ${THUMBS_DIR}. Run "npm run thumbs" first.`);
  }

  const rowWidth = featured.length * COVER_W + (featured.length - 1) * GAP;
  const rowX = Math.round((W - rowWidth) / 2);
  const rowY = H - COVER_H - 32;

  // Text + decoration overlay (top portion + accent lines)
  const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="scanlines" patternUnits="userSpaceOnUse" width="3" height="3">
      <rect width="3" height="2" fill="rgba(0,0,0,0)"/>
      <rect y="2" width="3" height="1" fill="rgba(0,0,0,0.18)"/>
    </pattern>
    <radialGradient id="haloPink" cx="20%" cy="0%" r="60%">
      <stop offset="0%" stop-color="#ff2e88" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ff2e88" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haloCyan" cx="100%" cy="10%" r="60%">
      <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#00e5ff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- ambient halos -->
  <rect width="${W}" height="${H}" fill="url(#haloPink)"/>
  <rect width="${W}" height="${H}" fill="url(#haloCyan)"/>

  <!-- title block -->
  <text x="${W / 2}" y="180" text-anchor="middle"
    font-family="Impact, 'Arial Black', 'Helvetica Neue', sans-serif"
    font-size="160" font-weight="900" letter-spacing="6"
    fill="#ff2e88" filter="url(#glow-pink)">ZZAP!64</text>

  <text x="${W / 2}" y="245" text-anchor="middle"
    font-family="Impact, 'Arial Black', sans-serif"
    font-size="50" font-weight="700" letter-spacing="14"
    fill="#00e5ff" filter="url(#glow-cyan)">COVER COLLECTION</text>

  <text x="${W / 2}" y="305" text-anchor="middle"
    font-family="'Courier New', Consolas, monospace"
    font-size="26" font-weight="700" letter-spacing="6"
    fill="#ffd400">107 ISSUES &#x2022; 1985 &#x2014; 2002</text>

  <!-- accent rules -->
  <line x1="220" y1="335" x2="${W - 220}" y2="335" stroke="#ff2e88" stroke-opacity="0.55" stroke-width="2"/>
  <line x1="220" y1="340" x2="${W - 220}" y2="340" stroke="#00e5ff" stroke-opacity="0.45" stroke-width="1"/>

  <!-- bottom-row scanlines overlay -->
  <rect x="0" y="${rowY - 12}" width="${W}" height="${COVER_H + 60}" fill="url(#scanlines)"/>

  <!-- corner brackets -->
  <g stroke="#ffd400" stroke-width="3" fill="none">
    <polyline points="32,32 32,72 72,32"/>
    <polyline points="${W - 32},32 ${W - 32},72 ${W - 72},32"/>
    <polyline points="32,${H - 32} 32,${H - 72} 72,${H - 32}"/>
    <polyline points="${W - 32},${H - 32} ${W - 32},${H - 72} ${W - 72},${H - 32}"/>
  </g>
</svg>
`.trim();

  // Resize each cover thumbnail to the row dimensions
  const coverComposites = await Promise.all(
    featured.map(async (file, i) => {
      const buf = await readFile(path.join(THUMBS_DIR, file));
      const resized = await sharp(buf)
        .resize(COVER_W, COVER_H, { fit: "cover", position: "top" })
        .toBuffer();
      return {
        input: resized,
        top: rowY,
        left: rowX + i * (COVER_W + GAP),
      };
    })
  );

  // Compose: dark base + cover row + text/decoration overlay
  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 10, g: 10, b: 20 }, // var(--color-bg)
    },
  })
    .composite([
      ...coverComposites,
      { input: Buffer.from(overlaySvg), top: 0, left: 0 },
    ])
    .jpeg({ quality: 92, progressive: true, mozjpeg: true })
    .toFile(OUT);

  console.log(`Generated ${path.relative(ROOT, OUT)} (1200x630, ${featured.length} covers)`);
  console.log(`Featured: ${featured.join(", ")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
