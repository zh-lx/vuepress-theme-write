const { path } = require('@vuepress/utils');
import type { Theme, ThemeConfig } from '@vuepress/core';
import type {
  DefaultThemeLocaleOptions,
  DefaultThemePluginsOptions,
} from '@/types';
import { createPages } from './client/utils/createPage';
const defaultThemeConfig = require('./themeConfig');
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

const VuePressTheme: Theme<DefaultThemeOptions> = (
  { themePlugins = {}, ...localeOptions },
  app
) => {
  if (app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        css: {
          preprocessorOptions: {
            scss: { charset: false },
          },
        },
      }
    );
  }

  const themeConfig = { ...defaultThemeConfig, ...localeOptions };

  if (themeConfig.type !== 'docs') {
    createPages(path.resolve(process.cwd(), themeConfig.docsDir || './docs'));
  }

  assignDefaultLocaleOptions(themeConfig);

  return {
    name: '@vuepress/theme-writing',
    layouts: path.resolve(__dirname, './client/layouts'),
    clientAppEnhanceFiles: path.resolve(
      __dirname,
      './client/clientAppEnhance.ts'
    ),
    clientAppSetupFiles: path.resolve(__dirname, './client/clientAppSetup.ts'),
    extendsPage: (page) => {
      // save relative file path into page data to generate edit link
      (page.data as any).filePathRelative = page.filePathRelative;
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title;
    },

    alias: {
      '@': path.resolve(__dirname, './client'),
      HomeFooter: path.resolve(
        __dirname,
        './client/components/home/HomeRooter.vue'
      ),
      ...localeOptions?.alias,
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
  };
};

module.exports = VuePressTheme;
