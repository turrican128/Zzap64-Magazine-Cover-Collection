"""Extract page 1 of every Zzap!64 PDF as a 200 DPI JPG and write a manifest."""
import json
import pathlib
import re
import sys
import time

import fitz  # PyMuPDF

SRC = pathlib.Path(r"C:\Temp\zzap1")
DST = pathlib.Path(r"c:\Claude Workspace\Zzap!64 Magazine Cover Collection")
COVERS_DIR = DST / "covers"
ASSETS_DIR = DST / "assets"
DPI = 200
JPEG_QUALITY = 88

MONTHS = {
    "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
    "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12,
}
# Seasonal special issues — map to a representative month for date-sorting,
# but display the original season name in the label.
SEASONS = {"Spring": 4, "Summer": 7, "Autumn": 10, "Winter": 1}

NAME_RE = re.compile(r"Zzap(\d{3})-([A-Z][a-z]+)(\d{2})")


def extract_one(pdf_path: pathlib.Path, out_path: pathlib.Path) -> None:
    with fitz.open(pdf_path) as doc:
        page = doc[0]
        pix = page.get_pixmap(dpi=DPI)
        pix.pil_save(out_path, format="JPEG", quality=JPEG_QUALITY, optimize=True)


def main() -> int:
    if not SRC.is_dir():
        print(f"ERROR: source directory not found: {SRC}", file=sys.stderr)
        return 1
    COVERS_DIR.mkdir(parents=True, exist_ok=True)
    ASSETS_DIR.mkdir(parents=True, exist_ok=True)

    pdfs = sorted(SRC.glob("Zzap*.pdf"))
    print(f"Found {len(pdfs)} PDFs in {SRC}")

    manifest = []
    skipped_unparsed = []
    rendered = 0
    cached = 0
    t0 = time.time()

    for i, pdf in enumerate(pdfs, 1):
        m = NAME_RE.match(pdf.stem)
        if not m:
            skipped_unparsed.append(pdf.name)
            print(f"  [{i:3d}/{len(pdfs)}] SKIP (filename did not match): {pdf.name}")
            continue
        issue = int(m.group(1))
        mon = m.group(2)
        if mon in MONTHS:
            month_num = MONTHS[mon]
        elif mon in SEASONS:
            month_num = SEASONS[mon]
        else:
            skipped_unparsed.append(pdf.name)
            print(f"  [{i:3d}/{len(pdfs)}] SKIP (unknown month '{mon}'): {pdf.name}")
            continue
        yy = int(m.group(3))
        year = 1900 + yy if yy >= 85 else 2000 + yy

        out = COVERS_DIR / f"{pdf.stem}.jpg"
        if out.exists():
            cached += 1
            print(f"  [{i:3d}/{len(pdfs)}] cached  {out.name}")
        else:
            try:
                extract_one(pdf, out)
                rendered += 1
                size_kb = out.stat().st_size // 1024
                print(f"  [{i:3d}/{len(pdfs)}] render  {out.name}  ({size_kb} KB)")
            except Exception as e:  # pragma: no cover - defensive
                print(f"  [{i:3d}/{len(pdfs)}] FAIL    {pdf.name}: {e}", file=sys.stderr)
                continue

        manifest.append({
            "issue": issue,
            "month": mon,
            "year": year,
            "monthNum": month_num,
            "file": out.name,
            "label": f"#{issue:03d} — {mon} {year}",
        })

    manifest.sort(key=lambda r: r["issue"])

    (DST / "covers.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    js_payload = "const COVERS = " + json.dumps(manifest, ensure_ascii=False) + ";\n"
    (ASSETS_DIR / "covers.js").write_text(js_payload, encoding="utf-8")

    elapsed = time.time() - t0
    print()
    print(f"Done in {elapsed:.1f}s. rendered={rendered}, cached={cached}, "
          f"manifest entries={len(manifest)}, unparsed={len(skipped_unparsed)}")
    if skipped_unparsed:
        print("Unparsed filenames:")
        for n in skipped_unparsed:
            print(f"  - {n}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
