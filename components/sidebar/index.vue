<script setup lang="ts">
import SidebarItems from './SidebarItems.vue';
</script>

<template>
  <aside class="sidebar">
    <slot name="sidebar" />
    <slot name="top" />
    <slot name="author" />
    <slot name="category" />
    <slot name="tag" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
