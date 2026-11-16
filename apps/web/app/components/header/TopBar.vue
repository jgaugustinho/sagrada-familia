<template>
  <aside class="bg-dark text-dark-foreground text-sm border-b border-dark/20 overflow-hidden" aria-label="Informações e avisos promocionais">
    <div class="container mx-auto px-4">
      <!-- Desktop: Displays all items side-by-side -->
      <div class="hidden md:flex items-center justify-between py-2 text-center font-medium">
        <div class="flex items-center gap-2" v-for="( item, index ) in notices" :key="index">
          <component class="w-3.5 h-3.5 text-primary shrink-0" :is="item.icon" />
          <span v-html="item.text" />
        </div>
      </div>

      <!-- Mobile: Carousel cycling one active notice at a time -->
      <div class="md:hidden relative h-9 flex items-center justify-center font-medium">
        <Transition name="slide" mode="out-in">
          <div class="flex items-center justify-center gap-2 px-2 text-center" :key="currentIndex">
            <component class="w-3.5 h-3.5 text-primary shrink-0" :is="notices[ currentIndex ]?.icon" />
            <span v-html="notices[ currentIndex ]?.text" />
          </div>
        </Transition>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, type Component } from 'vue';
  import { CreditCard, QrCode, Truck } from '@lucide/vue';

  interface NoticeItem {
    icon: Component;
    text: string;
  }

  const notices: NoticeItem[] = [
    {
      icon: CreditCard,
      text: 'Até <strong>10x sem juros</strong> nos cartões'
    },
    {
      icon: QrCode,
      text: '<strong>5% OFF</strong> no Pix'
    },
    {
      icon: Truck,
      text: '<strong>Frete Grátis</strong> acima de R$250'
    }
  ];

  const currentIndex = ref( 0 );
  let intervalTimer: ReturnType<typeof setInterval> | null = null;

  onMounted( () => {
    intervalTimer = setInterval( () => {
      currentIndex.value = ( currentIndex.value + 1 ) % notices.length;
    }, 2500 );
  } );

  onUnmounted( () => {
    if ( intervalTimer ) {
      clearInterval( intervalTimer );
    }
  } );
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.35s ease;
  }

  .slide-enter-from {
    opacity: 0;
    transform: translateY(100%);
  }

  .slide-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
</style>
