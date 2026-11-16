<template>
  <div class="pb-12">
    <h1 class="sr-only">Sagrada Família — Artigos Religiosos</h1>
    <HeroSlider />
    <TrustBar />
    <BestSellersSection />
  </div>
</template>

<script setup lang="ts">
  import BestSellersSection from '@/components/home/BestSellersSection.vue';
  import HeroSlider from '@/components/home/HeroSlider.vue';
  import TrustBar from '@/components/home/TrustBar.vue';
</script>
