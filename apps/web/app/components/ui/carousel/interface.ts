import type emblaCarouselVue from 'embla-carousel-vue';
import type { EmblaCarouselVueType } from 'embla-carousel-vue';
import type { HTMLAttributes, Ref } from 'vue';

type EmblaCarouselParams = Parameters<typeof emblaCarouselVue>;
type UnwrapMaybeRef<T> = T extends Ref<infer V> ? V : T;

export type CarouselApi = NonNullable<EmblaCarouselVueType[ 1 ][ 'value' ]>;
export type EmblaOptions = UnwrapMaybeRef<NonNullable<EmblaCarouselParams[ 0 ]>>;
export type EmblaPlugin = UnwrapMaybeRef<NonNullable<EmblaCarouselParams[ 1 ]>>;

export interface CarouselProps {
  opts?: EmblaOptions;
  plugins?: EmblaPlugin;
  orientation?: 'horizontal' | 'vertical';
}

export interface CarouselEmits {
  ( e: 'init-api', payload: CarouselApi ): void;
}

export interface WithClassAsProps {
  class?: HTMLAttributes[ 'class' ];
}

