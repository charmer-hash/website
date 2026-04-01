import { BlogPostTemplate, getBlogPostMetadata } from "@/app/blog/post-page-template";

export const dynamic = "force-static";

export async function generateMetadata() {
  return getBlogPostMetadata("from-prompt-to-product");
}

export default function Page() {
  return <BlogPostTemplate slug="from-prompt-to-product" />;
}
