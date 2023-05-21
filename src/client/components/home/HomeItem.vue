<script setup lang="ts">
import type { PropType } from 'vue';

interface HomeItem {
  title: string;
  text: string;
  img: string;
}
defineProps({
  item: {
    type: Object as PropType<HomeItem>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="home-item">
    <div v-if="item.title || item.text" class="home-item-content">
      <img
        :src="
          item.img ||
          `https://image-1300099782.cos.ap-beijing.myqcloud.com/blog%2Fitem${
            index + 1
          }.png`
        "
        alt="图片"
        class="item-image"
      />
      <div class="item-title">{{ item.title }}</div>
      <div class="item-text">{{ item.text }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~@/styles/_variables.scss';
.home-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px;
  width: calc(100% / 3);
  .home-item-content {
    background-color: var(--wc-bg-heavy);
    padding: 16px 24px;
    border-radius: 8px;
    height: 100%;
  }

  .item-image {
    height: 60px;
    width: 60px;
    object-fit: contain;
  }
  .item-title {
    font-size: 16px;
    color: var(--wc-text-primary);
    font-weight: 600;
    margin-top: 12px;
  }
  .item-text {
    font-size: 14px;
    margin-top: 16px;
  }
}

@media (max-width: $MQMobile) {
  .home-item {
    width: 50%;
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-item {
    width: 100%;
  }
}
</style>
