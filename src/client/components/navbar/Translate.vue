<template>
  <div class="translate-container" v-if="languages.length">
    <Translate
      class="translate-icon"
      :stroke-width="1"
      size="18"
      @click="handleClickTranslate"
    ></Translate>
    <div class="wc-lang-container" v-show="show">
      <div
        :class="[
          'wc-lang-item',
          currentLang?.prefix === item.prefix && 'wc-active-lang-item',
        ]"
        v-for="item in languages"
        :key="item.label"
        @click="handleCLickLanguage(item.prefix)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Translate from '@/assets/translate.vue';
import { currentLang, getLangPath } from '@/utils';
const languages = $Langs || [];

const show = ref(false);
const route = useRoute();
const router = useRouter();

const handleClickTranslate = (e: MouseEvent) => {
  e.stopPropagation();
  show.value = !show.value;
};

const closeList = () => {
  if (show.value) {
    show.value = false;
  }
};
const handleCLickLanguage = (prefix: string) => {
  if (currentLang.value?.prefix === prefix) {
    return;
  }
  let target = getLangPath(currentLang.value?.prefix, prefix, route.path);
  router.push({
    path: target,
    hash: route.hash,
    query: route.query,
    params: route.params,
  });
};

onMounted(() => {
  window.addEventListener('click', closeList);
});

onUnmounted(() => {
  window.removeEventListener('click', closeList);
});
</script>

<style scoped lang="scss">
.translate-icon {
  margin-left: 16px;
  color: var(--wc-text-secondary);
  cursor: pointer;
  &:hover {
    color: var(--wc-text-brand);
  }
}
.translate-container {
  position: relative;
  display: flex;
  align-items: center;
  .wc-lang-container {
    padding: 4px 0;
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% + 8px));
    background-color: var(--wc-bg-common);
    box-shadow: var(--wc-shadow-2);
    border-radius: 4px;
    .wc-lang-item {
      line-height: 24px;
      padding: 0 12px;
      cursor: pointer;
      &:hover {
        color: var(--wc-text-brand);
        background: var(--wc-bg-hover);
      }
    }
    .wc-active-lang-item {
      color: var(--wc-text-brand);
    }
  }
}
</style>
