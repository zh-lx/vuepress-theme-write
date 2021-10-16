<template>
  <div class="card pointer" @click="go2BlogDetail">
    <div class="blog-title">{{ title }}</div>
    <div class="blog-git-info">
      <div class="git-author git-item">
        <i class="el-user blog-icon"></i><span>{{ authorName }}</span>
      </div>
      <div class="git-time git-item">
        <i class="et-calendar blog-icon"></i
        ><span>{{ formatTime(blog.git.updatedTime || 0, 'yyyy-MM-dd') }}</span>
      </div>
      <div class="git-category git-item">
        <i class="el-folder-opened blog-icon"></i><span>{{ blogPath }}</span>
      </div>
      <div class="tag git-item" v-if="blog.frontmatter.tag">
        <i class="et-tags blog-icon"></i>
        <span>{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, Ref } from 'vue';
import { formatTime } from '@/utils/index';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BlogItem',
  props: {
    blog: Object,
    default: () => {},
  },
  setup(props) {
    const router = useRouter();

    // 跳转至文章详情页面
    const go2BlogDetail = () => {
      router.push(props.blog.path);
    };

    // 作者名称
    const authorName: Ref<string> = computed(() => {
      return props.blog.git.contributors?.[0]?.name || 'zh-lx';
    });

    // 文章最上级目录
    const blogPath: Ref<string> = computed(() => {
      return props.blog.filePathRelative?.split('/')[0];
    });

    // 标签
    const tag: Ref<string> = computed(() => {
      return typeof props.blog.frontmatter?.tag === 'string'
        ? props.blog.frontmatter?.tag
        : props.blog.frontmatter?.tag[0];
    });

    // 文章标题
    const title: Ref<string> = computed(() => {
      if (props.blog.title) {
        // 若文章以 # xx 一级标题开头，则将该一级标题作为标题
        return props.blog.title;
      } else {
        // 否则取文件名作文标题
        const path: string = props.blog.filePathRelative.split('.md')?.[0];
        const pathList = path.split('\/');
        return pathList?.[pathList.length - 1];
      }
    });
    return {
      ...toRefs(props),
      formatTime,
      go2BlogDetail,
      authorName,
      blogPath,
      tag,
      title,
    };
  },
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
.blog-git-info {
  display: flex;
  flex-wrap: wrap;
  color: var(--commonTextColor);
  .git-item {
    margin-top: 0.1rem;
    float: left;
    min-width: 25%;
  }
  .blog-icon {
    margin-right: 0.3rem;
  }
}
@media (max-width: $MQMobileNarrow) {
  .blog-git-info {
    .git-item {
      width: 50%;
      margin-right: 0;
    }
  }
}
</style>
