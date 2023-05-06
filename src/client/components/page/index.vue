<script setup lang="ts">
import { ref } from 'vue';
import MenuFoldOne from '@/assets/menu-fold-one.vue';
import MenuUnfoldOne from '@/assets/menu-unfold-one.vue';
import PageMeta from './PageMeta.vue';
import PageNav from './PageNav.vue';
import Catalogues from '@/components/catalogue/index.vue';

const showCatalogues = ref(false);

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
        <Content />
        <PageMeta v-if="!hidePageMeta" />
        <PageNav />
      </div>
      <div
        :class="`catalogue-toggle ${
          showCatalogues ? '' : 'catalogue-toggle-unfold'
        }`"
        @click="changeCataloguesVisibility"
      >
        <menu-fold-one
          theme="outline"
          size="18"
          fill="#606266"
          :strokeWidth="3"
          v-show="showCatalogues"
        />
        <menu-unfold-one
          theme="outline"
          size="18"
          fill="#606266"
          :strokeWidth="3"
          v-show="!showCatalogues"
        />
      </div>
      <Catalogues :showCatalogues="showCatalogues" />
    </div>

    <slot name="bottom" />
  </main>
</template>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';

.page {
  padding-bottom: 28px;
  display: block;
}

.theme-default-content {
  color: var(--wc-text-primary);
}
.page-container {
  width: 100%;
  padding-right: calc($catalogueWidth + 20px);
  transition: all 0.3s ease;
  .catalogue-toggle {
    background-color: var(--wc-bg-common);
    box-shadow: var(--wc-shadow-2);
    transition: all 0.3s ease;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    position: fixed;
    z-index: 7;
    top: calc($navbarHeight + 20px);
    right: calc($catalogueWidth - 30px);
    visibility: hidden;
  }
}

@media (max-width: $MQNarrow) {
  .page-container {
    width: 100%;
    padding-right: 20px;
    .catalogue-toggle {
      visibility: visible;
    }

    .catalogue-toggle-unfold {
      right: 0;
      border-radius: 50% 0 0 50%;
    }
  }

  .page-container-thin {
    padding-right: calc($catalogueWidth + 20px);
  }
}
</style>
