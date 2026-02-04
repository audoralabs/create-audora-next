"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CopyButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  // Extract text from children if it's a React element, or use string directly
  // However, in the MDX pre component context, we usually pass the raw code string.
  // The 'text' prop here is expected to be the raw code.

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={copy}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md border border-neutral-700 bg-neutral-800 text-neutral-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-neutral-700 hover:text-neutral-200 focus-visible:opacity-100",
        className,
      )}
      aria-label="Copy code"
    >
      {isCopied ? (
        <CheckIcon className="size-3.5" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
    </button>
  );
}
