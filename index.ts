const { path } = require('@vuepress/utils');
import type { Theme, ThemeConfig } from '@vuepress/core';
import type {
  DefaultThemeLocaleOptions,
  DefaultThemePluginsOptions,
} from '@/types';
import { createPages } from './utils/createPage';
const themeConfig = require('./themeConfig');
const {
  assignDefaultLocaleOptions,
  resolveActiveHeaderLinksPluginOptions,
  resolveContainerPluginOptions,
  resolveContainerPluginOptionsForDetails,
  resolveContainerPluginOptionsForCodeGroup,
  resolveContainerPluginOptionsForCodeGroupItem,
  resolveGitPluginOptions,
  resolveMediumZoomPluginOptions,
} = require('./node');

export interface DefaultThemeOptions
  extends ThemeConfig,
    DefaultThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: DefaultThemePluginsOptions;
}

assignDefaultLocaleOptions(themeConfig);

createPages(path.resolve(__dirname, '../docs'));

const VuePressTheme: Theme<DefaultThemeOptions> = (
  { themePlugins = {}, ...localeOptions },
  app
) => ({
  name: '@vuepress/theme-writing',
  layouts: path.resolve(__dirname, './layouts'),
  clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.ts'),
  clientAppSetupFiles: path.resolve(__dirname, './clientAppSetup.ts'),
  extendsPageData: ({ filePathRelative }) => ({ filePathRelative }),
  alias: {
    '@': path.resolve(__dirname, './'),
  },
  plugins: [
    [
      '@vuepress/active-header-links',
      resolveActiveHeaderLinksPluginOptions(themePlugins),
    ],
    ['@vuepress/back-to-top'],
    [
      '@vuepress/container',
      resolveContainerPluginOptions(themePlugins, themeConfig, 'tip'),
    ],
    [
      '@vuepress/container',
      resolveContainerPluginOptions(themePlugins, themeConfig, 'warning'),
    ],
    [
      '@vuepress/container',
      resolveContainerPluginOptions(themePlugins, themeConfig, 'danger'),
    ],
    [
      '@vuepress/container',
      resolveContainerPluginOptionsForDetails(themePlugins),
    ],
    [
      '@vuepress/container',
      resolveContainerPluginOptionsForCodeGroup(themePlugins),
    ],
    [
      '@vuepress/container',
      resolveContainerPluginOptionsForCodeGroupItem(themePlugins),
    ],
    ['@vuepress/git', resolveGitPluginOptions(themePlugins, themeConfig)],
    ['@vuepress/external-link-icon', themePlugins.externalLinkIcon !== false],
    ['@vuepress/medium-zoom', resolveMediumZoomPluginOptions(themePlugins)],
    ['@vuepress/nprogress'],
    ['@vuepress/palette', { preset: 'sass' }],
    ['@vuepress/prismjs'],
    [
      '@vuepress/theme-data',
      {
        themeData: themeConfig,
      },
    ],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
        },
      },
    ],
  ],
});

module.exports = VuePressTheme;
