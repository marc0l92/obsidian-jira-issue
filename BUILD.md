# Build Instructions for Obsidian Jira Issue Plugin

This document provides comprehensive instructions for building, testing, and developing the Obsidian Jira Issue plugin.

> **Note:** This is a fork of the original [marc0l92/obsidian-jira-issue](https://github.com/marc0l92/obsidian-jira-issue) repository. The build instructions and process remain the same, but the repository URL has been updated to reflect this fork.

## Project Overview

The Obsidian Jira Issue plugin is a TypeScript-based Obsidian plugin that allows users to track Atlassian Jira issues directly from their Obsidian notes. The plugin supports various markdown components including `jira-issue`, `jira-search`, `jira-count`, and inline issue rendering.

## Prerequisites

Before building the plugin, ensure you have the following installed:

- **Node.js** (version 18 or higher recommended)
- **npm** or **pnpm** (package manager)
- **Git** (for version control)

## Project Structure

```
obsidian-jira-issue/
├── src/                    # TypeScript source code
│   ├── main.ts            # Main plugin entry point
│   ├── api/               # API modules
│   ├── client/            # Jira client implementation
│   ├── rendering/         # Markdown renderers
│   ├── interfaces/        # TypeScript interfaces
│   └── ...
├── test/                  # Test files
├── assets/                # Plugin assets and images
├── docs-gen/              # Documentation generation
├── main.js                # Compiled output (generated)
├── manifest.json          # Plugin manifest
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── esbuild.config.mjs     # Build configuration
└── jest.config.js         # Test configuration
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/doteltech/obsidian-jira-issue.git
   cd obsidian-jira-issue
   ```

2. **Install dependencies:**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   ```

## Development Build

### Watch Mode (Recommended for Development)

For continuous development with automatic rebuilding on file changes:

```bash
# Using pnpm
pnpm run dev

# Using npm
npm run dev
```

This command:
- Runs TypeScript compilation with type checking
- Uses esbuild to bundle the code
- Watches for file changes and rebuilds automatically
- Generates source maps for debugging
- Outputs to `main.js`

### Manual Build

To build the plugin once:

```bash
# Using pnpm
pnpm run build

# Using npm
npm run build
```

This command:
- Runs TypeScript type checking (`tsc -noEmit -skipLibCheck`)
- Bundles the code using esbuild in production mode
- Generates optimized output without source maps
- Outputs to `main.js`

## Testing

### Run All Tests

```bash
# Using pnpm
pnpm run test

# Using npm
npm run test
```

### Watch Mode Testing

For continuous testing during development:

```bash
# Using pnpm
pnpm run test-watch

# Using npm
npm run test-watch
```

### Test Coverage

The project is configured to generate test coverage reports. After running tests, coverage reports are available in the `coverage/` directory:

- **HTML Report:** `coverage/lcov-report/index.html`
- **LCOV Report:** `coverage/lcov.info`
- **JSON Report:** `coverage/coverage-final.json`

## Build Configuration

### TypeScript Configuration (`tsconfig.json`)

- **Target:** ES6
- **Module:** ESNext
- **Source Maps:** Inline
- **Strict Mode:** Enabled
- **Libraries:** DOM, ES5, ES6, ES7

### ESBuild Configuration (`esbuild.config.mjs`)

- **Entry Point:** `src/main.ts`
- **Output:** `main.js`
- **Format:** CommonJS
- **Target:** ES2020
- **External Dependencies:** Obsidian API, Electron, CodeMirror modules
- **Tree Shaking:** Enabled
- **Source Maps:** Inline (dev) / Disabled (production)

## Plugin Installation in Obsidian

### Development Installation

1. **Build the plugin:**
   ```bash
   pnpm run build
   ```

2. **Copy files to Obsidian vault:**
   - Copy `main.js` to your vault's `.obsidian/plugins/obsidian-jira-issue/` directory
   - Copy `manifest.json` to the same directory
   - Copy `styles.css` to the same directory (if present)

3. **Enable the plugin:**
   - Open Obsidian
   - Go to Settings → Community Plugins
   - Enable "Jira Issue" plugin

### Production Installation

The plugin can be installed from the Obsidian Community Plugins browser:
1. Open Obsidian
2. Go to Settings → Community Plugins → Browse
3. Search for "jira-issue"
4. Install and enable the plugin

## Version Management

### Updating Version

To update the plugin version:

```bash
# Using pnpm
pnpm run version x.y.z

# Using npm
npm run version x.y.z
```

This command:
- Updates `package.json` version
- Updates `manifest.json` version
- Updates `versions.json` with the new version and minimum app version

### Release Process

1. **Update version:**
   ```bash
   pnpm run version x.y.z
   ```

2. **Commit changes:**
   ```bash
   git add package.json manifest.json versions.json
   git commit -m "Bump version to x.y.z"
   ```

3. **Create and push tag:**
   ```bash
   git tag x.y.z
   git push --tags
   ```

## Documentation

### Building Documentation

The project includes a documentation site built with Docusaurus:

```bash
cd docs-gen
pnpm install
pnpm build
```

Documentation files are located in `docs-gen/docs/` and can be edited in Markdown format.

## Troubleshooting

### Common Issues

1. **TypeScript compilation errors:**
   - Ensure all dependencies are installed: `pnpm install`
   - Check TypeScript configuration in `tsconfig.json`
   - Run type checking: `npx tsc --noEmit`

2. **Build failures:**
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
   - Check for syntax errors in source files
   - Verify all imports are correct

3. **Test failures:**
   - Ensure test environment is properly configured
   - Check Jest configuration in `jest.config.js`
   - Verify test data in `test/testData.ts`

4. **Plugin not loading in Obsidian:**
   - Verify `main.js` and `manifest.json` are in the correct directory
   - Check Obsidian's developer console for errors
   - Ensure the plugin is enabled in Obsidian settings

### Development Tips

- Use the watch mode (`pnpm run dev`) for continuous development
- Check the browser console for runtime errors
- Use TypeScript strict mode for better code quality
- Write tests for new features
- Follow the existing code style and patterns

## Dependencies

### Production Dependencies

- `@codemirror/language` - CodeMirror language support
- `@codemirror/state` - CodeMirror state management
- `@codemirror/view` - CodeMirror view components
- `@lezer/common` - Lezer parser utilities
- `colorsys` - Color system utilities
- `escape-string-regexp` - String escaping utilities
- `moment` - Date manipulation library
- `ms` - Time formatting utilities

### Development Dependencies

- `@types/*` - TypeScript type definitions
- `esbuild` - Fast JavaScript bundler
- `jest` - Testing framework
- `ts-jest` - TypeScript Jest preset
- `typescript` - TypeScript compiler
- `eslint` - Code linting
- `cross-env` - Cross-platform environment variables

## Contributing

1. Create a feature branch: `git checkout -b feature-name`
2. Make your changes
3. Run tests: `pnpm run test`
4. Build the plugin: `pnpm run build`
5. Test in Obsidian
6. Submit a pull request to this repository

> **Note:** If you want to contribute to the original project, please submit your changes to the upstream repository at [marc0l92/obsidian-jira-issue](https://github.com/marc0l92/obsidian-jira-issue).

## License

This project is licensed under the GNU AGPL-3.0-or-later license. See the [LICENSE](LICENSE) file for details.
