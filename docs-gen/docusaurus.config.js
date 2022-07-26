// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Obsidian Jira Issue',
  tagline: 'Track the progress of Atlassian Jira issues from your Obsidian notes',
  url: 'https://marc0l92.github.io',
  trailingSlash: false,
  baseUrl: '/obsidian-jira-issue/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'marc0l92', // Usually your GitHub org/user name.
  projectName: 'obsidian-jira-issue', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Obsidian Jira Issue',
        // logo: {
        //   alt: 'obsidian-jira-issue',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'doc',
            docId: 'get-started/introduction',
            position: 'left',
            label: 'Get Started',
          },
          {
            type: 'doc',
            docId: '/category/configuration',
            position: 'left',
            label: 'Configuration',
          },
          {
            type: 'doc',
            docId: '/category/components',
            position: 'left',
            label: 'Components',
          },
          {
            href: 'https://ko-fi.com/marc0l92',
            label: 'Buy me a coffee',
            position: 'right',
          },
          {
            href: 'https://github.com/marc0l92/obsidian-jira-issue',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Get Started',
                to: '/docs/get-started/introduction',
              },
              {
                label: 'Components',
                to: '/docs/category/components',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/marc0l92',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} obsidian-jira-issue. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    plugins: [],
    themes: [
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        {
          hashed: true,
        },
      ],
    ],
};

module.exports = config;
