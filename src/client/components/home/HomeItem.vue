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

const itemImageList = [
  'https://github.com/zh-lx/blog/assets/73059627/e8f0f879-e4b0-416c-96f5-f91f62c534d8',
  'https://github.com/zh-lx/blog/assets/73059627/08762712-e9e1-4ac4-a1da-a82371c3e1e7',
  'https://github.com/zh-lx/blog/assets/73059627/dc35ec10-00ae-4117-a57c-0c29e6933de1',
  'https://github.com/zh-lx/blog/assets/73059627/9df3bac4-8155-47e8-b200-2221654b9614',
  'https://github.com/zh-lx/blog/assets/73059627/6a21ee77-91a0-405d-8edb-732f62b007d6',
  'https://github.com/zh-lx/blog/assets/73059627/ba56df2c-6f72-4948-a4c4-1dade7dd8090',
];
</script>

<template>
  <div class="home-item">
    <div v-if="item.title || item.text" class="home-item-content">
      <img
        :src="item.img || itemImageList[index]"
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
