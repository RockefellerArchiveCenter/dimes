# DIMES

A React web application which provides the front-end user interface for the online discovery of archival collections, objects, and agents at the Rockefeller Archive Center.

DIMES is part of [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron), an initiative to build sustainable, open and user-centered infrastructure for the archival management of digital records at the [Rockefeller Archive Center](http://rockarch.org/).

## Configuring DIMES
In order to support a variety of use cases, there are several configuration options in DIMES which can be activated or deactivated as desired.

### Aeon Reading Room Integration

Available dates for reading rooms can be pulled from Aeon via the request broker by setting the `VITE_ENABLE_READING_ROOM_SELECT` environment variable. Not setting this environment variable or leaving it blank will disable this feature. Setting this environment variable to any string will activate it.

### Duplication Request Limits

It is possible to limit the number of duplication requests a user can submit at once by setting the `VITE_DUPLICATION_REQUEST_LIMIT` environment variable.  Not setting this environment variable or leaving it blank will disable this feature.

## Local Development

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/dimes.git

Install dependencies and run the development server:

    $ yarn install
    $ yarn start

The development server runs at http://localhost:5173.

To build for production and preview the result locally:

    $ yarn build
    $ yarn preview

### Linting

The repository uses [ESLint](https://eslint.org/) with flat config
(`eslint.config.mjs`), including the `react`, `react-hooks` and `jsx-a11y` plugins.

    $ yarn lint

A [Husky](https://typicode.github.io/husky/) pre-commit hook runs `yarn lint` before each commit. Errors block the commit, but warnings do not.

### Tests

The repository uses [Vitest](https://vitest.dev/) with [Testing Library](https://testing-library.com/) and a jsdom environment, configured in the `test` block of `vite.config.mjs`.

    $ yarn test

### Visual regression testing

The repository includes [BackstopJS](https://github.com/garris/BackstopJS) to test visual changes to the site by comparing a set of reference images for different screen sizes. Anytime the CSS styles are changed, use BackstopJS to test locally:

1. Run the development server: `yarn start`
2. Run [Docker](https://www.docker.com/).
3. In another terminal, run the BackstopJS tests: `yarn backstop-test`.
4. Review the results in the browser and look at the diff of any failed tests.
5. To update the reference image files with the results of the last test images use: `yarn backstop-approve`. Subsequent tests will be compared against these updated reference files.
6. Commit any updated reference images to the repository so that future tests will be compared against the most recent images.

To add or update reference images, edit the scenarios in `backstop.json` and run `yarn backstop-reference`.

### Translation development

The repository includes [linguijs](https://lingui.dev/) which is an [Open-source](https://github.com/lingui/js-lingui) Internationalization Framework.  This allows you to translate static UI elements into other languages.

DIMES is currently translated into the following languages:
  * Chinese (Simplified)
  * French
  * German
  * Italian
  * Japanese
  * Korean
  * Portuguese (Brazilian)
  * Spanish
  * Turkish

Lingui requires a configuration file (located in the base directory and named `lingui.config.js`). See the [official documentation](https://lingui.dev/ref/conf) for full instructions on configuration.

DIMES uses a [macro implementation](https://lingui.dev/guides/message-extraction#macro-usages) for message extraction. This means that all text with a `<Trans></Trans>` block will be automatically extracted for localization files.

#### Adding a new language

1. If adding a new language translation, add a new directory named after the language's ISO 639-1 code to
  `/src/locales/`. Then add that ISO 639-1 code to the `locales` array in `lingui.config.js`.
2. Run `$ yarn lingui-extract` to extract translation strings from application code. This command
  will automatically generate a `messages.po` file in the language's `/src/locales/` directory.
3. Add translations to each `msgstr` line in the created `messages.po`.
4. Run `$ yarn lingui-compile` to compile the locale files into Javascript files which are used by the application
  to present translated strings. This command should be run whenever changes are made to any of the
  locale files.
5. Commit updated code to the GitHub repository.

#### Updating HTML structure

1. If adding a new HTML element for translation, first make sure that the file includes
  `import { Trans } from "@lingui/react/macro";` for JSX, or
  `import { t } from "@lingui/core/macro";` for strings outside JSX (button labels, placeholders, aria-labels).
2. Wrap the desired string to transform in the `<Trans>` macro if adding a new element, or update
  the HTML structure within an already existing `<Trans>` tag.
3. Run `$ yarn lingui-extract` to add or update any translation strings from the updated HTML structure.
  Failure to run this will result in translated strings being presented as random numbers and letters in the built application. This command's output will also show any translation items without translations. If you have removed
  translation strings you may want to run `yarn lingui-extract --clean` which will remove any missing strings from the `messages.po` file.
4. Update or add `msgstr` lines in all `messages.po` files based on the changes.
5. Run `$ yarn lingui-compile` to update the locale files into Javascript files which are used by the application
  to present translated strings.
6. Commit updated code to the GitHub repository.

#### Changing translation strings

1. Open the desired `messages.po` file in the desired language's `/src/locales/` directory.
2. Find and update the desired `msgstr` translation.
3. Save the updated `messages.po` file.
4. Run `$ yarn lingui-compile` to update the locale files into Javascript files which are used by the application
  to present translated strings.
5. Commit updated code to the GitHub repository.

## License

This code is released under an [MIT License](LICENSE).
