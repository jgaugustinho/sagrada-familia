import { computed, onScopeDispose, reactive, ref, watch } from 'vue';
import type { PageSizeOption, TableColumnOption } from '@/components/table/types';
import { createMockProducts, getCategoryBySlug, getDiscountPercentage, getStockStatus, getSubCategoryBySlug, PRODUCT_STATUS_META, STOCK_STATUS_META, type AdminProduct, type ProductStatus, type StockStatus } from '@/data/products';

export type StatusTabValue = 'all' | ProductStatus;
export type SortColumn = 'name' | 'price' | 'promotion' | 'stock' | 'status' | 'createdAt' | 'updatedAt';
export type SortDirection = 'asc' | 'desc';
export type KpiFilterKey = 'all' | 'on_sale' | 'low_stock' | 'out_of_stock';
export type ToggleableColumnKey = 'category' | 'price' | 'promotion' | 'stock' | 'status' | 'createdAt' | 'updatedAt';

export type BulkPriceMode = 'set' | 'increase-percent' | 'decrease-percent' | 'increase-fixed' | 'decrease-fixed';
export type BulkPromotionMode = 'apply-percent' | 'remove';
export type BulkStockMode = 'set' | 'add' | 'subtract' | 'out-of-stock';

export interface ActiveFilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

export interface ProductsKpiStats {
  total: number;
  activeCount: number;
  onSale: number;
  averageDiscount: number;
  lowStock: number;
  outOfStock: number;
}

export interface QuickEditProductPayload {
  name: string;
  sku: string;
  categorySlug: string;
  subCategorySlug: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: ProductStatus;
}

const SEARCH_DEBOUNCE_MS = 300;

