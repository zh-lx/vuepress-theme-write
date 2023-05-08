<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    :fill="fill || 'none'"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 10.5H40"
      :stroke="color || '#707fa0'"
      :stroke-width="strokeWidth || 3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24 19.5H40"
      :stroke="color || '#707fa0'"
      :stroke-width="strokeWidth || 3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M24 28.5H40"
      :stroke="color || '#707fa0'"
      :stroke-width="strokeWidth || 3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 37.5H40"
      :stroke="color || '#707fa0'"
      :stroke-width="strokeWidth || 3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 19L8 24L16 29V19Z"
      fill="none"
      :stroke="color || '#707fa0'"
      :stroke-width="strokeWidth || 3"
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
