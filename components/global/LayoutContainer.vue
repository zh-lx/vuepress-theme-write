<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { DefaultThemePageFrontmatter } from '@/types';
import Navbar from '@/components/navbar/index.vue';
import Sidebar from '@/components/sidebar/index.vue';
import AuthorCard from '@/components/home/AuthorCard.vue';
import CategoryList from '@/components/category-list/index.vue';
import TagList from '@/components/tag-list/index.vue';
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from '@/composables';
import { setMode } from '@/utils/setMode';

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
const themeLocale = useThemeLocaleData();
const router = useRouter();
// 页面信息
const isCategoryPage = computed(() => {
  return router.currentRoute.value.path.startsWith('/categories/');
});
const isTagPage = computed(() => {
  return router.currentRoute.value.path.startsWith('/tags/');
});
const isHomePage = computed(() => {
  return router.currentRoute.value.path === '/';
});

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
);

// sidebar
const sidebarItems = useSidebarItems();
const isSidebarOpen = ref(false);
const toggleSidebar = (to?: boolean): void => {
  isSidebarOpen.value = typeof to === 'boolean' ? to : !isSidebarOpen.value;
};
const touchStart = { x: 0, y: 0 };
const onTouchStart = (e): void => {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
};
const onTouchEnd = (e): void => {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
    if (dx > 0 && touchStart.x <= 80) {
      toggleSidebar(true);
    } else {
      toggleSidebar(false);
    }
  }
};

// classes
const containerClass = computed(() => [
  {
    'no-navbar': !shouldShowNavbar.value,
    'no-sidebar': !sidebarItems.value.length,
    'sidebar-open': isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
]);

// close sidebar after navigation
let unregisterRouterHook;
onMounted(() => {
  const router = useRouter();
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false);
  });
  setMode();
});
onUnmounted(() => {
  unregisterRouterHook();
});

// handle scrollBehavior with transition
const scrollPromise = useScrollPromise();
</script>

<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <slot name="navbar">
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <slot name="sidebar">
      <Sidebar>
        <template #author>
          <div class="authorInfo" v-if="isHomePage">
            <AuthorCard />
          </div>
        </template>
        <template #category>
          <div class="category-list" v-if="isCategoryPage">
            <div class="category-card-title">
              <i class="ei-folder-open"></i>文章分类
            </div>
            <CategoryList />
          </div>
        </template>
        <template #tag>
          <div class="left-card" v-if="isTagPage">
            <div class="left-card-title"><i class="ei-tags"></i>热门标签</div>
            <TagList />
          </div>
        </template>
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>
    </slot>

    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
.authorInfo {
  margin-top: 1.5rem;
}
.category-list {
  margin-top: 1rem;
  .category-card-title {
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    i {
      margin-right: 4px;
    }
  }
}
.left-card {
  padding: 1rem;
  .left-card-title {
    margin-bottom: 0.5rem;
    i {
      margin-right: 4px;
    }
  }
}
</style>
