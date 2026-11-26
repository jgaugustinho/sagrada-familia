<template>
  <div data-slot="empty-content" :class="cn( 'flex flex-wrap items-center justify-center gap-2.5', props.class )">
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
