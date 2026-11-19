<template>
  <Carousel class="-my-2" :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
    <div class="relative">
      <CarouselContent class="-ml-4 py-2">
        <CarouselItem v-for="( product, index ) in products" :key="product.id" :class="[ 'pl-4', itemBasisClass ]">
          <ProductCard :product="product" :rank="showRank ? index + 1 : undefined" :surface="cardSurface" />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious class="hidden md:inline-flex -left-3 lg:-left-5 z-10 size-10 bg-card/95 text-foreground border-gold-light/40 backdrop-blur-sm shadow-warm-sm hover:bg-primary hover:text-primary-foreground hover:border-primary" @click="resetAutoplay" />
      <CarouselNext class="hidden md:inline-flex -right-3 lg:-right-5 z-10 size-10 bg-card/95 text-foreground border-gold-light/40 backdrop-blur-sm shadow-warm-sm hover:bg-primary hover:text-primary-foreground hover:border-primary" @click="resetAutoplay" />
    </div>
  </Carousel>
</template>

<script setup lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import { ref } from 'vue';
  import ProductCard from '@/components/product/ProductCard.vue';
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
  import type { Product } from '@/data/products';

  withDefaults( defineProps<{
    products: Product[];
    showRank?: boolean;
    cardSurface?: 'default' | 'elevated';
    itemBasisClass?: string;
  }>(), {
    showRank: false,
    cardSurface: 'default',
    itemBasisClass: 'basis-[56%] sm:basis-[34%] md:basis-[30%] lg:basis-1/5'
  } );

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
