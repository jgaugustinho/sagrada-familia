<template>
  <section class="container mx-auto px-4" aria-labelledby="special-offers-heading">
    <div class="flex items-end justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <span class="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
          Oportunidades da Semana
        </span>
        <h2 id="special-offers-heading" class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          Ofertas Especiais
        </h2>
      </div>

      <NuxtLink class="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0" to="/c/promocoes">
        <span>Ver todas</span>
        <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </NuxtLink>
    </div>

    <ProductCarousel aria-label="Ofertas especiais" :products="specialOfferProducts" />
  </section>
</template>

<script setup lang="ts">
  import { ArrowRight } from '@lucide/vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import { specialOfferProducts } from '@/data/products';
</script>
