<template>
  <div class="blog-list">
    <div
      v-for="(blog, index) in blogsToShow"
      :key="index"
      class="blog-item-div"
    >
      <BlogItem :blog="blog" />
    </div>
    <div class="blog-pagination">
      <div class="blog-pagination-left">
        <div
          class="pre-page pagination-label card"
          v-if="pagination.current > 1"
          @click="jumpToPage(pagination.current - 1)"
        >
          上一页
        </div>
        <div
          :class="`first-page pagination-label card ${
            pagination.current === 1 ? 'page-selected' : ''
          }`"
          @click="jumpToPage(1)"
        >
          1
        </div>
        <div
          :class="`second-page pagination-label card ${
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
          class="pre-ellipsis pagination-label"
          v-if="pagination.current > 3 && pagination.pagesCount > 5"
        >
          ...
        </div>
        <div
          class="current pagination-label card page-selected"
          v-if="
            ![1, 2, pagination.pagesCount - 1, pagination.pagesCount].includes(
              pagination.current
            )
          "
        >
          {{ pagination.current }}
        </div>
        <div
          class="next-ellipsisi pagination-label"
          v-if="
            pagination.current < pagination.pagesCount - 2 &&
            pagination.pagesCount > 5
          "
        >
          ...
        </div>
        <div
          :class="`last-second-page pagination-label card ${
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
          :class="`last-page pagination-label card ${
            pagination.current === pagination.pagesCount ? 'page-selected' : ''
          }`"
          v-if="pagination.pagesCount > 3"
          @click="jumpToPage(pagination.pagesCount)"
        >
          {{ pagination.pagesCount }}
        </div>
        <div
          class="next-page pagination-label card"
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
            @keyup="inputJump"
          />
          <span>页</span>
        </div>
        <div class="page-jump-btn pagination-label card" @click="goJump">
          Go
        </div>
      </div>
    </div>
    <div ref="tipRef" class="warn-tip">页码输入错误</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  watch,
  ref,
  onMounted,
  reactive,
  toRefs,
  computed,
  onUnmounted,
} from 'vue';
import { usePagesInfo } from '@/composables';
import BlogItem from '@/components/BlogItem.vue';
const PageSize = 10;

export default defineComponent({
  name: 'Blogs',
  components: {
    BlogItem,
  },
  props: {
    blogs: {
      type: Object,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      pagination: {
        current: 1,
        total: 0,
        pagesCount: 0,
      },
      inputPage: '',
    });

    watch(
      () => props.blogs,
      (blogs) => {
        state.pagination.pagesCount = Math.ceil(blogs.length / PageSize);
      }
    );

    let timer = ref();
    const tipRef = ref();

    const blogsToShow = computed(() => {
      const start = (state.pagination.current - 1) * PageSize;
      const end = start + PageSize;
      return props.blogs.slice(start, end);
    });
    const scrollToBlogsTop = () => {
      const navBarHeight = (document.querySelector('.navbar') as HTMLElement)
        .offsetHeight;
      window.scrollTo(0, document.documentElement.clientHeight - navBarHeight);
    };

    const jumpToPage = (pageNum) => {
      state.pagination.current = pageNum;
      scrollToBlogsTop();
    };

    const inputJump = (e) => {
      if (e.keyCode === 13) {
        goJump();
      }
    };

    const goJump = () => {
      const targetPage = Number(state.inputPage);
      if (
        targetPage % 1 === 0 &&
        targetPage >= 1 &&
        targetPage <= state.pagination.pagesCount
      ) {
        state.pagination.current = targetPage;
        scrollToBlogsTop();
      } else {
        tipRef.value.style.top = '20%';
        if (timer.value) {
          clearTimeout(timer.value);
        }
        timer.value = setTimeout(() => {
          timer.value = null;
          tipRef.value.style.top = '0';
        }, 2500);
      }
    };

    onUnmounted(() => {
      if (timer.value) {
        clearTimeout(timer.value);
        timer.value = null;
      }
    });

    return {
      ...toRefs(state),
      ...toRefs(props),
      blogsToShow,
      jumpToPage,
      inputJump,
      goJump,
      tipRef,
    };
  },
});
</script>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';
.blog-list {
  .blog-item-div {
    margin-bottom: 1.5rem;
  }
  .blog-pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .pagination-label {
      height: 28px;
      line-height: 28px;
      text-align: center;
      min-width: 28px;
      padding: 0 8px;
      &:hover {
        color: var(--commonSelectedBgc);
        cursor: pointer;
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
        border: 1px solid var(--inputBorderColor) !important;
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
      background-color: var(--commonSelectedBgc);
      color: var(--reverseTextColor);
      &:hover {
        color: var(--reverseTextColor);
      }
    }

    .blog-pagination-left {
      display: flex;
      .pagination-label {
        margin-left: 10px;
        &:first-of-type {
          margin-left: 0;
        }
      }
    }
  }

  .pre-ellipsisi,
  .next-ellipsisi {
    &:hover {
      color: var(--commonTextColor);
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
      margin-top: 1rem;
      width: 100%;
      justify-content: center;
    }
  }
}

.warn-tip {
  position: fixed;
  text-align: center;
  top: 0;
  left: 50%;
  transform: translate(-50%, -100%);
  background-color: #fdf6ec;
  color: #e6a23c;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 1s linear;
}
</style>
