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
\`\`\`

## Resources

- Full documentation: ${SITE_CONFIG.url}/llms-full.txt
- Sitemap: ${SITE_CONFIG.url}/sitemap.xml
- Repository: ${LLMS_DATA.repository}

## Tech Stack

${LLMS_DATA.techStack.map((item) => `- ${item}`).join("\n")}

## Features

${LLMS_DATA.features.map((item) => `- ${item}`).join("\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
