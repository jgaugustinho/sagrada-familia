<template>
  <Transition name="back-to-top">
    <button type="button" class="group fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30 size-11 sm:size-12 rounded-full bg-dark-deep/90 text-background border border-gold-light/40 backdrop-blur-md shadow-warm-lg flex items-center justify-center transition-all duration-300 ease-out motion-reduce:transition-none hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer" aria-label="Voltar para o topo" title="Voltar para o topo" v-if="isVisible" @click="scrollToTop">
      <ArrowUp class="w-5 h-5 stroke-[1.75] transition-transform duration-200 motion-reduce:transition-none group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { ArrowUp } from '@lucide/vue';

  const SCROLL_THRESHOLD_PX = 360;

  const isVisible = ref( false );

  const updateVisibility = () => {
    isVisible.value = window.scrollY > SCROLL_THRESHOLD_PX;
  };

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

    window.scrollTo( {
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    } );
  };

  onMounted( () => {
    updateVisibility();
    window.addEventListener( 'scroll', updateVisibility, { passive: true } );
  } );

  onUnmounted( () => {
    window.removeEventListener( 'scroll', updateVisibility );
  } );
</script>

<style scoped>
  .back-to-top-enter-active,
  .back-to-top-leave-active {
    transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .back-to-top-enter-from,
  .back-to-top-leave-to {
    opacity: 0;
    transform: translateY(10px) scale(0.92);
  }

  @media (prefers-reduced-motion: reduce) {
    .back-to-top-enter-active,
    .back-to-top-leave-active {
      transition: none;
    }
  }
</style>
