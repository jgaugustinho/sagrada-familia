<template>
  <TooltipProvider>
    <nav class="relative flex flex-col h-full overflow-hidden bg-dark-deep text-background surface-dark select-none" aria-label="Menu principal do painel">
      <div class="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gold-bright/[0.08] blur-3xl" aria-hidden="true" />

      <!-- Brand Header -->
      <div class="relative z-10 h-16 px-4 border-b border-gold-light/15 flex items-center justify-between gap-2 shrink-0">
        <RouterLink class="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright rounded-lg" v-if="!collapsed" :to="{ name: 'dashboard' }" @click="handleNavigate">
          <img alt="Sagrada Família — Artigos Religiosos" class="logo-gold block h-10 w-auto object-contain" :src="horizontal2dLogo" />
        </RouterLink>

        <Tooltip v-else>
          <TooltipTrigger :as-child="true">
            <RouterLink aria-label="Visão Geral — Sagrada Família" class="mx-auto w-10 h-10 rounded-xl border border-gold-bright/35 bg-gold-bright/10 text-gold-bright flex items-center justify-center font-serif text-lg font-semibold hover:bg-gold-bright/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :to="{ name: 'dashboard' }" @click="handleNavigate">
              <span aria-hidden="true">†</span>
            </RouterLink>
          </TooltipTrigger>

          <TooltipContent side="right">
            Visão Geral — Sagrada Família
          </TooltipContent>
        </Tooltip>

        <button type="button" aria-label="Fechar menu de navegação" class="inline-flex items-center justify-center size-8 rounded-lg text-background/75 hover:text-background hover:bg-background/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright cursor-pointer" v-if="mobile" @click="handleCloseMobile">
          <X class="size-4" aria-hidden="true" />
        </button>
      </div>

      <!-- Navigation Groups -->
      <div class="relative z-10 flex-1 overflow-y-auto px-3 py-5 space-y-5">
        <div class="space-y-1.5" v-for="( group, groupIndex ) in navigationGroups" :key="group.id">
          <p class="px-3 mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright/65" v-if="!collapsed">
            {{ group.label }}
          </p>

          <div class="mx-2 mb-2 h-px bg-gold-light/15" aria-hidden="true" v-else-if="groupIndex > 0" />

          <ul class="space-y-1">
            <li v-for="item in group.items" :key="item.key">
              <Tooltip :disabled="!collapsed">
                <TooltipTrigger :as-child="true">
                  <RouterLink class="group relative flex items-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :to="item.to" :aria-label="collapsed ? item.label : undefined" :aria-current="isRouteActive( item.routeName ) ? 'page' : undefined" :class="[ collapsed ? 'justify-center h-11 w-11 mx-auto' : 'gap-3 px-3 py-2.5', isRouteActive( item.routeName ) ? 'bg-gold-bright/15 text-background border-gold-bright/30 shadow-warm-sm' : 'border-transparent text-background/70 hover:text-background hover:bg-background/[0.06]' ]" @click="handleNavigate">
                    <span class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-gold-bright" aria-hidden="true" v-if="!collapsed && isRouteActive( item.routeName )" />

                    <component class="size-[18px] shrink-0 transition-colors" aria-hidden="true" :is="item.icon" :class="isRouteActive( item.routeName ) ? 'text-gold-bright' : 'text-background/60 group-hover:text-gold-bright'" />

                    <span class="text-sm font-medium truncate" v-if="!collapsed">
                      {{ item.label }}
                    </span>
                  </RouterLink>
                </TooltipTrigger>

                <TooltipContent side="right">
                  {{ item.label }}
                </TooltipContent>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>

      <!-- Sidebar Footer -->
      <div class="relative z-10 border-t border-gold-light/15 p-3 shrink-0">
        <Tooltip v-if="!mobile" :disabled="!collapsed">
          <TooltipTrigger :as-child="true">
            <button type="button" class="w-full flex items-center rounded-xl border border-gold-light/15 bg-background/[0.04] hover:bg-background/[0.09] text-background/75 hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright cursor-pointer" :aria-label="collapsed ? 'Expandir menu' : 'Recolher menu'" :class="collapsed ? 'justify-center h-10 w-10 mx-auto' : 'justify-between px-3 py-2 text-xs font-medium'" @click="handleToggleCollapse">
              <span v-if="!collapsed">Recolher menu</span>
              <PanelLeftOpen class="size-4 shrink-0 text-gold-bright/85" aria-hidden="true" v-if="collapsed" />
              <PanelLeftClose class="size-4 shrink-0 text-gold-bright/85" aria-hidden="true" v-else />
            </button>
          </TooltipTrigger>

          <TooltipContent side="right">
            Expandir menu
          </TooltipContent>
        </Tooltip>

        <p class="pt-2.5 text-[11px] text-background/45 text-center truncate" v-if="!collapsed">
          Sagrada Família &bull; Curitiba, PR
        </p>
      </div>
    </nav>
  </TooltipProvider>
