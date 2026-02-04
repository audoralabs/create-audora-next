"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface ViewAllLinkProps {
  href: string;
  children?: React.ReactNode;
}

const MotionLink = motion.create(Link);

export function ViewAllLink({ href, children = "View All" }: ViewAllLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      <MotionLink
        href={href}
        className="group inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white ring-2 ring-zinc-900/10 ring-offset-2 transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:ring-zinc-100/20 dark:ring-offset-black dark:hover:bg-zinc-200"
        whileHover="hover"
      >
        {children}
        <div className="relative h-4 w-4 overflow-hidden">
          <motion.div
            variants={{
              hover: { x: "150%", y: "-150%" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
          <motion.div
            initial={{ x: "-150%", y: "150%" }}
            variants={{
              hover: { x: "0%", y: "0%" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </div>
      </MotionLink>
    </motion.div>
  );
}
