#!/usr/bin/env node

import { glob } from 'glob';
import { cp, readFile, writeFile } from 'node:fs/promises';
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
    description: 'Template to use',
  },
});

// Override arguments passed on the CLI
prompts.override(args.argv);

async function main() {
  const project = await prompts(
    [
      {
        type: 'text',
        name: 'name',
        message: 'What is the name of the project?',
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
        message: 'What template would you like to use?',
        initial: 0,
        choices: [
          { title: 'React + ESLint (Standard config) + TypeScript', value: 'react-eslint-ts' },
          { title: 'React + ESLint (Standard config) + TypeScript + Tailwind', value: 'react-eslint-ts-tw' },
          { title: 'Next.js + ESLint (Standard config) + TypeScript', value: 'next-eslint-ts' },
          { title: 'Next.js + ESLint (Standard config) + TypeScript + Tailwind', value: 'next-eslint-ts-tw' },
        ],
      },
    ],
    {
      onCancel: () => {
        console.log('\nBye 👋\n');
        process.exit(0);
      },
    },
  );

  const template = path.join(path.dirname(fileURLToPath(import.meta.url)), 'templates', project.template);
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

  // Log outro message
  console.log(`✨ Project created ✨`);
  console.log(`\n${color.yellow('Next steps:')}`);
  console.log(`\n${color.green('cd')}${project.name}`);
  console.log(`${color.green('pnpm')} install`);
  console.log(`${color.green('pnpm')} dev`);
  console.log('\n---\n');
  console.log(`Questions 👀? ${color.underline(color.cyan('https://x.com/javalce'))}`);
}

main().catch(console.error);
