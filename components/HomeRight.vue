<template>
  <div class="home-right">
    <div class="card author-card">
      <AuthorInfo />
    </div>
    <div class="card category-card">
      <div class="category-card-title">
        <i class="ei-folder-open"></i>文章分类
      </div>
      <Categories />
    </div>
    <div class="card tag-card">
      <div class="tag-card-title"><i class="ei-tags"></i>热门标签</div>
      <Tags />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from 'vue';
import { usePagesInfo } from '@/composables';
import { Tag, Category } from '@/types';
import Categories from '@/components/Categories.vue';
import Tags from '@/components/Tags.vue';
import AuthorInfo from '@/components/AuthorInfo.vue';

export default defineComponent({
  name: 'HomeRight',
  components: { Categories, Tags, AuthorInfo },
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
