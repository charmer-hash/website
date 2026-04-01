"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

type CodeBlockProps = {
  children: ReactNode;
  code: string;
  language: string | null;
};

export function CodeBlock({ children, code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1600);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="my-8 overflow-hidden rounded-[1.45rem] border border-slate-200/90 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200/80 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(241,245,249,0.88))] px-4 py-3 sm:px-5">
        <div className="inline-flex min-w-0 items-center gap-2">
          <span className="size-2 rounded-full bg-sky-400" />
          <span className="size-2 rounded-full bg-cyan-300" />
          <span className="size-2 rounded-full bg-slate-300" />
          <span className="ml-2 truncate text-[0.72rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">
            {formatLanguage(language)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="bg-[radial-gradient(circle_at_top,rgba(224,242,254,0.55),transparent_24%),linear-gradient(180deg,#fbfdff_0%,#f8fbff_100%)]">
        {children}
      </div>
    </div>
  );
}

function formatLanguage(language: string | null) {
  if (!language) {
    return "TEXT";
  }

  const normalized = language.toLowerCase();

  if (normalized === "ts" || normalized === "tsx") {
    return normalized.toUpperCase();
  }

  if (normalized === "js" || normalized === "jsx") {
    return normalized.toUpperCase();
  }

  if (normalized === "bash" || normalized === "sh" || normalized === "shell") {
    return "SHELL";
  }

  return normalized.replace(/[-_]/g, " ").toUpperCase();
}
