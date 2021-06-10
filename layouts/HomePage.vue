<template>
  <div>
    <Loading :visible="showLoading" />
    <LayoutContainer>
      <Home />
    </LayoutContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';

export default defineComponent({
  name: 'HomePage',

  setup() {
    const state = reactive({
      showLoading: true,
    });

    onMounted(() => {
      onBgImgLoaded();
    });

    // 判断背景图加载完成
    const onBgImgLoaded = () => {
      const src = window
        .getComputedStyle(document.querySelector('#_homeBgContainer'))
        .background.match(/url\(\"?(.*)\"\)/)[1];
      const img = new Image();
      img.src = src;
      img.onload = function () {
        state.showLoading = false;
      };
    };

    return {
      ...toRefs(state),
    };
  },
});
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
  :deep(.toggle-sidebar-button) {
    display: none;
  }
  :deep(.navbar) {
    padding-left: 1.5rem;
  }
}
@media (max-width: $MQMobileNarrow) {
  .main-container {
    .main-content {
      padding-left: 1.5rem;
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
  :deep(.toggle-sidebar-button) {
    display: block;
  }
  :deep(.navbar) {
    padding-left: 4rem;
  }
}
</style>
