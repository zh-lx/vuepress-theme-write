<template>
  <LayoutContainer>
    <Page :key="page.path">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
  </LayoutContainer>
</template>

<script lang="ts" setup>
import { usePageData } from '@vuepress/client';
import Page from '@/components/page/index.vue';
const page = usePageData();
</script>
<style lang="scss" scoped>
body {
  padding-top: 3.6rem;
}
</style>
