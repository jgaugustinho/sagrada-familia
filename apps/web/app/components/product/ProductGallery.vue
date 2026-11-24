<template>
  <div class="flex flex-col md:flex-row gap-3.5 sm:gap-4">
    <!-- Desktop Vertical Thumbnail Rail -->
    <div class="hidden md:flex flex-col gap-2.5 w-20 shrink-0" role="tablist" aria-label="Galeria de miniaturas do produto" v-if="media.length > 1">
      <button type="button" role="tab" class="relative aspect-square w-full rounded-xl overflow-hidden bg-surface/70 border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="( item, index ) in media" :key="item.id" :aria-selected="activeIndex === index" :aria-label="`Ver foto ${ index + 1 } de ${ media.length }: ${ item.alt }`" :class="activeIndex === index ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background shadow-warm-sm' : 'border-border/80 opacity-75 hover:opacity-100 hover:border-gold-light'" @click="selectImage( item.id )">
        <img class="w-full h-full object-cover" loading="lazy" :src="item.url" :alt="item.alt" />
      </button>
    </div>

    <!-- Main Visual Stage -->
    <div class="relative flex-1 min-w-0">
      <div class="group relative aspect-square sm:aspect-[4/4.15] w-full rounded-2xl overflow-hidden bg-surface/70 ring-1 ring-inset ring-dark/5 shadow-warm-md select-none" @mousemove="handleMouseMove" @mouseenter="isHovering = true" @mouseleave="handleMouseLeave">
        <!-- Discount Badge Only -->
        <div class="absolute top-3.5 left-3.5 z-20 pointer-events-none" v-if="discountPercentage !== null">
          <Badge class="rounded-full px-3 py-1 text-xs font-semibold tracking-wide shadow-warm-sm hover:bg-primary">
            -{{ discountPercentage }}% OFF
          </Badge>
        </div>

        <!-- Interactive Main Image -->
        <button type="button" class="gallery-stage relative block w-full h-full overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset" :aria-label="`Ampliar imagem: ${ activeItem.alt }`" @click="openLightbox">
          <Transition :name="transitionName">
            <span class="block w-full h-full" :key="activeItem.id">
              <img class="w-full h-full object-cover transition-transform duration-300 ease-out motion-reduce:transition-none" :src="activeItem.url" :alt="activeItem.alt" :style="zoomImageStyle" />
            </span>
          </Transition>
        </button>

        <!-- Bottom Overlay Bar: Expand Trigger -->
        <div class="absolute inset-x-3.5 bottom-3.5 z-20 flex items-end justify-end pointer-events-none">
          <button type="button" class="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-card/92 backdrop-blur-md border border-gold-light/45 px-3 py-1.5 text-[11px] font-semibold text-foreground shadow-warm-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer" aria-label="Abrir imagem em tela cheia" @click.stop="openLightbox">
            <Expand class="w-3.5 h-3.5" aria-hidden="true" />
            <span class="hidden sm:inline">Ampliar</span>
          </button>
        </div>
      </div>

      <!-- Mobile Horizontal Thumbnail Strip -->
      <div class="mt-2.5 flex md:hidden items-center gap-2.5 overflow-x-auto py-1.5 px-1 -mx-1 thumb-strip-scroll" role="tablist" aria-label="Miniaturas do produto" v-if="media.length > 1">
        <button type="button" role="tab" class="relative w-16 h-16 rounded-xl overflow-hidden bg-surface/70 border shrink-0 transition-all duration-200 cursor-pointer" v-for="( item, index ) in media" :key="`${ item.id }-mobile`" :aria-selected="activeIndex === index" :aria-label="`Ver foto ${ index + 1 }`" :class="activeIndex === index ? 'border-primary ring-2 ring-primary ring-offset-1 ring-offset-background' : 'border-border/80 opacity-75'" @click="selectImage( item.id )">
          <img class="w-full h-full object-cover" loading="lazy" :src="item.url" :alt="item.alt" />
        </button>
      </div>
    </div>

    <!-- Fullscreen Lightbox Modal -->
    <Teleport to="body">
      <div role="dialog" aria-modal="true" class="fixed inset-0 z-50 bg-dark-deep/95 backdrop-blur-md text-background flex flex-col justify-between p-4 sm:p-6 animate-fade-in" v-if="isLightboxOpen" :aria-label="`Galeria ampliada de ${ productName }`" @click.self="closeLightbox">
        <div class="flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
              † Galeria de Detalhes
            </p>
            <p class="font-serif text-lg sm:text-xl font-semibold text-background truncate">
              {{ productName }}
            </p>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <span class="text-xs font-semibold text-background/80 tabular-nums" v-if="media.length > 1">
              {{ activeIndex + 1 }} / {{ media.length }}
            </span>

            <button type="button" class="w-10 h-10 rounded-full bg-background/10 border border-gold-light/35 text-background hover:bg-primary hover:border-primary flex items-center justify-center transition-colors cursor-pointer" aria-label="Fechar visualização ampliada" @click="closeLightbox">
              <X class="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div class="relative flex-1 flex items-center justify-center my-4 min-h-0">
          <button type="button" class="hidden sm:flex w-11 h-11 rounded-full bg-background/10 border border-gold-light/35 text-background hover:bg-primary hover:border-primary items-center justify-center transition-colors cursor-pointer mr-4 shrink-0" aria-label="Foto anterior" v-if="media.length > 1" @click="goToPrevious">
            <ChevronLeft class="w-5 h-5" aria-hidden="true" />
          </button>

          <div class="relative max-h-full max-w-4xl w-full flex flex-col items-center justify-center min-h-0">
            <Transition mode="out-in" :name="transitionName">
              <div class="flex flex-col items-center justify-center" :key="activeItem.id">
                <img class="max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-warm-lg border border-gold-light/20" :src="activeItem.url" :alt="activeItem.alt" />

                <p class="mt-3 text-xs sm:text-sm text-background/80 text-center max-w-xl" v-if="activeItem.caption">
                  {{ activeItem.caption }}
                </p>
              </div>
            </Transition>
          </div>

          <button type="button" class="hidden sm:flex w-11 h-11 rounded-full bg-background/10 border border-gold-light/35 text-background hover:bg-primary hover:border-primary items-center justify-center transition-colors cursor-pointer ml-4 shrink-0" aria-label="Próxima foto" v-if="media.length > 1" @click="goToNext">
            <ChevronRight class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div class="flex items-center justify-center gap-2.5 overflow-x-auto py-1" v-if="media.length > 1">
          <button type="button" class="w-14 h-14 rounded-lg overflow-hidden border transition-all duration-200 shrink-0 cursor-pointer" v-for="( item, index ) in media" :key="`${ item.id }-lightbox`" :aria-label="`Selecionar foto ${ index + 1 }`" :class="activeIndex === index ? 'border-gold-bright ring-2 ring-gold-bright opacity-100' : 'border-gold-light/25 opacity-55 hover:opacity-90'" @click="selectImage( item.id )">
            <img class="w-full h-full object-cover" :src="item.url" :alt="item.alt" />
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, ref, watch } from 'vue';
  import { ChevronLeft, ChevronRight, Expand, X } from '@lucide/vue';
  import { Badge } from '@sagrada-familia/ui/badge';
  import type { ProductMediaItem } from '@/data/product-details';

  const props = withDefaults( defineProps<{
    media: ProductMediaItem[];
    activeImageId?: string;
    discountPercentage?: number | null;
    productName: string;
  }>(), {
    activeImageId: undefined,
    discountPercentage: null
  } );

  const emit = defineEmits<{
    ( e: 'update:activeImageId', id: string ): void;
  }>();

  const isHovering = ref( false );
  const isLightboxOpen = ref( false );
  const zoomOrigin = ref( { x: 50, y: 50 } );
  const transitionDirection = ref<'next' | 'prev'>( 'next' );

  const transitionName = computed( () => {
    return transitionDirection.value === 'prev' ? 'gallery-prev' : 'gallery-next';
  } );

  const activeIndex = computed( () => {
    if ( props.media.length === 0 ) {
      return 0;
    }

    const idx = props.media.findIndex( ( item ) => item.id === props.activeImageId );
    return idx >= 0 ? idx : 0;
  } );

  watch( activeIndex, ( nextIdx, prevIdx ) => {
    if ( prevIdx === undefined || nextIdx === prevIdx ) {
      return;
    }

    const lastIdx = props.media.length - 1;
    if ( prevIdx === lastIdx && nextIdx === 0 ) {
      transitionDirection.value = 'next';
    } else if ( prevIdx === 0 && nextIdx === lastIdx ) {
      transitionDirection.value = 'prev';
    } else {
      transitionDirection.value = nextIdx > prevIdx ? 'next' : 'prev';
    }
  } );

  const activeItem = computed<ProductMediaItem>( () => {
    return props.media[ activeIndex.value ] ?? {
      id: 'fallback',
      url: '',
      alt: props.productName
    };
  } );

  const zoomImageStyle = computed( () => {
    if ( !isHovering.value || isLightboxOpen.value ) {
      return { transformOrigin: '50% 50%', transform: 'scale(1)' };
    }

    return {
      transformOrigin: `${ zoomOrigin.value.x }% ${ zoomOrigin.value.y }%`,
      transform: 'scale(1.55)'
    };
  } );

  const selectImage = ( id: string ) => {
    emit( 'update:activeImageId', id );
  };

  const goToPrevious = () => {
    if ( props.media.length <= 1 ) {
      return;
    }

    const nextIdx = ( activeIndex.value - 1 + props.media.length ) % props.media.length;
    const target = props.media[ nextIdx ];
    if ( target ) {
      selectImage( target.id );
    }
  };

  const goToNext = () => {
    if ( props.media.length <= 1 ) {
      return;
    }

    const nextIdx = ( activeIndex.value + 1 ) % props.media.length;
    const target = props.media[ nextIdx ];
    if ( target ) {
      selectImage( target.id );
    }
  };

  const handleMouseMove = ( event: MouseEvent ) => {
    if ( !import.meta.client ) {
      return;
    }

    if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches || window.matchMedia( '(pointer: coarse)' ).matches ) {
      return;
    }

    const target = event.currentTarget as HTMLElement | null;
    if ( !target ) {
      return;
    }

    const rect = target.getBoundingClientRect();
    const x = Math.min( 100, Math.max( 0, ( ( event.clientX - rect.left ) / rect.width ) * 100 ) );
    const y = Math.min( 100, Math.max( 0, ( ( event.clientY - rect.top ) / rect.height ) * 100 ) );
    zoomOrigin.value = { x, y };
  };

  const handleMouseLeave = () => {
    isHovering.value = false;
  };

  const openLightbox = () => {
    isHovering.value = false;
    isLightboxOpen.value = true;
  };

  const closeLightbox = () => {
    isLightboxOpen.value = false;
  };

  const handleKeydown = ( event: KeyboardEvent ) => {
    if ( !isLightboxOpen.value ) {
      return;
    }

    if ( event.key === 'Escape' ) {
      closeLightbox();
    } else if ( event.key === 'ArrowLeft' ) {
      goToPrevious();
    } else if ( event.key === 'ArrowRight' ) {
      goToNext();
    }
  };

  watch( isLightboxOpen, ( open ) => {
    if ( !import.meta.client ) {
      return;
    }

    document.body.style.overflow = open ? 'hidden' : '';
    if ( open ) {
      window.addEventListener( 'keydown', handleKeydown );
    } else {
      window.removeEventListener( 'keydown', handleKeydown );
    }
  } );

  onUnmounted( () => {
    if ( import.meta.client ) {
      document.body.style.overflow = '';
      window.removeEventListener( 'keydown', handleKeydown );
    }
  } );
</script>

<style scoped>
  .thumb-strip-scroll {
    scrollbar-width: none;
  }

  .thumb-strip-scroll::-webkit-scrollbar {
    display: none;
  }

  .gallery-next-enter-active, .gallery-next-leave-active, .gallery-prev-enter-active, .gallery-prev-leave-active {
    transition:
      opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .gallery-stage .gallery-next-leave-active, .gallery-stage .gallery-prev-leave-active {
    position: absolute;
    inset: 0;
  }

  .gallery-next-enter-from, .gallery-prev-leave-to {
    opacity: 0;
    transform: translateX(16px) scale(0.985);
  }

  .gallery-next-leave-to, .gallery-prev-enter-from {
    opacity: 0;
    transform: translateX(-16px) scale(0.985);
  }

  @media (prefers-reduced-motion: reduce) {
    .gallery-next-enter-active, .gallery-next-leave-active, .gallery-prev-enter-active, .gallery-prev-leave-active {
      transition: none;
    }

    img {
      transform: none !important;
    }
  }
</style>
