# next-starter

This project uses [create-audora-next](https://www.npmjs.com/package/create-audora-next) as its base.

## Quick Start

```bash
bunx degit audoralabs/next-starter my-app
cd my-app
git init
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Planned Features

- **MDX loading** - Author posts with MDX and frontmatter support.
- **Pagination** - First-class paginated lists for posts and tags.
- **Search** - Fast, client-side search across content.

### Recommended Packages

- **MDX** - `@next/mdx` and `contentlayer`
- **Search** - `flexsearch`
- **Pagination** - Custom paginator (no external package)

## What's Included

### Core Stack

| Technology   | Version | Notes                          |
| ------------ | ------- | ------------------------------ |
| Next.js      | 16.1.1  | App Router, Turbopack enabled  |
| React        | 19.2.3  | React Compiler enabled         |
| TypeScript   | 5       | Strict mode                    |
| Tailwind CSS | 4       | PostCSS, no config file needed |
| Bun          | Latest  | Package manager and runtime    |

### SEO

This starter ships with everything you need for search engine optimization:

- **Open Graph & Twitter Cards** - Complete social sharing metadata
- **Structured Data (JSON-LD)** - WebSite, Organization, and Breadcrumb schemas
- **Dynamic robots.txt** - Generated from `robots.ts`
- **Dynamic sitemap.xml** - Generated from `sitemap.ts`
- **llms.txt** - AI-friendly documentation for LLM assistants
- **Title Templates** - Consistent page titles with `%s - Site Name` pattern
- **Canonical URLs** - Prevent duplicate content issues
- **PWA Manifest** - Web app manifest with icons and screenshots

### Security

Pre-configured security headers in `next.config.ts`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` - Camera, microphone, geolocation disabled

### Developer Experience

- **ESLint 9** - Flat config with Next.js rules
- **Prettier** - With Tailwind CSS plugin for class sorting
- **Husky** - Git hooks for pre-commit linting
- **lint-staged** - Run linters on staged files only
- **Path Alias** - `@/*` mapped to `./src/*`

> **Note:** Git hooks (Husky) are installed automatically when a Git repository is present.
> If you initialize Git after installing dependencies, re-run `bun install` to enable hooks.

- **Type Checking** - Dedicated `check-types` script

### UI

- **Dark Mode** - System preference detection with next-themes
- **Geist Font** - Pre-configured sans and mono variants
- **cn() Utility** - Combines clsx and tailwind-merge

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata and JSON-LD
│   ├── page.tsx            # Home page
│   ├── manifest.ts         # PWA web app manifest
│   ├── robots.ts           # robots.txt generation
│   ├── sitemap.ts          # sitemap.xml generation
│   ├── llms.txt/           # AI-friendly summary
│   └── llms-full.txt/      # AI-friendly full documentation
├── components/
│   ├── icons.tsx           # Icon components
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Dark/light mode toggle
├── config/
│   └── site.ts             # Site configuration exports
├── data/
│   ├── site.ts             # Site metadata (name, URL, description)
│   └── llms.ts             # llms.txt content configuration
├── lib/
│   └── seo.ts              # SEO utilities and JSON-LD generators
├── styles/
│   └── globals.css         # Global styles and Tailwind imports
└── utils/
    └── cn.ts               # Class name merge utility
```

## Configuration

### Site Metadata

Edit `src/data/site.ts` to customize your site:

```typescript
const SITE_DATA = {
  name: "my-app",
  url: "https://my-app.com",
  ogImage: "https://my-app.com/og.png",
  tagline: "Your tagline here",
  description: "Your full description",
  twitterHandle: "@myapp",
  keywords: ["keyword1", "keyword2"],
};
```

### LLMs.txt Content

Edit `src/data/llms.ts` to customize AI-friendly documentation.

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `bun dev`              | Start dev server with Turbopack  |
| `bun run build`        | Build for production             |
| `bun start`            | Start production server          |
| `bun lint`             | Run ESLint                       |
| `bun lint:fix`         | Run ESLint with auto-fix         |
| `bun check-types`      | Run TypeScript type checking     |
| `bun format`           | Format all files with Prettier   |
| `bun format:check`     | Check formatting without writing |
| `bun clean`            | Remove .next and node_modules    |
| `bun upgrade:next`     | Upgrade Next.js to latest        |
| `bun upgrade:tailwind` | Upgrade Tailwind CSS             |

## Why These Choices

**Bun** - Faster installs, native TypeScript, smaller lockfile.

**App Router** - Server components, streaming, better layouts. Pages Router is legacy.

**React Compiler** - Automatic memoization without manual `useMemo`/`useCallback`.

**Tailwind CSS 4** - Native CSS layers, `@theme` directive, no config file for basics.

**ESLint Flat Config** - Cleaner, more composable than `.eslintrc` files.

**No Component Library** - Start clean, add shadcn/ui or Radix when needed.

**Turbopack** - Faster dev server and builds.
