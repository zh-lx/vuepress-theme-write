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
    <div class="catalogue-top"></div>
    <div class="catalogue-items">
      <CatalogueItems />
    </div>
  </aside>
</template>

<style lang="scss">
@import '~@/styles/_variables.scss';

.catalogues {
  position: fixed;
  z-index: 7;
  transition: all 0.3s ease;
  top: $navbarHeight;
  right: 0;
  max-height: calc(100vh - $navbarHeight);
  width: 0;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  .catalogue-top {
    height: 70px;
  }
  .catalogue-items {
    max-height: calc(100vh - $navbarHeight - 70px);
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
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

.catalogues-open {
  width: $catalogueWidth;
}

@media (max-width: $MQMobileNarrow) {
  .catalogues-open {
    background: var(--wc-bg-common);
  }
}
</style>
