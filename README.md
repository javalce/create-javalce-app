# Create Javalce App

Create projects as Javier would. Based on [create-appncy](https://github.com/goncy/create-appncy). This CLI tool enables you to create projects using the templates I use for my projects preconfigured with ESLint and Prettier. You can create a new app using different templates, such as:

- React + ESLint + Typescript (react-eslint-ts)
- React + ESLint + Typescript + TailwindCSS (react-eslint-ts-tw)
- Next.js + ESLint + Typescript (next-eslint-ts)
- Next.js + ESLint + Typescript + TailwindCSS (next-eslint-ts-tw)

To get started, use the following command:

## Interactive

You can create a new project interactively by running:

```bash
npx create-javalce-app
# or
yarn create javalce-app
# or
pnpm create javalce-app
```

## Non-interactive

You can also pass command line arguments to set up a new project non-interactively. See `create-javalce-app --help`:

```bash
create-javalce-app [options]

Options:
    -V, --version          output the version number
    -h, --help             display help for command
    -t, --template <name>  template to use (default: "react-eslint-ts")
    -n, --name <name>      name of the project (default: "my-project")
```

## Questions?

If you have any questions, feel free to open an issue or contact me on [X](https://x.com/javalce29).
