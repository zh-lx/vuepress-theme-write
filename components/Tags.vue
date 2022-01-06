<template>
  <div class="tags-box">
    <div
      v-for="tag in tags"
      :key="tag.name"
      :class="`tag-label pointer transition ${
        router.currentRoute.value.query.tag === tag.name ? 'selected-tag' : ''
      }`"
      :style="{
        background: `${isTagPage ? 'var(--defaultTagBgc)' : getRandomColor()}`,
        color: `${
          isTagPage ? 'var(--commonTextColor)' : 'var(--reverseTextColor)'
        }`,
      }"
      @click="handleClickTag(tag.name)"
    >
      {{ decodeURI(tag.name) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed } from 'vue';
import { usePageList } from '@/composables';
import { Tag } from '@/types';
import { getRandomColor } from '@/utils';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Tags',
  setup(props) {
    const router = useRouter();

    let tags = ref<Tag[]>([]);
    const isTagPage = computed(() => {
      return router.currentRoute.value.path.startsWith('/tags/');
    });
    usePageList().then((pageList) => {
      tags.value = pageList?.tagList?.value || [];
    });

    const handleClickTag: (tag: string) => void = (tag) => {
      router.push(`/tags/?tag=${decodeURI(tag)}`);
    };

    return {
      tags,
      getRandomColor,
      router,
      handleClickTag,
      isTagPage,
    };
  },
});
</script>

<style scoped lang="scss">
.tags-box {
  display: flex;
  flex-wrap: wrap;
  .tag-label {
    margin-right: 12px;
    margin-top: 8px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    font-size: 14px;
    &:hover {
      transform: scale(1.1);
    }
    color: var(--reverseTextColor);
    &:last-of-type {
      margin-right: 0;
    }
  }
  .selected-tag {
    background-color: var(--commonSelectedBgc) !important;
    color: var(--reverseTextColor) !important;
    &:hover {
      transform: scale(1);
    }
  }
}
</style>
