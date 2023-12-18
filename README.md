# Create Javalce App

Based on [create-appncy](https://github.com/goncy/create-appncy).

This CLI tool enables you to create projects using the templates I use for my projects preconfigured with ESLint and Prettier. To get started, use the following command:

## Interactive

You can create a new project interactively by running:

```bash
pnpm create javalce-app
```

You will be asked for the name of your project, then whether you want to create a `React` or `Next.js` project, and finally whether you want to add `TailwindCSS` to your project.

```bash
? Select a framework: ... React / Next.js
? Would you like to use Tailwind CSS? .. No / Yes
```

## Non-interactive

You can also pass command line arguments to set up a new project non-interactively. See `create-javalce-app --help`:

```bash
create-javalce-app [options]

Options:
    --version              Output the version number
    -h, --help             Display help for command
    -n, --name <name>      Name of the project (default: "my-project")
    -t, --template <name>  Template to use (default: "react")
    -tw, --tailwind        Add TailwindCSS to the project (default: false)
```

Currently supported templates are:

- `react`: React project with TypeScript, ESLint and Prettier
- `next`: Next.js project with TypeScript, ESLint and Prettier

## Questions?

If you have any questions, feel free to open an issue or contact me on [X](https://x.com/javalce29).
