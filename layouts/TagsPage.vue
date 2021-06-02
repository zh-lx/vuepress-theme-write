<template>
  <LayoutContainer>
    <main class="main-container">
      <div class="main-content">
        <div class="tags-card card">
          <div class="tag-card-title"><i class="ei-tags"></i>热门标签</div>
          <Tags :isTagPage="true" :tags="tags" />
        </div>
        <div class="blogs-list"><Blogs :blogs="blogsToShow" /></div>
      </div>
    </main>
  </LayoutContainer>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Blogs from '@/components/Blogs.vue';
import Tags from '@/components/Tags.vue';
import { usePagesInfo } from '@/composables';

export default defineComponent({
  name: 'CategoriesPage',

  components: {
    Blogs,
    Tags,
  },

  setup() {
    const router = useRouter();

    // blogs
    const tags = ref([]);
    const blogs = ref([]);

    usePagesInfo().then((blogsInfo) => {
      blogs.value = blogsInfo?.blogs?.value || [];
      tags.value = blogsInfo?.tags?.value || [];
    });

    const blogsToShow = computed(() => {
      const tag = decodeURI(
        (router.currentRoute.value.query.tag as string) || ''
      );
      return blogs.value.filter((blog) => {
        const blogTags = blog.frontmatter.tag || [];
        return blogTags.includes(tag);
      });
    });

    return {
      blogsToShow,
      tags,
    };
  },
});
</script>
<style lang="scss" scoped>
@use 'sass:color';
@import '~@/styles/_variables.scss';

.main-container {
  padding: $navbarHeight 0;
  max-width: 100%;
  display: block;
  width: 100%;

  .main-content {
    .tags-card {
      width: 200px;
      position: fixed;
      top: $navbarHeight;
      transform: translateY(1.5rem);
      left: 1.5rem;
      .tag-card-title {
        margin-bottom: 0.5rem;
        i {
          margin-right: 4px;
        }
      }
    }
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1.5rem 1.5rem;
    .blogs-list {
      flex: 2;
      margin-left: calc(200px + 1.5rem);
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .main-container {
    .main-content {
      .tags-card {
        position: inherit;
        width: 100%;
        transform: translateY(0);
        margin-bottom: 1.5rem;
      }
      .blogs-list {
        width: 100%;
        margin-left: 0;
      }
    }
  }
}
</style>
