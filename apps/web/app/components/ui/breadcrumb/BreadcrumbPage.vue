<template>
  <span role="link" aria-disabled="true" aria-current="page" data-slot="breadcrumb-page" :class="cn( 'text-foreground font-medium', props.class )">
    <slot />
  </span>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from '@/lib/utils';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
