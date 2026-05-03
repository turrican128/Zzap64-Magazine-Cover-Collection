import { readdir, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "public", "covers");
const DST = path.join(SRC, "_thumbs");

const THUMB_WIDTH = 440; // 2x of ~220px CSS thumb for retina
const QUALITY = 78;

async function main() {
  if (!existsSync(SRC)) {
    console.error(`Source not found: ${SRC}`);
    process.exit(1);
  }
  await mkdir(DST, { recursive: true });

  const files = (await readdir(SRC)).filter(
    (f) => f.toLowerCase().endsWith(".jpg") && !f.startsWith("_")
  );
  console.log(`Found ${files.length} covers in ${SRC}`);

  let rendered = 0;
  let skipped = 0;
  let totalIn = 0;
  let totalOut = 0;
  const t0 = Date.now();

  for (const [i, file] of files.entries()) {
    const inPath = path.join(SRC, file);
    const outPath = path.join(DST, file);
    const inStat = await stat(inPath);
    totalIn += inStat.size;

    if (existsSync(outPath)) {
      const outStat = await stat(outPath);
      totalOut += outStat.size;
      skipped++;
      continue;
    }

    await sharp(inPath)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toFile(outPath);

    const outStat = await stat(outPath);
    totalOut += outStat.size;
    rendered++;
    console.log(
      `  [${String(i + 1).padStart(3)}/${files.length}] ${file}  ${(
        outStat.size / 1024
      ).toFixed(0)} KB`
    );
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const inMB = (totalIn / 1024 / 1024).toFixed(1);
  const outMB = (totalOut / 1024 / 1024).toFixed(1);
  console.log(
    `\nDone in ${elapsed}s. rendered=${rendered}, cached=${skipped}, full=${inMB} MB, thumbs=${outMB} MB`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
