"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono uppercase tracking-wider transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-panel)] text-[var(--color-ink)] border border-cyan-400/35 hover:border-[var(--color-pink)] hover:bg-[var(--color-bg-2)]",
        ghost:
          "bg-transparent text-[var(--color-ink)] border border-cyan-400/30 hover:bg-[var(--color-pink)] hover:border-[var(--color-pink)] hover:text-white",
        icon:
          "bg-transparent text-[var(--color-ink)] border border-cyan-400/40 rounded-full hover:bg-[var(--color-pink)] hover:border-[var(--color-pink)] hover:text-white",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        icon: "h-11 w-11 p-0 text-xl",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
