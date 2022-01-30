<template>
  <div class="blog-list">
    <div
      v-for="(blog, index) in blogsToShow"
      :key="blog.path"
      class="blog-item-container"
    >
      <BlogItem :blog="blog" />
    </div>
    <div class="blog-pagination">
      <div class="blog-pagination-left">
        <div
          class="pre-page pagination-item card"
          v-if="pagination.current > 1"
          @click="jumpToPage(pagination.current - 1)"
        >
          上一页
        </div>
        <div
          :class="`first-page pagination-item card ${
            pagination.current === 1 ? 'page-selected' : ''
          }`"
          @click="jumpToPage(1)"
        >
          1
        </div>
        <div
          :class="`second-page pagination-item card ${
            pagination.current === 2 ? 'page-selected' : ''
          }`"
          v-if="
            (pagination.current < 4 ||
              (pagination.current > pagination.pagesCount - 2 &&
                pagination.current > 3)) &&
            pagination.pagesCount >= 2
          "
          @click="jumpToPage(2)"
        >
          2
        </div>
        <div
          class="pre-ellipsis pagination-item"
          v-if="pagination.current > 3 && pagination.pagesCount > 5"
        >
          ...
        </div>
        <div
          class="current pagination-item card page-selected"
          v-if="
            ![1, 2, pagination.pagesCount - 1, pagination.pagesCount].includes(
              pagination.current
            )
          "
        >
          {{ pagination.current }}
        </div>
        <div
          class="next-ellipsisi pagination-item"
          v-if="
            pagination.current < pagination.pagesCount - 2 &&
            pagination.pagesCount > 5
          "
        >
          ...
        </div>
        <div
          :class="`last-second-page pagination-item card ${
            pagination.current === pagination.pagesCount - 1
              ? 'page-selected'
              : ''
          }`"
          v-if="
            (pagination.current > pagination.pagesCount - 3 ||
              (pagination.current < 3 &&
                pagination.current < pagination.pagesCount - 2)) &&
            pagination.pagesCount > 4
          "
          @click="jumpToPage(pagination.pagesCount - 1)"
        >
          {{ pagination.pagesCount - 1 }}
        </div>
        <div
          :class="`last-page pagination-item card ${
            pagination.current === pagination.pagesCount ? 'page-selected' : ''
          }`"
          v-if="pagination.pagesCount > 3"
          @click="jumpToPage(pagination.pagesCount)"
        >
          {{ pagination.pagesCount }}
        </div>
        <div
          class="next-page pagination-item card"
          v-if="pagination.current < pagination.pagesCount"
          @click="jumpToPage(pagination.current + 1)"
        >
          下一页
        </div>
      </div>
      <div class="blog-pagination-right">
        <div class="page-jump-box">
          <span>第</span>
          <input
            type="number"
            class="page-jump-input"
            v-model="inputPage"
            @keyup="inputTarget"
          />
          <span>页</span>
        </div>
        <div class="page-jump-btn pagination-item card" @click="go2TargetPage">
          Go
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 博客列表
import { watch, computed, reactive, toRefs } from 'vue';
import { Blog } from '@/types/blog';
import Message from '@/components/message';
import BlogItem from './BlogItem.vue';

interface Props {
  blogs: Blog[];
}
const PageSize = 10;

const props = withDefaults(defineProps<Props>(), {
  blogs: () => [],
});

const state = reactive({
  pagination: {
    current: 1,
    total: 0,
    pagesCount: 0,
  },
  inputPage: '',
});

// 当前页要展示的 blog 列表
const blogsToShow = computed(() => {
  const start = (state.pagination.current - 1) * PageSize;
  const end = start + PageSize;
  console.log(props.blogs);
  return props.blogs.slice(start, end);
});

// 滚动到顶部
const scrollToBlogsTop = () => {
  const homeBgHeight = (
    document.querySelector('#__home_bg_container') as HTMLElement
  ).offsetHeight;
  window.scrollTo(0, Math.ceil(homeBgHeight));
};

const jumpToPage = (pageNum) => {
  state.pagination.current = pageNum;
  scrollToBlogsTop();
};

const inputTarget = (e: KeyboardEvent) => {
  if (e.keyCode === 13) {
    go2TargetPage();
  }
};

// 跳转到目标页面
const go2TargetPage = () => {
  const targetPage = Number(state.inputPage);
  if (
    targetPage % 1 === 0 &&
    targetPage >= 1 &&
    targetPage <= state.pagination.pagesCount
  ) {
    state.pagination.current = targetPage;
    scrollToBlogsTop();
  } else {
    Message('页码输入错误');
  }
};

watch(
  () => props.blogs,
  (blogs) => {
    state.pagination.pagesCount = Math.ceil(blogs.length / PageSize);
  }
);

const { pagination, inputPage } = toRefs(state);
</script>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';
.blog-list {
  max-width: 700px;
  width: 100%;
  .blog-item-container {
    margin-bottom: 22px;
  }
  .blog-pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .pagination-item {
      height: 28px;
      line-height: 28px;
      text-align: center;
      min-width: 28px;
      padding: 0 8px;
      &:hover {
        color: var(--theme-color);
        cursor: pointer;
      }
    }
    .blog-pagination-left {
      display: flex;
      .pagination-item {
        margin-left: 10px;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }

    .blog-pagination-right {
      display: flex;
      align-items: center;
      .page-jump-box {
        display: flex;
        align-items: center;
        height: 24px;
        line-height: 24px;
      }
      .page-jump-input {
        width: 28px;
        height: 24px;
        line-height: 24px;
        padding: 0 2px;
        outline: none;
        margin: 0 4px;
        text-align: center;
        border: var(--input-border) !important;
        // 去掉number输入框上下按钮
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
      .page-jump-btn {
        margin-left: 12px;
      }
    }
    .page-selected {
      background-color: var(--theme-color);
      color: var(--reverse-text-color);
      &:hover {
        color: var(--reverse-text-color);
      }
    }
  }

  .pre-ellipsisi,
  .next-ellipsisi {
    &:hover {
      color: var(--common-text-color);
      cursor: default;
    }
  }
}

@media (max-width: $MQMobile) {
  .blog-list {
    .blog-pagination-left {
      width: 100%;
      justify-content: center;
    }
    .blog-pagination-right {
      margin-top: 14px;
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
