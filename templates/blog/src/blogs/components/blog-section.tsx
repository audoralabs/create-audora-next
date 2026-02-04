import { getBlogPosts } from "@/blogs/data/mdx";
import { ViewAllLink } from "@/components/view-all-link";
import SectionHeading from "@/components/section-heading";
import { AnimatedBlogList } from "./animated-blog-list";

export function BlogSection() {
  const allBlogs = getBlogPosts();

  const sorted = [...allBlogs]
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 4);

  return (
    <section id="blog" className="pt-4 pb-2">
      <div className="container mx-auto mt-8 flex max-w-(--content-max-width) flex-col gap-6 px-4">
        <SectionHeading>Blogs</SectionHeading>
        {sorted.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <AnimatedBlogList posts={sorted} />
        )}
        <div className="flex justify-center pt-2">
          <ViewAllLink href="/blogs" />
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
