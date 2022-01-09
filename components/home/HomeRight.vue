<template>
  <div class="home-right">
    <div class="card author-card">
      <AuthorCard />
    </div>
    <div class="card category-card">
      <div class="category-card-title">
        <img
          :src="FolderIcon"
          class="home-right-card-icon"
          alt="文章"
        />文章分类
      </div>
      <CategoryList />
    </div>
    <div class="card tag-card">
      <div class="tag-card-title">
        <img :src="TagIcon" class="home-right-card-icon" alt="标签" />热门标签
      </div>
      <TagList />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryList from '@/components/category-list/index.vue';
import TagList from '@/components/tag-list/index.vue';
import FolderIcon from '@/assets/folder.svg';
import TagIcon from '@/assets/tag.svg';
import AuthorCard from './AuthorCard.vue';
</script>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';

.category-card {
  padding-left: 0;
  padding-right: 0;
  margin-top: 1.5rem;
  .category-card-title {
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
}
.tag-card {
  margin-top: 1.5rem;
  .tag-card-title {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
  }
}

.home-right-card-icon {
  height: 20px;
  width: 20px;
  object-fit: contain;
  margin-right: 8px;
}

@media (max-width: $MQMobileNarrow) {
  .author-card {
    display: none;
  }
}
</style>
