<template>
  <div class="home-right">
    <div class="card author-card">
      <AuthorCard />
    </div>
    <div class="card category-card">
      <div class="category-card-title">
        <i class="ei-folder-open"></i>文章分类
      </div>
      <CategoryList />
    </div>
    <div class="card tag-card">
      <div class="tag-card-title"><i class="ei-tags"></i>热门标签</div>
      <TagList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from 'vue';
import { Tag, Category } from '@/types';
import CategoryList from '@/components/category-list/index.vue';
import TagList from '@/components/tag-list/index.vue';
import AuthorCard from '@/components/author-card/index.vue';

export default defineComponent({
  name: 'HomeRight',
  components: { CategoryList, TagList, AuthorCard },
  setup() {
    return {};
  },
});
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
    i {
      margin-right: 4px;
    }
  }
}
.tag-card {
  margin-top: 1.5rem;
  .tag-card-title {
    margin-bottom: 0.5rem;
    i {
      margin-right: 4px;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .author-card {
    display: none;
  }
}
</style>
