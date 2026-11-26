<template>
  <TooltipProvider :delay-duration="250">
    <Table>
      <TableHeader>
        <TableRow class="hover:bg-transparent">
          <TableHead class="w-11 pl-4">
            <Checkbox aria-label="Selecionar produtos desta página" class="cursor-pointer data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary" :disabled="products.length === 0" :model-value="pageSelectionState" @update:model-value="emit( 'togglePageSelection' )">
              <Minus class="size-3.5 stroke-[2.5]" aria-hidden="true" v-if="pageSelectionState === 'indeterminate'" />
              <Check class="size-3.5 stroke-[2.5]" aria-hidden="true" v-else />
            </Checkbox>
          </TableHead>

          <TableHead class="min-w-[280px] max-w-[460px]" :aria-sort="getAriaSort( 'name' )">
            <button type="button" class="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] hover:text-gold-dark transition-colors cursor-pointer" @click="emit( 'toggleSort', 'name' )">
              <span>Produto</span>
              <component class="size-3.5" aria-hidden="true" :is="getSortIcon( 'name' )" :class="sortBy === 'name' ? 'text-primary' : 'text-muted-foreground/60'" />
            </button>
          </TableHead>

          <TableHead v-if="visibleColumns.category">
            Categoria
          </TableHead>

          <TableHead v-if="visibleColumns.price" :aria-sort="getAriaSort( 'price' )">
            <button type="button" class="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.12em] hover:text-gold-dark transition-colors cursor-pointer" @click="emit( 'toggleSort', 'price' )">
              <span>Preço</span>
              <component class="size-3.5" aria-hidden="true" :is="getSortIcon( 'price' )" :class="sortBy === 'price' ? 'text-primary' : 'text-muted-foreground/60'" />
            </button>
          </TableHead>

          <TableHead class="text-center" v-if="visibleColumns.promotion" :aria-sort="getAriaSort( 'promotion' )">
            <button type="button" class="inline-flex items-center justify-center gap-1.5 font-semibold uppercase tracking-[0.12em] hover:text-gold-dark transition-colors cursor-pointer mx-auto" @click="emit( 'toggleSort', 'promotion' )">
              <span>Promoção</span>
              <component class="size-3.5" aria-hidden="true" :is="getSortIcon( 'promotion' )" :class="sortBy === 'promotion' ? 'text-primary' : 'text-muted-foreground/60'" />
            </button>
          </TableHead>

          <TableHead class="text-center" v-if="visibleColumns.stock" :aria-sort="getAriaSort( 'stock' )">
            <button type="button" class="inline-flex items-center justify-center gap-1.5 font-semibold uppercase tracking-[0.12em] hover:text-gold-dark transition-colors cursor-pointer mx-auto" @click="emit( 'toggleSort', 'stock' )">
              <span>Estoque</span>
              <component class="size-3.5" aria-hidden="true" :is="getSortIcon( 'stock' )" :class="sortBy === 'stock' ? 'text-primary' : 'text-muted-foreground/60'" />
            </button>
          </TableHead>

          <TableHead class="text-center" v-if="visibleColumns.status" :aria-sort="getAriaSort( 'status' )">
            <button type="button" class="inline-flex items-center justify-center gap-1.5 font-semibold uppercase tracking-[0.12em] hover:text-gold-dark transition-colors cursor-pointer mx-auto" @click="emit( 'toggleSort', 'status' )">
              <span>Status</span>
              <component class="size-3.5" aria-hidden="true" :is="getSortIcon( 'status' )" :class="sortBy === 'status' ? 'text-primary' : 'text-muted-foreground/60'" />
            </button>
          </TableHead>

          <TableHead class="text-center" v-if="visibleColumns.createdAt" :aria-sort="getAriaSort( 'createdAt' )">
            <button type="button" class="inline-flex items-center justify-center gap-1.5 font-semibold uppercase tracking-[0.12em] hover:text-gold-dark transition-colors cursor-pointer mx-auto" @click="emit( 'toggleSort', 'createdAt' )">
              <span>Criado em</span>
              <component class="size-3.5" aria-hidden="true" :is="getSortIcon( 'createdAt' )" :class="sortBy === 'createdAt' ? 'text-primary' : 'text-muted-foreground/60'" />
            </button>
          </TableHead>

          <TableHead class="text-center" v-if="visibleColumns.updatedAt" :aria-sort="getAriaSort( 'updatedAt' )">
            <button type="button" class="inline-flex items-center justify-center gap-1.5 font-semibold uppercase tracking-[0.12em] hover:text-gold-dark transition-colors cursor-pointer mx-auto" @click="emit( 'toggleSort', 'updatedAt' )">
              <span>Atualizado em</span>
              <component class="size-3.5" aria-hidden="true" :is="getSortIcon( 'updatedAt' )" :class="sortBy === 'updatedAt' ? 'text-primary' : 'text-muted-foreground/60'" />
            </button>
          </TableHead>

          <TableHead class="w-12 pr-4 text-right">
            <span class="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <template v-if="products.length > 0">
          <TableRow v-for="product in products" :key="product.id" :data-state="isRowSelected( product.id ) ? 'selected' : undefined">
            <TableCell class="pl-4">
              <Checkbox class="cursor-pointer" :aria-label="`Selecionar ${ product.name }`" :model-value="isRowSelected( product.id )" @update:model-value="emit( 'toggleRowSelection', product.id )" />
            </TableCell>

            <TableCell class="min-w-[280px] max-w-[460px]">
              <div class="flex items-center gap-3 min-w-0">
                <img class="size-11 rounded-lg border border-gold-light/35 bg-surface/60 object-cover shrink-0 shadow-warm-sm" loading="lazy" :src="product.imageUrl" :alt="product.name" />

                <div class="min-w-0 flex-1 space-y-0.5">
                  <Tooltip>
                    <TooltipTrigger :as-child="true">
                      <RouterLink class="block w-full truncate text-left text-sm font-semibold text-foreground hover:text-gold-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer" :to="{ name: 'product-edit', params: { id: product.id } }">
                        {{ product.name }}
                      </RouterLink>
                    </TooltipTrigger>

                    <TooltipContent side="top" align="start" class="max-w-xs whitespace-normal break-words leading-snug">
                      {{ product.name }}
                    </TooltipContent>
                  </Tooltip>

                  <div class="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span class="font-mono tracking-tight">{{ product.sku }}</span>

                    <template v-if="product.variationCount > 0">
                      <span aria-hidden="true">&bull;</span>
                      <span class="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-foreground/80">
                        <Layers class="size-3 text-gold-dark" aria-hidden="true" />
                        {{ product.variationCount }} variações
                      </span>
                    </template>
                  </div>
                </div>
              </div>
            </TableCell>

            <TableCell class="min-w-[155px] whitespace-nowrap" v-if="visibleColumns.category">
              <div class="space-y-0.5">
                <p class="text-sm font-medium text-foreground leading-snug">
                  {{ product.categoryLabel }}
                </p>
                <p class="text-xs text-muted-foreground leading-snug">
                  {{ product.subCategoryLabel }}
                </p>
              </div>
            </TableCell>

            <TableCell class="text-left whitespace-nowrap" v-if="visibleColumns.price">
              <div class="space-y-0.5 tabular-nums">
                <p class="text-sm font-semibold text-foreground">
                  {{ formatCurrency( product.price ) }}
                </p>
                <p class="text-xs text-muted-foreground line-through" v-if="getDiscountPercentage( product.price, product.originalPrice ) !== null && product.originalPrice !== undefined">
                  {{ formatCurrency( product.originalPrice ) }}
                </p>
              </div>
            </TableCell>

            <TableCell class="text-center whitespace-nowrap" v-if="visibleColumns.promotion">
              <Badge variant="outline" class="rounded-full border-gold-light bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold-dark tabular-nums" v-if="getDiscountPercentage( product.price, product.originalPrice ) !== null">
                <Tag class="size-3" aria-hidden="true" />
                -{{ getDiscountPercentage( product.price, product.originalPrice ) }}% &middot; Em oferta
              </Badge>
              <span class="text-xs text-muted-foreground/75" v-else>
                &mdash;
              </span>
            </TableCell>

            <TableCell class="text-center whitespace-nowrap" v-if="visibleColumns.stock">
              <div class="inline-flex items-center justify-center gap-2">
                <span class="text-xs sm:text-sm font-semibold text-foreground tabular-nums min-w-[46px]">
                  {{ product.stock }} un.
                </span>

                <Badge variant="outline" class="rounded-full px-2 py-0.5 text-[11px] font-medium" :class="getStockStatusMeta( product.stock ).badgeClass">
                  <span class="size-1.5 rounded-full" aria-hidden="true" :class="getStockStatusMeta( product.stock ).dotClass" />
                  {{ getStockStatusMeta( product.stock ).shortLabel }}
                </Badge>
              </div>
            </TableCell>

            <TableCell class="text-center whitespace-nowrap" v-if="visibleColumns.status">
              <Badge variant="outline" class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" :class="getProductStatusMeta( product.status ).badgeClass">
                <span class="size-1.5 rounded-full" aria-hidden="true" :class="getProductStatusMeta( product.status ).dotClass" />
                {{ getProductStatusMeta( product.status ).label }}
              </Badge>
            </TableCell>

            <TableCell class="text-center whitespace-nowrap tabular-nums" v-if="visibleColumns.createdAt">
              <div class="flex flex-col items-center leading-tight">
                <span class="text-xs font-medium text-foreground">{{ formatShortDate( product.createdAt ) }}</span>
                <span class="mt-0.5 text-[11px] text-muted-foreground">{{ formatTime( product.createdAt ) }} · {{ formatRelativeTimespan( product.createdAt ) }}</span>
              </div>
            </TableCell>

            <TableCell class="text-center whitespace-nowrap tabular-nums" v-if="visibleColumns.updatedAt">
              <div class="flex flex-col items-center leading-tight">
                <span class="text-xs font-medium text-foreground">{{ formatShortDate( product.updatedAt ) }}</span>
                <span class="mt-0.5 text-[11px] text-muted-foreground">{{ formatTime( product.updatedAt ) }} · {{ formatRelativeTimespan( product.updatedAt ) }}</span>
              </div>
            </TableCell>

            <TableCell class="pr-4 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger :as-child="true">
                  <Button type="button" variant="ghost" size="icon-sm" class="rounded-lg text-muted-foreground hover:text-gold-dark hover:bg-surface cursor-pointer" :aria-label="`Ações para ${ product.name }`">
                    <MoreHorizontal class="size-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" class="w-48">
                  <DropdownMenuItem @select="emit( 'view', product )">
                    <Eye class="size-4 text-gold-dark" aria-hidden="true" />
                    <span>Visualizar</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem @select="emit( 'edit', product )">
                    <Pencil class="size-4 text-gold-dark" aria-hidden="true" />
                    <span>Editar</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem @select="emit( 'duplicate', product )">
                    <Copy class="size-4 text-gold-dark" aria-hidden="true" />
                    <span>Duplicar</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem v-if="product.status !== 'active'" @select="emit( 'changeStatus', product, 'active' )">
                    <CheckCircle2 class="size-4 text-emerald-700" aria-hidden="true" />
                    <span>Publicar produto</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem v-if="product.status !== 'draft'" @select="emit( 'changeStatus', product, 'draft' )">
                    <FileEdit class="size-4 text-indigo-600" aria-hidden="true" />
                    <span>Mover para rascunho</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem v-if="product.status !== 'archived'" @select="emit( 'changeStatus', product, 'archived' )">
                    <Archive class="size-4 text-muted-foreground" aria-hidden="true" />
                    <span>Arquivar</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem variant="destructive" @select="emit( 'delete', product )">
                    <Trash2 class="size-4" aria-hidden="true" />
                    <span>Excluir</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </template>

        <TableEmpty :colspan="totalColumnCount" v-else>
          <Empty class="w-full max-w-lg border-none bg-transparent py-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageSearch aria-hidden="true" />
              </EmptyMedia>

              <EmptyTitle>
                {{ hasActiveFilters ? 'Nenhum produto encontrado com esses filtros' : 'Nenhum produto cadastrado no momento' }}
              </EmptyTitle>

              <EmptyDescription>
                {{ hasActiveFilters ? 'Ajuste os critérios de busca, status, categoria, estoque ou promoção para visualizar mais itens do acervo.' : 'Adicione o primeiro item ao catálogo da Sagrada Família para começar.' }}
              </EmptyDescription>
            </EmptyHeader>

            <EmptyContent>
              <Button type="button" variant="outline" class="rounded-xl border-gold-light/55 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" v-if="hasActiveFilters" @click="emit( 'clearFilters' )">
                Limpar filtros
              </Button>

              <Button class="rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark shadow-warm-sm cursor-pointer" :as-child="true">
                <RouterLink :to="{ name: 'product-create' }">
                  <Plus class="size-4" aria-hidden="true" />
                  <span>Novo Produto</span>
                </RouterLink>
              </Button>
            </EmptyContent>
          </Empty>
        </TableEmpty>
      </TableBody>
    </Table>
  </TooltipProvider>
