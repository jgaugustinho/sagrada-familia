<template>
  <section class="container mx-auto px-4" aria-labelledby="new-arrivals-heading">
    <div class="flex items-end justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <span class="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
          Acabaram de Chegar
        </span>
        <h2 id="new-arrivals-heading" class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          Lançamentos &amp; Novidades
        </h2>
      </div>

      <NuxtLink class="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0" to="/c/lancamentos">
        <span>Ver todos</span>
        <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </NuxtLink>
    </div>

    <ProductCarousel aria-label="Lançamentos e novidades" :products="newArrivalProducts" />
  </section>
</template>

<script setup lang="ts">
  import { ArrowRight } from '@lucide/vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import { newArrivalProducts } from '@/data/products';
</script>
