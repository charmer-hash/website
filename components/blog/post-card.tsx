import Link from "next/link";

import { cn } from "@/lib/utils";
import { type BlogPost, formatBlogDate } from "@/lib/blog";

type PostCardProps = {
  post: BlogPost;
  featured?: boolean;
  className?: string;
};

export function PostCard({ post, featured = false, className }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/78 p-6 shadow-[0_18px_44px_rgba(148,163,184,0.12)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(148,163,184,0.16)]",
        featured && "min-h-[24rem] p-7 sm:min-h-[28rem] sm:p-8",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-45",
          post.accent,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.75),transparent_28%)]" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.24em] text-slate-500">
          <span>{post.eyebrow}</span>
          <span>{post.category}</span>
        </div>

        <div className="mt-8 space-y-4">
          <h2
            className={cn(
              "max-w-xl text-2xl font-semibold tracking-tight text-slate-950",
              featured && "text-3xl sm:text-4xl",
            )}
          >
            {post.title}
          </h2>
          <p
            className={cn(
              "max-w-2xl text-sm leading-7 text-slate-600 sm:text-base",
              featured && "max-w-xl text-base sm:text-lg",
            )}
          >
            {post.excerpt}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-10 text-sm text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-4 inline-flex items-center gap-2 font-medium text-slate-950 transition group-hover:translate-x-1">
            阅读全文
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
