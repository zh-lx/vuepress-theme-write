<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import type { PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ResolvedSidebarItem, NavLink } from '@/types';
import { isActiveCatalogueItem } from '@/utils';
import AutoLink from '@/components/auto-link/index.vue';

const props = defineProps({
  item: {
    type: Object as PropType<ResolvedSidebarItem>,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
});

const { item, depth } = toRefs(props);

const route = useRoute();
const router = useRouter();

const isActive = computed(() => isActiveCatalogueItem(item.value, route));
const itemClass = computed(() => ({
  'sidebar-link': true,
  'sidebar-item': true,
  'sidebar-heading': depth.value === 0,
  'catalogue-link-item': true,
  [`catalogue-level-${depth.value}`]: true,
  active: isActive.value,
  'active-catalogue': isActive.value,
  collapsible: item.value.collapsible,
}));

const isOpen = ref(true);
const onClick = ref<(() => void) | undefined>(undefined);

if (item.value.collapsible) {
  // active item is open by default
  isOpen.value = isActive.value;
  // toggle open status on click
  onClick.value = () => {
    isOpen.value = !isOpen.value;
  };
  // reset open status after navigation
  router.afterEach(() => {
    isOpen.value = isActive.value;
  });
}
</script>

<template>
  <li class="catalogue-li">
    <AutoLink v-if="item.link" :class="itemClass" :item="(item as NavLink)" />

    <ul v-show="isOpen">
      <CatalogueItem
        v-for="child in item.children"
        :key="`${depth}${child.text}${child.link}`"
        :item="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>

<style scoped lang="scss">
.catalogue-link-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1;
}
.catalogue-link-item:not(.sidebar-heading) {
  border-left: var(--color-border-2);
  display: block;
}
.catalogue-link-item.active {
  border-left-color: var(--blue-6);
  border-left-width: 2px;
  display: block;
}
.catalogue-li {
  padding: 0 auto;
  line-height: 1;
}
.active-catalogue {
  background-color: var(--selected-bgc);
}
.catalogue-level-1 {
  padding-left: 8px !important;
}
.catalogue-level-2 {
  padding-left: 22px !important;
}
.catalogue-level-3 {
  padding-left: 36px !important;
}
.catalogue-level-4 {
  padding-left: 50px !important;
}
.catalogue-level-5 {
  padding-left: 64px !important;
}
.catalogue-level-6 {
  padding-left: 78px !important;
}
</style>
