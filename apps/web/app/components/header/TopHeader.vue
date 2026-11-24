<template>
  <header class="sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300" :class="isScrolled ? 'bg-background/90 backdrop-blur-md border-border/90 shadow-warm-sm' : 'bg-background border-border/60'">
    <div class="container mx-auto px-4 py-3 md:py-2.5 grid grid-cols-[1fr_auto_1fr] md:flex items-center justify-between gap-y-3 md:gap-8">
      <!-- Mobile Left: Menu button -->
      <div class="flex items-center justify-start md:hidden">
        <MobileMenu />
      </div>

      <!-- Logo: Centered on mobile, Left on desktop -->
      <NuxtLink to="/" class="flex items-center justify-center md:justify-start shrink-0" aria-label="Página Inicial - Sagrada Família">
        <img alt="Sagrada Família - Artigos Religiosos" class="h-12 md:h-16 w-auto object-contain" :src="horizontal2dLogo" />
      </NuxtLink>

      <!-- Search Input: Second row full-width on mobile, Centered flex-1 on desktop -->
      <form class="col-span-3 order-last md:order-none md:flex-1 md:max-w-2xl md:mx-auto w-full" role="search" @submit.prevent="handleSearch">
        <div class="relative flex items-center w-full rounded-full border border-gold-light/45 bg-card focus-within:ring-2 focus-within:ring-primary/15 focus-within:border-primary shadow-warm-sm transition-all overflow-hidden">
          <Search class="w-4 h-4 text-muted-foreground ml-4 shrink-0 pointer-events-none" />

          <input type="search" class="w-full bg-transparent py-2 pl-3 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" aria-label="Buscar produtos na loja" :placeholder="isSearchFocused ? 'O que você está procurando?' : animatedPlaceholder" v-model="searchQuery" @focus="isSearchFocused = true" @blur="isSearchFocused = false" />

          <button type="submit" class="m-1 rounded-full bg-primary text-primary-foreground hover:bg-gold-dark font-medium text-xs sm:text-sm px-4 py-2 shrink-0 transition-colors cursor-pointer">
            Buscar
          </button>
        </div>
      </form>

      <!-- Actions: My Account & Shopping Cart -->
      <div class="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
        <NuxtLink to="/minha-conta" class="group inline-flex items-center gap-2 p-2 md:px-3 md:py-1.5 rounded-full text-foreground hover:text-gold-dark hover:bg-surface/80 transition-colors" :aria-label="accountLabel" :title="accountLabel">
          <span class="hidden md:flex flex-col leading-tight text-right">
            <template v-if="isLoggedIn">
              <span class="text-xs font-medium text-muted-foreground">Olá, {{ firstName }}</span>
              <span class="text-[13px] sm:text-sm font-semibold text-foreground transition-colors group-hover:text-gold-dark">Minha conta</span>
            </template>

            <template v-else>
              <span class="text-xs font-medium text-muted-foreground">Entre ou</span>
              <span class="text-[13px] sm:text-sm font-semibold text-foreground transition-colors group-hover:text-gold-dark">cadastre-se</span>
            </template>
          </span>

          <User class="w-6 h-6 stroke-[1.75] shrink-0" />
        </NuxtLink>

        <button type="button" class="relative p-2 rounded-full text-foreground hover:text-gold-dark hover:bg-surface/80 transition-colors cursor-pointer" aria-label="Carrinho de compras" title="Carrinho de compras">
          <ShoppingCart class="w-6 h-6 stroke-[1.75]" />
          <span class="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center leading-none tabular-nums shadow-warm-sm" :class="isCartPulsing ? 'animate-cart-pop' : ''">
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
  import { Search, ShoppingCart, User } from '@lucide/vue';
  import { horizontal2dLogo } from '@sagrada-familia/assets';
  import MobileMenu from '@/components/header/MobileMenu.vue';
  import { useAuthPreview } from '@/composables/useAuthPreview';
  import { useCartPreview } from '@/composables/useCartPreview';

  const searchQuery = ref( '' );
  const isSearchFocused = ref( false );
  const isScrolled = ref( false );
  const isCartPulsing = ref( false );

  const { isLoggedIn, firstName } = useAuthPreview();
  const { cartCount, pulseTick } = useCartPreview();

  const accountLabel = computed( () => {
    return isLoggedIn.value ? `Minha Conta — Olá, ${ firstName.value }` : 'Minha Conta — Entre ou cadastre-se';
  } );

  const phrases: string[] = [
    'Busque por imagens da Sagrada Família e santos...',
    'Encontre velas, mandalas e itens de devoção...',
    'Procure por terços de pulso, pulseiras e chaveiros...',
    'Busque por Bíblias Sagradas para o seu lar...',
    'Encontre decorações religiosas de parede, porta e mesa...',
    'Procure por canecas e camisetas católicas...'
  ];

  const animatedPlaceholder = ref( '' );
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer: ReturnType<typeof setTimeout> | null = null;
  let cartPulseTimer: ReturnType<typeof setTimeout> | null = null;

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 12;
  };

  const runTypingStep = () => {
    const currentPhrase = phrases[ phraseIndex ] ?? '';

    if ( !isDeleting ) {
      charIndex++;
      animatedPlaceholder.value = currentPhrase.slice( 0, charIndex );

      if ( charIndex >= currentPhrase.length ) {
        isDeleting = true;
        typingTimer = setTimeout( runTypingStep, 2000 );
        return;
      }

      typingTimer = setTimeout( runTypingStep, 55 );
    } else {
      charIndex--;
      animatedPlaceholder.value = currentPhrase.slice( 0, charIndex );

      if ( charIndex <= 0 ) {
        isDeleting = false;
        phraseIndex = ( phraseIndex + 1 ) % phrases.length;
        typingTimer = setTimeout( runTypingStep, 400 );
        return;
      }

      typingTimer = setTimeout( runTypingStep, 30 );
    }
  };

  const handleSearch = () => {
    const query = searchQuery.value.trim();
    if ( !query ) {
      return;
    }
  };

  watch( pulseTick, () => {
    isCartPulsing.value = true;
    if ( cartPulseTimer ) {
      clearTimeout( cartPulseTimer );
    }

    cartPulseTimer = setTimeout( () => {
      isCartPulsing.value = false;
    }, 450 );
  } );

  onMounted( () => {
    handleScroll();
    window.addEventListener( 'scroll', handleScroll, { passive: true } );
    typingTimer = setTimeout( runTypingStep, 400 );
  } );

  onUnmounted( () => {
    window.removeEventListener( 'scroll', handleScroll );
    if ( typingTimer ) {
      clearTimeout( typingTimer );
    }
    if ( cartPulseTimer ) {
      clearTimeout( cartPulseTimer );
    }
  } );
</script>
