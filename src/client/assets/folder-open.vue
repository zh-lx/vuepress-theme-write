<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 9V41L9 21H39.5V15C39.5 13.8954 38.6046 13 37.5 13H24L19 7H6C4.89543 7 4 7.89543 4 9Z"
      :stroke="color || '#707fa0'"
      :stroke-width="strokeWidth || 3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M40 41L44 21H8.8125L4 41H40Z"
      fill="none"
      :stroke="color || '#707fa0'"
      :stroke-width="strokeWidth || 3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
  size: string;
  fill?: string;
  color?: string;
  strokeWidth: number;
}>();
</script>

<style scoped></style>
