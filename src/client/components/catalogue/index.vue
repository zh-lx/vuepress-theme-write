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
    :class="`catalogues ${
      showCatalogues ? 'catalogues-open' : 'catalogues-close'
    }`"
    id="catalogues-aside"
  >
    <div class="catalogue-title">On This Page</div>
    <div class="catalogue-items catalogue-items-list">
      <CatalogueItems />
    </div>
  </aside>
</template>

<style lang="scss">
@import '~@/styles/_variables.scss';
.catalogues {
  transition: all 0.3s ease;
  max-height: 100vh;
  width: $catalogueWidth;
  padding-left: 20px;
  padding-right: 22px;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  padding-top: $navbarHeight;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  .catalogue-items-list {
    max-height: calc(100vh - 70px);
    overflow: auto;
    flex: 1;
    &::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
    }
  }

  .catalogue-title {
    color: var(--wc-text-primary);
    font-size: 14px;
    font-weight: bold;
    padding: 6px 8px 6px 0;
    width: 100%;
    margin-top: 16px;
    word-break: keep-all;
    white-space: nowrap;
    transition: none;
    overflow: hidden;
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

.catalogues-close {
  width: 0;
  overflow: hidden;
  padding-right: 0;
  padding-left: 0;
}

@media (max-width: $MQNarrow) {
  .catalogues {
    /* position: absolute;
    visibility: hidden; */
    width: 0;
    overflow: hidden;
  }
  .catalogues-open {
    width: $catalogueWidth;
  }
}

@media (max-width: $MQMobileNarrow) {
  .catalogues {
    position: fixed;
    background: var(--wc-bg-common);
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 5;
  }
}

@media (min-width: $maxWidth) {
  .catalogues {
    width: $catalogueWidth !important;
    padding-right: 22px !important;
    padding-left: 20px !important;
  }
}
</style>
