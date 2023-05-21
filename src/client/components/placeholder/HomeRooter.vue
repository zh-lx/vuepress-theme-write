<template>
  <div class="footer">
    <div class="footer-left">
      <div class="powered">
        Powered By
        <a
          class="site-code"
          href="https://github.com/zh-lx/vuepress-theme-write"
          >Vuepress-Theme-Write</a
        >
      </div>
    </div>
    <div class="footer-right">
      <a class="site-code" href="https://beian.miit.gov.cn/"
        >鲁ICP备20023182号-2</a
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
.footer {
  border-top: 1px solid var(--wc-border-primary);
  padding: 20px 0;
  margin: 36px 30px 0;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  .site-code {
    color: var(--wc-text-primary);
    &:hover {
      color: var(--wc-text-brand) !important;
    }
  }
}
</style>
