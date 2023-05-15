<script setup lang="ts">
import { usePageFrontmatter } from '@vuepress/client';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { DefaultThemePageFrontmatter } from '@/types';
import NavbarItems from '@/components/navbar/NavbarItems.vue';
import Navbar from '@/components/navbar/index.vue';
import Sidebar from '@/components/sidebar/index.vue';
import AuthorCard from '@/components/home/AuthorCard.vue';
import CategoryList from '@/components/category-list/index.vue';
import TagList from '@/components/tag-list/index.vue';
import {
  useDarkMode,
  useSidebarItems,
  useThemeLocaleData,
  useCatalogues,
} from '@/composables';
import { setMode } from '@/utils/setMode';
import FolderOpen from '@/assets/folder-open.vue';
import TagOne from '@/assets/tag-one.vue';
import MenuFoldOne from '@/assets/menu-fold-one.vue';
import MenuUnfoldOne from '@/assets/menu-unfold-one.vue';
import PageMeta from './PageMeta.vue';
import PageNav from './PageNav.vue';
import Catalogues from '@/components/catalogue/index.vue';

const showCatalogues = ref(false);

const changeCataloguesVisibility = () => {
  showCatalogues.value = !showCatalogues.value;
};

const catalogues = useCatalogues();

const isDarkMode = useDarkMode();

const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>();
const themeLocale = useThemeLocaleData();
const router = useRouter();
// 页面信息
const isCategoryPage = computed(() => {
  return router.currentRoute.value.path.startsWith('/page-category/');
});
const isTagPage = computed(() => {
  return router.currentRoute.value.path.startsWith('/page-tag/');
});
const isHomePage = computed(() => {
  return router.currentRoute.value.path === '/';
});
const isDocs = computed(() => $Site?.type === 'docs');

// 是否展示 sidebar
const shouldShowSidebar = computed(() => {
  return (
    !frontmatter.value.hideSidebar &&
    (sidebarItems.value.length ||
      router.currentRoute.value.path.startsWith('/page-category/') ||
      router.currentRoute.value.path.startsWith('/page-tag/'))
  );
});

// navbar
const shouldShowNavbar = computed(
  () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
);

// sidebar
const sidebarItems = useSidebarItems();
const isSidebarOpen = ref(false);
const isLoading = ref(true);
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
    'no-sidebar': !shouldShowSidebar.value,
    'sidebar-open': isSidebarOpen.value,
  },
  frontmatter.value.pageClass,
]);

const onLoad = (cb: () => void) => {
  if (document.readyState === 'complete') {
    cb();
  } else {
    window.addEventListener('load', cb);
  }
};

// close sidebar after navigation
let unregisterRouterHook;
onMounted(() => {
  const router = useRouter();
  unregisterRouterHook = router.afterEach(() => {
    toggleSidebar(false);
  });
  setMode(isDarkMode.value ? 'darkMode' : 'lightMode');
  onLoad(() => (isLoading.value = false));
  showCatalogues.value = window.innerWidth >= 960;
});

onUnmounted(() => {
  unregisterRouterHook();
});

watch(
  () => router,
  () => {
    setMode(isDarkMode.value ? 'darkMode' : 'lightMode');
  },
  {
    deep: true,
    immediate: true,
  }
);

watch(
  () => isSidebarOpen.value,
  (val) => {
    if (val) {
      document.body.style['overflow'] = 'hidden';
      document.body.style.width = 'calc(100vw - 8px)';
    } else {
      document.body.style['overflow'] = 'auto';
      document.body.style.width = '100%';
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <Loading v-show="isLoading" />
  <div class="theme-container" :class="containerClass">
    <slot name="navbar">
      <Navbar
        class="layout-navbar"
        v-if="shouldShowNavbar"
        @toggle-sidebar="toggleSidebar"
      >
        <template #before>
          <slot name="navbar-before" />
        </template>
        <template #after>
          <slot name="navbar-after" />
        </template>
      </Navbar>
    </slot>

    <div
      @scroll="(e) => e.preventDefault()"
      @touchmove="(e) => e.preventDefault()"
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <div class="theme-main-content">
      <slot name="sidebar">
        <Sidebar>
          <template #top>
            <slot name="sidebar-top" />
          </template>
          <template #sidebar v-if="isHomePage">
            <NavbarItems />
          </template>
          <template #author>
            <div class="authorInfo" v-if="!isDocs && isHomePage">
              <AuthorCard />
            </div>
          </template>
          <template #category>
            <div
              class="category-list"
              v-if="!isDocs && (isHomePage || isCategoryPage)"
            >
              <div class="category-card-title">
                <folder-open theme="outline" size="20" color="#303133" /><span
                  >文章分类</span
                >
              </div>
              <CategoryList />
            </div>
          </template>
          <template #tag>
            <div class="tag-list" v-if="!isDocs && (isHomePage || isTagPage)">
              <div class="tag-card-title">
                <tag-one theme="outline" size="20" color="#303133" /><span
                  >热门标签</span
                >
              </div>
              <TagList />
            </div>
          </template>
          <template #bottom>
            <slot name="sidebar-bottom" />
          </template>
        </Sidebar>
      </slot>

      <slot></slot>

      <!-- <div
        :class="`catalogue-toggle ${
          showCatalogues ? 'catalogue-toggle-show' : 'catalogue-toggle-unfold'
        }`"
        @click="changeCataloguesVisibility"
      >
        <menu-fold-one
          theme="outline"
          size="18"
          fill="#606266"
          :strokeWidth="3"
          v-show="showCatalogues"
        />
        <menu-unfold-one
          theme="outline"
          size="18"
          fill="#606266"
          :strokeWidth="3"
          v-show="!showCatalogues"
        />
      </div> -->
      <Catalogues
        class="catalogues-region"
        :showCatalogues="showCatalogues"
        v-if="catalogues?.[0]?.children?.length"
      />
      <!-- <div
        class="catalogue-mask"
        v-show="showCatalogues"
        @click="changeCataloguesVisibility"
      ></div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
.authorInfo {
  margin-top: 20px;
}
.category-list {
  margin-top: 20px;
  .category-card-title {
    padding-left: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    column-gap: 6px;
  }
}
.tag-list {
  padding: 14px;
  padding-top: 20px;
  .tag-card-title {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    column-gap: 6px;
  }
}
.catalogue-toggle {
  box-shadow: var(--wc-shadow-2);
  transition: all 0.3s ease;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  z-index: 8;
  top: calc($navbarHeight + 20px);
  right: calc($catalogueWidth - 30px);
}

.catalogue-toggle-unfold {
  right: 0;
  border-radius: 50% 0 0 50%;
}

.catalogue-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  background-color: var(--wc-bg-mask);
  top: 0;
  left: 0;
  display: none;
}

@media (max-width: $MQMobileNarrow) {
  .catalogue-mask {
    display: block;
  }
}
</style>
