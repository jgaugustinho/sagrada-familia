<template>
  <h3 data-slot="empty-title" :class="cn( 'font-serif text-xl sm:text-2xl font-semibold tracking-tight text-foreground', props.class )">
    <slot />
  </h3>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
