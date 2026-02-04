import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { formatDateDisplay } from "@/lib/utils";

type BlogPostCardProps = {
  slug: string;
  title: string;
  publishedAt: string;
  summary?: string;
};

export function BlogPostCard({
  slug,
  title,
  publishedAt,
  summary,
}: BlogPostCardProps) {
  return (
    <Link
      className="group flex flex-col gap-1 rounded-lg border border-border/50 p-3 transition-all hover:border-border sm:p-4"
      href={`/blogs/${slug}`}
    >
      <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-foreground/80">
          {title}
        </h2>
        <time
          dateTime={publishedAt}
          className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground tabular-nums"
        >
          <Calendar className="h-4 w-4 shrink-0" />
          {formatDateDisplay(publishedAt)}
        </time>
      </div>
      {summary && (
        <p className="line-clamp-2 text-sm text-muted-foreground">{summary}</p>
      )}
      <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
        Read article
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default BlogPostCard;
