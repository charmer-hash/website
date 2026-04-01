import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import type { ReactNode } from "react";

import { CodeBlock } from "@/components/blog/code-block";
import { MermaidDiagram } from "@/components/blog/mermaid-diagram";
import { Button } from "@/components/ui/button";
import {
  formatBlogDate,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";

const surfaceClass =
  "border border-white/80 bg-white/78 shadow-[0_18px_44px_rgba(148,163,184,0.12)] backdrop-blur-sm";

export async function getBlogPostMetadata(slug: string): Promise<Metadata> {
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Gaoyuan",
    };
  }

  return {
    title: `${post.title} | Gaoyuan Blog`,
    description: post.description,
  };
}

export async function BlogPostTemplate({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <div className="py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_17rem] lg:gap-10">
        <article>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft className="size-4" />
            返回博客列表
          </Link>

          <header className={`mt-6 rounded-[1.75rem] p-6 sm:p-8 ${surfaceClass}`}>
            <div className="text-xs uppercase tracking-[0.24em] text-sky-700">
              {post.eyebrow} · {post.category}
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              {post.hero.kicker}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              {post.hero.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4" />
                {post.readingTime}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div
            className={`mt-8 rounded-[1.75rem] bg-white/82 p-6 sm:p-8 lg:p-10 xl:px-12 ${surfaceClass}`}
          >
            <div className="max-w-none space-y-5">
              {await MarkdownContent({ source: post.content })}
            </div>
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className={`rounded-[1.75rem] p-5 ${surfaceClass}`}>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Reading context
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p>这篇文章属于 {post.category} 主题。</p>
              <p>写法偏方法论拆解，适合和产品设计、工作流设计一起看。</p>
            </div>
          </div>

          <div className={`rounded-[1.75rem] p-5 ${surfaceClass}`}>
            <div className="text-xs uppercase tracking-[0.24em] text-slate-400">
              Continue reading
            </div>
            <div className="mt-4 space-y-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {relatedPost.category}
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-6 text-slate-950">
                    {relatedPost.title}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">
                    {relatedPost.excerpt}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-11 w-full rounded-full border-white/80 bg-white/78 text-slate-950 shadow-[0_12px_28px_rgba(148,163,184,0.12)] hover:bg-white"
          >
            <Link href="/blog">
              查看更多文章
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}

async function MarkdownContent({ source }: { source: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: (props) => (
          <h2
            className="mt-12 text-2xl font-semibold tracking-tight text-slate-950 first:mt-0"
            {...props}
          />
        ),
        p: (props) => (
          <p className="text-base leading-8 text-slate-700" {...props} />
        ),
        h3: (props) => (
          <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-950" {...props} />
        ),
        figure: ({ children, ...props }) => <figure {...props}>{children}</figure>,
        pre: ({ node }) => {
          const language = getNodeLanguage(node);
          const chart = getNodeText(node).trim();

          if (language === "mermaid" && chart) {
            return <MermaidDiagram chart={chart} />;
          }

          return (
            <CodeBlock code={chart} language={language} />
          );
        },
        code: ({ className, children, ...props }) => {
          if (className) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          return (
            <code
              className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800"
              {...props}
            >
              {children}
            </code>
          );
        },
        ul: (props) => <ul className="my-6 list-disc space-y-3 pl-6" {...props} />,
        ol: (props) => <ol className="my-6 list-decimal space-y-3 pl-6" {...props} />,
        li: (props) => (
          <li className="text-base leading-8 text-slate-700 marker:text-slate-400" {...props} />
        ),
        table: (props) => (
          <div className="my-8 overflow-x-auto rounded-[1.5rem] border border-slate-200/90 bg-white shadow-[0_14px_34px_rgba(148,163,184,0.08)]">
            <table
              className="min-w-full border-collapse text-left text-[0.92rem] leading-7 text-slate-700"
              {...props}
            />
          </div>
        ),
        thead: (props) => <thead className="bg-slate-50/90 text-slate-950" {...props} />,
        tbody: (props) => <tbody className="divide-y divide-slate-200" {...props} />,
        tr: (props) => <tr className="divide-x divide-slate-200" {...props} />,
        th: (props) => (
          <th
            className="px-5 py-4 text-[0.8rem] font-semibold tracking-[0.08em] text-slate-500 uppercase whitespace-nowrap"
            {...props}
          />
        ),
        td: (props) => <td className="px-5 py-4 align-top leading-7 text-slate-700" {...props} />,
        hr: (props) => <hr className="my-10 border-slate-200" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="my-8 border-l-2 border-sky-300 pl-5 text-base leading-8 text-slate-600"
            {...props}
          />
        ),
        strong: (props) => <strong className="font-semibold text-slate-950" {...props} />,
        a: (props) => (
          <a
            className="text-sky-700 underline decoration-sky-200 underline-offset-4"
            {...props}
          />
        ),
      }}
    >
      {source}
    </Markdown>
  );
}

function getNodeLanguage(node: unknown): string | null {
  if (!node || typeof node !== "object" || !("properties" in node)) {
    return null;
  }

  const properties = (node as { properties?: Record<string, unknown> }).properties;
  const directLanguage = properties?.["data-language"];

  if (typeof directLanguage === "string") {
    return directLanguage;
  }

  const className = properties?.className;

  if (typeof className === "string") {
    return getLanguageFromClassName(className);
  }

  if (Array.isArray(className)) {
    for (const item of className) {
      if (typeof item === "string") {
        const language = getLanguageFromClassName(item);

        if (language) {
          return language;
        }
      }
    }
  }

  if ("children" in node && Array.isArray((node as { children?: unknown[] }).children)) {
    for (const child of (node as { children: unknown[] }).children) {
      const childLanguage = getNodeLanguage(child);

      if (childLanguage) {
        return childLanguage;
      }
    }
  }

  return null;
}

function getNodeText(node: unknown): string {
  if (typeof node === "string") {
    return node;
  }

  if (!node || typeof node !== "object") {
    return "";
  }

  if ("value" in node && typeof (node as { value?: unknown }).value === "string") {
    return (node as { value: string }).value;
  }

  if ("children" in node && Array.isArray((node as { children?: unknown[] }).children)) {
    return (node as { children: unknown[] }).children.map(getNodeText).join("");
  }

  return "";
}

function getLanguageFromClassName(className: string) {
  const match = className.match(/(?:^|\s)language-([\w-]+)(?:\s|$)/);

  return match?.[1] ?? null;
}
