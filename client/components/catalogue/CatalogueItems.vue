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
    nextTick(() => {
      const containerBound = document
        .querySelector('#catalogues-aside')
        .getBoundingClientRect();
      const target = Array.from(document.querySelectorAll('a.active'))?.filter(
        (a) => {
          return decodeURIComponent((a as HTMLLinkElement).href).endsWith(
            decodeURIComponent(val.currentRoute?.value?.fullPath)
          );
        }
      )?.[0];
      const targetBound = target?.getBoundingClientRect();
      if (targetBound.top < containerBound.top) {
        target.scrollIntoView(true);
      } else if (targetBound.top > containerBound.top + containerBound.height) {
        target.scrollIntoView(false);
      }
    });
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
  padding: 12px 0;
}
</style>
