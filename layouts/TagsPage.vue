<template>
  <LayoutContainer>
    <main class="main-container">
      <div class="main-content">
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
import { usePageList } from '@/composables';

export default defineComponent({
  name: 'CategoriesPage',

  components: {
    Blogs,
    Tags,
  },

  setup() {
    const router = useRouter();

    // blogs
    const blogs = ref([]);

    usePageList().then((pageList) => {
      blogs.value = pageList?.blogList?.value || [];
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
    padding: 1.5rem 1.5rem 1.5rem 18rem;
  }
}

@media (max-width: $MQMobile) {
  :deep(.sidebar) {
    transform: translateX(0);
  }
  :deep(.toggle-sidebar-button) {
    display: none;
  }
  :deep(.navbar) {
    padding-left: 1.5rem;
  }
}

@media (max-width: $MQMobileNarrow) {
  .main-container {
    .main-content {
      padding-left: 1.5rem;
    }
  }
  :deep(.sidebar) {
    transform: translateX(-100%);
  }
  :deep(.theme-container) {
    .sidebar-open {
      .sidebar {
        transform: translateX(0);
      }
    }
  }
  :deep(.toggle-sidebar-button) {
    display: block;
  }
  :deep(.navbar) {
    padding-left: 4rem;
  }
}
</style>
