<template>
  <div v-if="selectedCount > 0">
    <!-- Inline Contextual Bulk Action Bar -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-gold-light/40 bg-primary/[0.08] px-4 py-2.5 sm:px-6">
      <div class="flex items-center gap-2.5">
        <span class="inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-primary text-xs font-semibold text-primary-foreground tabular-nums shadow-warm-sm shrink-0">
          {{ selectedCount }}
        </span>

        <span class="text-xs sm:text-sm font-semibold text-foreground">
          {{ selectedCount === 1 ? 'produto selecionado' : 'produtos selecionados' }}
        </span>

        <button type="button" class="text-xs font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm" @click="emit( 'clearSelection' )">
          Limpar
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <!-- Bulk Status Menu -->
        <DropdownMenu>
          <DropdownMenuTrigger :as-child="true">
            <Button type="button" variant="outline" size="sm" class="h-8 rounded-lg border-gold-light/60 bg-card px-2.5 text-xs font-semibold text-foreground hover:bg-surface hover:text-gold-dark shadow-warm-sm cursor-pointer">
              <CheckCircle2 class="size-3.5 text-gold-dark" aria-hidden="true" />
              <span>Status</span>
              <ChevronDown class="size-3.5 opacity-75" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuLabel>Alterar status para</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem @select="emit( 'bulkStatus', 'active' )">
              <CheckCircle2 class="size-4 text-emerald-700" aria-hidden="true" />
              <span>Publicado</span>
            </DropdownMenuItem>

            <DropdownMenuItem @select="emit( 'bulkStatus', 'draft' )">
              <FileEdit class="size-4 text-indigo-600" aria-hidden="true" />
              <span>Rascunho</span>
            </DropdownMenuItem>

            <DropdownMenuItem @select="emit( 'bulkStatus', 'archived' )">
              <Archive class="size-4 text-slate-600" aria-hidden="true" />
              <span>Arquivado</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Desktop Grouped Bulk Action Triggers -->
        <ButtonGroup class="hidden md:inline-flex">
          <Button type="button" variant="outline" size="sm" class="h-8 border-gold-light/60 bg-card px-2.5 text-xs font-semibold text-foreground hover:bg-surface hover:text-gold-dark shadow-warm-sm cursor-pointer" @click="emit( 'openPriceModal' )">
            <CircleDollarSign class="size-3.5 text-gold-dark" aria-hidden="true" />
            <span>Preço</span>
          </Button>

          <Button type="button" variant="outline" size="sm" class="h-8 border-gold-light/60 bg-card px-2.5 text-xs font-semibold text-foreground hover:bg-surface hover:text-gold-dark shadow-warm-sm cursor-pointer" @click="emit( 'openPromotionModal' )">
            <BadgePercent class="size-3.5 text-gold-dark" aria-hidden="true" />
            <span>Promoção</span>
          </Button>

          <Button type="button" variant="outline" size="sm" class="h-8 border-gold-light/60 bg-card px-2.5 text-xs font-semibold text-foreground hover:bg-surface hover:text-gold-dark shadow-warm-sm cursor-pointer" @click="emit( 'openStockModal' )">
            <Boxes class="size-3.5 text-gold-dark" aria-hidden="true" />
            <span>Estoque</span>
          </Button>

          <Button type="button" variant="outline" size="sm" class="h-8 border-gold-light/60 bg-card px-2.5 text-xs font-semibold text-foreground hover:bg-surface hover:text-gold-dark shadow-warm-sm cursor-pointer" @click="emit( 'openCategoryModal' )">
            <FolderTree class="size-3.5 text-gold-dark" aria-hidden="true" />
            <span>Categoria</span>
          </Button>
        </ButtonGroup>

        <!-- Mobile/Compact Bulk Actions Dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger :as-child="true">
            <Button type="button" variant="outline" size="sm" class="md:hidden h-8 rounded-lg border-gold-light/60 bg-card px-2.5 text-xs font-semibold text-foreground hover:bg-surface hover:text-gold-dark shadow-warm-sm cursor-pointer">
              <span>Mais ações</span>
              <ChevronDown class="size-3.5 opacity-75" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" class="w-48">
            <DropdownMenuItem @select="emit( 'openPriceModal' )">
              <CircleDollarSign class="size-4 text-gold-dark" aria-hidden="true" />
              <span>Alterar preço</span>
            </DropdownMenuItem>

            <DropdownMenuItem @select="emit( 'openPromotionModal' )">
              <BadgePercent class="size-4 text-gold-dark" aria-hidden="true" />
              <span>Gerenciar promoção</span>
            </DropdownMenuItem>

            <DropdownMenuItem @select="emit( 'openStockModal' )">
              <Boxes class="size-4 text-gold-dark" aria-hidden="true" />
              <span>Ajustar estoque</span>
            </DropdownMenuItem>

            <DropdownMenuItem @select="emit( 'openCategoryModal' )">
              <FolderTree class="size-4 text-gold-dark" aria-hidden="true" />
              <span>Alterar categoria</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Bulk Delete Trigger -->
        <Button type="button" variant="destructive" size="sm" class="h-8 rounded-lg px-3 text-xs font-semibold shadow-warm-sm cursor-pointer" @click="emit( 'openDeleteModal' )">
          <Trash2 class="size-3.5" aria-hidden="true" />
          <span>Excluir</span>
        </Button>
      </div>
    </div>

    <!-- Cross-Page Selection Banner -->
    <div class="flex flex-wrap items-center justify-center gap-2 border-b border-gold-light/30 bg-surface/65 px-4 py-2 sm:px-6 text-xs text-foreground text-center" v-if="showSelectAllBanner">
      <template v-if="!selectAllMatching">
        <span>
          Todos os <strong class="font-semibold tabular-nums">{{ pageCount }}</strong> produtos desta página estão selecionados.
        </span>

        <button type="button" class="link-editorial font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer" @click="emit( 'selectAllFiltered' )">
          Selecionar todos os {{ totalFiltered }} produtos filtrados
        </button>
      </template>

      <template v-else>
        <span>
          Todos os <strong class="font-semibold tabular-nums">{{ totalFiltered }}</strong> produtos filtrados estão selecionados.
        </span>

        <button type="button" class="link-editorial font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer" @click="emit( 'clearSelection' )">
          Limpar seleção
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Archive, BadgePercent, Boxes, CheckCircle2, ChevronDown, CircleDollarSign, FileEdit, FolderTree, Trash2 } from '@lucide/vue';
  import { Button } from '@sagrada-familia/ui/button';
  import { ButtonGroup } from '@/components/ui/button-group';
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
  import type { ProductStatus } from '@/data/products';

  defineProps<{
    selectedCount: number;
    pageCount: number;
    totalFiltered: number;
    selectAllMatching: boolean;
    showSelectAllBanner: boolean;
  }>();

  const emit = defineEmits<{
    clearSelection: [];
    selectAllFiltered: [];
    bulkStatus: [ status: ProductStatus ];
    openPriceModal: [];
    openPromotionModal: [];
    openStockModal: [];
    openCategoryModal: [];
    openDeleteModal: [];
  }>();
</script>
