#!/usr/bin/env node

import { glob } from 'glob';
import { existsSync } from 'node:fs';
import { appendFile, cp, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import color from 'picocolors';
import prompts from 'prompts';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Specify CLI arguments
const args = yargs(hideBin(process.argv)).options({
  name: {
    alias: 'n',
    type: 'string',
    description: 'Name of the project',
  },
  template: {
    alias: 't',
    type: 'string',
    description: 'Framework to use',
  },
  tailwind: {
    alias: 'tw',
    type: 'boolean',
    description: 'Use Tailwind CSS',
  },
});

// Override arguments passed on the CLI
prompts.override(args.argv);

// Rename a file
async function renameFile(oldFile, newFile, pathname) {
  const data = await readFile(path.join(pathname, oldFile));
  await appendFile(path.join(pathname, newFile), data);
  await unlink(path.join(pathname, oldFile));
}

async function main() {
  const project = await prompts(
    [
      {
        type: 'text',
        name: 'name',
        message: 'What is your project named?',
        initial: 'my-project',
        validate: (value) => {
          if (value.match(/[^a-zA-Z0-9-_]+/g)) {
            return 'Project name can only contain letters, numbers, dashes and underscores.';
          }
          return true;
        },
      },
      {
        type: 'select',
        name: 'template',
        message: 'Select a framework:',
        initial: 0,
        choices: [
          { title: 'Vanilla', value: 'vanilla' },
          { title: 'React', value: 'react' },
          { title: 'Next.js', value: 'next' },
          { title: 'Node.js', value: 'node' },
        ],
      },
      {
        type: (prev) => (prev === 'node' ? null : 'toggle'),
        name: 'tailwind',
        message: 'Would you like to use Tailwind CSS?',
        initial: false,
        active: 'Yes',
        inactive: 'No',
      },
    ],
    {
      onCancel: () => {
        console.log('\nBye 👋\n');
        process.exit(0);
      },
    },
  );

  // Create the template name based on the user's choices
  let templateName = `${project.template}-ts`;
  if (project.tailwind) {
    templateName += '-tw';
  }

  // Get the template and destination paths
  const template = path.join(path.dirname(fileURLToPath(import.meta.url)), 'templates', templateName);
  const destination = path.join(process.cwd(), project.name);

  // Copy files from the template folder to the current directory
  await cp(template, destination, { recursive: true });

  // Get all files from the destination directory
  const files = await glob('**/*', { nodir: true, cwd: destination, absolute: true });

  // Read each file and replace the template variables
  for await (const file of files) {
    const data = await readFile(file, 'utf8');
    const draft = data.replace(/{{name}}/g, project.name);

    await writeFile(file, draft, 'utf-8');
  }

  // Rename _gitignore to .gitignore
  if (existsSync(path.join(destination, '_gitignore'))) {
    await renameFile('_gitignore', '.gitignore', destination);
  }

  // Rename _next-env.d.ts to next-env.d.ts
  if (existsSync(path.join(destination, '_next-env.d.ts'))) {
    await renameFile('_next-env.d.ts', 'next-env.d.ts', destination);
  }

  // Log outro message
  console.log(`✨ Project created ✨`);
  console.log(`\n${color.yellow('Next steps:')}`);
  console.log(`\n${color.green('cd')} ${project.name}`);
  console.log(`${color.green('pnpm')} install`);
  console.log(`${color.green('pnpm')} dev`);
  console.log('\n---\n');
  console.log(`Questions 👀? ${color.underline(color.cyan('https://x.com/javalce29'))}`);
}

main().catch(console.error);
