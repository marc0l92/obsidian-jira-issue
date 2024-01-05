# How to develop

## Install dependencies

```bash
pnpm install
```

## Watch changes and build

```bash
# Continuous build
pnpm run dev

# Continuous testing
pnpm run test-watch
```

## Publish new release

- Define the new version to use x.y.z
- Run `npm run version x.y.z`
- Commit and push the file modified
- Tag the commit `git tag x.y.z`
- Push the tag `git push --tags`