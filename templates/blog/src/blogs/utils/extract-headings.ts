export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

/**
 * Extracts h2 and h3 headings from MDX content
 * Creates slug IDs matching rehype-slug behavior
 */
export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];

  // Match ## and ### headings in MDX
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\*\*([^*]+)\*\*/g, "$1") // Remove bold
      .replace(/\*([^*]+)\*/g, "$1") // Remove italic
      .replace(/`([^`]+)`/g, "$1") // Remove code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
      .trim();

    // Generate slug matching rehype-slug styles (which seems to map each space to a dash)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/\s/g, "-") // Replace each space with a hyphen (don't squash)
      .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens

    headings.push({ id, text, level });
  }

  return headings;
}
