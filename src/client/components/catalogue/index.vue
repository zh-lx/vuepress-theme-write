<script setup lang="ts">
import { toRefs } from 'vue';
import CatalogueItems from './CatalogueItems.vue';

const props = defineProps({
  showCatalogues: {
    type: Boolean,
    required: true,
  },
});

const { showCatalogues } = toRefs(props);
</script>

<template>
  <aside
    :class="`catalogues ${showCatalogues ? 'catalogues-open' : ''}`"
    id="catalogues-aside"
  >
    <CatalogueItems />
  </aside>
</template>

<style lang="scss">
@import '~@/styles/_variables.scss';

.catalogues {
  position: fixed;
  z-index: 7;
  transition: all 0.3s ease;
  top: calc($navbarHeight + 20px);
  right: 0;
  max-height: calc(100vh - $navbarHeight - 20px);
  overflow: scroll;
  width: $catalogueWidth;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    line-height: 1;
  }

  a {
    display: inline-block;
  }
}

@media (max-width: $MQNarrow) {
  .catalogues {
    width: 0;
    top: calc($navbarHeight + 70px);
    max-height: calc(100vh - $navbarHeight - 70px);
  }

  .catalogues-open {
    width: $catalogueWidth;
  }
}
</style>
