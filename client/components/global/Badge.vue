<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: false,
    default: 'tip',
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
  vertical: {
    type: String,
    required: false,
    default: undefined,
  },
});
</script>

<template>
  <span
    class="badge"
    :class="type"
    :style="{
      verticalAlign: vertical,
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<style lang="scss" scoped>
@import '~@/styles/_variables.scss';

.badge {
  display: inline-block;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  color: var(--color-text-0);
  background-color: var(--blue-6);
  vertical-align: top;

  .table-of-contents & {
    vertical-align: middle;
  }

  &.tip {
    background-color: var(--blue-6);
  }

  &.warning {
    background-color: $badgeWarningColor;
  }

  &.danger {
    background-color: $badgeDangerColor;
  }

  & + & {
    margin-left: 5px;
  }
}

.table-of-contents {
  .badge {
    vertical-align: middle;
  }
}
</style>
