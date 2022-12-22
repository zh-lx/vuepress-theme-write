import type { Page, Theme } from '@vuepress/core';
import { createPage } from '@vuepress/core';
import { activeHeaderLinksPlugin } from '@vuepress/plugin-active-header-links';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { containerPlugin } from '@vuepress/plugin-container';
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon';
import { gitPlugin } from '@vuepress/plugin-git';
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom';
import { nprogressPlugin } from '@vuepress/plugin-nprogress';
import { palettePlugin } from '@vuepress/plugin-palette';
import { prismjsPlugin } from '@vuepress/plugin-prismjs';
import { themeDataPlugin } from '@vuepress/plugin-theme-data';
import { searchPlugin } from '@vuepress/plugin-search';
import { fs, getDirname, path } from '@vuepress/utils';
import type {
  DefaultThemeLocaleOptions,
  DefaultThemePageData,
  DefaultThemePluginsOptions,
} from '../shared/index';
import {
  assignDefaultLocaleOptions,
  resolveContainerPluginOptions,
} from './utils/index';

const __dirname = getDirname(import.meta.url);

export interface DefaultThemeOptions extends DefaultThemeLocaleOptions {
  /**
   * To avoid confusion with the root `plugins` option,
   * we use `themePlugins`
   */
  themePlugins?: DefaultThemePluginsOptions;
}

export const defaultTheme = ({
  themePlugins = {},
  ...localeOptions
}: DefaultThemeOptions = {}): Theme => {
  assignDefaultLocaleOptions(localeOptions);

  // if (localeOptions.type !== 'docs') {
  //   createPages(path.resolve(process.cwd(), localeOptions.docsDir || './docs'));
  // }

  return {
    name: 'vuepress-theme-write',

    templateBuild: path.resolve(__dirname, '../../templates/build.html'),

    alias: {
      '@': path.resolve(__dirname, '../client'),
      HomeFooter: path.resolve(
        __dirname,
        '../client/components/placeholder/HomeRooter.vue'
      ),
      NavbarExtra: path.resolve(
        __dirname,
        '../client/components/placeholder/NavbarExtra.vue'
      ),
      // use alias to make all components replaceable
      ...Object.fromEntries(
        fs
          .readdirSync(path.resolve(__dirname, '../client/components'))
          .filter((file) => file.endsWith('.vue'))
          .map((file) => [
            `@theme/${file}`,
            path.resolve(__dirname, '../client/components', file),
          ])
      ),
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.ts'),

    extendsPage: (page: Page<Partial<DefaultThemePageData>>) => {
      // save relative file path into page data to generate edit link
      page.data.filePathRelative = page.filePathRelative;
      // save title into route meta to generate navbar and sidebar
      page.routeMeta.title = page.title;
    },

    async onInitialized(app) {
      const homePage = await createPage(app, {
        path: '/',
        // 设置 frontmatter
        frontmatter: {
          layout: 'home-page',
          blog: false,
          permalink: '/',
          hideSidebar: true,
        },
      });
      const tagPage = await createPage(app, {
        path: '/page-tag/',
        // 设置 frontmatter
        frontmatter: {
          layout: 'tag-page',
          permalink: '/page-tag/',
        },
      });
      const categoryPage = await createPage(app, {
        path: '/page-category/',
        // 设置 frontmatter
        frontmatter: {
          layout: 'category-page',
          permalink: '/page-category/',
        },
      });
      // 把它添加到 `app.pages`
      app.pages.push(homePage);
      app.pages.push(tagPage);
      app.pages.push(categoryPage);
    },

    plugins: [
      // @vuepress/plugin-active-header-link
      themePlugins.activeHeaderLinks !== false
        ? activeHeaderLinksPlugin({
            headerLinkSelector: 'a.sidebar-item',
            headerAnchorSelector: '.header-anchor',
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-back-to-top
      themePlugins.backToTop !== false ? backToTopPlugin() : [],

      // @vuepress/plugin-container
      themePlugins.container?.tip !== false
        ? containerPlugin(resolveContainerPluginOptions(localeOptions, 'tip'))
        : [],
      themePlugins.container?.warning !== false
        ? containerPlugin(
            resolveContainerPluginOptions(localeOptions, 'warning')
          )
        : [],
      themePlugins.container?.danger !== false
        ? containerPlugin(
            resolveContainerPluginOptions(localeOptions, 'danger')
          )
        : [],
      themePlugins.container?.details !== false
        ? containerPlugin({
            type: 'details',
            before: (info) =>
              `<details class="custom-container details">${
                info ? `<summary>${info}</summary>` : ''
              }\n`,
            after: () => '</details>\n',
          })
        : [],
      themePlugins.container?.codeGroup !== false
        ? containerPlugin({
            type: 'code-group',
            before: () => `<CodeGroup>\n`,
            after: () => '</CodeGroup>\n',
          })
        : [],
      themePlugins.container?.codeGroupItem !== false
        ? containerPlugin({
            type: 'code-group-item',
            before: (info) => `<CodeGroupItem title="${info}">\n`,
            after: () => '</CodeGroupItem>\n',
          })
        : [],

      // @vuepress/plugin-external-link-icon
      themePlugins.externalLinkIcon !== false
        ? externalLinkIconPlugin({
            locales: Object.entries(localeOptions.locales || {}).reduce(
              (result, [key, value]) => {
                result[key] = {
                  openInNewWindow:
                    value.openInNewWindow ?? localeOptions.openInNewWindow,
                };
                return result;
              },
              {}
            ),
          })
        : [],

      // @vuepress/plugin-git
      themePlugins.git !== false
        ? gitPlugin({
            createdTime: false,
            updatedTime: localeOptions.lastUpdated !== false,
            contributors: localeOptions.contributors !== false,
          })
        : [],

      // @vuepress/plugin-medium-zoom
      themePlugins.mediumZoom !== false
        ? mediumZoomPlugin({
            selector:
              '.theme-default-content > img, .theme-default-content :not(a) > img',
            zoomOptions: {},
            // should greater than page transition duration
            delay: 300,
          })
        : [],

      // @vuepress/plugin-nprogress
      themePlugins.nprogress !== false ? nprogressPlugin() : [],

      // @vuepress/plugin-palette
      palettePlugin({ preset: 'sass' }),

      // @vuepress/plugin-prismjs
      themePlugins.prismjs !== false ? prismjsPlugin() : [],

      // @vuepress/plugin-theme-data
      themeDataPlugin({ themeData: localeOptions }),

      searchPlugin({}),
    ],
  };
};
