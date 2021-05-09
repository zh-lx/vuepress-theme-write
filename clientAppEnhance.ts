import { h } from 'vue';
import { defineClientAppEnhance } from '@vuepress/client';
import Badge from './components/global/Badge.vue';
import CodeGroup from './components/global/CodeGroup';
import CodeGroupItem from './components/global/CodeGroupItem.vue';
import OutboundLink from './components/global/OutboundLink.vue';
import LayoutContainer from '@/components/global/LayoutContainer.vue';
import Loading from '@/components/global/Loading.vue';
import Home from '@/components/Home.vue';
import '@/layouts/HomePage.vue';
import { useScrollPromise } from './composables';

import 'easy-icon/easy-icon-all.js';

import './styles/index.scss';
export default defineClientAppEnhance(({ app, router }) => {
  app.component('Loading', Loading);
  app.component('Home', Home);
  app.component('LayoutContainer', LayoutContainer);
  app.component('Badge', Badge);
  app.component('CodeGroup', CodeGroup);
  app.component('CodeGroupItem', CodeGroupItem);
  // unregister the built-in `<OutboundLink>` to avoid warning
  delete app._context.components.OutboundLink;
  // override the built-in `<OutboundLink>`
  app.component('OutboundLink', OutboundLink);
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
