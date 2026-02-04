#!/usr/bin/env bun

import { mkdirSync, cpSync, existsSync, renameSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import pc from "picocolors";
import ora from "ora";

const args = process.argv.slice(2);
const useBlogTemplate = args.includes("-blog") || args.includes("--blog");
const projectName = args.find((arg) => arg !== "-blog" && arg !== "--blog");

// Validate project name
if (!projectName) {
  console.error(`\n${pc.red("Error:")} Please provide a project name.`);
  console.log(
    `\nUsage: ${pc.cyan("bunx create-audora-next")} ${pc.green(
      "<project-name>"
    )} ${pc.dim("[--blog]")}\n`
  );
  process.exit(1);
}

if (!/^[a-zA-Z0-9_-]+$/.test(projectName)) {
  console.error(
    `\n${pc.red(
      "Error:"
    )} Project name can only contain letters, numbers, hyphens, and underscores.`
  );
  process.exit(1);
}

const targetDir = join(process.cwd(), projectName);

if (existsSync(targetDir)) {
  console.error(
    `\n${pc.red("Error:")} Directory ${pc.cyan(projectName)} already exists.`
  );
  process.exit(1);
}

const templateDir = useBlogTemplate ? "blog" : "base";
console.log(
  `\nCreating a new ${pc.bold("Audora Next")} app${
    useBlogTemplate ? ` ${pc.dim("(blog template)")}` : ""
  } in ${pc.cyan(targetDir)}...\n`
);

// Copy template
mkdirSync(targetDir);
cpSync(new URL(`./templates/${templateDir}`, import.meta.url), targetDir, {
  recursive: true,
});

// Rename template files that npm excludes during publish
const templateSpinner = ora("Setting up configuration files...").start();
const templateFiles = [
  { from: "gitignore.template", to: ".gitignore" },
  { from: "env.example.template", to: ".env.example" },
  { from: "husky.template", to: ".husky" },
];

let renamedCount = 0;
for (const { from, to } of templateFiles) {
  const filePath = join(targetDir, from);
  if (existsSync(filePath)) {
    renameSync(filePath, join(targetDir, to));
    renamedCount++;
  }
}

if (renamedCount > 0) {
  templateSpinner.succeed("Configuration files ready");
} else {
  templateSpinner.warn("No template files found to rename");
}

process.chdir(targetDir);

// Init git (optional - warn if git not available)
const gitSpinner = ora("Initializing git repository...").start();
try {
  execSync("git init", { stdio: "pipe" });
  execSync('git commit --allow-empty -m "chore: initial commit"', {
    stdio: "pipe",
  });
  gitSpinner.succeed("Initialized git repository");
} catch {
  gitSpinner.warn("Could not initialize git repository. Is git installed?");
}

// Install deps
const installSpinner = ora("Installing dependencies...").start();
try {
  execSync("bun install", { stdio: "pipe" });
  installSpinner.succeed("Installed dependencies");
} catch {
  installSpinner.fail("Failed to install dependencies");
  console.error(
    `\n${pc.red("Error:")} Please run ${pc.cyan("bun install")} manually.\n`
  );
  process.exit(1);
}

console.log(`
${pc.green("Success!")} Created ${pc.bold(projectName)} at ${pc.cyan(targetDir)}

${pc.bold("Next steps:")}
  ${pc.cyan("cd")} ${projectName}
  ${pc.cyan("cp .env.example .env")}
  ${pc.cyan("bun dev")}
`);
