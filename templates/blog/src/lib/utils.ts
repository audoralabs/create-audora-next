import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/**
 * Formats employment period date strings for display.
 * - "MM.YYYY" → "Aug 2025"
 * - "YYYY" → "2022"
 * - "Present" → "Present"
 */
export function formatEmploymentDate(value: string): string {
  if (value === "Present") return value;
  const mmYyyy = /^(\d{1,2})\.(\d{4})$/.exec(value);
  if (mmYyyy) {
    const monthIndex = parseInt(mmYyyy[1], 10) - 1;
    const year = mmYyyy[2];
    if (monthIndex >= 0 && monthIndex <= 11) {
      return `${MONTH_NAMES[monthIndex]} ${year}`;
    }
  }
  if (/^\d{4}$/.test(value)) return value;
  return value;
}

/**
 * Formats an ISO or date-only string for display as "Jan 03, 2026".
 */
export function formatDateDisplay(date: string): string {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function formatDate(date: string) {
  const currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    return `${fullDate} (${Math.floor(daysAgo / 7)}w ago)`;
  } else if (daysAgo < 365) {
    return `${fullDate} (${Math.floor(daysAgo / 30)}mo ago)`;
  } else {
    return `${fullDate} (${Math.floor(daysAgo / 365)}y ago)`;
  }
}
