<template>
  <LayoutContainer>
    <Transition
      name="fade-slide-y"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @before-leave="onBeforeLeave"
    >
      <Page :key="page.path">
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </Transition>
  </LayoutContainer>
</template>

<script lang="ts">
import { defineComponent, Transition } from 'vue';
import { useRouter } from 'vue-router';
import { usePageData, usePageFrontmatter } from '@vuepress/client';
import Home from '@/components/Home.vue';
import Page from '@/components/Page.vue';
import LayoutContainer from '@/components/LayoutContainer.vue';
import { useScrollPromise, useThemeLocaleData } from '@/composables';

export default defineComponent({
  name: 'Layout',

  components: {
    Home,
    Transition,
    LayoutContainer,
    Page,
  },

  setup() {
    const page = usePageData();
    const themeLocale = useThemeLocaleData();

    // handle scrollBehavior with transition
    const scrollPromise = useScrollPromise();
    const onBeforeEnter = scrollPromise.resolve;
    const onBeforeLeave = scrollPromise.pending;

    return {
      page,
      onBeforeEnter,
      onBeforeLeave,
    };
  },
});
</script>
