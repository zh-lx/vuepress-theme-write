import { h } from 'vue';
import { defineClientAppEnhance } from '@vuepress/client';
import Badge from './components/global/Badge.vue';
import CodeGroup from './components/global/CodeGroup';
import CodeGroupItem from './components/global/CodeGroupItem.vue';
import ExternalLinkIcon from './components/global/ExternalLinkIcon.vue';
import LayoutContainer from '@/components/global/LayoutContainer.vue';
import Loading from '@/components/global/Loading.vue';
import Home from '@/components/home/index.vue';
import '@/layouts/HomePage.vue';
import { useScrollPromise } from './composables';

import './styles/index.scss';
export default defineClientAppEnhance(({ app, router }) => {
  app.component('Loading', Loading);
  app.component('Home', Home);
  app.component('LayoutContainer', LayoutContainer);
  app.component('Badge', Badge);
  app.component('CodeGroup', CodeGroup);
  app.component('CodeGroupItem', CodeGroupItem);
  // override the `<ExternalLinkIcon>` provided by @vuepress/plugin-external-link-icon
  delete app._context.components.ExternalLinkIcon;
  app.component('ExternalLinkIcon', ExternalLinkIcon);
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
  const scrollBehavior = router.options.scrollBehavior;
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});
