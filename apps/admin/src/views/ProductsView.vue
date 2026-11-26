<template>
  <div class="space-y-6">
    <PageHeader eyebrow="CATÁLOGO & ACERVO" title="Produtos" subtitle="Cadastro, precificação, estoque e organização das peças do catálogo sacro.">
      <template #actions>
        <TableColumnToggle :columns="columnOptions" @toggle="toggleColumnVisibility" @reset="resetVisibleColumns" />

        <Button class="rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark font-semibold shadow-warm-sm btn-sheen cursor-pointer" :as-child="true">
          <RouterLink :to="{ name: 'product-create' }">
            <Plus class="size-4" aria-hidden="true" />
            <span>Novo Produto</span>
          </RouterLink>
        </Button>
      </template>
    </PageHeader>

    <ProductsKpiCards :stats="kpiStats" :active-kpi="activeKpiKey" @select="toggleKpiFilter" />

    <Card class="bg-card/95 border-gold-light/35 shadow-warm-sm py-0 gap-0 overflow-hidden">
      <ProductsToolbar :search-query="searchQuery" :is-search-pending="isSearchPending" :status-tab="statusTab" :status-counts="statusCounts" :selected-categories="selectedCategories" :selected-sub-categories="selectedSubCategories" :selected-stock-statuses="selectedStockStatuses" :only-on-sale="onlyOnSale" :active-filter-chips="activeFilterChips" @update:search-query="searchQuery = $event" @update:status-tab="statusTab = $event" @update:only-on-sale="onlyOnSale = $event" @toggle-category="toggleCategory" @toggle-sub-category="toggleSubCategory" @clear-categories="handleClearCategories" @toggle-stock-status="toggleStockStatus" @clear-stock-statuses="selectedStockStatuses = []" @clear-all-filters="clearAllFilters" />

      <ProductsBulkActionBar :selected-count="selectedCount" :page-count="paginatedProducts.length" :total-filtered="totalFiltered" :select-all-matching="selectAllMatching" :show-select-all-banner="showSelectAllBanner" @clear-selection="clearSelection" @select-all-filtered="selectAllFiltered" @bulk-status="handleBulkStatus" @open-price-modal="openBulkModal( 'price' )" @open-promotion-modal="openBulkModal( 'promotion' )" @open-stock-modal="openBulkModal( 'stock' )" @open-category-modal="openBulkModal( 'category' )" @open-delete-modal="openBulkModal( 'delete' )" />

      <ProductsTable :products="paginatedProducts" :sort-by="sortBy" :sort-direction="sortDirection" :visible-columns="visibleColumns" :page-selection-state="pageSelectionState" :is-row-selected="isRowSelected" :has-active-filters="hasActiveFilters" @toggle-sort="toggleSort" @toggle-page-selection="toggleCurrentPage" @toggle-row-selection="toggleRow" @view="handleViewProduct" @edit="handleEditProduct" @duplicate="handleDuplicateProduct" @change-status="handleChangeProductStatus" @delete="handleDeleteProduct" @clear-filters="clearAllFilters" />

      <TablePaginationBar :page="page" :page-size="pageSize" :total-items="totalFiltered" :page-range-start="pageRangeStart" :page-range-end="pageRangeEnd" @update:page="page = $event" @update:page-size="pageSize = $event" />
    </Card>

    <ProductsQuickViewSheet :open="isQuickViewOpen" :product="quickViewProduct" @update:open="isQuickViewOpen = $event" @duplicate="handleDuplicateProduct" @change-status="handleChangeProductStatus" />

    <ProductsBulkDialogs :active-modal="activeBulkModal" :selected-products="selectedProducts" :single-delete-target="singleDeleteTarget" @update:active-modal="activeBulkModal = $event" @confirm-price="handleBulkPrice" @confirm-promotion="handleBulkPromotion" @confirm-stock="handleBulkStock" @confirm-category="handleBulkCategory" @confirm-delete="handleConfirmDelete" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { Plus } from '@lucide/vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { toast } from 'vue-sonner';
  import { Button } from '@sagrada-familia/ui/button';
  import { Card } from '@sagrada-familia/ui/card';
  import PageHeader from '@/components/common/PageHeader.vue';
  import ProductsBulkActionBar from '@/components/products/ProductsBulkActionBar.vue';
  import ProductsBulkDialogs, { type BulkModalType } from '@/components/products/ProductsBulkDialogs.vue';
  import ProductsKpiCards from '@/components/products/ProductsKpiCards.vue';
  import ProductsQuickViewSheet from '@/components/products/ProductsQuickViewSheet.vue';
  import ProductsTable from '@/components/products/ProductsTable.vue';
  import ProductsToolbar from '@/components/products/ProductsToolbar.vue';
  import TableColumnToggle from '@/components/table/TableColumnToggle.vue';
  import TablePaginationBar from '@/components/table/TablePaginationBar.vue';
  import { useProductsTable, type BulkPriceMode, type BulkPromotionMode, type BulkStockMode } from '@/composables/useProductsTable';
  import { getCategoryBySlug, getSubCategoryBySlug, PRODUCT_STATUS_META, type AdminProduct, type ProductStatus } from '@/data/products';

  const router = useRouter();

  const {
    products,
    searchQuery,
    isSearchPending,
    statusTab,
    selectedCategories,
    selectedSubCategories,
    selectedStockStatuses,
    onlyOnSale,
    statusCounts,
    activeFilterChips,
    visibleColumns,
    columnOptions,
    sortBy,
    sortDirection,
    page,
    pageSize,
    kpiStats,
    activeKpiKey,
    totalFiltered,
    paginatedProducts,
    pageRangeStart,
    pageRangeEnd,
    hasActiveFilters,
    selectedProducts,
    selectedCount,
    selectAllMatching,
    pageSelectionState,
    showSelectAllBanner,
    isRowSelected,
    toggleRow,
    toggleCurrentPage,
    selectAllFiltered,
    clearSelection,
    toggleCategory,
    toggleSubCategory,
    toggleStockStatus,
    toggleKpiFilter,
    clearAllFilters,
    toggleSort,
    toggleColumnVisibility,
    resetVisibleColumns,
    duplicateProduct,
    updateProductStatus,
    deleteProduct,
    bulkUpdateStatus,
    bulkUpdatePrice,
    bulkUpdatePromotion,
    bulkUpdateStock,
    bulkUpdateCategory,
    bulkDelete
  } = useProductsTable();

  const quickViewProductId = ref<string | null>( null );
  const activeBulkModal = ref<BulkModalType>( null );
  const singleDeleteTarget = ref<AdminProduct | null>( null );

  const quickViewProduct = computed<AdminProduct | null>( () => {
    if ( !quickViewProductId.value ) {
      return null;
    }

    return products.value.find( ( item ) => item.id === quickViewProductId.value ) ?? null;
  } );

  const isQuickViewOpen = computed<boolean>( {
    get: () => quickViewProduct.value !== null,
    set: ( open: boolean ) => {
      if ( !open ) {
        quickViewProductId.value = null;
      }
    }
  } );

  const openBulkModal = ( modal: Exclude<BulkModalType, null> ) => {
    singleDeleteTarget.value = null;
    activeBulkModal.value = modal;
  };

  const handleClearCategories = () => {
    selectedCategories.value = [];
    selectedSubCategories.value = [];
  };

  const handleViewProduct = ( product: AdminProduct ) => {
    quickViewProductId.value = product.id;
  };

  const handleEditProduct = ( product: AdminProduct ) => {
    router.push( { name: 'product-edit', params: { id: product.id } } );
  };

  const handleDuplicateProduct = ( product: AdminProduct ) => {
    const copy = duplicateProduct( product.id );
    if ( copy ) {
      toast.success( 'Produto duplicado como rascunho', {
        description: `${ copy.name } (${ copy.sku })`
      } );
    }
  };

  const handleChangeProductStatus = ( product: AdminProduct, status: ProductStatus ) => {
    const updated = updateProductStatus( product.id, status );
    if ( updated ) {
      toast.success( `Status alterado para ${ PRODUCT_STATUS_META[ status ].label }`, {
        description: updated.name
      } );
    }
  };

  const handleDeleteProduct = ( product: AdminProduct ) => {
    singleDeleteTarget.value = product;
    activeBulkModal.value = 'delete';
  };

  const handleBulkStatus = ( status: ProductStatus ) => {
    const count = bulkUpdateStatus( status );
    if ( count > 0 ) {
      toast.success( `Status atualizado para ${ PRODUCT_STATUS_META[ status ].label }`, {
        description: `${ count } ${ count === 1 ? 'produto atualizado' : 'produtos atualizados' }.`
      } );
    }
  };

  const handleBulkPrice = ( mode: BulkPriceMode, value: number ) => {
    const count = bulkUpdatePrice( mode, value );
    activeBulkModal.value = null;
    if ( count > 0 ) {
      toast.success( 'Preços atualizados em massa', {
        description: `${ count } ${ count === 1 ? 'produto atualizado' : 'produtos atualizados' }.`
      } );
    }
  };

  const handleBulkPromotion = ( mode: BulkPromotionMode, discountPercent: number ) => {
    const count = bulkUpdatePromotion( mode, discountPercent );
    activeBulkModal.value = null;
    if ( count > 0 ) {
      toast.success( mode === 'remove' ? 'Promoções removidas' : `Desconto de ${ discountPercent }% aplicado`, {
        description: `${ count } ${ count === 1 ? 'produto atualizado' : 'produtos atualizados' }.`
      } );
    }
  };

  const handleBulkStock = ( mode: BulkStockMode, value: number ) => {
    const count = bulkUpdateStock( mode, value );
    activeBulkModal.value = null;
    if ( count > 0 ) {
      toast.success( 'Estoque atualizado em massa', {
        description: `${ count } ${ count === 1 ? 'produto atualizado' : 'produtos atualizados' }.`
      } );
    }
  };

  const handleBulkCategory = ( categorySlug: string, subCategorySlug: string ) => {
    const count = bulkUpdateCategory( categorySlug, subCategorySlug );
    activeBulkModal.value = null;
    if ( count > 0 ) {
      const catLabel = getCategoryBySlug( categorySlug )?.label ?? categorySlug;
      const subLabel = getSubCategoryBySlug( categorySlug, subCategorySlug )?.label ?? subCategorySlug;
      toast.success( 'Categoria atualizada em massa', {
        description: `${ count } ${ count === 1 ? 'produto movido' : 'produtos movidos' } para ${ catLabel } › ${ subLabel }.`
      } );
    }
  };

  const handleConfirmDelete = () => {
    if ( singleDeleteTarget.value ) {
      const target = singleDeleteTarget.value;
      singleDeleteTarget.value = null;
      activeBulkModal.value = null;
      const removed = deleteProduct( target.id );
      if ( removed ) {
        toast.success( 'Produto removido da listagem', {
          description: `${ removed.name } (${ removed.sku })`
        } );
      }
      return;
    }

    activeBulkModal.value = null;
    const count = bulkDelete();
    if ( count > 0 ) {
      toast.success( 'Produtos removidos da listagem', {
        description: `${ count } ${ count === 1 ? 'produto excluído' : 'produtos excluídos' }.`
      } );
    }
  };
</script>