const COLUMN_DEFINITIONS: { key: ToggleableColumnKey; label: string }[] = [
  { key: 'category', label: 'Categoria' },
  { key: 'price', label: 'Preço' },
  { key: 'promotion', label: 'Promoção' },
  { key: 'stock', label: 'Estoque' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Criado em' },
  { key: 'updatedAt', label: 'Atualizado em' }
];

const DEFAULT_VISIBLE_COLUMNS: Record<ToggleableColumnKey, boolean> = {
  category: true,
  price: true,
  promotion: false,
  stock: true,
  status: true,
  createdAt: false,
  updatedAt: true
};

const STATUS_SORT_ORDER: Record<ProductStatus, number> = {
  active: 0,
  draft: 1,
  archived: 2
};

export const makeSubCategoryKey = ( categorySlug: string, subCategorySlug: string ): string => {
  return `${ categorySlug }:${ subCategorySlug }`;
};

export const parseSubCategoryKey = ( key: string ): { categorySlug: string; subCategorySlug: string } | null => {
  const separatorIndex = key.indexOf( ':' );
  if ( separatorIndex === -1 ) {
    return null;
  }

  return {
    categorySlug: key.slice( 0, separatorIndex ),
    subCategorySlug: key.slice( separatorIndex + 1 )
  };
};

const normalizeText = ( value: string ): string => {
  return value
    .normalize( 'NFD' )
    .replace( /[\u0300-\u036f]/g, '' )
    .toLowerCase()
    .trim();
};

const roundPrice = ( value: number ): number => {
  return Math.max( 0.01, +value.toFixed( 2 ) );
};

export const calculateNextPrice = ( currentPrice: number, mode: BulkPriceMode, value: number ): number => {
  const safeValue = Number.isFinite( value ) ? Math.max( 0, value ) : 0;

  switch ( mode ) {
    case 'set':
      return roundPrice( safeValue );
    case 'increase-percent':
      return roundPrice( currentPrice * ( 1 + safeValue / 100 ) );
    case 'decrease-percent':
      return roundPrice( currentPrice * ( 1 - safeValue / 100 ) );
    case 'increase-fixed':
      return roundPrice( currentPrice + safeValue );
    case 'decrease-fixed':
      return roundPrice( currentPrice - safeValue );
  }
};

export const calculateNextStock = ( currentStock: number, mode: BulkStockMode, value = 0 ): number => {
  const safeInt = Number.isFinite( value ) ? Math.max( 0, Math.round( value ) ) : 0;

  switch ( mode ) {
    case 'set':
      return safeInt;
    case 'add':
      return currentStock + safeInt;
    case 'subtract':
      return Math.max( 0, currentStock - safeInt );
    case 'out-of-stock':
      return 0;
  }
};

export const calculateNextPromotionPrice = (
  currentPrice: number,
  originalPrice: number | undefined,
  mode: BulkPromotionMode,
  discountPercent = 10
): { price: number; originalPrice?: number } => {
  const basePrice = originalPrice !== undefined && originalPrice > currentPrice ? originalPrice : currentPrice;

  if ( mode === 'remove' ) {
    return { price: basePrice, originalPrice: undefined };
  }

  const clampedPercent = Math.min( 90, Math.max( 1, Math.round( discountPercent ) ) );
  return {
    price: roundPrice( basePrice * ( 1 - clampedPercent / 100 ) ),
    originalPrice: basePrice
  };
};

export const useProductsTable = () => {
  const products = ref<AdminProduct[]>( createMockProducts() );

  // Search & filter state
  const searchQuery = ref<string>( '' );
  const debouncedSearchQuery = ref<string>( '' );
  let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  watch( searchQuery, ( nextQuery ) => {
    if ( searchDebounceTimer !== null ) {
      clearTimeout( searchDebounceTimer );
      searchDebounceTimer = null;
    }

    if ( nextQuery.trim().length === 0 ) {
      debouncedSearchQuery.value = '';
      return;
    }

    searchDebounceTimer = setTimeout( () => {
      debouncedSearchQuery.value = nextQuery;
      searchDebounceTimer = null;
    }, SEARCH_DEBOUNCE_MS );
  } );

  onScopeDispose( () => {
    if ( searchDebounceTimer !== null ) {
      clearTimeout( searchDebounceTimer );
      searchDebounceTimer = null;
    }
  } );

  const isSearchPending = computed<boolean>( () => {
    return searchQuery.value.trim() !== debouncedSearchQuery.value.trim();
  } );

  const statusTab = ref<StatusTabValue>( 'all' );
  const selectedCategories = ref<string[]>( [] );
  const selectedSubCategories = ref<string[]>( [] );
  const selectedStockStatuses = ref<StockStatus[]>( [] );
  const onlyOnSale = ref<boolean>( false );

  // Sorting state
  const sortBy = ref<SortColumn>( 'updatedAt' );
  const sortDirection = ref<SortDirection>( 'desc' );

  // Column visibility state
  const visibleColumns = reactive<Record<ToggleableColumnKey, boolean>>( {
    ...DEFAULT_VISIBLE_COLUMNS
  } );

  // Pagination state
  const page = ref<number>( 1 );
  const pageSize = ref<PageSizeOption>( 10 );

  // Cross-page selection state
  const selectedIds = ref<Set<string>>( new Set() );
  const selectAllMatching = ref<boolean>( false );
  const excludedIds = ref<Set<string>>( new Set() );

  const matchesSearch = ( product: AdminProduct, query: string ): boolean => {
    const normalizedQuery = normalizeText( query );
    if ( !normalizedQuery ) {
      return true;
    }

    const haystack = [
      product.name,
      product.sku,
      product.categoryLabel,
      product.subCategoryLabel
    ].map( normalizeText ).join( ' ' );

    return haystack.includes( normalizedQuery );
  };

  const matchesCategories = ( product: AdminProduct ): boolean => {
    if ( selectedCategories.value.length === 0 && selectedSubCategories.value.length === 0 ) {
      return true;
    }

    const subKey = makeSubCategoryKey( product.categorySlug, product.subCategorySlug );
    if ( selectedSubCategories.value.includes( subKey ) ) {
      return true;
    }

    const categoryPrefix = `${ product.categorySlug }:`;
    const hasSubFiltersForCategory = selectedSubCategories.value.some( ( key ) => key.startsWith( categoryPrefix ) );
    if ( selectedCategories.value.includes( product.categorySlug ) && !hasSubFiltersForCategory ) {
      return true;
    }

    return false;
  };

  const matchesStock = ( product: AdminProduct ): boolean => {
    if ( selectedStockStatuses.value.length === 0 ) {
      return true;
    }

    return selectedStockStatuses.value.includes( getStockStatus( product.stock ) );
  };

  const matchesPromotion = ( product: AdminProduct ): boolean => {
    return !onlyOnSale.value || getDiscountPercentage( product.price, product.originalPrice ) !== null;
  };

  const baseFilteredProducts = computed<AdminProduct[]>( () => {
    return products.value.filter( ( product ) => {
      return (
        matchesSearch( product, debouncedSearchQuery.value )
        && matchesCategories( product )
        && matchesStock( product )
        && matchesPromotion( product )
      );
    } );
  } );

  const statusCounts = computed<Record<StatusTabValue, number>>( () => {
    const counts: Record<StatusTabValue, number> = {
      all: baseFilteredProducts.value.length,
      active: 0,
      draft: 0,
      archived: 0
    };

    for ( const product of baseFilteredProducts.value ) {
      counts[ product.status ] += 1;
    }

    return counts;
  } );

  const filteredProducts = computed<AdminProduct[]>( () => {
    if ( statusTab.value === 'all' ) {
      return baseFilteredProducts.value;
    }

    return baseFilteredProducts.value.filter( ( product ) => product.status === statusTab.value );
  } );

  const sortedProducts = computed<AdminProduct[]>( () => {
    const list = [ ...filteredProducts.value ];
    const direction = sortDirection.value === 'asc' ? 1 : -1;

    list.sort( ( a, b ) => {
      switch ( sortBy.value ) {
        case 'name':
          return a.name.localeCompare( b.name, 'pt-BR' ) * direction;
        case 'price':
          return ( a.price - b.price ) * direction;
        case 'promotion': {
          const discountA = getDiscountPercentage( a.price, a.originalPrice ) ?? -1;
          const discountB = getDiscountPercentage( b.price, b.originalPrice ) ?? -1;
          return ( discountA - discountB ) * direction;
        }
        case 'stock':
          return ( a.stock - b.stock ) * direction;
        case 'status': {
          const diff = ( STATUS_SORT_ORDER[ a.status ] - STATUS_SORT_ORDER[ b.status ] ) * direction;
          return diff !== 0 ? diff : a.name.localeCompare( b.name, 'pt-BR' );
        }
        case 'createdAt':
          return ( new Date( a.createdAt ).getTime() - new Date( b.createdAt ).getTime() ) * direction;
        case 'updatedAt':
        default:
          return ( new Date( a.updatedAt ).getTime() - new Date( b.updatedAt ).getTime() ) * direction;
      }
    } );

    return list;
  } );

  const totalFiltered = computed<number>( () => sortedProducts.value.length );

  const totalPages = computed<number>( () => {
    return Math.max( 1, Math.ceil( totalFiltered.value / pageSize.value ) );
  } );

  const paginatedProducts = computed<AdminProduct[]>( () => {
    const startIndex = ( page.value - 1 ) * pageSize.value;
    return sortedProducts.value.slice( startIndex, startIndex + pageSize.value );
  } );

  const pageRangeStart = computed<number>( () => {
    if ( totalFiltered.value === 0 ) {
      return 0;
    }

    return ( page.value - 1 ) * pageSize.value + 1;
  } );

  const pageRangeEnd = computed<number>( () => {
    if ( totalFiltered.value === 0 ) {
      return 0;
    }

    return Math.min( totalFiltered.value, page.value * pageSize.value );
  } );

  const kpiStats = computed<ProductsKpiStats>( () => {
    let activeCount = 0;
    let onSale = 0;
    let discountSum = 0;
    let lowStock = 0;
    let outOfStock = 0;

    for ( const product of products.value ) {
      if ( product.status === 'active' ) {
        activeCount += 1;
      }

      const discount = getDiscountPercentage( product.price, product.originalPrice );
      if ( discount !== null ) {
        onSale += 1;
        discountSum += discount;
      }

      const stockStatus = getStockStatus( product.stock );
      if ( stockStatus === 'low_stock' ) {
        lowStock += 1;
      } else if ( stockStatus === 'out_of_stock' ) {
        outOfStock += 1;
      }
    }

    return {
      total: products.value.length,
      activeCount,
      onSale,
      averageDiscount: onSale > 0 ? Math.round( discountSum / onSale ) : 0,
      lowStock,
      outOfStock
    };
  } );

  const activeKpiKey = computed<KpiFilterKey | null>( () => {
    const noExtraFilters = (
      debouncedSearchQuery.value.trim().length === 0
      && statusTab.value === 'all'
      && selectedCategories.value.length === 0
      && selectedSubCategories.value.length === 0
    );

    if ( !noExtraFilters ) {
      return null;
    }

    if ( onlyOnSale.value && selectedStockStatuses.value.length === 0 ) {
      return 'on_sale';
    }

    if ( !onlyOnSale.value && selectedStockStatuses.value.length === 1 ) {
      if ( selectedStockStatuses.value[ 0 ] === 'low_stock' ) {
        return 'low_stock';
      }

      if ( selectedStockStatuses.value[ 0 ] === 'out_of_stock' ) {
        return 'out_of_stock';
      }
    }

    if ( !onlyOnSale.value && selectedStockStatuses.value.length === 0 ) {
      return 'all';
    }

    return null;
  } );

  const columnOptions = computed<TableColumnOption<ToggleableColumnKey>[]>( () => {
    return COLUMN_DEFINITIONS.map( ( col ) => ( {
      key: col.key,
      label: col.label,
      visible: visibleColumns[ col.key ],
      defaultVisible: DEFAULT_VISIBLE_COLUMNS[ col.key ]
    } ) );
  } );

  const activeFilterChips = computed<ActiveFilterChip[]>( () => {
    const chips: ActiveFilterChip[] = [];

    if ( statusTab.value !== 'all' ) {
      const currentStatus = statusTab.value;
      chips.push( {
        key: `status-${ currentStatus }`,
        label: `Status: ${ PRODUCT_STATUS_META[ currentStatus ].label }`,
        onRemove: () => {
          statusTab.value = 'all';
        }
      } );
    }

    for ( const categorySlug of selectedCategories.value ) {
      const category = getCategoryBySlug( categorySlug );
      chips.push( {
        key: `cat-${ categorySlug }`,
        label: `Categoria: ${ category?.label ?? categorySlug }`,
        onRemove: () => toggleCategory( categorySlug )
      } );
    }

    for ( const subKey of selectedSubCategories.value ) {
      const parsed = parseSubCategoryKey( subKey );
      if ( !parsed ) {
        continue;
      }

      const categoryLabel = getCategoryBySlug( parsed.categorySlug )?.label ?? parsed.categorySlug;
      const subLabel = getSubCategoryBySlug( parsed.categorySlug, parsed.subCategorySlug )?.label ?? parsed.subCategorySlug;

      chips.push( {
        key: `sub-${ subKey }`,
        label: `${ categoryLabel } › ${ subLabel }`,
        onRemove: () => toggleSubCategory( parsed.categorySlug, parsed.subCategorySlug )
      } );
    }

    for ( const stockStatus of selectedStockStatuses.value ) {
      chips.push( {
        key: `stock-${ stockStatus }`,
        label: `Estoque: ${ STOCK_STATUS_META[ stockStatus ].label }`,
        onRemove: () => toggleStockStatus( stockStatus )
      } );
    }

    if ( onlyOnSale.value ) {
      chips.push( {
        key: 'only-on-sale',
        label: 'Somente em promoção',
        onRemove: () => {
          onlyOnSale.value = false;
        }
      } );
    }

    return chips;
  } );

  const hasActiveFilters = computed<boolean>( () => activeFilterChips.value.length > 0 || debouncedSearchQuery.value.trim().length > 0 );

  // Selection helpers
  const isRowSelected = ( id: string ): boolean => {
    if ( selectAllMatching.value ) {
      return !excludedIds.value.has( id );
    }

    return selectedIds.value.has( id );
  };

  const selectedProducts = computed<AdminProduct[]>( () => {
    return filteredProducts.value.filter( ( product ) => isRowSelected( product.id ) );
  } );

  const selectedCount = computed<number>( () => selectedProducts.value.length );

  const pageSelectionState = computed<boolean | 'indeterminate'>( () => {
    if ( paginatedProducts.value.length === 0 ) {
      return false;
    }

    let checkedCount = 0;
    for ( const product of paginatedProducts.value ) {
      if ( isRowSelected( product.id ) ) {
        checkedCount += 1;
      }
    }

    if ( checkedCount === 0 ) {
      return false;
    }

    if ( checkedCount === paginatedProducts.value.length ) {
      return true;
    }

    return 'indeterminate';
  } );

  const showSelectAllBanner = computed<boolean>( () => {
    return (
      paginatedProducts.value.length > 0
      && pageSelectionState.value === true
      && ( selectAllMatching.value || totalFiltered.value > paginatedProducts.value.length )
    );
  } );

  const toggleRow = ( id: string ) => {
    if ( selectAllMatching.value ) {
      const next = new Set( excludedIds.value );
      if ( next.has( id ) ) {
        next.delete( id );
      } else {
        next.add( id );
      }
      excludedIds.value = next;
      return;
    }

    const next = new Set( selectedIds.value );
    if ( next.has( id ) ) {
      next.delete( id );
    } else {
      next.add( id );
    }
    selectedIds.value = next;
  };

  const toggleCurrentPage = () => {
    if ( paginatedProducts.value.length === 0 ) {
      return;
    }

    const shouldSelectAllOnPage = pageSelectionState.value !== true;

    if ( selectAllMatching.value ) {
      const nextExcluded = new Set( excludedIds.value );
      for ( const product of paginatedProducts.value ) {
        if ( shouldSelectAllOnPage ) {
          nextExcluded.delete( product.id );
        } else {
          nextExcluded.add( product.id );
        }
      }

      if ( nextExcluded.size >= filteredProducts.value.length ) {
        clearSelection();
      } else {
        excludedIds.value = nextExcluded;
      }
      return;
    }

    const nextSelected = new Set( selectedIds.value );
    for ( const product of paginatedProducts.value ) {
      if ( shouldSelectAllOnPage ) {
        nextSelected.add( product.id );
      } else {
        nextSelected.delete( product.id );
      }
    }
    selectedIds.value = nextSelected;
  };

  const selectAllFiltered = () => {
    selectAllMatching.value = true;
    excludedIds.value = new Set();
    selectedIds.value = new Set();
  };

  const clearSelection = () => {
    selectAllMatching.value = false;
    selectedIds.value = new Set();
    excludedIds.value = new Set();
  };

  // Filter & sort actions
  const toggleCategory = ( slug: string ) => {
    if ( selectedCategories.value.includes( slug ) ) {
      selectedCategories.value = selectedCategories.value.filter( ( item ) => item !== slug );
      const prefix = `${ slug }:`;
      selectedSubCategories.value = selectedSubCategories.value.filter( ( item ) => !item.startsWith( prefix ) );
    } else {
      selectedCategories.value = [ ...selectedCategories.value, slug ];
    }
  };

  const toggleSubCategory = ( categorySlug: string, subCategorySlug: string ) => {
    const key = makeSubCategoryKey( categorySlug, subCategorySlug );
    if ( selectedSubCategories.value.includes( key ) ) {
      selectedSubCategories.value = selectedSubCategories.value.filter( ( item ) => item !== key );
    } else {
      selectedSubCategories.value = [ ...selectedSubCategories.value, key ];
    }
  };

  const toggleStockStatus = ( status: StockStatus ) => {
    if ( selectedStockStatuses.value.includes( status ) ) {
      selectedStockStatuses.value = selectedStockStatuses.value.filter( ( item ) => item !== status );
    } else {
      selectedStockStatuses.value = [ ...selectedStockStatuses.value, status ];
    }
  };

  const clearAllFilters = () => {
    searchQuery.value = '';
    debouncedSearchQuery.value = '';
    statusTab.value = 'all';
    selectedCategories.value = [];
    selectedSubCategories.value = [];
    selectedStockStatuses.value = [];
    onlyOnSale.value = false;
  };

  const toggleKpiFilter = ( key: KpiFilterKey ) => {
    const wasActive = activeKpiKey.value === key;
    clearAllFilters();

    if ( wasActive || key === 'all' ) {
      return;
    }

    if ( key === 'on_sale' ) {
      onlyOnSale.value = true;
    } else if ( key === 'low_stock' ) {
      selectedStockStatuses.value = [ 'low_stock' ];
    } else if ( key === 'out_of_stock' ) {
      selectedStockStatuses.value = [ 'out_of_stock' ];
    }
  };

  const toggleSort = ( column: SortColumn ) => {
    if ( sortBy.value === column ) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy.value = column;
      sortDirection.value = column === 'name' || column === 'status' ? 'asc' : 'desc';
    }
  };

  const toggleColumnVisibility = ( key: ToggleableColumnKey ) => {
    visibleColumns[ key ] = !visibleColumns[ key ];
  };

  const resetVisibleColumns = () => {
    for ( const col of COLUMN_DEFINITIONS ) {
      visibleColumns[ col.key ] = DEFAULT_VISIBLE_COLUMNS[ col.key ];
    }
  };

  // Keep page & selection synchronized when filters or deletions happen
  watch(
    [
      debouncedSearchQuery,
      statusTab,
      selectedCategories,
      selectedSubCategories,
      selectedStockStatuses,
      onlyOnSale
    ],
    () => {
      page.value = 1;
      clearSelection();
    }
  );

  watch( pageSize, () => {
    page.value = 1;
  } );

  watch( totalPages, ( nextTotal ) => {
    if ( page.value > nextTotal ) {
      page.value = Math.max( 1, nextTotal );
    }
  } );

  // Row mutations
  const duplicateProduct = ( id: string ): AdminProduct | null => {
    const source = products.value.find( ( item ) => item.id === id );
    if ( !source ) {
      return null;
    }

    const nowIso = new Date().toISOString();
    const suffix = String( Date.now() ).slice( -4 );
    const copy: AdminProduct = {
      ...source,
      id: `${ source.id }-copy-${ suffix }`,
      sku: `${ source.sku }-COPIA`,
      name: `${ source.name } (Cópia)`,
      slug: `${ source.slug }-copia-${ suffix }`,
      status: 'draft',
      createdAt: nowIso,
      updatedAt: nowIso
    };

    products.value = [ copy, ...products.value ];
    return copy;
  };

  const updateProductStatus = ( id: string, status: ProductStatus ): AdminProduct | null => {
    const target = products.value.find( ( item ) => item.id === id );
    if ( !target ) {
      return null;
    }

    const nowIso = new Date().toISOString();
    products.value = products.value.map( ( item ) => (
      item.id === id ? { ...item, status, updatedAt: nowIso } : item
    ) );

    return { ...target, status, updatedAt: nowIso };
  };

  const quickUpdateProduct = ( id: string, payload: QuickEditProductPayload ): AdminProduct | null => {
    const target = products.value.find( ( item ) => item.id === id );
    if ( !target ) {
      return null;
    }

    const category = getCategoryBySlug( payload.categorySlug );
    const subCategory = getSubCategoryBySlug( payload.categorySlug, payload.subCategorySlug );
    const nextPrice = roundPrice( payload.price );
    const nextOriginalPrice = payload.originalPrice !== undefined && payload.originalPrice > nextPrice
      ? roundPrice( payload.originalPrice )
      : undefined;
    const nowIso = new Date().toISOString();

    const updated: AdminProduct = {
      ...target,
      name: payload.name.trim() || target.name,
      sku: payload.sku.trim() || target.sku,
      categorySlug: category?.slug ?? target.categorySlug,
      categoryLabel: category?.label ?? target.categoryLabel,
      subCategorySlug: subCategory?.slug ?? target.subCategorySlug,
      subCategoryLabel: subCategory?.label ?? target.subCategoryLabel,
      price: nextPrice,
      originalPrice: nextOriginalPrice,
      stock: Math.max( 0, Math.round( payload.stock ) ),
      status: payload.status,
      updatedAt: nowIso
    };

    products.value = products.value.map( ( item ) => (
      item.id === id ? updated : item
    ) );

    return updated;
  };

  const deleteProduct = ( id: string ): AdminProduct | null => {
    const target = products.value.find( ( item ) => item.id === id );
    if ( !target ) {
      return null;
    }

    products.value = products.value.filter( ( item ) => item.id !== id );

    if ( selectedIds.value.has( id ) ) {
      const next = new Set( selectedIds.value );
      next.delete( id );
      selectedIds.value = next;
    }

    if ( excludedIds.value.has( id ) ) {
      const next = new Set( excludedIds.value );
      next.delete( id );
      excludedIds.value = next;
    }

    return target;
  };

  // Bulk mutations
  const getTargetIdSet = (): Set<string> => {
    return new Set( selectedProducts.value.map( ( item ) => item.id ) );
  };

  const mutateSelectedProducts = ( updater: ( item: AdminProduct, nowIso: string ) => AdminProduct ): number => {
    const targetIds = getTargetIdSet();
    if ( targetIds.size === 0 ) {
      return 0;
    }

    const nowIso = new Date().toISOString();
    products.value = products.value.map( ( item ) => (
      targetIds.has( item.id ) ? updater( item, nowIso ) : item
    ) );

    clearSelection();
    return targetIds.size;
  };

  const bulkUpdateStatus = ( status: ProductStatus ): number => {
    return mutateSelectedProducts( ( item, nowIso ) => ( {
      ...item,
      status,
      updatedAt: nowIso
    } ) );
  };

  const bulkUpdatePrice = ( mode: BulkPriceMode, value: number ): number => {
    return mutateSelectedProducts( ( item, nowIso ) => {
      const nextPrice = calculateNextPrice( item.price, mode, value );
      const nextOriginalPrice = item.originalPrice !== undefined && item.originalPrice > nextPrice
        ? item.originalPrice
        : undefined;

      return {
        ...item,
        price: nextPrice,
        originalPrice: nextOriginalPrice,
        updatedAt: nowIso
      };
    } );
  };

  const bulkUpdatePromotion = ( mode: BulkPromotionMode, discountPercent = 10 ): number => {
    return mutateSelectedProducts( ( item, nowIso ) => {
      const { price, originalPrice } = calculateNextPromotionPrice( item.price, item.originalPrice, mode, discountPercent );
      return {
        ...item,
        price,
        originalPrice,
        updatedAt: nowIso
      };
    } );
  };

  const bulkUpdateStock = ( mode: BulkStockMode, value = 0 ): number => {
    return mutateSelectedProducts( ( item, nowIso ) => ( {
      ...item,
      stock: calculateNextStock( item.stock, mode, value ),
      updatedAt: nowIso
    } ) );
  };

  const bulkUpdateCategory = ( categorySlug: string, subCategorySlug: string ): number => {
    const category = getCategoryBySlug( categorySlug );
    const subCategory = getSubCategoryBySlug( categorySlug, subCategorySlug );
    if ( !category || !subCategory ) {
      return 0;
    }

    return mutateSelectedProducts( ( item, nowIso ) => ( {
      ...item,
      categorySlug: category.slug,
      categoryLabel: category.label,
      subCategorySlug: subCategory.slug,
      subCategoryLabel: subCategory.label,
      updatedAt: nowIso
    } ) );
  };

  const bulkDelete = (): number => {
    const targetIds = getTargetIdSet();
    if ( targetIds.size === 0 ) {
      return 0;
    }

    products.value = products.value.filter( ( item ) => !targetIds.has( item.id ) );
    clearSelection();
    return targetIds.size;
  };

  return { products, searchQuery, isSearchPending, statusTab, selectedCategories, selectedSubCategories, selectedStockStatuses, onlyOnSale, statusCounts, kpiStats, activeKpiKey, activeFilterChips, hasActiveFilters, sortBy, sortDirection, visibleColumns, columnOptions, page, pageSize, totalFiltered, paginatedProducts, pageRangeStart, pageRangeEnd, selectedProducts, selectedCount, selectAllMatching, pageSelectionState, showSelectAllBanner, isRowSelected, toggleRow, toggleCurrentPage, selectAllFiltered, clearSelection, toggleCategory, toggleSubCategory, toggleStockStatus, toggleKpiFilter, clearAllFilters, toggleSort, toggleColumnVisibility, resetVisibleColumns, duplicateProduct, updateProductStatus, quickUpdateProduct, deleteProduct, bulkUpdateStatus, bulkUpdatePrice, bulkUpdatePromotion, bulkUpdateStock, bulkUpdateCategory, bulkDelete };
};
