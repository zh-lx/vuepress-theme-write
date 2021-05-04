<template>
  <LayoutContainer>
    <main class="main-container">
      <div class="main-content">
        <div class="tags-card card">
          <div class="tag-card-title"><i class="ei-tags"></i>热门标签</div>
          <Tags :isTagPage="true" :tags="tags" />
        </div>
        <div class="main-content-left"><Blogs :blogs="blogsToShow" /></div>
      </div>
    </main>
  </LayoutContainer>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, watch } from 'vue';
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
        const blogTags = blog.frontmatter.tag;
        return blogTags.includes(tag);
      });
    });

    watch(
      () => router.currentRoute.value.query?.category,
      () => {
        // changeRefsShow(false);
      }
    );

    return {
      blogsToShow,
      tags,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
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
.main-content-left {
  margin-left: calc(200px + 1.5rem);
}

@media (max-width: $MQMobileNarrow) {
  .main-content-left {
    margin-left: 0;
    width: 100%;
  }
  .tags-card {
    position: inherit;
    width: 100%;
    transform: translateY(0);
    margin-bottom: 1.5rem;
  }
}
</style>
