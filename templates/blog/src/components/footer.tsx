import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="container flex max-w-5xl flex-wrap items-center justify-center gap-4 px-4 mx-auto text-center">
        <Link
          href="/llms.txt"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          llms.txt
        </Link>
        <span className="text-border" aria-hidden>
          ·
        </span>
        <Link
          href="/llms-full.txt"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          llms-full.txt
        </Link>
      </div>
    </footer>
  );
}
