# Zzap!64 Cover Collection — vanilla baseline

This is the original **vanilla HTML/CSS/JS** version of the catalog: no build step, opens directly via `file://`, kept as a rollback safety net.

> **For the current Next.js build with Tailwind 4, Framer Motion, CRT Bloom hover, and the Hebrew about-panel — see the [`nextjs-migration`](https://github.com/turrican128/Zzap64-Magazine-Cover-Collection/tree/nextjs-migration) branch.**

## What this branch contains

107 covers from Zzap!64 (the British Commodore 64 games magazine, 1985 – 1994 + a 2002 special), extracted at 200 DPI from the original PDFs, presented in a dark retro grid with click-to-zoom, sort, and year filter.

## Files

```
extract_covers.py       # PyMuPDF-based extractor (page 1 -> JPG)
covers/                 # 107 cover JPGs (~118 MB)
covers.json             # machine-readable manifest
index.html              # entry point — open directly in a browser
assets/
  style.css             # dark retro/arcade theme
  app.js                # grid render, lightbox, sort, year filter
  covers.js             # generated: const COVERS = [...]
```

## Run it

```
# Re-extract from PDFs (only needed if you have the source)
pip install pymupdf
python extract_covers.py

# View the catalog
# Just double-click index.html — works from file://, no server needed.
```

## Why this branch still exists

When the project moved to Next.js (see `nextjs-migration`), this baseline was kept on `main` so any change can be reverted to a known-good zero-dependency version with one command:

```
git checkout main
```

## Credits

Zzap!64 © Newsfield Publications / Europress. Covers shown for archival and educational purposes.
