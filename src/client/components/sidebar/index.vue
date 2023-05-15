<script setup lang="ts">
import SidebarItems from './SidebarItems.vue';
</script>

<template>
  <aside class="sidebar">
    <slot name="top" />
    <div class="sidebar-content">
      <slot name="sidebar" />
      <slot name="author" />
      <slot name="category" />
      <slot name="tag" />

      <SidebarItems />
    </div>
    <slot name="bottom" />
  </aside>
</template>
