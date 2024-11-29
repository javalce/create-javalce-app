#!/usr/bin/env node

import { access, constants, cp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Command, Option } from '@commander-js/extra-typings';
import { glob } from 'glob';
import color from 'picocolors';
import prompts from 'prompts';

import { logger } from './logger';

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

async function main(): Promise<void> {
  const program = new Command()
    .option('-n, --name <name>', 'Name of the project')
    .addOption(
      new Option('-t, --template <template>', 'Template to use').choices(
        TEMPLATES.map((template) => template.value),
      ),
    );

  let { name: projectName, template: projectTemplate } = program.opts();

  const templateIndex = TEMPLATES.findIndex((template) => template.value === projectTemplate);

  if (projectName === undefined) {
    const { name } = (await prompts(
      {
        type: 'text',
        name: 'name',
        message: 'What is the name of your project?',
        initial: 'my-project',
        validate: (value: string): boolean | string => {
          if (value.match(/[^a-zA-Z0-9-_]+/g)) {
            return 'Project name can only contain letters, numbers, dashes and underscores.';
          }

          return true;
        },
      },
      {
        onCancel: () => {
          logger.log('\nBye 👋\n');
          process.exit(0);
        },
      },
    )) as { name: string };

    projectName = name;
  }

  if (projectTemplate === undefined) {
    const { template } = (await prompts(
      {
        type: 'select',
        name: 'template',
        message: 'Select a framework:',
        initial: templateIndex > -1 ? templateIndex : 0,
        choices: TEMPLATES,
      },
      {
        onCancel: () => {
          logger.log('\nBye 👋\n');
          process.exit(0);
        },
      },
    )) as { template: string };

    projectTemplate = template;
  }

  // Get the template folder for the selected template
  const template = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    'templates',
    projectTemplate,
  );

  // Get the destination folder for the project
  const destination = path.join(process.cwd(), projectName);

  // Check if the destination folder already exists
  const destinationExists = await (async () => {
    try {
      // eslint-disable-next-line no-bitwise -- Node.js fs constants
      await access(destination, constants.R_OK | constants.W_OK);

      return true;
    } catch {
      return false;
    }
  })();

  if (destinationExists) {
    logger.log(
      `Directory ${color.green(projectName)} already exists.\n\nEither try using another name, or remove the existing directory.`,
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
    const draft = data.replace(/{{name}}/g, projectName);

    await writeFile(file, draft, 'utf-8');
  }

  // Log outro message
  logger.log(`✨ Project created ✨`);
  logger.log(`\n${color.yellow('Next steps:')}`);
  logger.log(`\n${color.green('cd')} ${projectName}`);
  logger.log(`${color.green('pnpm')} install`);
  logger.log(`${color.green('pnpm')} dev`);
  logger.log('\n---\n');
  logger.log(`Questions 👀? ${color.underline(color.cyan('https://x.com/javalce29'))}`);
}

main().catch((error: unknown) => {
  logger.error(error);
});
