<template>
  <main
    class="main-container"
    :aria-labelledby="heroText ? 'main-title' : null"
  >
    <div
      class="hero"
      id="_homeBgContainer"
      :style="{ backgroundImage: `url(${homeBgImage})` }"
    >
      <h1 v-if="heroText" id="main-title">
        {{ heroText }}
      </h1>

      <p v-if="tagline" class="description">
        {{ tagline }}
      </p>
    </div>

    <div class="main-content">
      <div class="main-content-left"><Blogs :blogs="blogs" /></div>
      <div class="main-content-right"><HomeRight /></div>
    </div>

    <template v-if="footer">
      <div v-if="footerHtml" class="footer" v-html="footer" />
      <div v-else class="footer" v-text="footer" />
    </template>
  </main>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
} from 'vue';
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client';
import { usePagesInfo } from '@/composables';
import type { DefaultThemeHomePageFrontmatter } from '@/types';
import NavLink from '@/components/NavLink.vue';
import Blogs from '@/components/Blogs.vue';
import HomeRight from '@/components/HomeRight.vue';

export default defineComponent({
  name: 'Home',

  components: {
    NavLink,
    Blogs,
    HomeRight,
  },

  setup() {
    const state = reactive({
      blogs: [],
    });
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();

    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) {
        return null;
      }
      return frontmatter.value.heroText || siteLocale.value.title || 'Hello';
    });

    const homeBgImage = computed(() => {
      return (
        frontmatter.value.bgImage || 'https://i.postimg.cc/nhrPH83V/home-bg.jpg'
      );
    });

    const tagline = computed(() => {
      if (frontmatter.value.tagline === null) {
        return null;
      }
      return (
        frontmatter.value.tagline ||
        siteLocale.value.description ||
        'Welcome to your VuePress site'
      );
    });

    usePagesInfo().then((blogsInfo) => {
      state.blogs = blogsInfo?.blogs?.value || [];
    });

    const footer = computed(() => frontmatter.value.footer);

    const footerHtml = computed(() => frontmatter.value.footerHtml);

    return {
      ...toRefs(state),
      heroText,
      tagline,
      footer,
      footerHtml,
      homeBgImage,
    };
  },
});
</script>
