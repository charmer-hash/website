"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "animate" | "transition">;

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
  ...rest
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{
        duration: 0.72,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
