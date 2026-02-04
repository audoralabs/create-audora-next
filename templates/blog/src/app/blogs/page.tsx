import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getBlogPosts } from "@/blogs/data/mdx";
import SectionHeading from "@/components/section-heading";
import { BlogPostCard } from "@/blogs/components/blog-post-card";

const POSTS_PER_PAGE = 10;

export const metadata = {
  title: "Blogs",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const allBlogs = getBlogPosts();

  const sorted = [...allBlogs].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  const totalPosts = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const rawPage = parseInt(params.page ?? "1", 10);
  const page = Math.max(
    1,
    Math.min(Number.isNaN(rawPage) ? 1 : rawPage, totalPages),
  );

  const start = (page - 1) * POSTS_PER_PAGE;
  const posts = sorted.slice(start, start + POSTS_PER_PAGE);

  return (
    <section className="py-4">
      <div className="container mx-auto mt-4 max-w-(--content-max-width) px-4">
        <SectionHeading>Blogs</SectionHeading>
        {totalPosts === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <BlogPostCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.metadata.title}
                  publishedAt={post.metadata.publishedAt}
                  summary={post.metadata.summary}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
                aria-label="Blog pagination"
              >
                <p className="text-sm text-muted-foreground">
                  Page{" "}
                  <span className="font-medium text-foreground">{page}</span> of{" "}
                  <span className="font-medium text-foreground">
                    {totalPages}
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  {page > 1 ? (
                    <Link
                      href={page === 2 ? "/blogs" : `/blogs?page=${page - 1}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/30 px-3 py-1.5 text-sm text-muted-foreground">
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </span>
                  )}
                  {page < totalPages ? (
                    <Link
                      href={`/blogs?page=${page + 1}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border/50 bg-muted/30 px-3 py-1.5 text-sm text-muted-foreground">
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
