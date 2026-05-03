"use client";

import { motion } from "framer-motion";
import { type Cover, coverSrc } from "@/lib/covers";

export function CoverCard({
  cover,
  index,
  onOpen,
}: {
  cover: Cover;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open ${cover.label}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group crt-bezel relative bg-[var(--color-panel)] border border-pink-500/20 rounded-lg p-3 pb-2 cursor-zoom-in shadow-[0_6px_22px_rgba(0,0,0,0.45)] transition-[border-color] duration-150 text-left hover:border-cyan-400 hover:[animation:crt-attract_1.6s_ease-in-out_infinite]"
    >
      <div className="relative overflow-hidden rounded-sm bg-[#050510] aspect-[71/100]">
        <img
          src={coverSrc(cover, "thumb")}
          alt={cover.label}
          loading="lazy"
          decoding="async"
          className="crt-img w-full h-full object-cover block transition-transform duration-200 group-hover:scale-[1.04] group-hover:[animation:rgb-split_1.8s_ease-in-out_infinite]"
          onError={(e) => {
            // Fallback to full-res if no thumbnail exists yet
            const img = e.currentTarget;
            if (!img.dataset.fallback) {
              img.dataset.fallback = "1";
              img.src = coverSrc(cover, "full");
            }
          }}
        />
        {/* Per-card scanlines: faint always, intensified on hover */}
        <div className="pointer-events-none absolute inset-0 scanlines opacity-30 group-hover:opacity-70 transition-opacity duration-200" />
        {/* Phosphor sheen sweep across on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 mix-blend-screen bg-[linear-gradient(115deg,transparent_45%,rgba(0,229,255,0.18)_50%,transparent_55%)] [background-size:250%_250%] [background-position:100%_0%] group-hover:[background-position:-50%_0%] [transition:background-position_900ms_ease,opacity_200ms_ease]" />
      </div>
      <div className="flex justify-between items-baseline mt-2 gap-2 text-base tracking-wide">
        <span className="text-[var(--color-pink)] font-bold group-hover:text-glow-pink transition-[text-shadow] duration-200">
          #{String(cover.issue).padStart(3, "0")}
        </span>
        <span className="text-[var(--color-cyan)] uppercase group-hover:text-glow-cyan transition-[text-shadow] duration-200">
          {cover.month} {cover.year}
        </span>
      </div>
    </motion.button>
  );
}
