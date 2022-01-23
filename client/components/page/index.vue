<script setup lang="ts">
import PageMeta from './PageMeta.vue';
import PageNav from './PageNav.vue';
import Catalogues from '@/components/catalogue/index.vue';
</script>

<template>
  <main class="page">
    <slot name="top" />

    <div class="page-container">
      <div class="theme-default-content">
        <Content />
        <PageMeta />
        <PageNav />
      </div>
      <Catalogues />
    </div>

    <slot name="bottom" />
  </main>
</template>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';

.page {
  padding-bottom: 2rem;
  display: block;
  background: var(--page-bgc);
  .page-container {
    width: 100%;
    padding-right: calc($catalogueWidth + 28px);
  }
}
</style>
