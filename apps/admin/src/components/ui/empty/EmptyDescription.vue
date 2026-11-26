<template>
  <p data-slot="empty-description" :class="cn( 'text-sm text-muted-foreground leading-relaxed', props.class )">
    <slot />
  </p>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
