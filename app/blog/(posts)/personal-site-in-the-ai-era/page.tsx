import { BlogPostTemplate, getBlogPostMetadata } from "@/app/blog/post-page-template";

export const dynamic = "force-static";

export async function generateMetadata() {
  return getBlogPostMetadata("personal-site-in-the-ai-era");
}

export default function Page() {
  return <BlogPostTemplate slug="personal-site-in-the-ai-era" />;
}
