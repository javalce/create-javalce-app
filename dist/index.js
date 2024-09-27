#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/tsup@8.1.0_typescript@5.5.2/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// index.ts
var import_glob = require("glob");
var import_promises = require("fs/promises");
var import_node_path = __toESM(require("path"));
var import_node_url = require("url");
var import_picocolors = __toESM(require("picocolors"));
var import_prompts = __toESM(require("prompts"));
var import_yargs = __toESM(require("yargs"));
var import_helpers = require("yargs/helpers");
var TEMPLATES = [
  {
    title: "Next.js + ESLint + Prettier + TypeScript",
    value: "next-ts"
  },
  {
    title: "Next.js + Tailwind CSS + ESLint + Prettier + TypeScript",
    value: "next-ts-tw"
  },
  {
    title: "React (vite) + ESLint + Prettier + TypeScript",
    value: "react-ts"
  },
  {
    title: "React (vite) + Tailwind CSS + ESLint + Prettier + TypeScript",
    value: "react-ts-tw"
  },
  {
    title: "Node.js + ESLint + Prettier + TypeScript",
    value: "node-ts"
  },
  {
    title: "Vanilla + ESLint + Prettier + TypeScript",
    value: "vanilla-ts"
  },
  {
    title: "Vanilla + Tailwind CSS + ESLint + Prettier + TypeScript",
    value: "vanilla-ts-tw"
  }
];
var args = (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).options({
  name: {
    alias: "n",
    type: "string",
    description: "Name of the project"
  },
  template: {
    alias: "t",
    type: "string",
    description: "Template to use"
  }
});
import_prompts.default.override(args.argv);
async function main() {
  const {
    _: [initialName, initialProject]
  } = await args.argv;
  const project = await (0, import_prompts.default)(
    [
      {
        type: "text",
        name: "name",
        message: "What is the name of your project?",
        initial: initialName || "my-project",
        validate: (value) => {
          if (value.match(/[^a-zA-Z0-9-_]+/g)) {
            return "Project name can only contain letters, numbers, dashes and underscores.";
          }
          return true;
        }
      },
      {
        type: "select",
        name: "template",
        message: "Select a framework:",
        initial: initialProject || 0,
        choices: TEMPLATES
      }
    ],
    {
      onCancel: () => {
        console.log("\nBye \u{1F44B}\n");
        process.exit(0);
      }
    }
  );
  const template = import_node_path.default.join(
    import_node_path.default.dirname((0, import_node_url.fileURLToPath)(importMetaUrl)),
    "templates",
    project.template
  );
  const destination = import_node_path.default.join(process.cwd(), project.name);
  const destinationExists = await (async () => {
    try {
      await (0, import_promises.access)(destination, import_promises.constants.R_OK | import_promises.constants.W_OK);
      return true;
    } catch (error) {
      return false;
    }
  })();
  if (destinationExists) {
    console.log(
      `Directory ${import_picocolors.default.green(project.name)} already exists.

Either try using another name, or remove the existing directory.`
    );
    process.exit(0);
  }
  await (0, import_promises.cp)(template, destination, { recursive: true });
  const files = await (0, import_glob.glob)("**/*", { nodir: true, cwd: destination, absolute: true });
  for await (const file of files) {
    const data = await (0, import_promises.readFile)(file, "utf8");
    const draft = data.replace(/{{name}}/g, project.name);
    await (0, import_promises.writeFile)(file, draft, "utf-8");
  }
  console.log(`\u2728 Project created \u2728`);
  console.log(`
${import_picocolors.default.yellow("Next steps:")}`);
  console.log(`
${import_picocolors.default.green("cd")} ${project.name}`);
  console.log(`${import_picocolors.default.green("pnpm")} install`);
  console.log(`${import_picocolors.default.green("pnpm")} dev`);
  console.log("\n---\n");
  console.log(`Questions \u{1F440}? ${import_picocolors.default.underline(import_picocolors.default.cyan("https://x.com/javalce29"))}`);
}
main().catch(console.error);
//# sourceMappingURL=index.js.map