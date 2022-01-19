<template>
  <div class="card pointer" @click="go2BlogDetailPage">
    <div class="blog-title">{{ title }}</div>
    <div class="blog-git">
      <div class="git-author git-item">
        <people theme="outline" size="18" fill="#606266" />
        <span>{{ author }}</span>
      </div>
      <div class="git-time git-item">
        <calendar theme="outline" size="18" fill="#606266" /><span>{{
          formatTime(blog.git?.updatedTime || 0, 'yyyy-MM-dd')
        }}</span>
      </div>
      <div class="git-category git-item">
        <folder-open theme="outline" size="18" fill="#606266" /><span>{{
          category
        }}</span>
      </div>
      <div class="tag git-item" v-if="blog.frontmatter.tag">
        <tag-one theme="outline" size="18" fill="#606266" />
        <span>{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatTime } from '@/utils/index';
import { useRouter } from 'vue-router';
import { Blog } from '@/types/blog';
import { People, Calendar, TagOne, FolderOpen } from '@icon-park/vue-next';

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

// 目录
const category = computed(() => {
  return decodeURIComponent(props.blog.path.split('/')?.[1]);
});

// 标签
const tag = computed(() => {
  return typeof props.blog.frontmatter?.tag === 'string'
    ? props.blog.frontmatter?.tag
    : props.blog.frontmatter?.tag[0];
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
.blog-title {
  font-size: 1.4rem;
  font-family: Ubuntu, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 500;
  margin-bottom: 1rem;
}
.blog-git {
  display: flex;
  flex-wrap: wrap;
  color: var(--common-text-color);
  .git-item {
    margin-top: 0.1rem;
    float: left;
    min-width: 25%;
    display: flex;
    align-items: center;
    .i-icon {
      margin-right: 4px;
    }
  }
}
@media (max-width: $MQMobileNarrow) {
  .blog-git {
    .git-item {
      width: 50%;
      margin-right: 0;
    }
  }
}
</style>
