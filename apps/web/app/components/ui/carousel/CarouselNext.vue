<template>
  <Button type="button" aria-label="Próximo slide" data-slot="carousel-next" :variant="variant" :size="size" :disabled="!canScrollNext" :class="cn( 'absolute size-8 rounded-full cursor-pointer', orientation === 'horizontal' ? 'top-1/2 -right-12 -translate-y-1/2' : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90', props.class )" @click="scrollNext">
    <slot>
      <ChevronRight class="size-4" />
    </slot>
  </Button>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@sagrada-familia/ui/button';
  import { ChevronRight } from '@lucide/vue';
  import { cn } from 'cn';
  import { Button } from '@sagrada-familia/ui/button';
  import { useCarousel } from './useCarousel';

  const props = withDefaults( defineProps<{
    variant?: ButtonVariants[ 'variant' ];
    size?: ButtonVariants[ 'size' ];
    class?: HTMLAttributes[ 'class' ];
  }>(), {
    variant: 'outline',
    size: 'icon'
  } );

  const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>
