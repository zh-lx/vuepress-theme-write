<template>
  <main
    class="main-container"
    :aria-labelledby="heroText ? 'main-title' : null"
  >
    <div class="top">
      <div class="hero-bg"></div>

      <div
        class="hero"
        :id="HOME_BG_ID"
        :style="{ backgroundImage: `url(${homeBgImage})` }"
      >
        <img v-if="homeImg" :src="homeImg" alt="" class="home-main-img" />

        <h1 v-if="heroText" id="main-title">
          {{ heroText }}
        </h1>

        <p v-if="tagline" class="description">
          {{ tagline }}
        </p>

        <button v-if="isDocs" class="start-btn" @click="handleClickStart">
          {{ start || '开始' }}
        </button>
      </div>

      <div class="hero-placeholder"></div>

      <div class="main-content" v-if="!isDocs">
        <div class="main-content-left"><BlogList :blogs="blogs" /></div>
        <div class="main-content-right"><HomeRight /></div>
      </div>

      <div v-if="isDocs" class="home-items">
        <HomeItem
          v-for="(item, index) in [...homeItems]"
          :item="item"
          :index="index"
          key="index"
        />
      </div>
    </div>

    <HomeFooter />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePageFrontmatter, useSiteLocaleData } from '@vuepress/client';
import { usePageList, useDarkMode } from '@/composables';
import BlogList from '@/components/blog-list/index.vue';
import { HOME_BG_ID } from '@/constants/global';
import LightBg from '@/assets/light-bg.svg';
import DarkBg from '@/assets/dark-bg.svg';
import HomeRight from './HomeRight.vue';
import HomeFooter from 'HomeFooter';
import HomeItem from './HomeItem.vue';

const placeholderItem = {} as { title: string; text: string; img: string };

const {
  backgroundImage,
  title,
  description,
  backgroundImageDark,
  type,
  start,
  startPath,
  homeImg,
} = {
  ...($Site || {}),
};

const blogs = ref([]);
const frontmatter = usePageFrontmatter();
const siteLocale = useSiteLocaleData();
const isDarkMode = useDarkMode();

// 主页标题
const heroText = computed(() => {
  return (
    frontmatter.value.heroText ?? title ?? siteLocale.value.title ?? 'Hello'
  );
});

// 背景图片
const homeBgImage = computed(() => {
  return (
    frontmatter.value.bgImage ||
    (isDarkMode.value
      ? backgroundImageDark || DarkBg
      : backgroundImage || LightBg)
  );
});

// 介绍
const tagline = computed(() => {
  if (frontmatter.value.tagline === null) {
    return null;
  }
  return (
    frontmatter.value.tagline ??
    description ??
    siteLocale.value.description ??
    'Welcome to your VuePress site'
  );
});

const router = useRouter();

const handleClickStart = () => {
  router.push(startPath);
};

const isDocs = computed(() => type === 'docs');

const homeItems = computed(() => {
  console.log($HomeItems);
  return $HomeItems;
});

usePageList().then((pageList) => {
  blogs.value = pageList?.blogList?.value || [];
});
</script>

<style lang="scss" scoped>
@use 'sass:color';

@import '~@/styles/_variables.scss';

$HeroHeight: 500px !default;

.main-container {
  padding: $navbarHeight 0 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  position: relative;

  .hero {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    height: $HeroHeight;
    width: calc(100vw - max(44px, 100vw - $maxWidth + 44px));
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-position: center;
    background-size: min(1280px, 100%) $HeroHeight;
    background-repeat: no-repeat;

    #main-title {
      color: transparent;
      background: linear-gradient(30deg, var(--brand-4), var(--wc-text-brand));
      -webkit-background-clip: text;
      font-weight: 600;
      font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell,
        Noto Sans, sans-serif, BlinkMacSystemFont, 'Helvetica Neue',
        'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial;
      font-size: 80px;
      font-weight: bold;
      margin: 0 auto;
    }

    h1,
    .description {
      margin: 24px auto 0;
    }

    .description {
      max-width: 500px;
      font-size: 22px;
      color: var(--wc-text-secondary);
    }

    .start-btn {
      padding: 0 28px;
      line-height: 28px;
      min-width: 180px;
      height: 44px;
      border: none;
      background-color: var(--wc-fill-brand);
      color: var(--wc-text-white);
      border-radius: 22px;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 2px;
      cursor: pointer;
      margin-top: 28px;
    }
  }

  .hero-placeholder {
    height: calc($HeroHeight - $navbarHeight);
  }

  .main-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 22px 22px;
    .main-content-left {
      flex: 1;
      max-width: 700px;
    }
    .main-content-right {
      width: 240px;
      margin-left: 22px;
    }
  }

  .home-items {
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 22px;
  }
}

@media (max-width: $MQMobile) {
  .main-container {
    .hero {
      h1 {
        font-size: 28px;
      }
      h1,
      .description,
      .actions {
        margin: 16px auto;
      }
      .description {
        font-size: 16px;
      }
    }
    .main-content {
      .main-content-left {
        width: 100%;
      }
      .main-content-right {
        width: 0;
        margin-left: 0;
        overflow: hidden;
      }
    }
  }
}

@media (min-width: $maxWidth) {
  .hero {
    transform: translateX(calc(-50vw + 0.5 * $maxWidth));
  }
}
</style>
