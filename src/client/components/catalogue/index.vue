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
    <div class="catalogue-title">On This Page</div>
    <div class="catalogue-items catalogue-items-list">
      <CatalogueItems />
    </div>
  </aside>
</template>

<style lang="scss">
@import '~@/styles/_variables.scss';

.catalogues {
  max-height: 100vh;
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
    transition: color 0.15s ease;
    font-size: 14px;
    font-weight: bold;
    padding: 6px 8px 6px 0;
    width: 100%;
    margin-top: 16px;
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
  padding-left: 20px;
}

@media (max-width: $MQNarrow) {
  .catalogues {
    position: absolute;
    visibility: hidden;
  }
}

@media (max-width: $MQMobileNarrow) {
  .catalogues-open {
    background: var(--wc-bg-common);
  }
}
</style>
