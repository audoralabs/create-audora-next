"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "./icons";

interface CopyableCodeProps {
  code: string;
}

export const CopyableCode = ({ code }: CopyableCodeProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative mx-auto mt-12 max-w-lg rounded-md border border-neutral-200 bg-neutral-200 p-4 pr-12 dark:border-neutral-800 dark:bg-neutral-900">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-600 transition-colors hover:bg-neutral-300 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        aria-label="Copy code"
      >
        {copied ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
      </button>
      <code className="block text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
        <span className="text-neutral-400 dark:text-neutral-600">$</span> {code}
      </code>
    </div>
  );
};
