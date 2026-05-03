"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  COVERS,
  YEARS,
  type SortKey,
  sortCovers,
} from "@/lib/covers";
import { Select } from "@/components/ui/select";
import { CoverCard } from "@/components/cover-card";
import { CoverLightbox } from "@/components/cover-lightbox";

export function CatalogShell() {
  const [sort, setSort] = useState<SortKey>("issue-asc");
  const [year, setYear] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number>(-1);

  const visible = useMemo(() => {
    const filtered =
      year === "all" ? COVERS : COVERS.filter((c) => String(c.year) === year);
    return sortCovers(filtered, sort);
  }, [sort, year]);

  const open = (i: number) => setLightbox(i);
  const close = () => setLightbox(-1);
  const step = (delta: number) => {
    if (visible.length === 0) return;
    setLightbox((current) =>
      current < 0
        ? current
        : (current + delta + visible.length) % visible.length
    );
  };

  return (
    <>
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[rgba(6,6,15,0.92)] border-b border-cyan-400/10 px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1
              className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-wider m-0 text-[var(--color-pink)] text-glow-pink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ZZAP!<span className="text-[var(--color-cyan)] text-glow-cyan">64</span>
            </h1>
            <p className="mt-1.5 text-[var(--color-muted)] text-lg uppercase tracking-wider">
              Cover Collection &mdash;{" "}
              <span className="text-[var(--color-yellow)]">{visible.length}</span>
              {visible.length !== COVERS.length && (
                <span className="text-[var(--color-muted)]"> / {COVERS.length}</span>
              )}{" "}
              issues
            </p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-5">
            <Select
              label="Sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="issue-asc">Issue ↑</option>
              <option value="issue-desc">Issue ↓</option>
              <option value="date-asc">Date ↑</option>
              <option value="date-desc">Date ↓</option>
            </Select>
            <Select
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="all">All</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-10 pt-7 pb-12">
        {visible.length === 0 ? (
          <p className="text-center text-[var(--color-muted)] text-xl py-12">
            No issues match this filter.
          </p>
        ) : (
          <motion.div
            layout
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((cover, i) => (
                <CoverCard
                  key={cover.file}
                  cover={cover}
                  index={i}
                  onOpen={open}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <footer className="px-4 sm:px-6 lg:px-10 py-6 text-center text-[var(--color-muted)] text-sm border-t border-cyan-400/10">
        Zzap!64 © Newsfield Publications / Europress — covers shown for archival /
        educational use.
      </footer>

      <CoverLightbox
        list={visible}
        index={lightbox}
        onClose={close}
        onStep={step}
      />
    </>
  );
}
