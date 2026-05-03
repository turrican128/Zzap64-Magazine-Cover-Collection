"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { type Cover, coverSrc } from "@/lib/covers";
import { Button } from "@/components/ui/button";

export function CoverLightbox({
  list,
  index,
  onClose,
  onStep,
}: {
  list: Cover[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const open = index >= 0 && index < list.length;
  const cover = open ? list[index] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onStep(-1);
      else if (e.key === "ArrowRight") onStep(1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, onStep]);

  return (
    <AnimatePresence>
      {open && cover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Cover viewer"
          className="fixed inset-0 z-50 bg-[rgba(2,2,8,0.96)] flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <Button
            variant="icon"
            size="icon"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="size-5" />
          </Button>

          <Button
            variant="icon"
            size="icon"
            aria-label="Previous cover"
            onClick={() => onStep(-1)}
            className="absolute left-5 top-1/2 -translate-y-1/2"
          >
            <ChevronLeft className="size-5" />
          </Button>

          <motion.figure
            key={cover.file}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="m-0 max-w-[min(92vw,1200px)] max-h-[92vh] flex flex-col items-center gap-2"
          >
            <img
              src={coverSrc(cover, "full")}
              alt={cover.label}
              className="max-w-full max-h-[82vh] border border-cyan-400/35 rounded-sm shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_40px_rgba(255,46,136,0.18)] bg-[#050510]"
            />
            <figcaption className="text-xl tracking-wider uppercase text-[var(--color-ink)]">
              <span className="text-[var(--color-pink)] mr-2">
                #{String(cover.issue).padStart(3, "0")}
              </span>
              <span className="text-[var(--color-cyan)]">
                {cover.month} {cover.year}
              </span>
            </figcaption>
          </motion.figure>

          <Button
            variant="icon"
            size="icon"
            aria-label="Next cover"
            onClick={() => onStep(1)}
            className="absolute right-5 top-1/2 -translate-y-1/2"
          >
            <ChevronRight className="size-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