</template>

<script setup lang="ts">
  import type { Component } from 'vue';
  import { BarChart3, FolderTree, LayoutDashboard, Package, PanelLeftClose, PanelLeftOpen, Settings, ShoppingBag, SlidersHorizontal, TicketPercent, Users, X } from '@lucide/vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { horizontal2dLogo } from '@sagrada-familia/assets';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

  withDefaults( defineProps<{
    collapsed?: boolean;
    mobile?: boolean;
  }>(), {
    collapsed: false,
    mobile: false
  } );

  const emit = defineEmits<{
    toggleCollapse: [];
    navigate: [];
    closeMobile: [];
  }>();

  const route = useRoute();

  const isRouteActive = ( routeName: string ): boolean => {
    return route.name === routeName || route.meta.activeNav === routeName;
  };

  const handleToggleCollapse = () => {
    emit( 'toggleCollapse' );
  };

  const handleNavigate = () => {
    emit( 'navigate' );
  };

  const handleCloseMobile = () => {
    emit( 'closeMobile' );
  };

  interface NavItem {
    key: string;
    label: string;
    routeName: string;
    to: string;
    icon: Component;
  }

  interface NavGroup {
    id: string;
    label: string;
    items: NavItem[];
  }

  const navigationGroups: NavGroup[] = [
    {
      id: 'principal',
      label: 'Principal',
      items: [
        {
          key: 'dashboard',
          label: 'Visão Geral',
          routeName: 'dashboard',
          to: '/dashboard',
          icon: LayoutDashboard
        }
      ]
    },
    {
      id: 'catalog',
      label: 'Catálogo',
      items: [
        {
          key: 'products',
          label: 'Produtos',
          routeName: 'products',
          to: '/produtos',
          icon: Package
        },
        {
          key: 'categories',
          label: 'Categorias',
          routeName: 'categories',
          to: '/categorias',
          icon: FolderTree
        },
        {
          key: 'attributes',
          label: 'Atributos',
          routeName: 'attributes',
          to: '/atributos',
          icon: SlidersHorizontal
        }
      ]
    },
    {
      id: 'commercial',
      label: 'Comercial',
      items: [
        {
          key: 'orders',
          label: 'Pedidos',
          routeName: 'orders',
          to: '/pedidos',
          icon: ShoppingBag
        },
        {
          key: 'clients',
          label: 'Clientes',
          routeName: 'clients',
          to: '/clientes',
          icon: Users
        },
        {
          key: 'coupons',
          label: 'Cupons',
          routeName: 'coupons',
          to: '/cupons',
          icon: TicketPercent
        }
      ]
    },
    {
      id: 'management',
      label: 'Gestão',
      items: [
        {
          key: 'reports',
          label: 'Relatórios',
          routeName: 'reports',
          to: '/relatorios',
          icon: BarChart3
        },
        {
          key: 'settings',
          label: 'Configurações',
          routeName: 'settings',
          to: '/configuracoes',
          icon: Settings
        }
      ]
    }
  ];
</script>
