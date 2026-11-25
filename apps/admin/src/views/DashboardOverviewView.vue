<template>
  <div class="space-y-8">
    <PageHeader eyebrow="VISÃO GERAL" title="Painel da Sagrada Família" subtitle="Resumo operacional do acervo, pedidos e atendimento.">
      <template #actions>
        <Badge variant="outline" class="rounded-full border-gold-light/50 bg-card/90 px-3.5 py-1 text-xs font-medium text-gold-dark shadow-warm-sm">
          Dados ilustrativos
        </Badge>
      </template>
    </PageHeader>

    <!-- KPI Summary Row -->
    <section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" aria-label="Indicadores resumidos">
      <Card class="bg-card/95 border-gold-light/35 shadow-warm-sm hover:shadow-warm-md transition-shadow motion-reduce:transition-none py-5 px-5 gap-3" v-for="kpi in kpiCards" :key="kpi.key">
        <div class="flex items-start justify-between gap-3">
          <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {{ kpi.label }}
          </span>

          <span class="w-9 h-9 rounded-full bg-primary/10 border border-gold-light/40 text-gold-dark flex items-center justify-center shrink-0" aria-hidden="true">
            <component class="size-4 stroke-[1.75]" :is="kpi.icon" />
          </span>
        </div>

        <div class="space-y-1">
          <p class="font-serif text-3xl font-semibold tracking-tight leading-none text-foreground">
            {{ kpi.value }}
          </p>

          <p class="text-xs text-muted-foreground leading-relaxed">
            {{ kpi.caption }}
          </p>
        </div>
      </Card>
    </section>

    <!-- Marked Chart Spaces -->
    <section class="grid grid-cols-1 xl:grid-cols-12 gap-6" aria-label="Espaços reservados para gráficos">
      <div class="xl:col-span-8">
        <PlaceholderSlot title="Evolução de Vendas e Pedidos" description="Acompanhamento de receita e volume de pedidos ao longo do período." placeholder-label="Espaço reservado para gráfico principal" placeholder-hint="Série temporal de faturamento e pedidos será desenhada e integrada aqui." min-height-class="min-h-[300px]" :icon="LineChart" />
      </div>

      <div class="xl:col-span-4">
        <PlaceholderSlot title="Vendas por Categoria" description="Distribuição das vendas entre as categorias do acervo." placeholder-label="Espaço reservado para gráfico por categoria" placeholder-hint="Comparativo de desempenho entre Imagens, Terços, Bíblias e demais categorias." min-height-class="min-h-[300px]" :icon="PieChart" />
      </div>
    </section>

    <!-- Marked Short-Report Spaces -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Espaços reservados para relatórios resumidos">
      <PlaceholderSlot title="Pedidos Recentes" description="Últimas movimentações aguardando conferência ou envio." placeholder-label="Espaço reservado para relatório resumido" placeholder-hint="Lista rápida de pedidos recentes com cliente, valor e status." min-height-class="min-h-[220px]" :icon="ClipboardList" />

      <PlaceholderSlot title="Destaques do Acervo & Estoque" description="Itens mais procurados e alertas de reposição." placeholder-label="Espaço reservado para relatório resumido" placeholder-hint="Resumo de peças mais vendidas e produtos com estoque baixo." min-height-class="min-h-[220px]" :icon="AlertTriangle" />
    </section>
  </div>
</template>

<script setup lang="ts">
  import type { Component } from 'vue';
  import { AlertTriangle, ClipboardList, LineChart, Package, PieChart, ShoppingBag, TrendingUp, Wallet } from '@lucide/vue';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Card } from '@sagrada-familia/ui/card';
  import PageHeader from '@/components/common/PageHeader.vue';
  import PlaceholderSlot from '@/components/common/PlaceholderSlot.vue';

  interface KpiCardItem {
    key: string;
    label: string;
    value: string;
    caption: string;
    icon: Component;
  }

  const kpiCards: KpiCardItem[] = [
    {
      key: 'revenue',
      label: 'Receita do Mês',
      value: 'R$ 48.920,00',
      caption: '+12,4% vs. mês anterior',
      icon: Wallet
    },
    {
      key: 'orders',
      label: 'Pedidos Realizados',
      value: '184',
      caption: '+8,1% nos últimos 30 dias',
      icon: ShoppingBag
    },
    {
      key: 'ticket',
      label: 'Ticket Médio',
      value: 'R$ 265,86',
      caption: '+3,9% no período',
      icon: TrendingUp
    },
    {
      key: 'products',
      label: 'Produtos Ativos',
      value: '168',
      caption: '12 com alerta de estoque',
      icon: Package
    }
  ];
</script>
