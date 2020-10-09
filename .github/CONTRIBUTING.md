# Contributing

- [Issue Reporting Guidelines](#issue-reporting-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Development Setup](#development-setup)

## Issue Reporting Guidelines

- If you would like to report a bug, choose "Bug report" when creating a new
  issue in this project, then fill in all the details you can to the best of your
  abilities.

- If you would like to request a new feature, choose "Feature request" when
  creating a new issue in this project. Provide as many details as possible,
  including visual mockups of the feature, descriptions of new user
  interactions, and an explanation of the benefits of the feature.

## Pull Request Guidelines

- The `main` branch is a snapshot of the latest in-flight release. All
  development should be done in dedicated branches.

- Checkout a development branch from the `main` branch. Similarly, submit pull
  requests back to the `main` branch.

- Add your name (and optional email and website) to the
  [contributors.md](https://github.com/lansingcodes/slide/blob/main/contributors.md)
  file as well as the `contributors` section of the
  [package.json](https://github.com/lansingcodes/slide/blob/main/package.json)
  file.  We want people to know you're helping out!

- If adding a new feature, first create an issue by following the instructions
  in the [Issue Reporting Guidelines](#issue-reporting-guidelines).
  Provide convincing reason to add this feature, provide mockups, and ask for
  discussion about the feature from other contributors. 

- If fixing a bug:
  - Add `(fixes #xxxx)` (where #xxxx is the issue id) to the title of your pull
    request. For example, `adjust margins on ultrawide screens (fixes #12)`.
  - Provide a detailed description of the bug in the description of the pull
    request.

## Development Setup

This project uses HTML, JavaScript, Bootstrap 4, and CSS so it can remain
approachable to beginners.

If you have [`npm`](https://npmjs.com) installed on your computer you can use it
to make development a little more convenient. Follow this two-step process:

1. Run `npm install` to download and install the project's dependencies.
2. Run `npm start` to run a web server that will automatically open `index.html`
   in a browser and refresh the browser any time a file changes.

To exit from the `npm start` command, press `Ctrl`+`C`.
