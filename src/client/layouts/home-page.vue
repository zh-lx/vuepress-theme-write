<template>
  <LayoutContainer class="home-layout-container">
    <Home />
  </LayoutContainer>
</template>

<script setup lang="ts">
import LayoutContainer from '@/components/global/LayoutContainer.vue';
import Home from '@/components/home/index.vue';
</script>
<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
@media (max-width: $MQMobileNarrow) {
  .main-container {
    .main-content {
      padding-left: 22px;
    }
  }
}
</style>
