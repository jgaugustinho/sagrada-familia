<template>
  <div class="grid grid-cols-12 gap-6 lg:gap-8 w-full flex-1 h-full min-h-[300px]">
    <!-- Coluna de Subcategorias (8 colunas) -->
    <div class="col-span-8">
      <div class="flex items-center justify-between pb-4 mb-6 border-b border-border">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <component class="w-5 h-5" :is="category.icon" />
          </div>
          <h2 class="font-serif text-2xl font-semibold tracking-tight text-foreground">
            {{ category.label }}
          </h2>
        </div>

        <NuxtLink class="group/all inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-primary transition-colors" :to="categoryPath( category )" @click="emit( 'close' )">
          <span class="link-editorial">Ver tudo</span>
          <ArrowRight class="w-4 h-4 transition-transform group-hover/all:translate-x-1" />
        </NuxtLink>
      </div>

      <div class="grid gap-x-6 lg:gap-x-8 gap-y-6" :class="groupColumns[ category.groups.length ] ?? 'grid-cols-3'">
        <div class="rounded-lg p-2 -m-2 transition-colors" v-for="( group, index ) in category.groups" :key="group.title" :class="activeGroupIndex === index && category.groups.length > 1 ? 'bg-surface/75' : ''" @mouseenter="activeGroupIndex = index" @focusin="activeGroupIndex = index">
          <h3 class="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-dark mb-3">
            {{ group.title }}
          </h3>
          <ul class="space-y-1">
            <li v-for="sub in group.items" :key="sub.slug">
              <NuxtLink class="group/link flex items-center py-1 text-sm text-muted-foreground hover:text-gold-dark hover:font-semibold transition-all duration-200 hover:translate-x-1" :to="`/c/${ category.slug }/${ sub.slug }`" @click="emit( 'close' )">
                <span>{{ sub.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Card de Destaque Lateral (4 colunas) -->
    <div class="col-span-4 pl-6 lg:pl-8 border-l border-border flex flex-col">
      <div class="relative flex-1 h-full min-h-[300px] overflow-hidden rounded-xl bg-dark text-background flex flex-col justify-end p-5" v-if="activeGroup">
        <Transition name="mega-featured">
          <img class="absolute inset-0 w-full h-full object-cover" :key="activeGroup.featured.imageUrl" :src="activeGroup.featured.imageUrl" :alt="activeGroup.featured.title" />
        </Transition>

        <div class="absolute inset-0 bg-gradient-to-t from-dark-deep/85 via-dark/35 to-dark/10" />

        <div class="relative z-10">
          <Transition name="mega-featured-text" mode="out-in">
            <div :key="activeGroup.title">
              <span class="inline-flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-gold-bright/95 mb-1">
                <span>{{ category.label }}</span>
                <span class="text-background/50">&gt;</span>
                <span>{{ activeGroup.title }}</span>
              </span>
              <p class="font-serif text-xl font-semibold leading-tight text-background">
                {{ activeGroup.featured.title }}
              </p>
              <p class="mt-1 text-sm text-background/85">
                {{ activeGroup.featured.description }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { ArrowRight } from '@lucide/vue';
  import { categoryPath, type MenuCategory } from '@/data/main-menu';

  const props = defineProps<{
    category: MenuCategory;
  }>();

  const emit = defineEmits<{
    ( e: 'close' ): void;
  }>();

  const activeGroupIndex = ref( 0 );

  watch(
    () => props.category.slug,
    () => {
      activeGroupIndex.value = 0;
    }
  );

  const activeGroup = computed( () => {
    return props.category.groups[ activeGroupIndex.value ] ?? props.category.groups[ 0 ] ?? null;
  } );

  const groupColumns: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3'
  };
</script>

<style scoped>
  .mega-featured-enter-active, .mega-featured-leave-active {
    transition: opacity 0.28s ease, transform 0.28s ease;
  }

  .mega-featured-enter-from {
    opacity: 0;
    transform: scale(1.03);
  }

  .mega-featured-leave-to {
    opacity: 0;
  }

  .mega-featured-text-enter-active, .mega-featured-text-leave-active {
    transition: opacity 0.16s ease, transform 0.16s ease;
  }

  .mega-featured-text-enter-from {
    opacity: 0;
    transform: translateY(4px);
  }

  .mega-featured-text-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }

  @media (prefers-reduced-motion: reduce) {
    .mega-featured-enter-active, .mega-featured-leave-active, .mega-featured-text-enter-active, .mega-featured-text-leave-active {
      transition: none;
    }
  }
</style>
