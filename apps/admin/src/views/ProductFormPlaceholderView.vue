<template>
  <div class="space-y-8">
    <PageHeader :eyebrow="isEditMode ? 'EDIÇÃO DE PRODUTO' : 'CADASTRO DE PRODUTO'" :title="pageTitle" :subtitle="pageSubtitle">
      <template #actions>
        <Button variant="outline" class="rounded-xl border-gold-light/50 bg-background/90 text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" :as-child="true">
          <RouterLink :to="{ name: 'products' }">
            <ArrowLeft class="size-4 text-gold-dark" aria-hidden="true" />
            <span>Voltar para Produtos</span>
          </RouterLink>
        </Button>
      </template>
    </PageHeader>

    <Card class="relative overflow-hidden bg-card/95 border-gold-light/35 shadow-warm-md py-0 gap-0">
      <FolioCorners />

      <CardContent class="relative z-10 p-6 sm:p-8 lg:p-10 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-start gap-5">
          <span class="w-14 h-14 rounded-2xl bg-primary/10 border border-gold-light/45 text-gold-dark flex items-center justify-center shrink-0 shadow-warm-sm" aria-hidden="true">
            <component class="size-6 stroke-[1.75]" :is="isEditMode ? PencilLine : PackagePlus" />
          </span>

          <div class="space-y-2.5 min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <Badge variant="outline" class="rounded-full border-gold-light bg-primary/15 px-3 py-0.5 text-[11px] font-semibold text-gold-dark">
                {{ isEditMode ? 'Edição em desenvolvimento' : 'Cadastro em desenvolvimento' }}
              </Badge>

              <Badge variant="outline" class="rounded-full border-gold-light/45 bg-surface/70 px-3 py-0.5 text-[11px] font-mono text-muted-foreground" v-if="matchedProduct">
                {{ matchedProduct.sku }}
              </Badge>
            </div>

            <h2 class="font-serif text-2xl sm:text-[1.75rem] font-semibold tracking-tight leading-snug text-foreground">
              {{ isEditMode ? 'Formulário completo de edição do produto' : 'Formulário completo de cadastro do produto' }}
            </h2>

            <p class="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Esta rota está estruturada e integrada à navegação do painel para receber o formulário editorial completo de criação e manutenção de peças sacras.
            </p>
          </div>
        </div>

        <Separator class="bg-gold-light/25" />

        <div class="space-y-3.5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
            Blocos previstos para este formulário
          </p>

          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Blocos previstos do formulário">
            <li class="flex items-start gap-2.5 rounded-xl border border-gold-light/25 bg-background/80 px-4 py-3 text-sm text-foreground/90" v-for="section in plannedSections" :key="section">
              <CheckCircle2 class="size-4 text-gold-dark shrink-0 mt-0.5" aria-hidden="true" />
              <span class="leading-snug">{{ section }}</span>
            </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gold-light/20 bg-surface/40 px-6 py-4 sm:px-8 lg:px-10">
        <p class="text-xs text-muted-foreground">
          Rota reservada no módulo de Catálogo pronta para a etapa de criação e edição.
        </p>

        <Button variant="outline" class="rounded-xl border-gold-light/50 bg-background/90 text-foreground hover:bg-surface hover:text-gold-dark shrink-0" :as-child="true">
          <RouterLink :to="{ name: 'products' }">
            <ArrowLeft class="size-4 text-gold-dark" aria-hidden="true" />
            <span>Retornar à listagem</span>
          </RouterLink>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { ArrowLeft, CheckCircle2, PackagePlus, PencilLine } from '@lucide/vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Button } from '@sagrada-familia/ui/button';
  import { Card, CardContent, CardFooter } from '@sagrada-familia/ui/card';
  import { Separator } from '@sagrada-familia/ui/separator';
  import FolioCorners from '@/components/common/FolioCorners.vue';
  import PageHeader from '@/components/common/PageHeader.vue';
  import { findMockProductById } from '@/data/products';

  const route = useRoute();

  const isEditMode = computed( () => route.name === 'product-edit' );

  const matchedProduct = computed( () => {
    if ( !isEditMode.value || typeof route.params.id !== 'string' ) {
      return undefined;
    }

    return findMockProductById( route.params.id );
  } );

  const pageTitle = computed( () => {
    if ( !isEditMode.value ) {
      return 'Novo Produto';
    }

    return matchedProduct.value ? matchedProduct.value.name : 'Editar Produto';
  } );

  const pageSubtitle = computed( () => {
    if ( !isEditMode.value ) {
      return 'Adicione uma nova peça ao catálogo da Sagrada Família com variações, imagens e estoque.';
    }

    if ( matchedProduct.value ) {
      return `Editando o item ${ matchedProduct.value.sku } na categoria ${ matchedProduct.value.categoryLabel }.`;
    }

    return 'Atualize informações, preços, estoque e variações do produto selecionado.';
  } );

  const plannedSections = [
    'Identificação, SKU, slug amigável, devoção e descrição editorial',
    'Classificação em categoria, subcategoria e atributos técnicos',
    'Galeria de mídia com ordenação e imagem principal de vitrine',
    'Precificação, preço promocional, parcelamento e estoque por variação'
  ];
</script>
