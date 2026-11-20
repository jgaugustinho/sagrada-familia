<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground">
    <TopBar />
    <TopHeader />
    <MainHeader />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
    <BackToTopButton />
  </div>
</template>

<script setup lang="ts">
  import TopBar from '@/components/header/TopBar.vue';
  import TopHeader from '@/components/header/TopHeader.vue';
  import MainHeader from '@/components/header/MainHeader.vue';
  import Footer from '@/components/footer/Footer.vue';
  import BackToTopButton from '@/components/BackToTopButton.vue';
</script>
