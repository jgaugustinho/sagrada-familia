<template>
  <section class="container mx-auto px-4 py-8 sm:py-10" aria-labelledby="best-sellers-heading">
    <div class="flex items-end justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <span class="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
          Campeões de Venda
        </span>
        <h2 id="best-sellers-heading" class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          Os Mais Amados
        </h2>
      </div>

      <NuxtLink class="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0" to="/c/mais-vendidos">
        <span>Ver todos</span>
        <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </NuxtLink>
    </div>

    <Carousel aria-label="Produtos mais amados" :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
      <div class="relative">
        <CarouselContent class="-ml-4 py-2">
          <CarouselItem class="pl-4 basis-[43%] md:basis-[30%] lg:basis-1/5" v-for="product in bestSellerProducts" :key="product.id">
            <ProductCard :product="product" />
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious class="hidden md:inline-flex -left-3 lg:-left-5 z-10 size-10 bg-card/95 text-foreground border-border backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" @click="resetAutoplay" />
        <CarouselNext class="hidden md:inline-flex -right-3 lg:-right-5 z-10 size-10 bg-card/95 text-foreground border-border backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" @click="resetAutoplay" />
      </div>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import { ref } from 'vue';
  import { ArrowRight } from '@lucide/vue';
  import ProductCard from '@/components/product/ProductCard.vue';
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
  import { bestSellerProducts } from '@/data/products';

  const carouselOptions = {
    align: 'start' as const,
    slidesToScroll: 'auto' as const,
    loop: true
  };

  const carouselPlugins = [
    Autoplay( {
      delay: 9000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: ( emblaRoot ) => emblaRoot.parentElement?.parentElement ?? emblaRoot.parentElement
    } )
  ];

  const carouselApi = ref<CarouselApi | null>( null );

  const onInitApi = ( api: CarouselApi ) => {
    carouselApi.value = api;
  };

  const resetAutoplay = () => {
    carouselApi.value?.plugins()?.autoplay?.reset();
  };
</script>
