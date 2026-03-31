import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPostFrontmatter = {
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  eyebrow: string;
  featured?: boolean;
  tags: string[];
  accent: string;
  hero: {
    kicker: string;
    summary: string;
  };
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  content: string;
};

function getBlogFilePaths() {
  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => path.join(BLOG_CONTENT_DIR, fileName));
}

function isValidBlogFrontmatter(data: unknown): data is Record<string, unknown> {
  if (!data || typeof data !== "object") {
    return false;
  }

  const record = data as Record<string, unknown>;

  return [
    "title",
    "excerpt",
    "description",
    "readingTime",
    "category",
    "eyebrow",
    "accent",
  ].every((key) => record[key] != null);
}

function getCurrentDateString() {
  return new Date().toISOString().slice(0, 10);
}

function resolvePublishedAt(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();

    if (normalized === "today" || normalized === "now" || normalized === "current") {
      return getCurrentDateString();
    }

    if (normalized) {
      return value;
    }
  }

  return getCurrentDateString();
}

function parseBlogFile(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".md");

  if (!isValidBlogFrontmatter(data)) {
    return null;
  }

  const hero =
    data.hero && typeof data.hero === "object"
      ? (data.hero as Record<string, unknown>)
      : {};

  return {
    slug,
    title: String(data.title),
    excerpt: String(data.excerpt),
    description: String(data.description),
    publishedAt: resolvePublishedAt(data.publishedAt),
    readingTime: String(data.readingTime),
    category: String(data.category),
    eyebrow: String(data.eyebrow),
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
    accent: String(data.accent),
    hero: {
      kicker: String(hero.kicker ?? ""),
      summary: String(hero.summary ?? ""),
    },
    content: content.trim(),
  };
}

export function getAllPosts() {
  return getBlogFilePaths()
    .map(parseBlogFile)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPost() {
  return getAllPosts().find((post) => post.featured) ?? getAllPosts()[0];
}

export function getRelatedPosts(slug: string, limit = 2) {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
