<template>
  <div class="tags-box">
    <div
      v-for="tag in tagList"
      :key="tag.name"
      :class="`tag-item pointer transition ${
        router.currentRoute.value.query.tag === tag.name ? 'selected-tag' : ''
      }`"
      :style="{
        background: `${
          isTagPage ? 'var(--default-tag-bgc)' : getRandomColor()
        }`,
        color: `${
          isTagPage ? 'var(--common-text-color)' : 'var(--reverse-text-color)'
        }`,
      }"
      @click="handleClickTag(tag.name)"
    >
      {{ decodeURI(tag.name) }}
    </div>
  </div>
</template>

<script setup lang="ts">
// 标签列表
import { ref, computed } from 'vue';
import { usePageList } from '@/composables';
import { Tag } from '@/types';
import { getRandomColor } from '@/utils';
import { useRouter } from 'vue-router';

const router = useRouter();
let tagList = ref<Tag[]>([]);

// 根据是否为标签页展示不同状态
const isTagPage = computed(() => {
  return router.currentRoute.value.path.startsWith('/page-tag/');
});

usePageList().then((pageList) => {
  tagList.value = pageList?.tagList?.value || [];
});

// 点击跳转标签页
const handleClickTag: (tag: string) => void = (tag) => {
  router.push(`/page-tag/?tag=${decodeURI(tag)}`);
};
</script>

<style scoped lang="scss">
.tags-box {
  display: flex;
  flex-wrap: wrap;
  .tag-item {
    margin-right: 12px;
    margin-top: 8px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    font-size: 14px;
    &:hover {
      transform: scale(1.1);
    }
    color: var(--reverse-text-color);
    &:last-of-type {
      margin-right: 0;
    }
  }
  .selected-tag {
    background-color: var(--theme-color) !important;
    color: var(--reverse-text-color) !important;
    &:hover {
      transform: scale(1);
    }
  }
}
</style>
