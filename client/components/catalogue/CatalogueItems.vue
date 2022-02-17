<script setup lang="ts">
import { useCatalogues } from '@/composables';
import { watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import CatalogueItem from './CatalogueItem.vue';

const catalogueItems = useCatalogues();
const route = useRouter();
// 目录超出页面时，自动跟随滚动
watch(
  () => route,
  (val) => {
    watch(
      () => route,
      (val) => {
        console.log(val.currentRoute.value);
        const activeSidebarItem = document.querySelector(
          `[href="${val.currentRoute.value.path}${val.currentRoute.value.hash}"]`
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
      },
      {
        deep: true,
      }
    );
  },
  {
    deep: true,
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
  background-color: var(--common-bgc);
  padding-bottom: 30px;
}
</style>
