<template>
  <div>
    <Loading :visible="showLoading" />
    <LayoutContainer>
      <Home />
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import { HOME_BG_ID } from '@/constants/global';

const state = reactive({
  showLoading: true,
});

onMounted(() => {
  onBgImgLoaded();
});

// 判断背景图加载完成
const onBgImgLoaded = () => {
  const src = window
    .getComputedStyle(document.getElementById(HOME_BG_ID))
    .background.match(/url\(\"?(.*)\"\)/)[1];
  const img = new Image();
  img.src = src;
  img.onload = function () {
    state.showLoading = false;
  };
};

const { showLoading } = toRefs(state);
</script>
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
