<template>
  <LayoutContainer>
    <main class="main-container">
      <div class="main-content">
        <div class="blogs-list"><BlogList :blogs="blogsToShow" /></div>
      </div>
    </main>
  </LayoutContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import BlogList from '@/components/blog-list/index.vue';
import { usePageList } from '@/composables';

const router = useRouter();

// blogs
const blogList = ref([]);
const categories = ref([]);

usePageList().then((pageList) => {
  blogList.value = pageList?.blogList?.value || [];
  categories.value = pageList?.categoryList?.value || [];
});

const blogsToShow = computed(() => {
  const category = decodeURI(
    (router.currentRoute.value.query?.category as string) || ''
  );
  return blogList.value.filter((blog) => {
    const blogCategory = decodeURI(blog.path.split('/')[1]);
    return category === blogCategory;
  });
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
