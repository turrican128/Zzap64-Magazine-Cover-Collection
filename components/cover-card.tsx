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
      className="group relative bg-[var(--color-panel)] border border-pink-500/20 rounded-lg p-3 pb-2 cursor-zoom-in shadow-[0_6px_22px_rgba(0,0,0,0.45)] hover:border-cyan-400 hover:shadow-[0_0_0_1px_rgba(0,229,255,0.45),0_18px_40px_rgba(0,0,0,0.6),0_0_28px_rgba(255,46,136,0.18)] transition-[border-color,box-shadow] duration-150 text-left"
    >
      <div className="relative overflow-hidden rounded-sm bg-[#050510] aspect-[71/100]">
        <img
          src={coverSrc(cover, "thumb")}
          alt={cover.label}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover block transition-transform duration-200 group-hover:scale-[1.03]"
          onError={(e) => {
            // Fallback to full-res if no thumbnail exists yet
            const img = e.currentTarget;
            if (!img.dataset.fallback) {
              img.dataset.fallback = "1";
              img.src = coverSrc(cover, "full");
            }
          }}
        />
      </div>
      <div className="flex justify-between items-baseline mt-2 gap-2 text-base tracking-wide">
        <span className="text-[var(--color-pink)] font-bold">
          #{String(cover.issue).padStart(3, "0")}
        </span>
        <span className="text-[var(--color-cyan)] uppercase">
          {cover.month} {cover.year}
        </span>
      </div>
    </motion.button>
  );
}
