<script setup lang="ts">
import CatalogueItems from './CatalogueItems.vue';
</script>

<template>
  <aside class="catalogues" id="catalogues-aside">
    <CatalogueItems />
  </aside>
</template>

<style lang="scss">
@import '~@/styles/_variables.scss';

.catalogues {
  position: fixed;
  top: calc($navbarHeight + 20px);
  bottom: 60px;
  overflow: scroll;
  right: 28px;
  width: $catalogueWidth;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }
}
</style>
