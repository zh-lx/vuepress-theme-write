<template>
  <div class="site-info">
    <a class="site-code" href="https://beian.miit.gov.cn/"
      >鲁ICP备20023182号-1</a
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.site-info {
  width: 100vw;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  .site-code {
    color: var(--common-text-color);
    &:hover {
      color: var(--commonHoverTextColor);
    }
  }
}
</style>
