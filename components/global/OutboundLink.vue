<template>
  <RawOutboundLink>
    <span class="sr-only">{{ themeLocale.openInNewWindow }}</span>
  </RawOutboundLink>
</template>

<script>
import { defineComponent } from 'vue';
import { OutboundLink } from '@vuepress/client';
import { useThemeLocaleData } from '../../composables';

/**
 * Override the built-in `<OutboundLink>` for a11y
 */
export default defineComponent({
  name: 'OutboundLink',

  components: {
    RawOutboundLink: OutboundLink,
  },

  setup() {
    const themeLocale = useThemeLocaleData();

    return {
      themeLocale,
    };
  },
});
</script>

<style lang="scss" scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
  user-select: none;
}
</style>
