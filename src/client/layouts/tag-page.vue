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
import LayoutContainer from '@/components/global/LayoutContainer.vue';
import { usePageList } from '@/composables';

const router = useRouter();

// blogs
const blogList = ref([]);

usePageList().then((pageList) => {
  blogList.value = pageList?.blogList?.value || [];
});

const blogsToShow = computed(() => {
  const tag = decodeURI((router.currentRoute.value.query.tag as string) || '');
  return blogList.value.filter((blog) => {
    const blogTagList = blog.frontmatter.tag || [];
    return blogTagList.includes(tag);
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
    padding: 22px 22px 22px calc($sidebarWidth + 22px);
    .blogs-list {
      display: flex;
      justify-content: center;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .main-container {
    .main-content {
      padding-left: 22px;
    }
  }
}
</style>
