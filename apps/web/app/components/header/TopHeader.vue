<template>
  <header class="sticky top-0 z-40 bg-background border-b border-border">
    <div class="container mx-auto px-4 py-3 md:py-2 grid grid-cols-[1fr_auto_1fr] md:flex items-center justify-between gap-y-3 md:gap-8">
      <!-- Mobile Left: Menu button -->
      <div class="flex items-center justify-start md:hidden">
        <MobileMenu />
      </div>

      <!-- Logo: Centered on mobile, Left on desktop -->
      <NuxtLink to="/" class="flex items-center justify-center md:justify-start shrink-0" aria-label="Página Inicial - Sagrada Família">
        <img src="/images/horizontal_2D_logo.png" alt="Sagrada Família - Artigos Religiosos" class="h-12 md:h-16 w-auto object-contain" />
      </NuxtLink>

      <!-- Search Input: Second row full-width on mobile, Centered flex-1 on desktop -->
      <form class="col-span-3 order-last md:order-none md:flex-1 md:max-w-2xl md:mx-auto w-full" role="search" @submit.prevent=" handleSearch ">
        <div class="relative flex items-center w-full rounded-lg border border-input bg-card focus-within:ring-1 focus-within:ring-ring focus-within:border-primary transition-shadow overflow-hidden">
          <Search class="w-4 h-4 text-muted-foreground ml-3.5 shrink-0 pointer-events-none" />

          <input type="search" class="w-full bg-transparent py-2.5 pl-3 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" aria-label="Buscar produtos na loja" :placeholder="isSearchFocused ? 'O que você está procurando?' : animatedPlaceholder" v-model="searchQuery" @focus="isSearchFocused = true" @blur="isSearchFocused = false" />

          <button type="submit" class="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm px-4 py-2.5 shrink-0 transition-colors">
            Buscar
          </button>
        </div>
      </form>

      <!-- Actions: My Account & Shopping Cart -->
      <div class="flex items-center justify-end gap-1 sm:gap-2 shrink-0">
        <NuxtLink to="/minha-conta" class="p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary/60 transition-colors" aria-label="Minha Conta" title="Minha Conta">
          <User class="w-6 h-6" />
        </NuxtLink>

        <button type="button" class="relative p-2 rounded-md text-foreground hover:text-primary hover:bg-secondary/60 transition-colors" aria-label="Carrinho de compras" title="Carrinho de compras">
          <ShoppingCart class="w-6 h-6" />
          <span class="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center leading-none">
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { Search, ShoppingCart, User } from '@lucide/vue';
  import MobileMenu from '@/components/header/MobileMenu.vue';

  const searchQuery = ref( '' );
  const isSearchFocused = ref( false );
  const cartCount = ref( 0 );

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

  onMounted( () => {
    typingTimer = setTimeout( runTypingStep, 400 );
  } );

  onUnmounted( () => {
    if ( typingTimer ) {
      clearTimeout( typingTimer );
    }
  } );
</script>
