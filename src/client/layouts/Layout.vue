<template>
  <div>
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
  </div>
</template>

<script lang="ts" setup>
import { usePageData } from '@vuepress/client';
import Page from '@/components/page/index.vue';
import LayoutContainer from '@/components/global/LayoutContainer.vue';
const page = usePageData();
</script>
<style lang="scss" scoped>
body {
  padding-top: 50px;
}
</style>
