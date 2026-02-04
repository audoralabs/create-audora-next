const LLMS_DATA = {
  // Quick start command for cloning the starter
  quickStart: "bunx degit AudoraLabs/next-starter my-app",

  // GitHub repository URL
  repository: "https://github.com/AudoraLabs/next-starter",

  // Tech stack summary
  techStack: [
    "Next.js 16 with App Router",
    "React 19",
    "TypeScript (strict mode)",
    "Tailwind CSS 4",
    "Bun (package manager)",
    "ESLint 9 (flat config)",
    "Prettier",
    "React Compiler",
  ],

  // Key features for the summary
  features: [
    "SEO-ready with robots.ts, sitemap.ts, and Open Graph metadata",
    "Title templates and metadataBase configured",
    "Path alias @/* mapped to ./src/*",
    "Dark mode support via CSS custom properties",
    "Geist font family pre-configured",
    "Pre-commit hooks with Husky and lint-staged",
  ],

  // Folder structure for llms-full.txt
  folderStructure: `src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page
│   ├── manifest.ts      # PWA manifest
│   ├── robots.ts        # robots.txt generation
│   ├── sitemap.ts       # Sitemap generation
│   ├── llms.txt/        # AI-friendly summary (this file)
│   └── llms-full.txt/   # AI-friendly full documentation
├── components/
│   ├── icons.tsx        # Icon components
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Dark/light mode toggle
├── config/
│   └── site.ts          # Site configuration exports
├── data/
│   ├── site.ts          # Site data (name, URL, description)
│   └── llms.ts          # LLMs.txt content configuration
├── lib/
│   └── seo.ts           # SEO utilities and JSON-LD generators
├── styles/
│   └── globals.css      # Global styles and Tailwind imports
└── utils/
    └── cn.ts            # Class name utility`,

  // Development commands
  commands: {
    dev: "bun dev",
    build: "bun run build",
    start: "bun start",
    lint: "bun lint",
    format: "bun format",
  },

  // SEO documentation for llms-full.txt
  seoDetails: `## SEO Configuration

This starter includes production-ready SEO defaults:

### Metadata (src/lib/seo.ts)
- getMetadata(): Default site metadata with Open Graph and Twitter cards
- getPageMetadata(): Page-specific metadata generator
- getViewport(): Viewport configuration with theme colors

### Structured Data (JSON-LD)
- getWebSiteJsonLd(): WebSite schema
- getOrganizationJsonLd(): Organization schema
- getBreadcrumbJsonLd(): Breadcrumb navigation schema

### Configuration (src/data/site.ts)
Customize these values for your project:
- name: Site name
- url: Base URL for canonical links
- ogImage: Default Open Graph image
- tagline: Short tagline
- description: Full description
- twitterHandle: Twitter/X handle

### Files
- robots.ts: Generates robots.txt with sitemap reference
- sitemap.ts: Dynamic sitemap generation
- manifest.ts: PWA web app manifest`,

  // Conventions documentation
  conventions: `## Conventions

### Path Aliases
Use @/* to import from src/*:
- import { cn } from "@/utils/cn"
- import { SITE_CONFIG } from "@/config/site"

### Theme
Dark mode uses CSS custom properties. Toggle with ThemeProvider and ThemeToggle components.

### Components
No component library included by default. Add shadcn/ui or Radix as needed.

### Styling
Tailwind CSS 4 with PostCSS. Global styles in src/styles/globals.css.`,
};

export default LLMS_DATA;
