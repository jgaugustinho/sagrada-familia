<template>
  <div class="flex flex-col gap-10 sm:gap-12 pt-6 pb-12">
    <h1 class="sr-only">Sagrada Família — Artigos Religiosos</h1>

    <div class="flex flex-col gap-4">
      <HeroSlider />
      <TrustBar />
    </div>

    <BestSellersSection />
    <CategoryExploreSection />
    <SeasonalShowcaseSection />
    <SpecialOffersSection />
    <DevotionExploreSection />
    <NewArrivalsSection />
    <DevotionScenariosSection />
    <FeaturedIconSliderSection />
    <CustomerTestimonialsSection />
    <DailyLiturgySection />
  </div>
</template>

<script setup lang="ts">
  import BestSellersSection from '@/components/home/BestSellersSection.vue';
  import CategoryExploreSection from '@/components/home/CategoryExploreSection.vue';
  import CustomerTestimonialsSection from '@/components/home/CustomerTestimonialsSection.vue';
  import DailyLiturgySection from '@/components/home/DailyLiturgySection.vue';
  import DevotionExploreSection from '@/components/home/DevotionExploreSection.vue';
  import DevotionScenariosSection from '@/components/home/DevotionScenariosSection.vue';
  import FeaturedIconSliderSection from '@/components/home/FeaturedIconSliderSection.vue';
  import HeroSlider from '@/components/home/HeroSlider.vue';
  import NewArrivalsSection from '@/components/home/NewArrivalsSection.vue';
  import SeasonalShowcaseSection from '@/components/home/SeasonalShowcaseSection.vue';
  import SpecialOffersSection from '@/components/home/SpecialOffersSection.vue';
  import TrustBar from '@/components/home/TrustBar.vue';
</script>
