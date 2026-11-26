<template>
  <thead data-slot="table-header" :class="cn( 'bg-surface/55 [&_tr]:border-b [&_tr]:border-gold-light/25', props.class )">
    <slot />
  </thead>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
