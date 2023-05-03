<template>
  <div class="card pointer blog-item" @click="go2BlogDetailPage">
    <div class="blog-content">
      <div class="blog-title">{{ title }}</div>
      <div class="blog-git-info">
        <div class="blog-author">{{ author }}</div>
        <div class="blog-time">
          {{ time }}
        </div>
        <div class="blog-tag" v-if="tags">
          {{ tags }}
        </div>
      </div>
      <div class="blog-desc" v-if="desc">{{ desc }}</div>
    </div>
    <div
      class="blog-cover"
      v-if="cover"
      :style="{ backgroundImage: `url(${cover})` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatTime } from '@/utils/index';
import { useRouter } from 'vue-router';
import { Blog } from '@/types/blog';

interface Props {
  blog: Blog;
}

const props = withDefaults(defineProps<Props>(), {
  blog: () => ({} as Blog),
});

const router = useRouter();

// 跳转至文章详情页面
const go2BlogDetailPage = () => {
  router.push(props.blog.path);
};

// 作者
const author = computed(() => {
  return props.blog.git?.contributors?.[0]?.name || '无名';
});

// 时间
const time = computed(() => {
  return (
    props.blog?.frontmatter?.time ||
    formatTime(props.blog.git?.updatedTime || 0, 'yyyy-MM-dd')
  );
});

// 封面
const cover = computed(() => {
  return props.blog?.frontmatter?.cover;
});

// 简介
const desc = computed(() => {
  return props.blog?.frontmatter?.desc;
});

// 标签
const tags = computed(() => {
  return Array.isArray(props.blog.frontmatter?.tag)
    ? props.blog.frontmatter?.tag.join(' · ')
    : props.blog.frontmatter?.tag;
});

// 标题
const title = computed(() => {
  if (props.blog.title) {
    // 若文章以 # xx 一级标题开头，则将该一级标题作为标题
    return props.blog.title;
  } else {
    // 否则取文件名作文标题
    const path: string = props.blog.path.split('.html')?.[0];
    const pathList = path.split('\/');
    return decodeURIComponent(pathList?.[pathList.length - 1]);
  }
});
</script>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';
.blog-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .blog-cover {
    width: 140px;
    height: 100px;
    background-size: cover;
    background-position: center;
    margin-left: 8px;
  }
  .blog-content {
    flex: 1;
    .blog-title {
      font-size: 18px;
      font-family: Ubuntu, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Oxygen, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-weight: bold;
      color: var(--wc-text-primary);
    }

    .blog-git-info {
      display: flex;
      align-items: center;
      color: var(--wc-text-secondary);
      line-height: 14px;
      height: 14px;
      font-size: 14px;
      margin-top: 12px;
      .blog-author {
        margin-right: 8px;
      }
      .blog-time,
      .blog-tag {
        padding: 0 8px;
        border-left: 1px solid var(--wc-border-primary);
      }
    }

    .blog-desc {
      color: var(--wc-text-tertiary);
      line-height: 22px;
      font-size: 14px;
      margin-top: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    }
  }
}
</style>
