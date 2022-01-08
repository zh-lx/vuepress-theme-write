<template>
  <div
    class="theme-container"
    :class="containerClass"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar">
      <template #before>
        <slot name="navbar-before" />
      </template>
      <template #after>
        <slot name="navbar-after" />
      </template>
    </Navbar>

    <div class="sidebar-mask" @click="toggleSidebar(false)" />

    <Sidebar v-if="!frontmatter.hideSidebar">
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

    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  Transition,
} from 'vue';
import { useRouter } from 'vue-router';
import {
  usePageData,
  usePagesData,
  usePageFrontmatter,
} from '@vuepress/client';
import Home from '@/components/Home.vue';
import Page from '@/components/Page.vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import AuthorCard from '@/components/author-card/index.vue';
import CategoryList from '@/components/category-list/index.vue';
import TagList from '@/components/tag-list/index.vue';
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
} from '@/composables';
import { setMode } from '@/utils/setMode';

export default defineComponent({
  name: 'LayoutContainer',

  components: {
    Home,
    Page,
    Navbar,
    Sidebar,
    Transition,
    AuthorCard,
    CategoryList,
    TagList,
  },

  setup() {
    const page = usePageData();
    const frontmatter = usePageFrontmatter();
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
      () =>
        frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
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
    const containerClass = computed(() => ({
      'no-navbar': !shouldShowNavbar.value,
      'no-sidebar': !sidebarItems.value.length,
      'sidebar-open': isSidebarOpen.value,
    }));

    // close sidebar after navigation
    let unregisterRouterHook;
    onMounted(() => {
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
    const onBeforeEnter = scrollPromise.resolve;
    const onBeforeLeave = scrollPromise.pending;

    return {
      frontmatter,
      page,
      containerClass,
      shouldShowNavbar,
      toggleSidebar,
      onTouchStart,
      onTouchEnd,
      onBeforeEnter,
      onBeforeLeave,
      isHomePage,
      isCategoryPage,
      isTagPage,
    };
  },
});
</script>
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
