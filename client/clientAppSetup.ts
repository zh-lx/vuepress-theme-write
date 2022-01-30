import { defineClientAppSetup } from '@vuepress/client';
import { setupDarkMode, setupSidebarItems } from '@/composables';

export default defineClientAppSetup(() => {
  // we need to access sidebar items in multiple components
  // so we make it global computed
  setupDarkMode();
  setupSidebarItems();
});
