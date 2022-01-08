<template>
  <LayoutContainer>
    <main class="main-container">
      <div class="main-content">
        <div class="blogs-list"><BlogList :blogs="blogsToShow" /></div>
      </div>
    </main>
  </LayoutContainer>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import BlogList from '@/components/blog-list/index.vue';
import CategoryList from '@/components/category-list/index.vue';
import { usePageList } from '@/composables';

export default defineComponent({
  name: 'CategoryListPage',

  components: {
    BlogList,
    CategoryList,
  },

  setup() {
    const state = reactive({
      showCategory: false,
    });

    const router = useRouter();

    // blogs
    const blogs = ref([]);
    const categories = ref([]);
    const categoriesRef = ref<HTMLElement | null>();
    const coverRef = ref<HTMLElement | null>(null);
    const btnRef = ref<HTMLElement | null>(null);

    usePageList().then((pageList) => {
      blogs.value = pageList?.blogList?.value || [];
      categories.value = pageList?.categoryList?.value || [];
    });

    const blogsToShow = computed(() => {
      const category = decodeURI(
        (router.currentRoute.value.query?.category as string) || ''
      );
      return blogs.value.filter((blog) => {
        const blogCategory = decodeURI(blog.filePathRelative.split('/')[0]);
        return category === blogCategory;
      });
    });

    return {
      blogsToShow,
      categories,
      categoriesRef,
      coverRef,
      btnRef,
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
