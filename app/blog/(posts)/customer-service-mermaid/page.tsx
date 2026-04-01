import { BlogPostTemplate, getBlogPostMetadata } from "@/app/blog/post-page-template";

export const dynamic = "force-static";

export async function generateMetadata() {
  return getBlogPostMetadata("customer-service-mermaid");
}

export default function Page() {
  return <BlogPostTemplate slug="customer-service-mermaid" />;
}
