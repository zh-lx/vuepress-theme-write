<template>
  <div class="home-right">
    <div class="card author-card">
      <AuthorCard />
    </div>
    <div class="card category-card">
      <div class="category-card-title">
        <folder-open
          theme="outline"
          size="20"
          color="var(--wc-text-secondary)"
        />
        <span>文章分类</span>
      </div>
      <CategoryList />
    </div>
    <div class="card tag-card">
      <div class="tag-card-title">
        <tag-one theme="outline" size="20" color="var(--wc-text-secondary)" />
        <span>热门标签</span>
      </div>
      <TagList />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryList from '@/components/category-list/index.vue';
import TagList from '@/components/tag-list/index.vue';
import AuthorCard from '@/components/home/AuthorCard.vue';
import FolderOpen from '@/assets/folder-open.vue';
import TagOne from '@/assets/tag-one.vue';
</script>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';

.home-right {
  color: var(--wc-text-secondary);
}

.category-card {
  padding-left: 0;
  padding-right: 0;
  margin-top: 22px;
  .category-card-title {
    padding-left: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    column-gap: 6px;
  }
}
.tag-card {
  margin-top: 22px;
  .tag-card-title {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    column-gap: 6px;
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
