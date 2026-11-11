<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <TopBar />

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  import TopBar from '@/components/layout/TopBar.vue'
</script>
