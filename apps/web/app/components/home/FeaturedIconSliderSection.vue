<template>
  <section class="relative w-full bg-surface border-y border-gold-light/20 py-14 sm:py-20 overflow-hidden" aria-label="Destaques protagonistas do lar">
    <div class="pointer-events-none select-none absolute inset-0 z-[1]" aria-hidden="true">
      <div class="container mx-auto px-4 h-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 h-full items-start lg:items-center">
          <div class="lg:col-start-8 lg:col-span-5 flex justify-center pr-3 -mt-5 sm:-mt-2 lg:-mt-3">
            <svg class="w-[410px] sm:w-[480px] lg:w-[540px] max-w-none h-auto shrink-0 text-gold-light" viewBox="0 0 540 580" fill="none">
              <path d="M 84 580 L 84 266 A 186 186 0 0 1 456 266 L 456 580" stroke="currentColor" stroke-width="1" stroke-opacity="0.16" vector-effect="non-scaling-stroke" />
              <path d="M 54 580 L 54 266 A 216 216 0 0 1 486 266 L 486 580" stroke="currentColor" stroke-width="1" stroke-opacity="0.12" vector-effect="non-scaling-stroke" />
              <path d="M 24 580 L 24 266 A 246 246 0 0 1 516 266 L 516 580" stroke="currentColor" stroke-width="1" stroke-opacity="0.08" vector-effect="non-scaling-stroke" />
              <line x1="270" y1="29" x2="270" y2="50" stroke="currentColor" stroke-width="1" stroke-opacity="0.12" vector-effect="non-scaling-stroke" />
              <line x1="263" y1="37" x2="277" y2="37" stroke="currentColor" stroke-width="1" stroke-opacity="0.12" vector-effect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-10 container mx-auto px-4" v-reveal>
      <Carousel aria-label="Produtos protagonistas do lar" v-slot="{ selectedIndex, scrollPrev, scrollNext, scrollTo }" :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
        <CarouselContent class="ml-0">
          <CarouselItem class="pl-0" v-for="slide in featuredIconSlides" :key="slide.id">
            <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-14">
              <div class="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span class="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-gold-dark">
                  {{ slide.subtitle }}
                </span>

                <h2 class="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-[2.95rem] font-semibold tracking-tight text-foreground leading-[1.08]">
                  {{ slide.title }}
                </h2>

                <span class="mt-5 block w-14 h-px bg-gold-light/70" aria-hidden="true" />

                <p class="mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                  {{ slide.description }}
                </p>

                <Button class="mt-6 rounded-full px-8 font-semibold btn-sheen bg-primary text-primary-foreground hover:bg-gold-dark shadow-warm-md group/cta" size="lg" as-child>
                  <NuxtLink :to="slide.to">
                    <span>{{ slide.ctaLabel }}</span>
                    <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                  </NuxtLink>
                </Button>

                <div class="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <div class="flex items-center gap-2">
                    <button type="button" class="w-9 h-9 rounded-full border border-gold-light/45 bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Destaque anterior" @click="handlePrev( scrollPrev )">
                      <ArrowLeft class="w-4 h-4" />
                    </button>

                    <button type="button" class="w-9 h-9 rounded-full border border-gold-light/45 bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Próximo destaque" @click="handleNext( scrollNext )">
                      <ArrowRight class="w-4 h-4" />
                    </button>
                  </div>

                  <span class="text-xs font-semibold text-muted-foreground tabular-nums tracking-wider">
                    {{ String( selectedIndex + 1 ).padStart( 2, '0' ) }} / {{ String( featuredIconSlides.length ).padStart( 2, '0' ) }}
                  </span>

                  <div class="flex items-center gap-1.5" role="tablist" aria-label="Selecionar destaque">
                    <button type="button" role="tab" v-for="( dotSlide, dotIndex ) in featuredIconSlides" :key="dotSlide.id" :aria-label="`Ir para o destaque ${ dotIndex + 1 }: ${ dotSlide.title }`" :aria-selected="selectedIndex === dotIndex" :class="[ 'h-1.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', selectedIndex === dotIndex ? 'w-8 bg-primary' : 'w-2 bg-gold-light/50 hover:bg-primary/60' ]" @click="goToSlide( dotIndex, scrollTo )" />
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2 lg:col-span-5 flex justify-center pt-3 pr-3">
                <NuxtLink class="group/arch relative block w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[335px] rounded-t-full rounded-b-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" :to="slide.to">
                  <span class="absolute -top-3 -right-3 inset-0 rounded-t-full rounded-b-2xl border border-gold-light/65 pointer-events-none transition-transform duration-500 ease-out motion-reduce:transition-none group-hover/arch:translate-x-1 group-hover/arch:-translate-y-1" aria-hidden="true" />
                  <div class="relative aspect-[4/5] w-full rounded-t-full rounded-b-2xl overflow-hidden bg-card shadow-warm-lg ring-1 ring-gold-light/30">
                    <img class="w-full h-full object-cover transition-transform duration-700 ease-out motion-reduce:transition-none group-hover/arch:scale-105 motion-reduce:group-hover/arch:scale-100" loading="lazy" :src="slide.imageUrl" :alt="slide.imageAlt" />
                  </div>
                </NuxtLink>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import { ref } from 'vue';
  import { ArrowLeft, ArrowRight } from '@lucide/vue';
  import { Button } from '@sagrada-familia/ui/button';
  import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
  import { featuredIconSlides } from '@/data/products';

  const carouselOptions = {
    loop: true
  };

  const carouselPlugins = [
    Autoplay( {
      delay: 7000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: ( emblaRoot ) => emblaRoot.parentElement
    } )
  ];

  const carouselApi = ref<CarouselApi | null>( null );

  const onInitApi = ( api: CarouselApi ) => {
    carouselApi.value = api;
  };

  const resetAutoplay = () => {
    carouselApi.value?.plugins()?.autoplay?.reset();
  };

  const handlePrev = ( scrollPrev: () => void ) => {
    scrollPrev();
    resetAutoplay();
  };

  const handleNext = ( scrollNext: () => void ) => {
    scrollNext();
    resetAutoplay();
  };

  const goToSlide = ( index: number, scrollTo: ( index: number ) => void ) => {
    scrollTo( index );
    resetAutoplay();
  };
</script>
