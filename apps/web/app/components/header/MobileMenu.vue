<template>
  <Sheet v-model:open=" isOpen ">
    <SheetTrigger as-child>
      <button type="button" class="p-2 -ml-2 rounded-md text-foreground hover:text-primary hover:bg-secondary/60 transition-colors" aria-label="Abrir menu">
        <Menu class="w-6 h-6" />
      </button>
    </SheetTrigger>

    <SheetContent class="w-[80vw] max-w-xs p-0 gap-0 flex flex-col bg-background text-foreground" side="left">
      <!-- Fixed Header: Logo + Card Minha Conta -->
      <SheetHeader class="p-4 border-b border-border bg-card space-y-3 text-left shrink-0">
        <div class="flex items-center pr-8">
          <NuxtLink to="/" class="inline-flex items-center" aria-label="Página Inicial - Sagrada Família" @click="closeMenu">
            <img src="/images/logo.png" alt="Sagrada Família - Artigos Religiosos" class="h-10 w-auto object-contain" />
          </NuxtLink>
          <SheetTitle class="sr-only">Menu de navegação</SheetTitle>
          <SheetDescription class="sr-only">
            Navegue pelas categorias de produtos e páginas institucionais da loja Sagrada Família
          </SheetDescription>
        </div>

        <NuxtLink to="/minha-conta" class="flex items-center gap-3 p-3 rounded-xl bg-secondary/60 hover:bg-secondary border border-border/80 transition-colors group" @click="closeMenu">
          <div class="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <User class="w-5 h-5" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-foreground leading-tight">Minha Conta</p>
            <p class="text-xs text-muted-foreground mt-0.5 truncate">Entre ou acompanhe seus pedidos</p>
          </div>
          <ChevronRight class="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-auto shrink-0" />
        </NuxtLink>
      </SheetHeader>

      <!-- Scrollable Body -->
      <div class="flex-1 overflow-y-auto overscroll-contain">
        <!-- Categories Section -->
        <nav class="p-3" aria-label="Categorias do catálogo">
          <p class="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Categorias
          </p>

          <Accordion class="w-full" type="single" collapsible v-model="activeCategory">
            <template v-for="item in allCategoriesMenu" :key="item.slug">
              <!-- Direct category link (without subgroups) -->
              <NuxtLink class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-secondary/60" v-if="item.groups.length === 0" :to="categoryPath( item )" :class="item.slug === 'todos' ? 'mt-2 pt-3 border-t border-border font-semibold text-primary rounded-t-none' : 'font-medium text-foreground'" @click="closeMenu">
                <component class="w-5 h-5 shrink-0 stroke-[1.75]" :is="item.icon" />
                <span>{{ item.label }}</span>
              </NuxtLink>

              <!-- Expandable category (with subgroups) -->
              <AccordionItem class="border-b-0" v-else :value="item.slug">
                <AccordionTrigger class="rounded-lg px-3 py-3 text-sm font-medium text-foreground hover:bg-secondary/60 hover:no-underline data-[state=open]:bg-primary/10 data-[state=open]:text-primary">
                  <span class="flex items-center gap-3">
                    <component class="w-5 h-5 shrink-0 stroke-[1.75]" :is="item.icon" />
                    <span>{{ item.label }}</span>
                  </span>
                </AccordionTrigger>

                <AccordionContent class="pt-1 pb-3 pl-4 pr-2">
                  <div class="border-l-2 border-primary/25 pl-4 space-y-4 py-1">
                    <div v-for="group in item.groups" :key="group.title">
                      <h4 class="text-[11px] font-bold uppercase tracking-wider text-primary mb-1.5">
                        {{ group.title }}
                      </h4>
                      <ul class="space-y-0.5">
                        <li v-for="sub in group.items" :key="sub.slug">
                          <NuxtLink class="block py-1.5 px-2 -mx-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors" :to="`/c/${ item.slug }/${ sub.slug }`" @click="closeMenu">
                            {{ sub.label }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>

                    <NuxtLink class="inline-flex items-center gap-1.5 pt-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors" :to="categoryPath( item )" @click="closeMenu">
                      <span>Ver tudo</span>
                      <ArrowRight class="w-3.5 h-3.5" />
                    </NuxtLink>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </template>
          </Accordion>
        </nav>

        <Separator />

        <!-- Institutional & Policies Section -->
        <nav class="p-3 pb-6" aria-label="Links institucionais e políticas">
          <p class="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Institucional e Ajuda
          </p>

          <ul class="space-y-0.5">
            <li v-for="link in institutionalLinks" :key="link.to">
              <NuxtLink class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors" :to="link.to" @click="closeMenu">
                <component class="w-4 h-4 shrink-0" :is="link.icon" />
                <span>{{ link.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, watch, type Component } from 'vue';
  import {
    ArrowRight,
    ChevronRight,
    Info,
    Mail,
    Menu,
    RefreshCw,
    ShieldCheck,
    Truck,
    User
  } from '@lucide/vue';
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
  } from '@/components/ui/accordion';
  import { Separator } from '@/components/ui/separator';
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from '@/components/ui/sheet';
  import { allCategoriesMenu, categoryPath } from '@/data/main-menu';

  interface InstitutionalLink {
    label: string;
    to: string;
    icon: Component;
  }

  const institutionalLinks: InstitutionalLink[] = [
    { label: 'Sobre Nós', to: '/sobre-nos', icon: Info },
    { label: 'Contato', to: '/contato', icon: Mail },
    { label: 'Política de Postagem e Entrega', to: '/politica-de-postagem-e-entrega', icon: Truck },
    { label: 'Política de Trocas e Devoluções', to: '/politica-de-trocas-e-devolucoes', icon: RefreshCw },
    { label: 'Política de Privacidade', to: '/politica-de-privacidade', icon: ShieldCheck }
  ];

  const route = useRoute();

  const isOpen = ref( false );
  const activeCategory = ref<string | undefined>( undefined );

  let mediaQuery: MediaQueryList | null = null;

  const closeMenu = () => {
    isOpen.value = false;
  };

  const handleDesktopMediaChange = ( event: MediaQueryListEvent ) => {
    if ( event.matches ) {
      closeMenu();
    }
  };

  watch( () => route.fullPath, closeMenu );

  watch( isOpen, ( open ) => {
    if ( !open ) {
      activeCategory.value = undefined;
    }
  } );

  onMounted( () => {
    mediaQuery = window.matchMedia( '(min-width: 768px)' );
    mediaQuery.addEventListener( 'change', handleDesktopMediaChange );
  } );

  onUnmounted( () => {
    mediaQuery?.removeEventListener( 'change', handleDesktopMediaChange );
  } );
</script>

