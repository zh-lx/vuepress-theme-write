import { defineClientConfig } from '@vuepress/client';
import { h } from 'vue';
import Badge from '@/components/global/Badge.vue';
import CodeGroup from '@/components/global/CodeGroup';
import CodeGroupItem from '@/components/global/CodeGroupItem.vue';
// import ExternalLinkIcon from '@/components/global/ExternalLinkIcon.vue';
import Loading from '@/components/global/Loading.vue';

import {
  setupDarkMode,
  setupSidebarItems,
  useScrollPromise,
} from './composables/index.ts';
import Layout from './layouts/Layout.vue';
import NotFound from './layouts/NotFound.vue';
import HomePage from './layouts/home-page.vue';
import CategoryPage from './layouts/category-page.vue';
import TagPage from './layouts/tag-page.vue';

import './styles/index.scss';

export default defineClientConfig({
  enhance({ app, router }) {
    app.component('Loading', Loading);
    app.component('Badge', Badge);
    app.component('CodeGroup', CodeGroup);
    app.component('CodeGroupItem', CodeGroupItem);

    // compat with @vuepress/plugin-external-link-icon
    app.component('AutoLinkExternalIcon', () => {
      const ExternalLinkIcon = app.component('ExternalLinkIcon');
      if (ExternalLinkIcon) {
        return h(ExternalLinkIcon);
      }
      return null;
    });

    // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
    app.component('NavbarSearch', () => {
      const SearchComponent =
        app.component('Docsearch') || app.component('SearchBox');
      if (SearchComponent) {
        return h(SearchComponent);
      }
      return null;
    });

    // handle scrollBehavior with transition
    const scrollBehavior = router.options.scrollBehavior!;
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();
      return scrollBehavior(...args);
    };
  },

  setup() {
    setupDarkMode();
    setupSidebarItems();
  },

  layouts: {
    Layout,
    NotFound,
    'home-page': HomePage,
    'category-page': CategoryPage,
    'tag-page': TagPage,
  },
});
