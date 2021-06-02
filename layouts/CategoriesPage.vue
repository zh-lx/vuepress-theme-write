<template>
  <LayoutContainer>
    <main class="main-container">
      <div class="main-content">
        <div
          class="cover-region"
          ref="coverRef"
          @click="changeRefsShow(false)"
        ></div>
        <div class="showCategoryBtn" ref="btnRef" @click="changeRefsShow(true)">
          <i class="el-arrow-right"></i>
        </div>
        <div
          class="blog-category-card card mobile-transform"
          ref="categoriesRef"
        >
          <Categories />
        </div>
        <div class="blogs-list"><Blogs :blogs="blogsToShow" /></div>
      </div>
    </main>
  </LayoutContainer>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import Blogs from '@/components/Blogs.vue';
import Categories from '@/components/Categories.vue';
import { usePagesInfo } from '@/composables';

export default defineComponent({
  name: 'CategoriesPage',

  components: {
    Blogs,
    Categories,
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

    const changeRefsShow = (val) => {
      state.showCategory = val;
      if (val) {
        categoriesRef.value.classList.remove('mobile-transform');
        coverRef.value.style.visibility = 'visible';
        btnRef.value.style.visibility = 'hidden';
      } else {
        categoriesRef.value.classList.add('mobile-transform');
        coverRef.value.style.visibility = 'hidden';
        btnRef.value.style.visibility = 'visible';
      }
    };

    watch(
      () => router.currentRoute.value.query?.category,
      () => {
        changeRefsShow(false);
      }
    );

    return {
      blogsToShow,
      categories,
      categoriesRef,
      changeRefsShow,
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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 1.5rem 1.5rem;
    padding-left: calc(200px + 1.5rem);
    .blogs-list {
      flex: 2;
    }
    .blog-category-card {
      width: 200px;
      background-color: var(--backgroundColor);
      position: fixed;
      left: 0;
      top: $navbarHeight;
      bottom: 0;
      padding: 1.5rem 0;
      overflow-y: auto;
      z-index: 99;
    }
    .cover-region {
      width: 100vw;
      background-color: var(--coverRegionColor);
      top: $navbarHeight;
      left: 0;
      bottom: 0;
      position: fixed;
      z-index: 10;
      display: none;
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
      border: 1px solid var(--commonSelectedBgc);
      border-left: none;
      writing-mode: vertical-lr;
      color: var(--commonSelectedBgc);
      :hover {
        cursor: pointer;
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .main-container {
    .main-content {
      padding-left: 1.5rem;
      .blogs-list {
        width: 100%;
      }
      .mobile-transform {
        transform: translateX(-200px);
      }
      .showCategoryBtn {
        display: flex;
      }
      .cover-region {
        display: block;
        visibility: hidden;
      }
    }
  }
}
</style>
