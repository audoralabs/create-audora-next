import { notFound } from "next/navigation";
import { CustomMDX } from "@/blogs/components/mdx";
import { getBlogPost, getBlogPosts } from "@/blogs/data/mdx";
import { extractHeadings } from "@/blogs/utils/extract-headings";
import { BlogTableOfContents } from "@/blogs/components/blog-table-of-contents";
import { formatDateDisplay } from "@/lib/utils";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";

const siteUrl = SITE_CONFIG.url.replace(/\/$/, "");

function resolveOgImage(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http")
    ? pathOrUrl
    : new URL(pathOrUrl, siteUrl).href;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `${siteUrl}${image}`
    : resolveOgImage(SITE_CONFIG.ogImage);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${siteUrl}/blogs/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Extract headings for table of contents
  const headings = extractHeadings(post.content);

  return (
    <section className="container mx-auto max-w-(--content-max-width) px-4 py-16">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${siteUrl}${post.metadata.image}`
              : resolveOgImage(SITE_CONFIG.ogImage),
            url: `${siteUrl}/blogs/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Narsi Bhati",
            },
          }),
        }}
      />

      {/* Blog content with TOC positioned outside on xl+ */}
      <div className="relative">
        {/* Main content - uses original max width */}
        <div className="max-w-(--content-max-width)">
          <h1 className="title max-w-[650px] text-4xl font-bold tracking-tighter">
            {post.metadata.title}
          </h1>
          <div className="mt-2 flex max-w-[650px] items-center justify-between text-sm">
            <p className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
              <Calendar className="h-4 w-4 shrink-0" />
              {formatDateDisplay(post.metadata.publishedAt)}
            </p>
          </div>
          {post.metadata.summary && (
            <div className="mt-4 mb-8 max-w-[650px]">
              <p className="border-l-2 border-neutral-300 pl-4 text-base leading-relaxed text-neutral-500 italic dark:border-neutral-600 dark:text-neutral-400">
                {post.metadata.summary}
              </p>
            </div>
          )}
          <article className="prose prose-quoteless prose-neutral dark:prose-invert">
            <CustomMDX source={post.content} />
          </article>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blogs
            </Link>
            {post.metadata.repoUrl && (
              <a
                href={post.metadata.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <Github className="h-4 w-4" />
                View on GitHub
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Table of Contents - Sticky on desktop for easy navigation */}
        <aside className="absolute top-0 left-[calc(100%+2rem)] hidden h-full w-52 xl:block">
          <div className="sticky top-24">
            <BlogTableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      {/* Mobile TOC - Shows floating button */}
      <div className="xl:hidden">
        <BlogTableOfContents headings={headings} />
      </div>
    </section>
  );
}
