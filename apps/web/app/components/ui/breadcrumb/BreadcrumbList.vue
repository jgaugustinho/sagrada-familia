<template>
  <ol data-slot="breadcrumb-list" :class="cn( 'text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs sm:text-sm break-words sm:gap-2', props.class )">
    <slot />
  </ol>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/lib/utils';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
