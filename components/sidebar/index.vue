<script setup lang="ts">
import NavbarItems from '@/components/navbar/NavbarItems.vue';
import SidebarItems from './SidebarItems.vue';
</script>

<template>
  <aside class="sidebar">
    <NavbarItems />
    <slot name="top" />
    <slot name="author" />
    <slot name="category" />
    <slot name="tag" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
