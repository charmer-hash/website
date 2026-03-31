"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

type MermaidDiagramProps = {
  chart: string;
};

let mermaidInitialized = false;

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "neutral",
        fontFamily:
          '"Avenir Next","SF Pro Display","PingFang SC","Helvetica Neue",sans-serif',
      });
      mermaidInitialized = true;
    }

    let active = true;

    mermaid
      .render(`mermaid-${id}`, chart)
      .then(({ svg }) => {
        if (!active) {
          return;
        }

        setSvg(svg);
        setError(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setError(true);
      });

    return () => {
      active = false;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-[1.4rem] border border-slate-200 bg-slate-950 px-5 py-4 text-sm leading-7 text-slate-100 shadow-[0_16px_36px_rgba(15,23,42,0.12)]">
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div className="my-8 overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-4 shadow-[0_16px_36px_rgba(148,163,184,0.08)] sm:p-6">
      {svg ? (
        <div
          className="mermaid-diagram overflow-x-auto [&_svg]:h-auto [&_svg]:min-w-full [&_svg]:max-w-none [&_svg]:rounded-2xl [&_svg]:bg-white"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="flex min-h-52 items-center justify-center text-sm text-slate-400">
          Rendering diagram...
        </div>
      )}
    </div>
  );
}
