<script setup lang="ts">
import { useCatalogues } from '@/composables';
import { watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import CatalogueItem from './CatalogueItem.vue';

const catalogueItems = useCatalogues();
const route = useRoute();
// 目录超出页面时，自动跟随滚动
watch(
  () => route.hash,
  (hash) => {
    const activeSidebarItem = document.querySelector(
      `[href="${route.path}${hash}"]`
    );
    const sidebar = document.querySelector('#catalogues-aside');
    if (activeSidebarItem && sidebar) {
      const activeSidebarItemTop =
        activeSidebarItem.getBoundingClientRect().top;
      const activeSidebarItemHeight =
        activeSidebarItem.getBoundingClientRect().height;
      const sidebarTop = sidebar.getBoundingClientRect().top;
      const sidebarHeight = sidebar.getBoundingClientRect().height;
      if (activeSidebarItemTop < sidebarTop) {
        activeSidebarItem.scrollIntoView(true);
      } else if (
        activeSidebarItemTop + activeSidebarItemHeight >
        sidebarTop + sidebarHeight
      ) {
        activeSidebarItem.scrollIntoView(false);
      }
    }
  }
);
</script>

<template>
  <ul v-if="catalogueItems.length" class="sidebar-items catalogue-items">
    <CatalogueItem
      v-for="item in catalogueItems"
      :key="item.link || item.text"
      :item="item"
    />
  </ul>
</template>
<style lang="scss" scoped>
.catalogue-items {
  padding-bottom: 30px;
}
</style>
