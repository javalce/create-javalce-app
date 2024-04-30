# Create Javalce App

Based on [create-appncy](https://github.com/goncy/create-appncy).

This CLI tool enables you to create projects using the templates I use for my projects preconfigured with ESLint and Prettier. To get started, use the following command:

## Interactive

You can create a new project interactively by running:

```bash
pnpm create javalce-app
```

You will be asked for the name of your project, then select the template you want to use. Currently supported templates are:

- Next.js (next-ts)
- Next.js with Tailwind CSS (next-ts-tw)
- React (react-ts)
- React with Tailwind CSS (react-ts-tw)
- Node.js (node-ts)
- Vanilla JS (vanilla-ts)
- Vanilla JS with Tailwind CSS (vanilla-ts-tw)

All templates come with TypeScript, ESLint and Prettier preconfigured.

## Non-interactive

You can also pass command line arguments to set up a new project non-interactively. See `create-javalce-app --help`:

```bash
create-javalce-app [options]

Options:
    --version              Output the version number
    --help                 Display help for command
    -n, --name <name>      Name of the project (default: "my-project")
    -t, --template <name>  Template to use (default: "react-ts")
```

## Questions?

If you have any questions, feel free to open an issue or contact me on [X](https://x.com/javalce29).
