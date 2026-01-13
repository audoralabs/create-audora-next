#!/usr/bin/env bun

import { mkdirSync, cpSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import pc from "picocolors";
import ora from "ora";

const projectName = process.argv[2];

// Validate project name
if (!projectName) {
  console.error(`\n${pc.red("Error:")} Please provide a project name.`);
  console.log(
    `\nUsage: ${pc.cyan("bunx create-audora-next")} ${pc.green(
      "<project-name>"
    )}\n`
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

console.log(
  `\nCreating a new ${pc.bold("Audora Next")} app in ${pc.cyan(targetDir)}...\n`
);

// Copy template
mkdirSync(targetDir);
cpSync(new URL("./templates/base", import.meta.url), targetDir, {
  recursive: true,
});

process.chdir(targetDir);

// Init git (optional - warn if git not available)
const gitSpinner = ora("Initializing git repository...").start();
try {
  execSync("git init", { stdio: "pipe" });
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
  ${pc.cyan("bun dev")}
`);
