import { BlogPostCard } from "./blog-post-card";
// import { AnimateIn } from "@/components/animate-in";

interface BlogPostDisplayProps {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
  };
}

interface AnimatedBlogListProps {
  posts: BlogPostDisplayProps[];
}

export function AnimatedBlogList({ posts }: AnimatedBlogListProps) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, index) => (
        // <AnimateIn key={post.slug} delay={index * 0.05}>
        <BlogPostCard
          key={post.slug}
          slug={post.slug}
          title={post.metadata.title}
          publishedAt={post.metadata.publishedAt}
          summary={post.metadata.summary}
        />
        // </AnimateIn>
      ))}
    </div>
  );
}
