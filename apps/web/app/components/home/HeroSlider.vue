<template>
  <section class="w-full bg-dark-deep overflow-hidden antialiased" :class="isHovered ? 'is-paused' : ''" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <Carousel class="bg-dark-deep" aria-label="Destaques da loja" :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
      <CarouselContent :class="[ 'ml-0', isDragging ? 'md:cursor-grabbing select-none' : '' ]">
        <CarouselItem class="pl-0" v-for="( slide, index ) in slides" :key="slide.slug">
          <div class="relative h-[440px] sm:h-[520px] lg:h-[580px] xl:h-[620px] w-full overflow-hidden">
            <picture class="absolute inset-0 block w-full h-full pointer-events-none">
              <source media="(min-width: 1440px)" :srcset="slide.images.wide" />
              <source media="(min-width: 768px)" :srcset="slide.images.desktop" />
              <img class="w-full h-full object-cover pointer-events-none" draggable="false" :class="currentSlide === index ? 'hero-ken-burns' : ''" :src="slide.images.mobile" :alt="slide.imageAlt" :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'" />
            </picture>

            <!-- Warm deep-brown gradient overlays for legibility and bullet contrast -->
            <div class="absolute inset-0 bg-gradient-to-r from-dark-deep/85 via-dark/50 to-dark/15" aria-hidden="true" />
            <div class="absolute inset-0 bg-gradient-to-t from-dark-deep/65 via-transparent to-dark-deep/20" aria-hidden="true" />

            <!-- Slide Content -->
            <div class="relative z-10 h-full container mx-auto px-4 md:px-14 lg:px-16 flex flex-col justify-end sm:justify-center pt-8 pb-16 sm:py-12">
              <div class="max-w-xl text-background">
                <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] bg-dark-deep/55 backdrop-blur-md border border-gold-bright/45 text-gold-bright shadow-warm-sm mb-3.5" data-slide-text :class="[ isDragging ? 'md:cursor-grabbing select-none' : 'cursor-text', currentSlide === index ? 'hero-enter hero-enter-1' : '' ]">
                  <span aria-hidden="true">✦</span>
                  <span>{{ slide.badge }}</span>
                </span>

                <h2 class="w-fit font-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-background drop-shadow-sm" data-slide-text :class="[ isDragging ? 'md:cursor-grabbing select-none' : 'cursor-text', currentSlide === index ? 'hero-enter hero-enter-2' : '' ]">
                  {{ slide.title }}
                </h2>

                <p class="w-fit mt-3 sm:mt-4 text-sm sm:text-base text-background/85 leading-relaxed line-clamp-2 sm:line-clamp-none" data-slide-text :class="[ isDragging ? 'md:cursor-grabbing select-none' : 'cursor-text', currentSlide === index ? 'hero-enter hero-enter-3' : '' ]">
                  {{ slide.description }}
                </p>

                <div class="mt-5 sm:mt-7 w-fit" :class="currentSlide === index ? 'hero-enter hero-enter-4' : ''">
                  <Button class="rounded-full px-7 font-semibold btn-sheen bg-primary text-primary-foreground hover:bg-gold-dark shadow-warm-md group/cta" size="lg" as-child>
                    <NuxtLink :to="slide.to">
                      <span>{{ slide.ctaLabel }}</span>
                      <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                    </NuxtLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <!-- Inside Navigation Arrows (hidden on mobile where swipe is primary) -->
      <CarouselPrevious class="hidden md:inline-flex left-4 lg:left-6 size-11 cursor-pointer bg-dark-deep/45 text-background border-gold-light/30 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-warm-md" @click="resetAutoplay" />
      <CarouselNext class="hidden md:inline-flex right-4 lg:right-6 size-11 cursor-pointer bg-dark-deep/45 text-background border-gold-light/30 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-warm-md" @click="resetAutoplay" />

      <!-- Inside Page Bullets with Live Progress Indicator -->
      <div class="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3.5 py-2 rounded-full bg-dark-deep/45 backdrop-blur-md border border-gold-light/20" role="tablist" aria-label="Selecionar slide">
        <button type="button" role="tab" v-for="( slide, index ) in slides" :key="slide.slug" :aria-label="`Ir para o slide ${ index + 1 }: ${ slide.label }`" :aria-selected="currentSlide === index" :class="[ 'relative h-1.5 rounded-full overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright', currentSlide === index ? 'w-11 bg-background/25' : 'w-2 bg-background/50 hover:bg-background/80' ]" @click="goToSlide( index )">
          <span class="hero-progress-fill absolute inset-y-0 left-0 w-full rounded-full bg-gold-bright" v-if="currentSlide === index" :key="`progress-${ currentSlide }-${ progressTick }`" />
        </button>
      </div>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import { onUnmounted, ref } from 'vue';
  import { ArrowRight } from '@lucide/vue';
  import { Button } from '@sagrada-familia/ui/button';
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

  const slides = [
    {
      slug: 'natal-2026',
      label: 'Natal 2026',
      badge: 'Especial Natal 2026',
      title: 'Prepare o seu lar para celebrar o nascimento de Jesus',
      description: 'Presépios artesanais, imagens da Sagrada Família e adornos natalinos cheios de significado.',
      ctaLabel: 'Ver coleção de Natal',
      to: '/c/natal-2026',
      images: {
        mobile: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=900&h=900&q=80',
        desktop: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1440&h=620&q=80',
        wide: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1920&h=620&q=80'
      },
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
      images: {
        mobile: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&h=900&q=80',
        desktop: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1440&h=620&q=80',
        wide: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1920&h=620&q=80'
      },
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
      images: {
        mobile: 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=900&h=900&q=80',
        desktop: 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1440&h=620&q=80',
        wide: 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1920&h=620&q=80'
      },
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
      images: {
        mobile: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&h=900&q=80',
        desktop: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1440&h=620&q=80',
        wide: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1920&h=620&q=80'
      },
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
      delay: 5500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      // Observe the outer Carousel root so hovering inside arrows/bullets also pauses autoplay.
      rootNode: ( emblaRoot ) => emblaRoot.parentElement
    } )
  ];

  const carouselApi = ref<CarouselApi | null>( null );
  const currentSlide = ref( 0 );
  const progressTick = ref( 0 );
  const isDragging = ref( false );
  const isHovered = ref( false );

  const syncCurrentSlide = ( api: CarouselApi ) => {
    currentSlide.value = api.selectedScrollSnap();
    progressTick.value += 1;
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
    progressTick.value += 1;
  };

  const goToSlide = ( index: number ) => {
    carouselApi.value?.scrollTo( index );
    resetAutoplay();
  };

  onUnmounted( unbindApiListeners );
</script>

<style scoped>
  .hero-ken-burns {
    animation: hero-ken-burns 7s ease-out forwards;
  }

  .hero-enter {
    animation: hero-fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .hero-enter-1 {
    animation-delay: 0.05s;
  }

  .hero-enter-2 {
    animation-delay: 0.14s;
  }

  .hero-enter-3 {
    animation-delay: 0.24s;
  }

  .hero-enter-4 {
    animation-delay: 0.34s;
  }

  .hero-progress-fill {
    transform-origin: left center;
    animation: hero-progress 5.5s linear forwards;
  }

  .is-paused .hero-ken-burns, .is-paused .hero-progress-fill {
    animation-play-state: paused;
  }

  @keyframes hero-ken-burns {
    from {
      transform: scale(1);
    }

    to {
      transform: scale(1.07);
    }
  }

  @keyframes hero-fade-up {
    from {
      opacity: 0;
      transform: translateY(16px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes hero-progress {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-ken-burns, .hero-enter, .hero-progress-fill {
      animation: none;
    }
  }
</style>
