# Zzap!64 Cover Collection

A static catalog of every cover from **Zzap!64**, the legendary British Commodore 64 games magazine (1985 – 1994 + a 2002 special). 107 issues, all front covers extracted at 200 DPI from the original PDFs and presented in a dark retro/arcade-styled grid with click-to-zoom, sort, year filter, and a CRT-flavored hover treatment.

> אוסף השערים של Zzap!64 — המגזין האגדי של קהילת הקומודור 64.
> ארכיון חזותי של עידן שנעלם, באסתטיקת קבינט הארקייד של התקופה.

## Features

- **107 covers** — every issue from #001 (May 1985) through #107 (Mar 2002), plus the Autumn 1993 special
- **CRT Bloom hover** — phosphor RGB split, scanline overlay, attract-mode pulsing bezel halo, sheen sweep
- **Page-wide CRT polish** — faint global scanlines, tired-neon `ZZAP!64` flicker, blinking `► PUSH START ◄` empty state
- **Sort** by issue number or release date (asc/desc)
- **Filter** by year (1985 – 1994, plus 2002)
- **Lightbox** with prev/next, keyboard navigation (← → Esc), click-outside-to-close
- **Hebrew "About" panel** with arcade dialogue-box frame (cyan double-stroke, pink offset, yellow corner brackets, notched title tag)
- **Lazy-loaded thumbnails** (~440 px JPGs at 6.4 MB total) for fast grid paint, full-res (~118 MB total) on lightbox open
- **Static export** — deploys anywhere; no server needed at runtime
- **Reduced-motion respected** — heavy ambient animations disable for users with `prefers-reduced-motion`

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, static export via `output: "export"`)
- [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/) via `@tailwindcss/postcss` + [`tw-animate-css`](https://www.npmjs.com/package/tw-animate-css)
- shadcn-style primitives (Button via [CVA](https://cva.style/), Select hand-rolled)
- [Framer Motion 12](https://motion.dev/) for layout, hover, and lightbox transitions
- [Lucide React](https://lucide.dev/) for icons
- [Sharp](https://sharp.pixelplumbing.com/) for thumbnail generation
- [PyMuPDF](https://pymupdf.readthedocs.io/) for cover extraction from source PDFs (Python side)

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Build a fully static site for deployment to Vercel / Netlify / any static host:

```bash
npm run build        # outputs ./out
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server with Turbopack on `:3000` |
| `npm run build` | Static export to `out/` (Vercel-ready) |
| `npm run start` | Run the production server (only meaningful for non-static deploys) |
| `npm run thumbs` | Generate 440 px JPG thumbnails into `public/covers/_thumbs/` (idempotent — skips files that already exist) |
| `npm run extract` | Run `extract_covers.py` against the source PDFs |

## Adding more issues

1. Drop new PDFs into `C:\Temp\zzap1\` (or edit `SRC` in `extract_covers.py`). Filename pattern: `Zzap{NNN}-{Mmm}{YY}.pdf` (e.g. `Zzap050-Aug88.pdf`). Seasonal names like `Autumn93` are also supported.
2. `pip install pymupdf` (one-time)
3. `npm run extract` — renders any missing covers to `public/covers/` and refreshes `covers.json`
4. `npm run thumbs` — generates new thumbnails for added covers
5. The catalog picks up new entries automatically via the typed manifest at `lib/covers.ts`

## Project structure

```
app/
  layout.tsx           # root HTML, font preloads
  page.tsx             # entry — renders <CatalogShell>
  globals.css          # Tailwind 4 @theme tokens + CRT keyframes/utilities
components/
  catalog-shell.tsx    # client component: sort/filter state, header, grid, lightbox
  cover-card.tsx       # animated cover card with CRT Bloom hover
  cover-lightbox.tsx   # full-screen modal with prev/next + keyboard nav
  about-panel.tsx      # Hebrew RTL "אודות האוסף" arcade dialogue box
  ui/
    button.tsx         # CVA-based button primitive
    select.tsx         # styled native <select> with chevron
lib/
  covers.ts            # typed manifest, sort/filter/coverSrc helpers
  utils.ts             # cn() helper (clsx + tailwind-merge)
public/
  covers/              # 107 full-resolution cover JPGs (~118 MB)
  covers/_thumbs/      # generated thumbnails (~6.4 MB)
scripts/
  generate-thumbs.mjs  # Sharp-based thumbnail builder
extract_covers.py      # PyMuPDF-based PDF cover extractor
covers.json            # machine-readable manifest (generated)
```

## Branches

| Branch | What it is |
|---|---|
| **`nextjs-migration`** | The current Next.js + Tailwind 4 + Framer Motion build with all features above. Active development branch. |
| **`main`** | Rollback safety net: the original vanilla HTML/CSS/JS catalog from before the migration. Functional, much smaller, opens via `file://`. Kept so any change can be reverted to a known-good baseline. |

To switch:

```bash
git checkout main                  # vanilla baseline; double-click index.html
git checkout nextjs-migration      # current build; npm run dev
```

## Credits

- **Zzap!64** © Newsfield Publications / Europress. Covers shown for archival and educational purposes.
- Source PDFs: [archive.org](https://archive.org/) and similar community archives.

## License

MIT for the catalog code (this repository's own source).
Magazine cover artwork remains the property of its respective rights holders.
