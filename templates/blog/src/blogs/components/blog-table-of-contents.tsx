"use client";

import { useEffect, useState, useRef } from "react";
import { List, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Heading } from "@/blogs/utils/extract-headings";

type BlogTableOfContentsProps = {
  headings: Heading[];
};

export function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isManualScroll = useRef(false);

  // Track reading progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Track active section using Intersection Observer
  useEffect(() => {
    const headingElements = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScroll.current) return; // Skip updates during manual scroll

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -20% 0px", // Expanded detection area to 80% of viewport
        threshold: 0.5,
      },
    );

    headingElements.forEach((el) => el && observer.observe(el));

    return () => {
      headingElements.forEach((el) => el && observer.unobserve(el));
    };
  }, [headings]);

  // Handle bottom of page for last item
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return; // Skip during manual scroll

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (headings.length > 0) {
          setActiveId(headings[headings.length - 1].id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setIsOpen(false);
      isManualScroll.current = true; // Lock observer
      setActiveId(id); // Set immediate active state

      element.scrollIntoView({ behavior: "smooth", block: "start" });

      // Unlock after animation (approx. 1000ms)
      setTimeout(() => {
        isManualScroll.current = false;
      }, 1000);
    }
  };

  // Touch handlers for swipe-to-dismiss
  // Touch handlers for swipe-to-dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;

    if (deltaY > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = () => {
    const deltaY = currentY.current - startY.current;

    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }

    if (deltaY > 80) {
      setIsOpen(false);
    }

    startY.current = 0;
    currentY.current = 0;
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile Floating Button - Compact with progress ring */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-4 bottom-20 z-50 flex h-11 w-11 items-center justify-center",
          "rounded-full border border-border/50 bg-card/95 shadow-lg backdrop-blur-sm",
          "transition-all duration-300 hover:scale-105 hover:border-border",
          "xl:hidden",
        )}
        aria-label={
          isOpen ? "Close table of contents" : "Open table of contents"
        }
      >
        {/* Progress ring */}
        <svg
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border/30"
          />
          <circle
            cx="22"
            cy="22"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - readingProgress / 100)}`}
            className="text-primary transition-all duration-200"
            strokeLinecap="round"
          />
        </svg>
        <List className="h-4 w-4 text-foreground" />
      </button>

      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200 xl:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Bottom Sheet - Compact */}
      <div
        ref={sheetRef}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 max-h-[50vh] xl:hidden",
          "rounded-t-2xl border-t border-border/50 bg-card shadow-xl",
          "transition-transform duration-200 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-2">
          <div className="h-1 w-8 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Header - Compact */}
        <div className="flex items-center justify-between px-4 pb-2">
          <div className="flex items-center gap-2">
            <List className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Contents
            </span>
            <span className="text-xs text-muted-foreground">
              ({Math.round(readingProgress)}%)
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mx-4 h-0.5 overflow-hidden rounded-full bg-border/30">
          <div
            className="h-full rounded-full bg-primary transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Links - Compact */}
        <ul className="mt-2 flex max-h-[calc(50vh-80px)] flex-col overflow-y-auto px-3 pb-6">
          {headings.map(({ id, text, level }) => (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg py-2.5 pr-3 transition-colors",
                  "active:bg-muted",
                  level === 3 ? "pl-8 text-xs" : "pl-3 text-sm",
                  activeId === id
                    ? "bg-primary/10 font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {/* Subheading connector line (Mobile) */}
                {level === 3 && (
                  <span
                    className={cn(
                      "absolute top-1/2 left-3 h-px w-3 -translate-y-1/2 rounded-full",
                      activeId === id ? "bg-primary/40" : "bg-border/40",
                    )}
                  />
                )}

                {/* Active dot */}
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                    activeId === id ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
                <span className="line-clamp-1">{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Sidebar - Premium design */}
      <nav className="hidden xl:block" aria-label="Table of contents">
        {/* Glassmorphism card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5 shadow-xl backdrop-blur-xl dark:from-white/5">
          {/* Subtle gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

          {/* Header - icon hidden on desktop */}
          <div className="relative flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 shadow-sm xl:hidden">
              <List className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                On this page
              </h3>
              <p className="text-[11px] text-muted-foreground">
                {headings.length} sections
              </p>
            </div>
          </div>

          {/* Progress section */}
          <div className="relative mt-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border/30">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 ease-out"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {Math.round(readingProgress)}%
            </span>
          </div>

          {/* Links */}
          <ul className="relative mt-4 flex flex-col gap-1 border-l border-border/30 pl-3">
            {headings.map(({ id, text, level }) => (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  className={cn(
                    "group relative block rounded-lg py-1.5 pr-2 transition-all duration-200",
                    level === 3 ? "pl-5 text-xs" : "text-[13px]",
                    activeId === id
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {/* Subheading connector line */}
                  {level === 3 && (
                    <span
                      className={cn(
                        "absolute top-1/2 left-1 h-px w-2.5 -translate-y-1/2 rounded-full transition-colors duration-200",
                        activeId === id
                          ? "bg-primary/50"
                          : "bg-border/40 group-hover:bg-border/80",
                      )}
                    />
                  )}

                  {/* Active indicator dot on left border */}
                  <span
                    className={cn(
                      "absolute top-1/2 -left-3 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200",
                      activeId === id
                        ? "scale-100 bg-primary shadow-sm shadow-primary/50"
                        : "scale-0 bg-border",
                    )}
                  />
                  <span className="relative z-10 line-clamp-1">{text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default BlogTableOfContents;
