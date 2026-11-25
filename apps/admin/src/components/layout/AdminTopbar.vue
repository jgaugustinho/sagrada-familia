<template>
  <header class="sticky top-0 z-30 h-16 bg-card/85 backdrop-blur-md border-b border-gold-light/30 shadow-warm-sm px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
    <div class="flex items-center gap-3 min-w-0">
      <button type="button" aria-label="Abrir menu de navegação" class="lg:hidden inline-flex items-center justify-center size-9 rounded-xl border border-gold-light/40 bg-background/80 text-foreground hover:bg-surface/80 hover:text-gold-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer" @click="handleOpenMobileMenu">
        <Menu class="size-4" aria-hidden="true" />
      </button>

      <Breadcrumb class="min-w-0">
        <BreadcrumbList class="flex-nowrap">
          <BreadcrumbItem class="hidden sm:inline-flex">
            <BreadcrumbLink :as-child="true">
              <RouterLink class="text-xs font-medium text-muted-foreground hover:text-gold-dark" :to="{ name: 'dashboard' }">
                Painel
              </RouterLink>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator class="hidden sm:inline-flex" />

          <template v-if="showSectionBreadcrumb">
            <BreadcrumbItem class="hidden md:inline-flex">
              <span class="text-xs font-medium text-muted-foreground">
                {{ sectionLabel }}
              </span>
            </BreadcrumbItem>

            <BreadcrumbSeparator class="hidden md:inline-flex" />
          </template>

          <BreadcrumbItem class="min-w-0">
            <BreadcrumbPage class="text-xs sm:text-sm font-semibold text-foreground truncate">
              {{ pageTitle }}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <div class="flex items-center gap-3 sm:gap-4 shrink-0">
      <div class="flex items-center gap-2.5">
        <span class="w-8 h-8 rounded-full bg-primary/10 border border-gold-light/45 text-gold-dark text-xs font-semibold flex items-center justify-center shrink-0" aria-hidden="true">
          AD
        </span>

        <div class="hidden sm:block leading-tight">
          <p class="text-xs font-semibold text-foreground">
            Administrador
          </p>
          <p class="text-[11px] text-muted-foreground">
            Curadoria
          </p>
        </div>
      </div>

      <Separator orientation="vertical" class="hidden sm:block h-6 bg-gold-light/30" />

      <RouterLink class="inline-flex items-center gap-1.5 rounded-xl border border-gold-light/45 bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground/85 hover:border-gold-light hover:bg-surface/80 hover:text-gold-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" :to="{ name: 'login' }">
        <LogOut class="size-3.5 text-gold-dark" aria-hidden="true" />
        <span>Sair</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { LogOut, Menu } from '@lucide/vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@sagrada-familia/ui/breadcrumb';
  import { Separator } from '@sagrada-familia/ui/separator';

  const emit = defineEmits<{
    openMobileMenu: [];
  }>();

  const route = useRoute();

  const pageTitle = computed( () => {
    return typeof route.meta.title === 'string' ? route.meta.title : 'Visão Geral';
  } );

  const sectionLabel = computed( () => {
    return typeof route.meta.section === 'string' ? route.meta.section : '';
  } );

  const showSectionBreadcrumb = computed( () => {
    return route.name !== 'dashboard' && sectionLabel.value.length > 0;
  } );

  const handleOpenMobileMenu = () => {
    emit( 'openMobileMenu' );
  };
</script>
