<template>
  <LayoutContainer>
    <Home />
  </LayoutContainer>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
@import '~@/styles/_variables.scss';
:deep(.sidebar) {
  transform: translateX(-100%);
}
@media (max-width: $MQMobile) {
  :deep(.sidebar) {
    transform: translateX(-100%);
  }
}
@media (max-width: $MQMobileNarrow) {
  .main-container {
    .main-content {
      padding-left: 22px;
    }
  }
  :deep(.sidebar) {
    transform: translateX(-100%);
  }
  :deep(.theme-container) {
    .sidebar-open {
      .sidebar {
        transform: translateX(0);
      }
    }
  }
}
</style>
