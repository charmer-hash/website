"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TypingHeroProps = {
  text: string;
  speed?: number;
  className?: string;
};

export function TypingHero({
  text,
  speed = 55,
  className,
}: TypingHeroProps) {
  const [displayed, setDisplayed] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        setFinished(true);
      }
    }, speed);

    return () => {
      window.clearInterval(timer);
      setDisplayed("");
      setFinished(false);
    };
  }, [speed, text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      <span className="bg-gradient-to-r from-slate-950 via-slate-900 to-sky-700 bg-clip-text text-transparent [text-wrap:balance]">
        {displayed}
      </span>
      <motion.span
        aria-hidden="true"
        animate={
          finished
            ? { opacity: [1, 1, 0] }
            : { opacity: [1, 0, 1], scaleY: [1, 0.88, 1] }
        }
        transition={{
          duration: finished ? 0.6 : 0.82,
          repeat: finished ? 0 : Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: finished ? 0.35 : 0,
        }}
        className="ml-1 inline-block h-[0.92em] w-[0.08em] rounded-full bg-gradient-to-b from-sky-400 to-sky-600 align-[-0.08em] shadow-[0_0_12px_rgba(56,189,248,0.45)]"
      />
    </motion.div>
  );
}
