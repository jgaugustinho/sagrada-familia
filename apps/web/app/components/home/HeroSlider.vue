<template>
  <section class="container mx-auto px-4">
    <Carousel class="rounded-2xl overflow-hidden shadow-md border border-border bg-dark" aria-label="Destaques da loja" :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
      <CarouselContent :class="[ 'ml-0', isDragging ? 'md:cursor-grabbing select-none' : '' ]">
        <CarouselItem class="pl-0" v-for="( slide, index ) in slides" :key="slide.slug">
          <div class="relative h-[320px] sm:h-[380px] lg:h-[440px] w-full overflow-hidden">
            <img class="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable="false" :src="slide.imageUrl" :alt="slide.imageAlt" :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'" />

            <!-- Dark gradient overlays for legibility and bullet contrast -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15" aria-hidden="true" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />

            <!-- Slide Content -->
            <div class="relative z-10 h-full flex flex-col justify-end sm:justify-center px-6 sm:px-10 md:px-20 lg:px-24 pt-6 pb-12 sm:py-12">
              <div class="max-w-xl text-white">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground shadow-sm mb-3" data-slide-text :class="isDragging ? 'md:cursor-grabbing select-none' : 'cursor-text'">
                  {{ slide.badge }}
                </span>

                <h2 class="w-fit text-xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-sm" data-slide-text :class="isDragging ? 'md:cursor-grabbing select-none' : 'cursor-text'">
                  {{ slide.title }}
                </h2>

                <p class="w-fit mt-2 sm:mt-3 text-sm sm:text-base text-white/90 leading-relaxed line-clamp-2 sm:line-clamp-none" data-slide-text :class="isDragging ? 'md:cursor-grabbing select-none' : 'cursor-text'">
                  {{ slide.description }}
                </p>

                <Button class="mt-4 sm:mt-6 font-semibold shadow-md group/cta" size="lg" as-child>
                  <NuxtLink :to="slide.to">
                    <span>{{ slide.ctaLabel }}</span>
                    <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                  </NuxtLink>
                </Button>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <!-- Inside Navigation Arrows (hidden on mobile where swipe is primary) -->
      <CarouselPrevious class="hidden md:inline-flex left-4 size-10 cursor-pointer bg-dark/45 text-white border-white/25 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-md" @click="resetAutoplay" />
      <CarouselNext class="hidden md:inline-flex right-4 size-10 cursor-pointer bg-dark/45 text-white border-white/25 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-md" @click="resetAutoplay" />

      <!-- Inside Page Bullets -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark/35 backdrop-blur-sm border border-white/15" role="tablist" aria-label="Selecionar slide">
        <button
          type="button"
          role="tab"
          v-for="( slide, index ) in slides"
          :key="slide.slug"
          :aria-label="`Ir para o slide ${ index + 1 }: ${ slide.label }`"
          :aria-selected="currentSlide === index"
          :class="[ 'h-2 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white', currentSlide === index ? 'w-7 bg-primary' : 'w-2 bg-white/60 hover:bg-white' ]"
          @click="goToSlide( index )"
        />
      </div>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import { onUnmounted, ref } from 'vue';
  import { ArrowRight } from '@lucide/vue';
  import { Button } from '@/components/ui/button';
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

  interface HeroSlide {
    slug: string;
    label: string;
    badge: string;
    title: string;
    description: string;
    ctaLabel: string;
    to: string;
    imageUrl: string;
    imageAlt: string;
  }

  const slides: HeroSlide[] = [
    {
      slug: 'natal-2026',
      label: 'Natal 2026',
      badge: 'Especial Natal 2026',
      title: 'Prepare o seu lar para celebrar o nascimento de Jesus',
      description: 'Presépios artesanais, imagens da Sagrada Família e adornos natalinos cheios de significado.',
      ctaLabel: 'Ver coleção de Natal',
      to: '/c/natal-2026',
      imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Decoração de Natal com luzes acolhedoras para celebrar o nascimento de Jesus'
    },
    {
      slug: 'promocoes',
      label: 'Promoções',
      badge: 'Ofertas Especiais',
      title: 'Artigos religiosos selecionados com descontos exclusivos',
      description: 'Aproveite condições especiais em imagens, terços, bíblias e presentes devocionais.',
      ctaLabel: 'Conferir promoções',
      to: '/c/promocoes',
      imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Presentes religiosos embalados com cuidado em destaque promocional'
    },
    {
      slug: 'imagens',
      label: 'Imagens',
      badge: 'Devoção & Arte Sacra',
      title: 'Imagens sacras que abençoam e inspiram a oração',
      description: 'Esculturas em resina, madeira, gesso e pó de mármore com acabamento artesanal.',
      ctaLabel: 'Explorar imagens',
      to: '/c/imagens',
      imageUrl: 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Arte sacra e escultura religiosa iluminada com suavidade'
    },
    {
      slug: 'decoracao',
      label: 'Decoração',
      badge: 'Casa & Proteção',
      title: 'Fé e acolhimento em cada ambiente da sua casa',
      description: 'Mandalas, crucifixos de parede, capelinhas e adornos para proteger a sua família.',
      ctaLabel: 'Ver decoração',
      to: '/c/decoracao',
      imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80',
      imageAlt: 'Ambiente doméstico acolhedor decorado com quadros e peças religiosas'
    }
  ];

  const carouselOptions = {
    loop: true,
    watchDrag: ( _api: CarouselApi, evt: MouseEvent | TouchEvent ) => {
      if ( typeof MouseEvent !== 'undefined' && evt instanceof MouseEvent ) {
        const target = evt.target as HTMLElement | null;
        return !target?.closest( '[data-slide-text], a, button' );
      }

      return true;
    }
  };

  const carouselPlugins = [
    Autoplay( {
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      // Observe the outer Carousel root so hovering inside arrows/bullets also pauses autoplay.
      rootNode: ( emblaRoot ) => emblaRoot.parentElement
    } )
  ];

  const carouselApi = ref<CarouselApi | null>( null );
  const currentSlide = ref( 0 );
  const isDragging = ref( false );

  const syncCurrentSlide = ( api: CarouselApi ) => {
    currentSlide.value = api.selectedScrollSnap();
  };

  const onPointerDown = () => {
    isDragging.value = true;
  };

  const onPointerUp = () => {
    isDragging.value = false;
  };

  const unbindApiListeners = () => {
    if ( !carouselApi.value ) {
      return;
    }

    carouselApi.value.off( 'select', syncCurrentSlide );
    carouselApi.value.off( 'reInit', syncCurrentSlide );
    carouselApi.value.off( 'pointerDown', onPointerDown );
    carouselApi.value.off( 'pointerUp', onPointerUp );
  };

  const onInitApi = ( api: CarouselApi ) => {
    unbindApiListeners();
    carouselApi.value = api;
    syncCurrentSlide( api );
    api.on( 'select', syncCurrentSlide );
    api.on( 'reInit', syncCurrentSlide );
    api.on( 'pointerDown', onPointerDown );
    api.on( 'pointerUp', onPointerUp );
  };

  const resetAutoplay = () => {
    carouselApi.value?.plugins()?.autoplay?.reset();
  };

  const goToSlide = ( index: number ) => {
    carouselApi.value?.scrollTo( index );
    resetAutoplay();
  };

  onUnmounted( unbindApiListeners );
</script>
