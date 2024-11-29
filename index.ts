#!/usr/bin/env node

import { access, constants, cp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import color from 'picocolors';
import prompts from 'prompts';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// List of templates
const TEMPLATES = [
  {
    title: 'Next.js + ESLint + Prettier + TypeScript',
    value: 'next-ts',
  },
  {
    title: 'Next.js + Tailwind CSS + ESLint + Prettier + TypeScript',
    value: 'next-ts-tw',
  },
  {
    title: 'React (vite) + ESLint + Prettier + TypeScript',
    value: 'react-ts',
  },
  {
    title: 'React (vite) + Tailwind CSS + ESLint + Prettier + TypeScript',
    value: 'react-ts-tw',
  },
  {
    title: 'Node.js + ESLint + Prettier + TypeScript',
    value: 'node-ts',
  },
  {
    title: 'Vanilla + ESLint + Prettier + TypeScript',
    value: 'vanilla-ts',
  },
  {
    title: 'Vanilla + Tailwind CSS + ESLint + Prettier + TypeScript',
    value: 'vanilla-ts-tw',
  },
];

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

async function main(): Promise<void> {
  const {
    _: [initialName, initialProject],
  } = await args.argv;

  const project = await prompts(
    [
      {
        type: 'text',
        name: 'name',
        message: 'What is the name of your project?',
        initial: initialName ?? 'my-project',
        validate: (value: string): boolean | string => {
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
        initial: initialProject ?? 0,
        choices: TEMPLATES,
      },
    ],
    {
      onCancel: () => {
        console.log('\nBye 👋\n');
        process.exit(0);
      },
    },
  );

  // Get the template folder for the selected template
  const template = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'templates',
    project.template,
  );

  // Get the destination folder for the project
  const destination = path.join(process.cwd(), project.name);

  // Check if the destination folder already exists
  const destinationExists = await (async () => {
    try {
      await access(destination, constants.R_OK | constants.W_OK);

      return true;
    } catch (error) {
      return false;
    }
  })();

  if (destinationExists) {
    console.log(
      `Directory ${color.green(project.name)} already exists.\n\nEither try using another name, or remove the existing directory.`,
    );
    process.exit(0);
  }

  // Copy files from the template folder to the current directory
  await cp(template, destination, { recursive: true });

  // Get all files from the destination directory
  const files = await glob('**/*', { nodir: true, cwd: destination, absolute: true });

  // Read each file and replace the template variables
  for (const file of files) {
    const data = await readFile(file, 'utf8');
    const draft = data.replace(/{{name}}/g, project.name);

    await writeFile(file, draft, 'utf-8');
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
