<script setup lang="ts">
import { useThemeLocaleData } from '@/composables';

defineEmits(['toggle']);

const themeLocale = useThemeLocaleData();
</script>

<template>
  <div
    class="toggle-sidebar-button"
    :title="themeLocale.toggleSidebar"
    aria-expanded="false"
    role="button"
    tabindex="0"
    @click="$emit('toggle')"
  >
    <div class="icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:color';

@import '~@/styles/_variables.scss';
/**
 * toggle sidebar button
 */
.toggle-sidebar-button {
  position: absolute;
  top: 8px;
  left: 14px;
  display: none;
  padding: 8px;
  cursor: pointer;
}

.toggle-sidebar-button .icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  cursor: inherit;

  span {
    display: inline-block;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: var(--common-text-color);
    transition: transform 0.3s ease;

    &:nth-child(2) {
      margin: 6px 0;
    }
  }
}

@media screen and (max-width: $MQMobile) {
  .toggle-sidebar-button {
    display: block;
  }
}
</style>
