<template>
  <div class="space-y-8">
    <PageHeader :eyebrow="config.eyebrow" :title="config.title" :subtitle="config.subtitle" />

    <Card class="relative overflow-hidden bg-card/95 border-gold-light/35 shadow-warm-md py-0 gap-0">
      <FolioCorners />

      <CardContent class="relative z-10 p-6 sm:p-8 lg:p-10 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-start gap-5">
          <span class="w-14 h-14 rounded-2xl bg-primary/10 border border-gold-light/45 text-gold-dark flex items-center justify-center shrink-0 shadow-warm-sm" aria-hidden="true">
            <component class="size-6 stroke-[1.75]" :is="config.icon" />
          </span>

          <div class="space-y-2.5 min-w-0">
            <Badge variant="outline" class="rounded-full px-3 py-0.5 text-[11px] font-semibold" :class="config.isPriority ? 'border-gold-light bg-primary/15 text-gold-dark' : 'border-gold-light/45 bg-surface/70 text-muted-foreground'">
              {{ config.statusLabel }}
            </Badge>

            <h2 class="font-serif text-2xl sm:text-[1.75rem] font-semibold tracking-tight leading-snug text-foreground">
              {{ config.isPriority ? 'Próximo módulo no roteiro de desenvolvimento' : 'Módulo preparado para desenvolvimento futuro' }}
            </h2>

            <p class="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {{ config.summary }}
            </p>
          </div>
        </div>

        <Separator class="bg-gold-light/25" />

        <div class="space-y-3.5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            Escopo previsto para este módulo
          </p>

          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Recursos previstos">
            <li class="flex items-start gap-2.5 rounded-xl border border-gold-light/25 bg-background/80 px-4 py-3 text-sm text-foreground/90" v-for="feature in config.plannedFeatures" :key="feature">
              <CheckCircle2 class="size-4 text-gold-dark shrink-0 mt-0.5" aria-hidden="true" />
              <span class="leading-snug">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gold-light/20 bg-surface/40 px-6 py-4 sm:px-8 lg:px-10">
        <p class="text-xs text-muted-foreground">
          Navegação estruturada e pronta para receber a implementação completa desta área.
        </p>

        <Button variant="outline" class="rounded-xl border-gold-light/50 bg-background/90 text-foreground hover:bg-surface hover:text-gold-dark shrink-0" :as-child="true">
          <RouterLink :to="{ name: 'dashboard' }">
            <ArrowLeft class="size-4 text-gold-dark" aria-hidden="true" />
            <span>Voltar para Visão Geral</span>
          </RouterLink>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import type { Component } from 'vue';
  import { computed } from 'vue';
  import { ArrowLeft, BarChart3, CheckCircle2, FolderTree, Settings, ShoppingBag, SlidersHorizontal, TicketPercent, Users } from '@lucide/vue';
  import { RouterLink } from 'vue-router';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Button } from '@sagrada-familia/ui/button';
  import { Card, CardContent, CardFooter } from '@sagrada-familia/ui/card';
  import { Separator } from '@sagrada-familia/ui/separator';
  import FolioCorners from '@/components/common/FolioCorners.vue';
  import PageHeader from '@/components/common/PageHeader.vue';

  const props = defineProps<{
    moduleKey: AdminModuleKey;
  }>();

  const config = computed( () => modulePlaceholders[ props.moduleKey ] );

  type AdminModuleKey = 'categories' | 'attributes' | 'orders' | 'clients' | 'coupons' | 'reports' | 'settings';

  interface ModulePlaceholderConfig {
    key: AdminModuleKey;
    section: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    icon: Component;
    statusLabel: string;
    isPriority?: boolean;
    summary: string;
    plannedFeatures: string[];
  }

  const modulePlaceholders: Record<AdminModuleKey, ModulePlaceholderConfig> = {
    categories: {
      key: 'categories',
      section: 'Catálogo',
      eyebrow: 'ESTRUTURA DA LOJA',
      title: 'Categorias',
      subtitle: 'Organização hierárquica de categorias, subcategorias e coleções da vitrine.',
      icon: FolderTree,
      statusLabel: 'Em desenvolvimento',
      summary: 'Aqui será gerenciada toda a árvore de navegação da loja, permitindo estruturar categorias principais, subcategorias e destaques editoriais.',
      plannedFeatures: [
        'Criação, edição e remoção de categorias e subcategorias (CRUD)',
        'Definição de ordem de exibição no menu e na vitrine',
        'Associação de banners, descrições e textos de cabeçalho',
        'Vinculação direta de grupos de atributos por categoria'
      ]
    },
    attributes: {
      key: 'attributes',
      section: 'Catálogo',
      eyebrow: 'ESPECIFICAÇÕES',
      title: 'Atributos',
      subtitle: 'Definição de materiais, tamanhos, acabamentos e filtros do catálogo.',
      icon: SlidersHorizontal,
      statusLabel: 'Em desenvolvimento',
      summary: 'Este módulo reunirá os atributos técnicos e filtros usados na página de catálogo e nas variações dos produtos.',
      plannedFeatures: [
        'Cadastro e manutenção de grupos e opções de atributos (CRUD)',
        'Configuração de exibição em lista, pílulas ou amostras de cor',
        'Associação de grupos filtráveis a cada categoria da loja',
        'Padronização de especificações como material, altura e banho'
      ]
    },
    orders: {
      key: 'orders',
      section: 'Comercial',
      eyebrow: 'OPERAÇÃO COMERCIAL',
      title: 'Pedidos',
      subtitle: 'Acompanhamento de pedidos desde a confirmação até a entrega ao cliente.',
      icon: ShoppingBag,
      statusLabel: 'Em desenvolvimento',
      summary: 'Central operacional para acompanhar pagamentos, separação artesanal, vistoria manual de cada peça e postagem junto às transportadoras.',
      plannedFeatures: [
        'Listagem de pedidos com filtros por status, data e pagamento',
        'Linha do tempo da separação e conferência manual do pedido',
        'Registro de código de rastreamento e atualização de envio',
        'Visualização detalhada dos itens, descontos e dados de entrega'
      ]
    },
    clients: {
      key: 'clients',
      section: 'Comercial',
      eyebrow: 'RELACIONAMENTO',
      title: 'Clientes',
      subtitle: 'Consulta aos clientes cadastrados, dados de compra e histórico na loja.',
      icon: Users,
      statusLabel: 'Em desenvolvimento',
      summary: 'Área dedicada à visualização dos clientes registrados, reunindo informações cadastrais, endereços e histórico completo de compras.',
      plannedFeatures: [
        'Listagem pesquisável de todos os clientes cadastrados',
        'Consulta de dados de comprador, contatos e endereços salvos',
        'Histórico detalhado de pedidos realizados por cliente',
        'Indicadores individuais de ticket médio e frequência de compra'
      ]
    },
    coupons: {
      key: 'coupons',
      section: 'Comercial',
      eyebrow: 'CAMPANHAS & PROMOÇÕES',
      title: 'Cupons',
      subtitle: 'Criação e controle de cupons promocionais e condições especiais de compra.',
      icon: TicketPercent,
      statusLabel: 'Em desenvolvimento',
      summary: 'Gerencie campanhas sazonais, descontos exclusivos e regras de aplicação de cupons promocionais em toda a loja.',
      plannedFeatures: [
        'Criação, edição, ativação e remoção de cupons promocionais (CRUD)',
        'Regras de desconto percentual, valor fixo ou frete promocional',
        'Definição de validade, valor mínimo e limite de utilizações',
        'Restrição opcional por categoria, produto ou primeiro pedido'
      ]
    },
    reports: {
      key: 'reports',
      section: 'Gestão',
      eyebrow: 'ANÁLISES & INDICADORES',
      title: 'Relatórios',
      subtitle: 'Relatórios gerenciais de vendas, faturamento, catálogo e desempenho.',
      icon: BarChart3,
      statusLabel: 'Em desenvolvimento',
      summary: 'Painel analítico para acompanhar a saúde financeira da loja, tendências sazonais e desempenho detalhado por categoria e devoção.',
      plannedFeatures: [
        'Relatórios de faturamento, pedidos e ticket médio por período',
        'Desempenho detalhado por categoria, subcategoria e devoção',
        'Análise de giro de estoque, ruptura e reposição de peças',
        'Filtros customizados por data e exportação de dados'
      ]
    },
    settings: {
      key: 'settings',
      section: 'Gestão',
      eyebrow: 'PREFERÊNCIAS DO PAINEL',
      title: 'Configurações',
      subtitle: 'Preferências operacionais de estoque, alertas e parâmetros gerais da loja.',
      icon: Settings,
      statusLabel: 'Em desenvolvimento',
      summary: 'Central de configurações administrativas para ajustar regras de controle de estoque, visibilidade de alertas e preferências futuras da operação.',
      plannedFeatures: [
        'Ativar ou desativar o gerenciamento automático de estoque',
        'Exibir ou ocultar avisos de estoque baixo na loja e no painel',
        'Definição de limiar padrão para alertas de reposição',
        'Parâmetros gerais da loja, frete e notificações administrativas'
      ]
    }
  };
</script>
