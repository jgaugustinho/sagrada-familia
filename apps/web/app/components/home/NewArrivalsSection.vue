<template>
  <section class="w-full bg-surface border-y border-gold-light/20 py-14 sm:py-20" aria-labelledby="new-arrivals-heading">
    <div class="container mx-auto px-4">
      <SectionHeader heading-id="new-arrivals-heading" eyebrow="Acabaram de Chegar" title="Lançamentos & Novidades" align="center" action-label="Ver todos os lançamentos" action-to="/c/lancamentos" v-reveal />

      <div v-reveal="{ delay: 100 }">
        <ProductCarousel card-surface="elevated" aria-label="Lançamentos e novidades" :products="newArrivalProducts" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import SectionHeader from '@/components/home/SectionHeader.vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import { newArrivalProducts } from '@/data/products';
</script>
