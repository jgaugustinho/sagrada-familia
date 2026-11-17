<template>
  <section class="container mx-auto px-4" aria-label="Destaques protagonistas do lar">
    <Carousel aria-label="Produtos protagonistas do lar" v-slot="{ selectedIndex, scrollTo }" :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
      <div class="relative bg-card text-card-foreground border border-border rounded-3xl shadow-sm overflow-hidden">
        <CarouselContent class="ml-0">
          <CarouselItem class="pl-0" v-for="slide in featuredIconSlides" :key="slide.id">
            <div class="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-12 p-6 sm:p-10 md:px-16 lg:px-20 lg:py-12">
              <div class="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                <span class="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  {{ slide.subtitle }}
                </span>

                <h2 class="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  {{ slide.title }}
                </h2>

                <p class="mt-3 sm:mt-4 text-sm sm:text-base text-foreground leading-relaxed max-w-xl">
                  {{ slide.description }}
                </p>

                <Button class="mt-5 sm:mt-6 rounded-full px-7 font-semibold shadow-sm group/cta" size="lg" as-child>
                  <NuxtLink :to="slide.to">
                    <span>{{ slide.ctaLabel }}</span>
                    <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
                  </NuxtLink>
                </Button>

                <div class="mt-5 flex items-center gap-2" role="tablist" aria-label="Selecionar destaque">
                  <button type="button" role="tab" v-for="( dotSlide, dotIndex ) in featuredIconSlides" :key="dotSlide.id" :aria-label="`Ir para o destaque ${ dotIndex + 1 }: ${ dotSlide.title }`" :aria-selected="selectedIndex === dotIndex" :class="[ 'h-2 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', selectedIndex === dotIndex ? 'w-7 bg-primary' : 'w-2 bg-primary/25 hover:bg-primary/50' ]" @click="goToSlide( dotIndex, scrollTo )" />
                </div>
              </div>

              <div class="order-1 lg:order-2 lg:col-span-5 flex justify-center">
                <NuxtLink class="group/img relative block aspect-square w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[360px] rounded-2xl overflow-hidden bg-background border border-border p-3 sm:p-4 shadow-md transition-shadow duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" :to="slide.to">
                  <div class="w-full h-full rounded-xl overflow-hidden bg-secondary/40">
                    <img class="w-full h-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover/img:scale-105 motion-reduce:group-hover/img:scale-100" loading="lazy" :src="slide.imageUrl" :alt="slide.imageAlt" />
                  </div>
                </NuxtLink>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious class="hidden md:inline-flex left-3 lg:left-4 z-10 size-10 bg-background/90 text-foreground border-border backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" @click="resetAutoplay" />
        <CarouselNext class="hidden md:inline-flex right-3 lg:right-4 z-10 size-10 bg-background/90 text-foreground border-border backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" @click="resetAutoplay" />
      </div>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import { ref } from 'vue';
  import { ArrowRight } from '@lucide/vue';
  import { Button } from '@/components/ui/button';
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
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

  const goToSlide = ( index: number, scrollTo: ( index: number ) => void ) => {
    scrollTo( index );
    resetAutoplay();
  };
</script>
