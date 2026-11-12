<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <TopBar />
    <TopHeader />
    <MainHeader />

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  import TopBar from '@/components/header/TopBar.vue';
  import TopHeader from '@/components/header/TopHeader.vue';
  import MainHeader from '@/components/header/MainHeader.vue';
</script>
