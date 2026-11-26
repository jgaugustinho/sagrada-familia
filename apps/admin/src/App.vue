<template>
  <RouterView />
  <Toaster position="bottom-right" />
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { Toaster } from '@/components/ui/sonner';
</script>
