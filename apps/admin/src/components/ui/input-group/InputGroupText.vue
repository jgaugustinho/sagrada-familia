<template>
  <span data-slot="input-group-text" :class="cn( 'inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground select-none [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4', props.class )">
    <slot />
  </span>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
