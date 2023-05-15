<script setup lang="ts">
import {
  ClientOnly,
  useRouteLocale,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client';
import { computed, h } from 'vue';
import type { FunctionalComponent } from 'vue';
import { useDarkMode, useThemeLocaleData } from '@/composables';

const routeLocale = useRouteLocale();
const siteLocale = useSiteLocaleData();
const themeLocale = useThemeLocaleData();
const isDarkMode = useDarkMode();

const navbarBrandLink = computed(
  () => themeLocale.value.home || routeLocale.value
);
const navbarBrandTitle = computed(() => siteLocale.value.title);
const navbarBrandLogo = computed(() => {
  if (isDarkMode.value && themeLocale.value.logoDark !== undefined) {
    return themeLocale.value.logoDark;
  }
  return themeLocale.value.logo;
});
const NavbarBrandLogo: FunctionalComponent = () => {
  if (!navbarBrandLogo.value) return null;
  const img = h('img', {
    class: 'logo',
    src: withBase(navbarBrandLogo.value),
    alt: navbarBrandTitle.value,
  });
  if (themeLocale.value.logoDark === undefined) {
    return img;
  }
  // wrap brand logo with <ClientOnly> to avoid ssr-mismatch
  // when using a different brand logo in dark mode
  return h(ClientOnly, img);
};
</script>

<template>
  <RouterLink :to="navbarBrandLink">
    <NavbarBrandLogo />

    <span
      v-if="navbarBrandTitle"
      class="site-name"
      :class="{ 'can-hide': navbarBrandLogo }"
    >
      {{ navbarBrandTitle }}
    </span>
  </RouterLink>
</template>

<style scoped lang="scss">
@use 'sass:color';

@import '~@/styles/_variables.scss';
.logo {
  height: calc($navbarHeight - 20px);
  min-width: calc($navbarHeight - 20px);
  margin-right: 12px;
  vertical-align: top;
}

.site-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--wc-text-primary);
  position: relative;
}

@media (max-width: $MQMobile) {
  .site-name {
    width: calc(100vw - 132px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .logo {
    display: none;
  }

  .can-hide {
    display: none;
  }
}
</style>
