"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, children, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    return (
      <div className="inline-flex items-center gap-2">
        {label && (
          <label
            htmlFor={selectId}
            className="text-[var(--color-muted)] text-base uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "appearance-none bg-[var(--color-panel)] text-[var(--color-ink)]",
              "border border-cyan-400/35 rounded-md",
              "py-1.5 pl-2.5 pr-8 font-mono text-base tracking-wide cursor-pointer",
              "focus:outline-none focus:border-[var(--color-pink)] focus:ring-2 focus:ring-pink-500/25",
              "transition-colors",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 size-4 text-cyan-400"
            aria-hidden
          />
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
