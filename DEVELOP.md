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

## Public Jira servers to use for testing
### Apache
URL: `https://issues.apache.org/jira`
Issues
- AAR-51868
- AAR-51861
## Jira
URL: `https://jira.atlassian.com`
Issues
- CONFSERVER-100764
- ATLAS-164

## Api Documentation
https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-get

## Publish new release

- Make sure test are running: `npm run test`
- Define the new version to use x.y.z
- Run: `npm run version x.y.z`
- Commit and push the file modified
- Tag the commit: `git tag x.y.z`
- Push the tag: `git push --tags`
- Publish to NPM: `npm publish`
