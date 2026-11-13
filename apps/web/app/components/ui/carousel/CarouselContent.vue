<template>
  <div class="overflow-hidden" data-slot="carousel-content" ref="carouselRef">
    <div :class="cn( 'flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', props.class )" v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';
  import { useCarousel } from './useCarousel';

  defineOptions( {
    inheritAttrs: false
  } );

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();

  const { carouselRef, orientation } = useCarousel();
</script>
