<template>
  <div>
    <div v-for="(category, index) in categories" :key="index">
      <div
        :class="`category-item pointer ${
          router.currentRoute.value.query.category === category.name
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePageList } from '@/composables';
import { Category } from '@/types';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Categories',
  setup() {
    let categories = ref<Category[]>([]);
    usePageList().then((pageList) => {
      categories.value = pageList?.categoryList?.value || [];
    });

    const router = useRouter();

    const handleClickCategory = (category) => {
      router.push(`/categories/?category=${decodeURI(category)}`);
    };

    return {
      categories,
      handleClickCategory,
      router,
    };
  },
});
</script>

<style scoped lang="scss">
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 1rem;
  &:hover {
    background-color: var(--commonHoverBgc);
    border-left: 2px solid var(--commonHoverTextColor);
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
  background-color: var(--commonSelectedBgc);
  color: var(--reverseTextColor);
  .category-count {
    background-color: var(--selectedCategoryCountBgc);
    color: var(--reverseTextColor);
  }
  &:hover {
    background-color: var(--commonSelectedBgc);
    border-left: none;
    color: var(--reverseTextColor);
  }
}
</style>
