<template>
  <Carousel :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
    <div class="relative">
      <CarouselContent class="-ml-4 py-2">
        <CarouselItem class="pl-4 basis-[43%] md:basis-[30%] lg:basis-1/5" v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious class="hidden md:inline-flex -left-3 lg:-left-5 z-10 size-10 bg-card/95 text-foreground border-border backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" @click="resetAutoplay" />
      <CarouselNext class="hidden md:inline-flex -right-3 lg:-right-5 z-10 size-10 bg-card/95 text-foreground border-border backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" @click="resetAutoplay" />
    </div>
  </Carousel>
</template>

<script setup lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import { ref } from 'vue';
  import ProductCard from '@/components/product/ProductCard.vue';
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
  import type { Product } from '@/data/products';

  defineProps<{
    products: Product[];
  }>();

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
