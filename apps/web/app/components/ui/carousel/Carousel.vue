<template>
  <div role="region" aria-roledescription="carousel" tabindex="0" data-slot="carousel" :class="cn( 'relative', props.class )" @keydown="onKeyDown">
    <slot :can-scroll-next="canScrollNext" :can-scroll-prev="canScrollPrev" :carousel-api="carouselApi" :carousel-ref="carouselRef" :orientation="orientation" :scroll-next="scrollNext" :scroll-prev="scrollPrev" :scroll-to="scrollTo" :selected-index="selectedIndex" :scroll-snaps="scrollSnaps" />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import type { CarouselApi, EmblaOptions, EmblaPlugin } from './interface';
  import { cn } from 'cn';
  import { useProvideCarousel } from './useCarousel';

  const props = withDefaults( defineProps<{
    opts?: EmblaOptions;
    plugins?: EmblaPlugin;
    orientation?: 'horizontal' | 'vertical';
    class?: HTMLAttributes[ 'class' ];
  }>(), {
    orientation: 'horizontal'
  } );

  const emits = defineEmits<{
    ( e: 'init-api', payload: CarouselApi ): void;
  }>();

  const {
    canScrollNext,
    canScrollPrev,
    carouselApi,
    carouselRef,
    orientation,
    scrollNext,
    scrollPrev,
    scrollTo,
    selectedIndex,
    scrollSnaps
  } = useProvideCarousel( props, emits );

  defineExpose( {
    canScrollNext,
    canScrollPrev,
    carouselApi,
    carouselRef,
    orientation,
    scrollNext,
    scrollPrev,
    scrollTo,
    selectedIndex,
    scrollSnaps
  } );

  const onKeyDown = ( event: KeyboardEvent ) => {
    const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

    if ( event.key === prevKey ) {
      event.preventDefault();
      scrollPrev();
      return;
    }

    if ( event.key === nextKey ) {
      event.preventDefault();
      scrollNext();
    }
  };
</script>
