<template>
  <aside class="bg-gold-dark text-background text-xs tracking-wide border-b border-gold-bright/25 overflow-hidden antialiased" aria-label="Informações e avisos promocionais">
    <div class="container mx-auto px-4">
      <!-- Desktop: Displays all items side-by-side -->
      <div class="hidden md:flex items-center justify-center gap-6 lg:gap-10 py-2 text-center font-medium">
        <template v-for="( item, index ) in notices" :key="index">
          <span class="w-px h-3.5 bg-background/25 shrink-0" aria-hidden="true" v-if="index > 0" />
          <div class="flex items-center gap-2">
            <component class="w-3.5 h-3.5 text-background/90 shrink-0" :is="item.icon" />
            <span>{{ item.prefix }}<strong class="font-semibold">{{ item.strong }}</strong>{{ item.suffix }}</span>
          </div>
        </template>
      </div>

      <!-- Mobile: Carousel cycling one active notice at a time -->
      <div class="md:hidden relative h-9 flex items-center justify-center font-medium">
        <Transition name="slide" mode="out-in">
          <div class="flex items-center justify-center gap-2 px-2 text-center" :key="currentIndex">
            <component class="w-3.5 h-3.5 text-background/90 shrink-0" :is="notices[ currentIndex ]?.icon" />
            <span>{{ notices[ currentIndex ]?.prefix }}<strong class="font-semibold">{{ notices[ currentIndex ]?.strong }}</strong>{{ notices[ currentIndex ]?.suffix }}</span>
          </div>
        </Transition>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { CreditCard, QrCode, Truck } from '@lucide/vue';

  const notices = [
    {
      icon: CreditCard,
      prefix: 'Até ',
      strong: '10x sem juros',
      suffix: ' nos cartões'
    },
    {
      icon: QrCode,
      strong: '5% OFF',
      suffix: ' no Pix'
    },
    {
      icon: Truck,
      strong: 'Frete Grátis',
      suffix: ' acima de R$250'
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