</template>

<script setup lang="ts">
  import type { Component } from 'vue';
  import { computed } from 'vue';
  import { Archive, ArrowDown, ArrowUp, ArrowUpDown, Check, CheckCircle2, Copy, Eye, FileEdit, Layers, Minus, MoreHorizontal, PackageSearch, Pencil, Plus, Tag, Trash2 } from '@lucide/vue';
  import { RouterLink } from 'vue-router';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Button } from '@sagrada-familia/ui/button';
  import { Checkbox } from '@sagrada-familia/ui/checkbox';
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
  import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
  import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '@/components/ui/table';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
  import type { SortColumn, SortDirection, ToggleableColumnKey } from '@/composables/useProductsTable';
  import { formatCurrency, formatRelativeTimespan, formatShortDate, formatTime, getDiscountPercentage, getProductStatusMeta, getStockStatusMeta, type AdminProduct, type ProductStatus } from '@/data/products';

  const props = defineProps<{
    products: AdminProduct[];
    sortBy: SortColumn;
    sortDirection: SortDirection;
    visibleColumns: Record<ToggleableColumnKey, boolean>;
    pageSelectionState: boolean | 'indeterminate';
    isRowSelected: ( id: string ) => boolean;
    hasActiveFilters: boolean;
  }>();

  const emit = defineEmits<{
    toggleSort: [ column: SortColumn ];
    togglePageSelection: [];
    toggleRowSelection: [ id: string ];
    view: [ product: AdminProduct ];
    edit: [ product: AdminProduct ];
    duplicate: [ product: AdminProduct ];
    changeStatus: [ product: AdminProduct, status: ProductStatus ];
    delete: [ product: AdminProduct ];
    clearFilters: [];
  }>();

  const totalColumnCount = computed( () => {
    const toggleableVisible = Object.values( props.visibleColumns ).filter( Boolean ).length;
    return 3 + toggleableVisible;
  } );

  const getSortIcon = ( column: SortColumn ): Component => {
    if ( props.sortBy !== column ) {
      return ArrowUpDown;
    }

    return props.sortDirection === 'asc' ? ArrowUp : ArrowDown;
  };

  const getAriaSort = ( column: SortColumn ): 'ascending' | 'descending' | 'none' => {
    if ( props.sortBy !== column ) {
      return 'none';
    }

    return props.sortDirection === 'asc' ? 'ascending' : 'descending';
  };
</script>
