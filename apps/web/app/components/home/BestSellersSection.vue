<template>
  <section class="container mx-auto px-4" aria-labelledby="best-sellers-heading">
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

    <ProductCarousel aria-label="Produtos mais amados" :products="bestSellerProducts" />
  </section>
</template>

<script setup lang="ts">
  import { ArrowRight } from '@lucide/vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import { bestSellerProducts } from '@/data/products';
</script>
