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

    <Sidebar>
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <main
      class="main-container"
      :aria-labelledby="heroText ? 'main-title' : null"
    >
      <div class="main-content category-page-container">
        <div class="blog-category-card card"><Categories /></div>
        <div class="main-content-left"><Blogs :blogs="blogsToShow" /></div>
      </div>

      <div class="showCategoryBtn"><i class="el-arrow-right"></i></div>

      <template v-if="footer">
        <div v-if="footerHtml" class="footer" v-html="footer" />
        <div v-else class="footer" v-text="footer" />
      </template>
    </main>
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
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import Blogs from '@/components/Blogs.vue';
import Categories from '@/components/Categories.vue';
import {
  useScrollPromise,
  useSidebarItems,
  useThemeLocaleData,
  usePagesInfo,
} from '@/composables';
import { setMode } from '@/utils/setMode';
import 'easy-icon/easy-icon-l.js';

export default defineComponent({
  name: 'CategoriesPage',

  components: {
    Navbar,
    Sidebar,
    Transition,
    Blogs,
    Categories,
  },

  setup() {
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const router = useRouter();
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

    // blogs
    const blogs = ref([]);
    const categories = ref([]);

    usePagesInfo().then((blogsInfo) => {
      blogs.value = blogsInfo?.blogs?.value || [];
      categories.value = blogsInfo?.categories?.value || [];
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
      containerClass,
      shouldShowNavbar,
      toggleSidebar,
      onTouchStart,
      onTouchEnd,
      onBeforeEnter,
      onBeforeLeave,
      blogsToShow,
      categories,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
.blog-category-card {
  width: 200px;
  background-color: var(--backgroundColor);
  position: fixed;
  left: 0;
  top: $navbarHeight;
  bottom: 0;
  padding: 1.5rem 0;
  overflow-y: auto;
}
.category-page-container {
  padding-left: calc(200px + 1.5rem);
}
.showCategoryBtn {
  width: 2rem;
  height: 3rem;
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  left: 0;
  top: 40%;
  padding: 0;
  border: 1px solid var(--pageSelectedColor);
  border-left: none;
  writing-mode: vertical-lr;
  color: var(--pageSelectedColor);
  :hover {
    cursor: pointer;
  }
}
@media (max-width: $MQMobileNarrow) {
  .blog-category-card {
    display: none;
  }
  .category-page-container {
    padding-left: 1.5rem;
  }
  .showCategoryBtn {
    display: flex;
  }
}
</style>
