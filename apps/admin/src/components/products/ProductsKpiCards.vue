<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3" aria-label="Indicadores de produtos">
    <button type="button" class="group flex items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer" v-for="card in cards" :key="card.key" :aria-pressed="activeKpi === card.key" :class="activeKpi === card.key ? 'border-primary bg-surface ring-1 ring-primary/40 shadow-warm-md' : 'border-gold-light/35 bg-card shadow-warm-sm hover:border-gold-light/70 hover:shadow-warm-md'" @click="emit( 'select', card.key )">
      <span class="size-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors" aria-hidden="true" :class="card.iconWrapClass">
        <component class="size-5 stroke-[1.75]" :is="card.icon" />
      </span>

      <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold uppercase tracking-[0.11em] truncate transition-colors" :class="activeKpi === card.key ? 'text-gold-dark' : 'text-muted-foreground group-hover:text-foreground'">
          {{ card.label }}
        </p>

        <p class="mt-0.5 text-xs text-muted-foreground truncate">
          {{ card.caption }}
        </p>
      </div>

      <span class="inline-flex items-center font-sans text-3xl tracking-tight leading-none text-foreground tabular-nums shrink-0">
        {{ card.value }}
      </span>
    </button>
  </section>
</template>

<script setup lang="ts">
  import type { Component } from 'vue';
  import { computed } from 'vue';
  import { AlertTriangle, BadgePercent, Package, PackageX } from '@lucide/vue';
  import type { KpiFilterKey, ProductsKpiStats } from '@/composables/useProductsTable';

  const props = defineProps<{
    stats: ProductsKpiStats;
    activeKpi: KpiFilterKey | null;
  }>();

  const emit = defineEmits<{
    select: [ key: KpiFilterKey ];
  }>();

  interface KpiCardItem {
    key: KpiFilterKey;
    label: string;
    value: number;
    caption: string;
    icon: Component;
    iconWrapClass: string;
  }

  const cards = computed<KpiCardItem[]>( () => [
    {
      key: 'all',
      label: 'Total de Produtos',
      value: props.stats.total,
      caption: `${ props.stats.activeCount } publicados na loja`,
      icon: Package,
      iconWrapClass: 'bg-primary/10 border-gold-light/40 text-gold-dark'
    },
    {
      key: 'on_sale',
      label: 'Em Promoção',
      value: props.stats.onSale,
      caption: props.stats.averageDiscount > 0 ? `Média de ${ props.stats.averageDiscount }% de desconto` : 'Nenhuma oferta ativa',
      icon: BadgePercent,
      iconWrapClass: 'bg-primary/10 border-gold-light/40 text-gold-dark'
    },
    {
      key: 'low_stock',
      label: 'Estoque Baixo',
      value: props.stats.lowStock,
      caption: 'Com 1 a 5 unidades disponíveis',
      icon: AlertTriangle,
      iconWrapClass: 'bg-amber-500/15 border-amber-600/35 text-amber-800'
    },
    {
      key: 'out_of_stock',
      label: 'Esgotados',
      value: props.stats.outOfStock,
      caption: 'Sem unidades em estoque',
      icon: PackageX,
      iconWrapClass: 'bg-destructive/10 border-destructive/30 text-destructive'
    }
  ] );
</script>
