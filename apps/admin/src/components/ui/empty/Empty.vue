<template>
  <div data-slot="empty" :class="cn( 'flex min-w-0 flex-1 flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-gold-light/55 bg-surface/25 px-6 py-12 text-center', props.class )">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
