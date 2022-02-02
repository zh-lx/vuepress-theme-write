<script setup lang="ts">
import type { PropType } from 'vue';

interface HomeItem {
  title: string;
  text: string;
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
    <div v-if="item.title || item.text">
      <img
        :src="`https://image-1300099782.cos.ap-beijing.myqcloud.com/blog%2Fitem${
          index + 1
        }.png`"
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
  margin-right: 60px;
  text-align: center;
  margin-top: 60px;

  .item-image {
    height: 60px;
    width: 60px;
    object-fit: contain;
  }
  .item-title {
    font-size: 16px;
    color: var(--main-text-color);
    font-weight: 600;
    margin-top: 12px;
  }
  .item-text {
    font-size: 14px;
    margin-top: 16px;
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-item {
    width: 70%;
    margin-right: 0;
  }
}

@media (min-width: $MQMobileNarrow) and (max-width: $MQMobile) {
  .home-item {
    width: 34%;
    max-width: 240px;
    &:nth-of-type(2n) {
      margin-right: 0;
    }
  }
}

@media (min-width: $MQMobile) {
  .home-item {
    width: 25%;
    /* max-width: 240px; */
    &:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
</style>
