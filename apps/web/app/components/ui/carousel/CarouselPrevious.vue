<template>
  <Button type="button" aria-label="Slide anterior" data-slot="carousel-previous" :variant="variant" :size="size" :disabled="!canScrollPrev" :class="cn( 'absolute size-8 rounded-full cursor-pointer', orientation === 'horizontal' ? 'top-1/2 -left-12 -translate-y-1/2' : '-top-12 left-1/2 -translate-x-1/2 rotate-90', props.class )" @click="scrollPrev">
    <slot>
      <ChevronLeft class="size-4" />
    </slot>
  </Button>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@/components/ui/button';
  import { ChevronLeft } from '@lucide/vue';
  import { cn } from 'cn';
  import { Button } from '@/components/ui/button';
  import { useCarousel } from './useCarousel';

  const props = withDefaults( defineProps<{
    variant?: ButtonVariants[ 'variant' ];
    size?: ButtonVariants[ 'size' ];
    class?: HTMLAttributes[ 'class' ];
  }>(), {
    variant: 'outline',
    size: 'icon'
  } );

  const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>
