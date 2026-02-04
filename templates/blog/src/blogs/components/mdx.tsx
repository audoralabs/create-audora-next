import Link from "next/link";
import Image from "next/image";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { CopyButton } from "@/blogs/components/copy-button";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  const headers = data.headers.map((header, index) => (
    <th key={index} className="px-4 py-2 text-left font-bold">
      {header}
    </th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr
      key={index}
      className="border-t border-neutral-200 dark:border-neutral-700"
    >
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="px-4 py-2 text-left">
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-700">
            {headers}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

function CustomLink(props: CustomLinkProps) {
  const { href, children, ...rest } = props;

  if (typeof href === "string" && href.startsWith("/")) {
    return (
      <Link
        href={href}
        className="cursor-pointer text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
        {...rest}
      >
        {children}
      </Link>
    );
  }

  if (typeof href === "string" && href.startsWith("#")) {
    return (
      <a
        href={href}
        className="cursor-pointer text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
}

type ImgProps = React.ComponentProps<typeof Image> & {
  width?: number | string;
  height?: number | string;
};

function BlogImage(props: ImgProps) {
  const { width, height, alt, src, ...rest } = props;
  const hasDimensions =
    typeof width === "number" &&
    typeof height === "number" &&
    width > 0 &&
    height > 0;

  if (hasDimensions) {
    return (
      <Image
        className="rounded-lg"
        width={width}
        height={height}
        alt={alt ?? ""}
        src={src}
        {...rest}
      />
    );
  }

  const imgSrc = typeof src === "string" ? src : "";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-lg max-w-full h-auto"
      src={imgSrc}
      alt={alt ?? ""}
      {...rest}
    />
  );
}

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

// Helper to recursively extract text from React children
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

const components: MDXComponents = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1
      className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: (props: React.ComponentProps<"h4">) => (
    <h4
      className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),
  hr: (props: React.ComponentProps<"hr">) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  tr: (props: React.ComponentProps<"tr">) => (
    <tr className="m-0 border-t p-0 even:bg-muted" {...props} />
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<"pre">) => {
    const { children, ...rest } = props;

    let textToCopy = "";
    if (React.isValidElement(children) && children.type === "code") {
      textToCopy = extractText(
        (children.props as { children?: React.ReactNode }).children,
      );
    }

    return (
      <div className="group relative my-6 overflow-hidden rounded-xl border border-border bg-[#141517]">
        <div className="absolute top-3 right-3 z-20 opacity-0 transition-opacity group-hover:opacity-100">
          {textToCopy && <CopyButton text={textToCopy} />}
        </div>
        <pre className="overflow-x-auto p-4 text-sm" {...rest}>
          {children}
        </pre>
      </div>
    );
  },
  a: CustomLink,
  img: BlogImage,
  Table,
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          rehypePlugins: [
            rehypeSlug,
            [
              rehypePrettyCode,
              {
                theme: "github-dark-default",
                keepBackground: true,
              },
            ],
            [
              rehypeAutolinkHeadings,
              {
                properties: {
                  className: ["subheading-anchor"],
                  ariaLabel: "Link to section",
                },
              },
            ],
          ],
        },
      }}
    />
  );
}
