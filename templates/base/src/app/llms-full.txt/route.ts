import { SITE_CONFIG } from "@/config/site";
import LLMS_DATA from "@/data/llms";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.tagline}

${SITE_CONFIG.description}

## Quick Start

\`\`\`bash
${LLMS_DATA.quickStart}
cd my-app
bun install
bun dev
\`\`\`

## Resources

- Summary: ${SITE_CONFIG.url}/llms.txt
- Sitemap: ${SITE_CONFIG.url}/sitemap.xml
- Repository: ${LLMS_DATA.repository}

## Tech Stack

${LLMS_DATA.techStack.map((item) => `- ${item}`).join("\n")}

## Features

${LLMS_DATA.features.map((item) => `- ${item}`).join("\n")}

## Folder Structure

\`\`\`
${LLMS_DATA.folderStructure}
\`\`\`

## Development Commands

| Command | Description |
|---------|-------------|
| \`${LLMS_DATA.commands.dev}\` | Start development server |
| \`${LLMS_DATA.commands.build}\` | Build for production |
| \`${LLMS_DATA.commands.start}\` | Start production server |
| \`${LLMS_DATA.commands.lint}\` | Lint code |
| \`${LLMS_DATA.commands.format}\` | Format code |

${LLMS_DATA.seoDetails}

${LLMS_DATA.conventions}

## Environment Variables

| Variable | Description |
|----------|-------------|
| \`NEXT_PUBLIC_SITE_URL\` | Base URL for sitemap, robots.txt, and Open Graph |

## Key Files

### src/data/site.ts
Contains site configuration that powers SEO metadata:
- name, url, ogImage
- tagline, description, shortDescription
- twitterHandle, keywords

### src/lib/seo.ts
SEO utility functions:
- getMetadata() - Root layout metadata
- getPageMetadata() - Per-page metadata
- getViewport() - Viewport with theme colors
- JSON-LD generators for structured data

### src/app/layout.tsx
Root layout with:
- Metadata exports
- Theme provider
- Geist font configuration

### src/components/theme-toggle.tsx
Dark/light mode toggle component using next-themes.

## License

MIT
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
