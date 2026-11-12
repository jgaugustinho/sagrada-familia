<template>
  <div class="relative z-30 hidden md:block" @mouseleave="scheduleClose" @keydown.esc="closeNow">
    <!-- Page backdrop while mega menu is open -->
    <Transition name="mega-fade">
      <div v-if="isMenuOpen" class="fixed inset-x-0 bottom-0 z-0 bg-black/25 backdrop-blur-[2px] pointer-events-none" :style="{ top: `${ backdropTop }px` }" aria-hidden="true" />
    </Transition>

    <nav ref="navRef" class="relative z-10 bg-primary text-primary-foreground border-b border-black/10 shadow-sm" aria-label="Menu principal de categorias">
      <div class="container mx-auto px-4">
        <div class="main-header-scroll flex items-center justify-between py-3 gap-4 overflow-x-auto">
          <!-- Left highlight: Todas as categorias -->
          <div class="flex items-center pr-6 lg:pr-8 border-r border-primary-foreground/20 shrink-0" @mouseenter="openAll" @focusin="openAll">
            <button type="button" class="group relative flex flex-col items-center justify-center gap-1.5 px-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50" :aria-expanded="isAllOpen" aria-haspopup="true">
              <component :is="allCategories.icon" class="w-6 h-6 stroke-[1.75] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-hover:-translate-y-1 group-hover:scale-110 group-hover:-rotate-6" :class="isAllOpen && '-translate-y-1 scale-110 -rotate-6'" />
              <span class="text-xs lg:text-[13px] font-semibold tracking-wide whitespace-nowrap">
                {{ allCategories.label }}
              </span>
              <span class="absolute -bottom-2 left-2 right-2 h-0.5 rounded-full bg-primary-foreground origin-center transition-transform duration-300" :class="isAllOpen ? 'scale-x-100' : 'scale-x-0'" />
            </button>
          </div>

          <!-- Promoções + categorias -->
          <ul class="flex items-center justify-between flex-1 gap-2 lg:gap-4 pl-2 lg:pl-4">
            <li v-for="item in mainMenu" :key="item.slug" class="shrink-0" @mouseenter="openMenu( item.slug )" @focusin="openMenu( item.slug )">
              <NuxtLink :to="`/c/${ item.slug }`" class="group relative flex flex-col items-center justify-center gap-1.5 px-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50" :aria-expanded="activeSlug === item.slug" aria-haspopup="true" @click="closeNow">
                <component :is="item.icon" class="w-6 h-6 stroke-[1.75] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-hover:-translate-y-1 group-hover:scale-110 group-hover:-rotate-6" :class="activeSlug === item.slug && '-translate-y-1 scale-110 -rotate-6'" />
                <span class="text-xs lg:text-[13px] font-medium tracking-wide whitespace-nowrap">
                  {{ item.label }}
                </span>
                <span class="absolute -bottom-2 left-2 right-2 h-0.5 rounded-full bg-primary-foreground origin-center transition-transform duration-300" :class="activeSlug === item.slug ? 'scale-x-100' : 'scale-x-0'" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <MainHeaderAllCategories :open="isAllOpen" @enter="cancelClose" @close="closeNow" />

    <!-- Dropdown suspenso das categorias horizontais -->
    <Transition name="mega-panel">
      <div v-if="activeCategory && activeCategory.groups.length > 0" class="absolute inset-x-0 top-full z-20" @mouseenter="cancelClose">
        <div class="container mx-auto px-4">
          <div :key="activeCategory.slug" class="mega-content bg-card text-card-foreground rounded-b-2xl border-x border-b border-border shadow-2xl p-6 lg:p-8">
            <MainHeaderCategoryPanel :category="activeCategory" @close="closeNow" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
  import { AlignLeft } from '@lucide/vue';
  import { mainMenu } from '@/data/main-menu';
  import MainHeaderAllCategories from '@/components/header/MainHeaderAllCategories.vue';
  import MainHeaderCategoryPanel from '@/components/header/MainHeaderCategoryPanel.vue';

  const route = useRoute();

  const allCategories = {
    label: 'Todas as categorias',
    icon: AlignLeft
  };

  const CLOSE_DELAY_MS = 150;

  const navRef = ref<HTMLElement | null>( null );
  const activeSlug = ref<string | null>( null );
  const isAllOpen = ref( false );
  const backdropTop = ref( 0 );
  let closeTimer: ReturnType<typeof setTimeout> | null = null;

  const activeCategory = computed( () => mainMenu.find( ( item ) => item.slug === activeSlug.value ) ?? null );
  const isMenuOpen = computed( () => ( activeCategory.value !== null && activeCategory.value.groups.length > 0 ) || isAllOpen.value );

  const updateBackdropTop = () => {
    backdropTop.value = navRef.value?.getBoundingClientRect().bottom ?? 0;
  };

  const cancelClose = () => {
    if ( closeTimer ) {
      clearTimeout( closeTimer );
      closeTimer = null;
    }
  };

  const openMenu = ( slug: string ) => {
    cancelClose();
    updateBackdropTop();
    isAllOpen.value = false;
    const item = mainMenu.find( ( m ) => m.slug === slug );
    if ( item && item.groups.length > 0 ) {
      activeSlug.value = slug;
    } else {
      activeSlug.value = null;
    }
  };

  const openAll = () => {
    cancelClose();
    updateBackdropTop();
    activeSlug.value = null;
    isAllOpen.value = true;
  };

  const closeNow = () => {
    cancelClose();
    activeSlug.value = null;
    isAllOpen.value = false;
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer = setTimeout( closeNow, CLOSE_DELAY_MS );
  };

  const handleScroll = () => {
    if ( isMenuOpen.value ) {
      updateBackdropTop();
    }
  };

  watch( () => route.fullPath, closeNow );

  onMounted( () => {
    window.addEventListener( 'scroll', handleScroll, { passive: true } );
  } );

  onUnmounted( () => {
    cancelClose();
    window.removeEventListener( 'scroll', handleScroll );
  } );
</script>

<style scoped>
  .main-header-scroll {
    scrollbar-width: none;
  }

  .main-header-scroll::-webkit-scrollbar {
    display: none;
  }

  .mega-fade-enter-active, .mega-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .mega-fade-enter-from, .mega-fade-leave-to {
    opacity: 0;
  }

  .mega-panel-enter-active, .mega-panel-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .mega-panel-enter-from, .mega-panel-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }

  .mega-content {
    animation: mega-content-in 0.18s ease;
  }

  @keyframes mega-content-in {
    from {
      opacity: 0.4;
    }

    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mega-fade-enter-active, .mega-fade-leave-active, .mega-panel-enter-active, .mega-panel-leave-active {
      transition: none;
    }

    .mega-content {
      animation: none;
    }
  }
</style>
