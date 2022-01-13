<template>
  <div>
    <div v-for="category in categoryList" :key="category.name">
      <div
        :class="`category-item pointer ${
          router.currentRoute.value.query.category === decodeURI(category.name)
            ? 'selected-category'
            : ''
        }`"
        @click="handleClickCategory(category.name)"
      >
        <div class="category-name">{{ decodeURI(category.name) }}</div>
        <div class="category-count">{{ category.count }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 目录列表
import { ref } from 'vue';
import { usePageList } from '@/composables';
import { Category } from '@/types';
import { useRouter } from 'vue-router';

const categoryList = ref<Category[]>([]);

usePageList().then((pageList) => {
  categoryList.value = pageList?.categoryList?.value || [];
});

const router = useRouter();

// 点击跳转对应的目录页
const handleClickCategory = (category) => {
  router.push(`/page-category/?category=${decodeURI(category)}`);
};
</script>

<style scoped lang="scss">
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 1rem;
  &:hover {
    background-color: var(--commonHoverBgc);
    color: var(--commonHoverTextColor);
  }
  .category-count {
    background-color: var(--commonSelectedBgc);
    color: #fff;
    font-size: 12px;
    text-align: center;
    height: 18px;
    line-height: 18px;
    min-width: 28px;
    border-radius: 9px;
  }
}
.selected-category {
  background-color: var(--commonHoverBgc);
  border-left: 2px solid var(--commonHoverTextColor);
  color: var(--commonHoverTextColor);
}
</style>
