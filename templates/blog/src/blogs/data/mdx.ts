import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  repoUrl?: string;
};

type BlogPost = {
  metadata: Metadata;
  slug: string;
  content: string;
};

function getMDXFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile() && path.extname(entry.name) === ".mdx")
    .map((entry) => path.join(dir, entry.name));

  const folders = entries.filter((entry) => entry.isDirectory());

  const nestedFiles = folders.flatMap((folder) =>
    getMDXFiles(path.join(dir, folder.name)),
  );

  return [...files, ...nestedFiles];
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return matter(rawContent);
}

function getMDXData(dir: string): BlogPost[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(file);
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: data as Metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "src/blogs/content"));
}

export function getBlogPost(slug: string) {
  const posts = getMDXData(path.join(process.cwd(), "src/blogs/content"));

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return null;
  }

  return post;
}
