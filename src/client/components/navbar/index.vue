<script setup lang="ts">
// 顶部导航栏
import { computed, onMounted, ref } from 'vue';
import { useThemeLocaleData } from '@/composables';
import NavbarBrand from './NavbarBrand.vue';
import NavbarItems from './NavbarItems.vue';
import ToggleDarkModeButton from './ToggleDarkModeButton.vue';
import ToggleSidebarButton from './ToggleSidebarButton.vue';
import TranslateButton from './Translate.vue';
import NavbarExtra from 'NavbarExtra';

defineEmits(['toggle-sidebar']);

const themeLocale = useThemeLocaleData();

const navbar = ref<HTMLElement | null>(null);
const navbarBrand = ref<HTMLElement | null>(null);

const linksWrapperMaxWidth = ref(0);
const linksWrapperStyle = computed(() => {
  if (!linksWrapperMaxWidth.value) {
    return {};
  }
  return {
    maxWidth: linksWrapperMaxWidth.value + 'px',
  };
});
const enableDarkMode = computed(() => themeLocale.value.colorModeSwitch);

// avoid overlapping of long title and long navbar links
onMounted(() => {
  // TODO: migrate to css var
  // refer to _variables.scss
  const MOBILE_DESKTOP_BREAKPOINT = 719;
  const navbarHorizontalPadding =
    getCssValue(navbar.value, 'paddingLeft') +
    getCssValue(navbar.value, 'paddingRight');
  const handleLinksWrapWidth = (): void => {
    if (window.innerWidth <= MOBILE_DESKTOP_BREAKPOINT) {
      linksWrapperMaxWidth.value = 0;
    } else {
      linksWrapperMaxWidth.value =
        navbar.value!.offsetWidth -
        navbarHorizontalPadding -
        (navbarBrand.value?.offsetWidth || 0);
    }
  };
  handleLinksWrapWidth();
  window.addEventListener('resize', handleLinksWrapWidth, false);
  window.addEventListener('orientationchange', handleLinksWrapWidth, false);
});

function getCssValue(el: HTMLElement | null, property: string): number {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const val = el?.ownerDocument?.defaultView?.getComputedStyle(el, null)?.[
    property
  ];
  const num = Number.parseInt(val, 10);
  return Number.isNaN(num) ? 0 : num;
}
</script>

<template>
  <header ref="navbar" class="navbar">
    <div class="navbar-content">
      <ToggleSidebarButton @toggle="$emit('toggle-sidebar')" />

      <span ref="navbarBrand">
        <NavbarBrand />
      </span>

      <div class="navbar-items-wrapper" :style="linksWrapperStyle">
        <slot name="before" />
        <NavbarItems class="can-hide" />
        <slot name="after" />
        <NavbarExtra />
        <TranslateButton />
        <ToggleDarkModeButton v-if="enableDarkMode" />
        <NavbarSearch />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use 'sass:color';

@import '~@/styles/_variables.scss';

$navbar-vertical-padding: 10px;
$navbar-horizontal-padding: 22px;

.navbar {
  line-height: calc($navbarHeight - 20px);
  .navbar-content {
    width: min(100%, $maxWidth);
    padding: $navbar-vertical-padding $navbar-horizontal-padding;
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .navbar-items-wrapper {
    padding-left: 22px;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 12px;
    position: absolute;
    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;
    align-items: center;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
    }
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    padding-left: 56px;
    .can-hide {
      display: none;
    }

    .navbar-items-wrapper {
      padding-left: 22px;
    }
  }
}

.navbar {
  box-shadow: var(--wc-shadow-2);
}
.search-box {
  margin-left: 20px;
}
</style>
