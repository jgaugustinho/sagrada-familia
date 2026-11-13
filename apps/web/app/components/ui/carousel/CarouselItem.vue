<template>
  <div role="group" aria-roledescription="slide" data-slot="carousel-item" :class="cn( 'min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', props.class )">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';
  import { useCarousel } from './useCarousel';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();

  const { orientation } = useCarousel();
</script>
