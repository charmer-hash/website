"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type CodeBlockProps = {
  code: string;
  language: string | null;
};

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

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

  useEffect(() => {
    let active = true;
    const normalizedLanguage = normalizeLanguage(language);

    if (!normalizedLanguage) {
      setHighlightedCode(null);
      return () => {
        active = false;
      };
    }

    import("@speed-highlight/core")
      .then(({ highlightText }) =>
        highlightText(code, normalizedLanguage, false, { hideLineNumbers: true })
      )
      .then((result) => {
        if (!active) {
          return;
        }

        setHighlightedCode(result);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setHighlightedCode(null);
      });

    return () => {
      active = false;
    };
  }, [code, language]);

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
        <pre className="overflow-x-auto px-5 py-5 text-[0.92rem] leading-7 text-slate-800 sm:px-6">
          <code
            className="grid min-w-full font-mono text-[0.9rem] [word-break:normal] [&_.shj-syn-bool]:text-sky-700 [&_.shj-syn-class]:text-amber-700 [&_.shj-syn-cmnt]:text-slate-400 [&_.shj-syn-deleted]:text-rose-600 [&_.shj-syn-err]:text-rose-600 [&_.shj-syn-func]:text-violet-600 [&_.shj-syn-insert]:text-emerald-700 [&_.shj-syn-kwd]:text-rose-600 [&_.shj-syn-num]:text-blue-700 [&_.shj-syn-oper]:text-sky-700 [&_.shj-syn-section]:text-violet-600 [&_.shj-syn-str]:text-cyan-900 [&_.shj-syn-type]:text-sky-700 [&_.shj-syn-var]:text-blue-700"
            dangerouslySetInnerHTML={
              highlightedCode ? { __html: highlightedCode } : undefined
            }
          >
            {highlightedCode ? null : code}
          </code>
        </pre>
      </div>
    </div>
  );
}

type SupportedLanguage =
  | "bash"
  | "css"
  | "diff"
  | "html"
  | "js"
  | "json"
  | "md"
  | "plain"
  | "py"
  | "sql"
  | "toml"
  | "ts"
  | "yaml";

function normalizeLanguage(language: string | null): SupportedLanguage | null {
  if (!language) {
    return "plain";
  }

  switch (language.toLowerCase()) {
    case "js":
    case "jsx":
    case "javascript":
      return "js";
    case "ts":
    case "tsx":
    case "typescript":
      return "ts";
    case "bash":
    case "sh":
    case "shell":
    case "zsh":
      return "bash";
    case "html":
      return "html";
    case "css":
      return "css";
    case "json":
      return "json";
    case "sql":
      return "sql";
    case "md":
    case "mdx":
    case "markdown":
      return "md";
    case "yaml":
    case "yml":
      return "yaml";
    case "toml":
      return "toml";
    case "python":
    case "py":
      return "py";
    case "diff":
      return "diff";
    case "text":
    case "txt":
    case "plain":
      return "plain";
    default:
      return null;
  }
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
