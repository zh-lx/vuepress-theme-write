<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MenuFoldOne from '@/assets/menu-fold-one.vue';
import MenuUnfoldOne from '@/assets/menu-unfold-one.vue';
import PageMeta from './PageMeta.vue';
import PageNav from './PageNav.vue';
import Catalogues from '@/components/catalogue/index.vue';

const showCatalogues = ref(false);

onMounted(() => {
  showCatalogues.value = window.innerWidth >= 960;
});

const changeCataloguesVisibility = () => {
  showCatalogues.value = !showCatalogues.value;
};

const hidePageMeta = $Site?.hidePageMeta;
</script>

<template>
  <main class="page">
    <slot name="top" />

    <div
      :class="`page-container ${showCatalogues ? 'page-container-thin' : ''}`"
    >
      <div class="theme-default-content">
        <Content class="wc-content" />
        <PageMeta v-if="!hidePageMeta" />
        <PageNav />
      </div>
    </div>

    <slot name="bottom" />
  </main>
</template>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';

.page {
  display: block;
}

.theme-default-content {
  color: var(--wc-text-primary);
  min-height: 100vh;
  .wc-content {
    width: 100%;
  }
}
.page-container {
  width: 100%;
  transition: all 0.3s ease;
}

.catalogue-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  background-color: var(--wc-bg-mask);
  top: 0;
  left: 0;
  display: none;
}

@media (max-width: $MQMobileNarrow) {
  .page-container {
    width: 100%;
    padding-right: 0;
  }

  .page-container-thin {
    padding-right: 0;
  }

  .catalogue-mask {
    display: block;
  }
}
</style>
