import type { InjectionKey, Ref } from 'vue';
import type { CarouselApi, CarouselEmits, CarouselProps } from './interface';
import { computed, inject, provide, ref, watch } from 'vue';
import emblaCarouselVue from 'embla-carousel-vue';

export interface CarouselContext {
  carouselRef: Ref<HTMLElement | undefined>;
  carouselApi: Ref<CarouselApi | undefined>;
  canScrollPrev: Ref<boolean>;
  canScrollNext: Ref<boolean>;
  selectedIndex: Ref<number>;
  scrollSnaps: Ref<number[]>;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: ( index: number ) => void;
  orientation: 'horizontal' | 'vertical';
}

const CAROUSEL_INJECTION_KEY: InjectionKey<CarouselContext> = Symbol( 'carousel' );

export function useProvideCarousel(
  { opts, orientation = 'horizontal', plugins }: CarouselProps,
  emits: CarouselEmits
): CarouselContext {
  const emblaOptions = computed( () => ( {
    ...opts,
    axis: orientation === 'horizontal' ? ( 'x' as const ) : ( 'y' as const )
  } ) );

  const emblaPlugins = computed( () => plugins ?? [] );

  const [ emblaNode, emblaApi ] = emblaCarouselVue( emblaOptions, emblaPlugins );

  const canScrollPrev = ref( false );
  const canScrollNext = ref( false );
  const selectedIndex = ref( 0 );
  const scrollSnaps = ref<number[]>( [] );

  const scrollPrev = () => {
    emblaApi.value?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi.value?.scrollNext();
  };

  const scrollTo = ( index: number ) => {
    emblaApi.value?.scrollTo( index );
  };

  const onSelect = ( api: CarouselApi ) => {
    canScrollPrev.value = api.canScrollPrev();
    canScrollNext.value = api.canScrollNext();
    selectedIndex.value = api.selectedScrollSnap();
  };

  const onInit = ( api: CarouselApi ) => {
    scrollSnaps.value = api.scrollSnapList();
    onSelect( api );
  };

  watch(
    emblaApi,
    ( api, _prevApi, onCleanup ) => {
      if ( !api ) {
        return;
      }

      onInit( api );
      api.on( 'reInit', onInit );
      api.on( 'select', onSelect );
      emits( 'init-api', api );

      onCleanup( () => {
        api.off( 'reInit', onInit );
        api.off( 'select', onSelect );
      } );
    },
    { immediate: true }
  );

  const context: CarouselContext = {
    carouselRef: emblaNode,
    carouselApi: emblaApi,
    canScrollPrev,
    canScrollNext,
    selectedIndex,
    scrollSnaps,
    scrollPrev,
    scrollNext,
    scrollTo,
    orientation
  };

  provide( CAROUSEL_INJECTION_KEY, context );

  return context;
}

export function useCarousel(): CarouselContext {
  const carouselState = inject( CAROUSEL_INJECTION_KEY );
  if ( !carouselState ) {
    throw new Error( 'useCarousel must be used within a <Carousel />' );
  }

  return carouselState;
}

