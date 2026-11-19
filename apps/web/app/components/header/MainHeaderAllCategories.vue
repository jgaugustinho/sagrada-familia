<template>
  <Transition name="all-panel">
    <div class="absolute inset-x-0 top-full z-20 pointer-events-none" v-if="open">
      <div class="container mx-auto px-4 pointer-events-none">
        <div class="all-card pointer-events-auto flex overflow-hidden bg-card text-card-foreground rounded-b-2xl border-x border-b border-border shadow-2xl" :style="{ width: activeItem && activeItem.groups.length > 0 ? '100%' : '18rem' }" @mouseenter="emit( 'enter' )">
          <!-- Vertical list -->
          <ul class="w-72 shrink-0 p-3 bg-secondary/30 border-r border-border" aria-label="Todas as categorias" @mouseleave="cancelHover">
            <li v-for="( item, index ) in allCategoriesMenu" :key="item.slug" :class="item.slug === 'todos' ? 'mt-2 pt-2 border-t border-border' : ''">
              <NuxtLink class="group/item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50" :to="categoryPath( item )" :class="[ activeIndex === index ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary/60', item.slug === 'todos' ? 'font-semibold text-primary' : 'font-medium' ]" @mouseenter="scheduleActivate( index )" @focusin="activate( index )" @click="emit( 'close' )">
                <component class="w-5 h-5 shrink-0 stroke-[1.75] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-hover/item:scale-110 group-hover/item:-rotate-6" :is="item.icon" />
                <span class="flex-1 truncate">{{ item.label }}</span>
                <ChevronRight class="w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200" v-if="item.groups.length > 0" :class="activeIndex === index ? 'translate-x-0.5 text-primary' : ''" />
              </NuxtLink>
            </li>
          </ul>

          <!-- Expandable right panel (only for categories with subgroups).
               No :key here on purpose: keeping a single persistent element avoids two panels
               coexisting while switching categories (which caused a visible flash). -->
          <Transition name="all-content">
            <div class="all-content flex flex-col flex-1 min-w-[640px] p-6 lg:p-8" v-if="activeItem && activeItem.groups.length > 0">
              <MainHeaderCategoryPanel :category="activeItem" @close="emit( 'close' )" />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, ref, watch } from 'vue';
  import { ChevronRight } from '@lucide/vue';
  import { allCategoriesMenu, categoryPath } from '@/data/main-menu';
  import MainHeaderCategoryPanel from '@/components/header/MainHeaderCategoryPanel.vue';

  const props = defineProps<{
    open: boolean;
  }>();

  const emit = defineEmits<{
    ( e: 'close' | 'enter' ): void;
  }>();

  const HOVER_INTENT_MS = 90;

  const activeIndex = ref<number | null>( null );
  let hoverTimer: ReturnType<typeof setTimeout> | null = null;

  const activeItem = computed( () => ( activeIndex.value === null ? null : allCategoriesMenu[ activeIndex.value ] ?? null ) );

  const cancelHover = () => {
    if ( hoverTimer ) {
      clearTimeout( hoverTimer );
      hoverTimer = null;
    }
  };

  const activate = ( index: number ) => {
    cancelHover();
    if ( activeIndex.value !== index ) {
      activeIndex.value = index;
    }
  };

  // Small hover-intent delay so diagonal mouse moves toward the right panel
  // don't switch the active category while crossing other rows.
  const scheduleActivate = ( index: number ) => {
    cancelHover();
    if ( activeIndex.value === null ) {
      activate( index );
      return;
    }
    hoverTimer = setTimeout( () => activate( index ), HOVER_INTENT_MS );
  };

  // Every time the menu opens, start with the list only (no right panel).
  watch( () => props.open, ( isOpen ) => {
    if ( isOpen ) {
      cancelHover();
      activeIndex.value = null;
    }
  } );

  onUnmounted( cancelHover );
</script>

<style scoped>
  .all-panel-enter-active, .all-panel-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .all-panel-enter-from, .all-panel-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }

  .all-card {
    transition: width 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .all-content-enter-active {
    transition: opacity 0.2s ease 0.05s;
  }

  .all-content-leave-active {
    transition: opacity 0.1s ease;
  }

  .all-content-enter-from, .all-content-leave-to {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .all-panel-enter-active,
    .all-panel-leave-active,
    .all-card,
    .all-content-enter-active,
    .all-content-leave-active {
      transition: none;
    }
  }
</style>
