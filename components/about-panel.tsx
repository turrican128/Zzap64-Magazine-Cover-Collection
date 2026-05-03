export function AboutPanel() {
  return (
    <section
      dir="rtl"
      lang="he"
      aria-label="אודות האוסף"
      className="relative max-w-[640px] mx-auto mt-7 mb-2 px-4 sm:px-6"
    >
      <div
        className="relative bg-[var(--color-bg-2)]/85 border-2 border-cyan-400/70 px-6 py-5 text-[var(--color-ink)] text-base sm:text-lg leading-loose shadow-[inset_0_0_0_1px_rgba(0,229,255,0.4),4px_4px_0_rgba(255,46,136,0.55),0_0_28px_rgba(0,229,255,0.18)]"
        style={{ fontFamily: "var(--font-hebrew)" }}
      >
        {/* Notched title tag */}
        <span
          className="absolute -top-3.5 right-4 bg-[var(--color-bg)] px-3 py-0.5 text-[var(--color-yellow)] text-sm tracking-[0.18em] border border-yellow-400/70"
          style={{ fontFamily: "var(--font-hebrew)" }}
        >
          אודות האוסף
        </span>

        {/* Yellow corner brackets — Pip-Boy / terminal vibe */}
        <span
          aria-hidden
          className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[var(--color-yellow)]"
        />
        <span
          aria-hidden
          className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[var(--color-yellow)]"
        />
        <span
          aria-hidden
          className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[var(--color-yellow)]"
        />
        <span
          aria-hidden
          className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[var(--color-yellow)]"
        />

        <div className="space-y-1.5 text-pretty">
          <p>
            אוסף השערים של <span dir="ltr" className="text-[var(--color-pink)]">Zzap!64</span> — המגזין האגדי של קהילת הקומודור 64.
          </p>
          <p>יצא בבריטניה בין השנים 1985 ל-1994 וליווה את תור הזהב של משחקי המחשב הביתי.</p>
          <p>107 גליונות, כל שער חולץ ברזולוציה מלאה מקובץ ה-PDF המקורי של הגיליון.</p>
          <p>מטרת האתר: ארכיון חזותי של עידן שנעלם, באסתטיקת קבינט הארקייד של התקופה.</p>
          <p>לחצו על שער לצפייה מקרוב; מיינו לפי גליון או תאריך, סננו לפי שנה.</p>
        </div>
      </div>
    </section>
  );
}
