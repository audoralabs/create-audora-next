"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./icons";

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-300"
      aria-label="Toggle theme"
    >
      <SunIcon className="hidden text-white dark:block" />
      <MoonIcon className="block text-zinc-950 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
