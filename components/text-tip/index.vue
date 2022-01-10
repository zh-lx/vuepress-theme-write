<template>
  <div class="text-tip-container">
    <div class="tip" v-if="tip">
      <div class="tip-text"></div>
      {{ tip }}
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  tip: {
    type: String,
    default: '',
  },
});

const { tip } = toRefs(props);
</script>

<style scoped lang="scss">
.text-tip-container {
  position: relative;
  .tip {
    display: none;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 10px);
    font-size: 12px;
    color: var(--tooltipColor);
    padding: 2px 8px;
    background-color: var(--tooltipBgc);
    border-radius: 4px;
    max-width: 100px;
    text-align: justify;
    word-wrap: break-word;
    .tip-text {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -100%);
      border: 6px solid transparent;
      border-bottom: 6px solid var(--tooltipBgc);
    }
  }
  &:hover {
    .tip {
      display: block;
      word-break: keep-all;
    }
  }
}
</style>
