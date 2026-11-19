<template>
  <section class="w-full bg-background surface-linen py-14 sm:py-20" aria-labelledby="best-sellers-heading">
    <div class="relative z-10 container mx-auto px-4">
      <SectionHeader heading-id="best-sellers-heading" eyebrow="Campeões de Venda" title="Os Mais Amados" action-label="Ver todos" action-to="/c/mais-vendidos" v-reveal />

      <div v-reveal="{ delay: 100 }">
        <ProductCarousel aria-label="Produtos mais amados" show-rank :products="bestSellerProducts" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import SectionHeader from '@/components/home/SectionHeader.vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import { bestSellerProducts } from '@/data/products';
</script>
