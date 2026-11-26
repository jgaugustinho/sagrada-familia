<template>
  <div class="border-b border-gold-light/25 px-4 py-3 sm:px-6">
    <!-- Filters Bar: 2 rows on compact/notebook screens, single row on 2xl+; few pills sit top-right, many pills drop below all filters -->
    <div class="flex flex-wrap items-center justify-between gap-2.5">
      <Tabs class="w-full sm:w-auto order-1 shrink-0" :model-value="statusTab" @update:model-value="handleStatusTabUpdate">
        <TabsList class="w-full sm:w-auto min-h-9 overflow-x-auto overflow-y-hidden justify-start p-1">
          <TabsTrigger class="h-7 px-2.5 py-0.5 text-xs shrink-0" v-for="tab in statusTabs" :key="tab.value" :value="tab.value">
            <span>{{ tab.label }}</span>
            <span class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-semibold leading-none tabular-nums transition-colors" :class="statusTab === tab.value ? 'bg-primary/15 text-gold-dark' : 'bg-background text-muted-foreground'">
              {{ statusCounts[ tab.value ] }}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <!-- Active Filter Chips (Inline top-right on xl when compact, below all filter controls otherwise) -->
      <div class="flex flex-wrap items-center gap-1.5 2xl:order-3 2xl:basis-full" v-if="activeFilterChips.length > 0" :class="hasManyFilterChips ? 'order-4 basis-full' : 'order-4 basis-full xl:order-2 xl:basis-auto'">
        <button type="button" class="group inline-flex items-center gap-1.5 rounded-full bg-surface/85 border border-gold-light/60 px-2.5 py-1 text-xs font-medium text-foreground hover:border-primary hover:text-gold-dark transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="chip in activeFilterChips" :key="chip.key" :aria-label="`Remover filtro ${ chip.label }`" :title="chip.label" @click="chip.onRemove()">
          <span class="max-w-[200px] truncate">{{ chip.label }}</span>
          <X class="size-3.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
        </button>

        <button type="button" class="link-editorial ml-1 text-xs font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer" @click="emit( 'clearAllFilters' )">
          Limpar filtros
        </button>
      </div>

      <!-- Search & Faceted Filters (Row 2 full-width on < 2xl, Row 1 right on 2xl+) -->
      <div class="flex flex-wrap items-center gap-2.5 w-full 2xl:w-auto 2xl:ml-auto 2xl:flex-nowrap order-3 2xl:order-2">
        <!-- Live Search InputGroup (no search button) -->
        <InputGroup class="w-full md:w-[340px] lg:w-[350px] 2xl:w-[330px]">
          <InputGroupAddon align="inline-start">
            <Loader2 class="size-4 animate-spin motion-reduce:animate-none text-gold-dark" aria-hidden="true" v-if="isSearchPending" />
            <Search class="size-4" aria-hidden="true" v-else />
          </InputGroupAddon>

          <InputGroupInput type="search" aria-label="Buscar produtos por nome, SKU ou categoria" placeholder="Buscar por nome, SKU ou categoria..." :model-value="searchQuery" @update:model-value="emit( 'update:searchQuery', String( $event ) )" />

          <InputGroupAddon align="inline-end" v-if="searchQuery.trim().length > 0">
            <InputGroupButton aria-label="Limpar busca" @click="emit( 'update:searchQuery', '' )">
              <X class="size-3.5" aria-hidden="true" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        <!-- Category & Subcategory Faceted Popover -->
        <Popover>
          <PopoverTrigger :as-child="true">
            <Button type="button" variant="outline" size="sm" class="h-9 rounded-xl px-3 text-xs font-semibold shadow-warm-sm cursor-pointer" :class="categorySelectionCount > 0 ? 'border-primary bg-primary/10 text-gold-dark hover:bg-primary/15' : 'border-gold-light/55 bg-background/85 text-foreground hover:bg-surface hover:text-gold-dark'">
              <FolderTree class="size-3.5 text-gold-dark" aria-hidden="true" />
              <span>Categoria</span>
              <Badge variant="outline" class="rounded-full border-primary/40 bg-card px-1.5 py-0 text-[10px] font-semibold text-gold-dark tabular-nums" v-if="categorySelectionCount > 0">
                {{ categorySelectionCount }}
              </Badge>
              <ChevronDown class="size-3.5 opacity-75" aria-hidden="true" />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" class="w-80 p-3">
            <div class="flex items-center justify-between pb-2.5 mb-2 border-b border-gold-light/25">
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Categorias &amp; Subcategorias
              </span>

              <button type="button" class="text-xs font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer" v-if="categorySelectionCount > 0" @click="emit( 'clearCategories' )">
                Limpar
              </button>
            </div>

            <ul class="space-y-1 max-h-72 overflow-y-auto pr-1">
              <li v-for="category in adminCategories" :key="category.slug">
                <div class="flex items-center justify-between gap-1 rounded-lg px-2 py-1.5 hover:bg-surface/75 transition-colors">
                  <label class="flex flex-1 items-center gap-2.5 min-w-0 cursor-pointer" :for="`toolbar-cat-${ category.slug }`">
                    <Checkbox class="cursor-pointer" :id="`toolbar-cat-${ category.slug }`" :model-value="selectedCategories.includes( category.slug )" @update:model-value="handleToggleCategory( category.slug )" />
                    <span class="truncate text-xs sm:text-sm" :class="selectedCategories.includes( category.slug ) || getSelectedSubCount( category.slug ) > 0 ? 'font-semibold text-gold-dark' : 'text-foreground/90'">
                      {{ category.label }}
                    </span>
                  </label>

                  <button type="button" class="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-surface hover:text-gold-dark transition-colors cursor-pointer shrink-0" :aria-expanded="isCategoryExpanded( category.slug )" :aria-label="`Alternar subcategorias de ${ category.label }`" @click="toggleExpandCategory( category.slug )">
                    <span class="rounded-full bg-primary/15 px-1.5 py-0 text-[10px] font-semibold text-gold-dark tabular-nums" v-if="getSelectedSubCount( category.slug ) > 0">
                      {{ getSelectedSubCount( category.slug ) }}/{{ category.subCategories.length }}
                    </span>
                    <span class="tabular-nums" v-else>
                      {{ category.subCategories.length }}
                    </span>
                    <ChevronRight class="size-3.5 transition-transform duration-150 motion-reduce:transition-none" aria-hidden="true" :class="isCategoryExpanded( category.slug ) ? 'rotate-90 text-gold-dark' : ''" />
                  </button>
                </div>

                <ul class="ml-3 pl-3 mt-0.5 mb-1.5 border-l border-gold-light/35 space-y-0.5" v-if="isCategoryExpanded( category.slug )">
                  <li v-for="sub in category.subCategories" :key="sub.slug">
                    <label class="flex items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-surface/65 transition-colors cursor-pointer" :for="`toolbar-sub-${ category.slug }-${ sub.slug }`">
                      <Checkbox class="cursor-pointer" :id="`toolbar-sub-${ category.slug }-${ sub.slug }`" :model-value="selectedSubCategories.includes( makeSubCategoryKey( category.slug, sub.slug ) )" @update:model-value="emit( 'toggleSubCategory', category.slug, sub.slug )" />
                      <span class="truncate" :class="selectedSubCategories.includes( makeSubCategoryKey( category.slug, sub.slug ) ) ? 'font-semibold text-gold-dark' : 'text-muted-foreground'">
                        {{ sub.label }}
                      </span>
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        <!-- Stock Faceted Popover -->
        <Popover>
          <PopoverTrigger :as-child="true">
            <Button type="button" variant="outline" size="sm" class="h-9 rounded-xl px-3 text-xs font-semibold shadow-warm-sm cursor-pointer" :class="selectedStockStatuses.length > 0 ? 'border-primary bg-primary/10 text-gold-dark hover:bg-primary/15' : 'border-gold-light/55 bg-background/85 text-foreground hover:bg-surface hover:text-gold-dark'">
              <Boxes class="size-3.5 text-gold-dark" aria-hidden="true" />
              <span>Estoque</span>
              <Badge variant="outline" class="rounded-full border-primary/40 bg-card px-1.5 py-0 text-[10px] font-semibold text-gold-dark tabular-nums" v-if="selectedStockStatuses.length > 0">
                {{ selectedStockStatuses.length }}
              </Badge>
              <ChevronDown class="size-3.5 opacity-75" aria-hidden="true" />
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" class="w-56 p-3">
            <div class="flex items-center justify-between pb-2.5 mb-2 border-b border-gold-light/25">
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Situação do estoque
              </span>

              <button type="button" class="text-xs font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer" v-if="selectedStockStatuses.length > 0" @click="emit( 'clearStockStatuses' )">
                Limpar
              </button>
            </div>

            <ul class="space-y-1">
              <li v-for="option in stockStatusOptions" :key="option.value">
                <label class="group flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-surface/75 transition-colors cursor-pointer" :for="`toolbar-stock-${ option.value }`">
                  <span class="flex items-center gap-2.5 min-w-0">
                    <Checkbox class="cursor-pointer" :id="`toolbar-stock-${ option.value }`" :model-value="selectedStockStatuses.includes( option.value )" @update:model-value="emit( 'toggleStockStatus', option.value )" />
                    <span class="text-xs sm:text-sm truncate" :class="selectedStockStatuses.includes( option.value ) ? 'font-semibold text-gold-dark' : 'text-foreground/90'">
                      {{ option.label }}
                    </span>
                  </span>

                  <span class="size-2 rounded-full shrink-0" aria-hidden="true" :class="option.dotClass" />
                </label>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        <!-- Quick Promotion Toggle -->
        <Button type="button" variant="outline" size="sm" class="h-9 rounded-xl px-3 text-xs font-semibold shadow-warm-sm cursor-pointer" :aria-pressed="onlyOnSale" :class="onlyOnSale ? 'border-primary bg-primary/10 text-gold-dark hover:bg-primary/15' : 'border-gold-light/55 bg-background/85 text-foreground hover:bg-surface hover:text-gold-dark'" @click="emit( 'update:onlyOnSale', !onlyOnSale )">
          <BadgePercent class="size-3.5 text-gold-dark" aria-hidden="true" />
          <span>Em promoção</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { BadgePercent, Boxes, ChevronDown, ChevronRight, FolderTree, Loader2, Search, X } from '@lucide/vue';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Button } from '@sagrada-familia/ui/button';
  import { Checkbox } from '@sagrada-familia/ui/checkbox';
  import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
  import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
  import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
  import { makeSubCategoryKey, type ActiveFilterChip, type StatusTabValue } from '@/composables/useProductsTable';
  import { adminCategories, STOCK_STATUS_META, type StockStatus } from '@/data/products';

  const props = defineProps<{
    searchQuery: string;
    isSearchPending?: boolean;
    statusTab: StatusTabValue;
    statusCounts: Record<StatusTabValue, number>;
    selectedCategories: string[];
    selectedSubCategories: string[];
    selectedStockStatuses: StockStatus[];
    onlyOnSale: boolean;
    activeFilterChips: ActiveFilterChip[];
  }>();

  const emit = defineEmits<{
    'update:searchQuery': [ value: string ];
    'update:statusTab': [ value: StatusTabValue ];
    'update:onlyOnSale': [ value: boolean ];
    toggleCategory: [ slug: string ];
    toggleSubCategory: [ categorySlug: string, subCategorySlug: string ];
    clearCategories: [];
    toggleStockStatus: [ status: StockStatus ];
    clearStockStatuses: [];
    clearAllFilters: [];
  }>();

  const expandedCategories = ref<string[]>( [] );

  const categorySelectionCount = computed( () => props.selectedCategories.length + props.selectedSubCategories.length );
  const hasManyFilterChips = computed( () => props.activeFilterChips.length > 3 );

  const isCategoryExpanded = ( slug: string ): boolean => {
    return expandedCategories.value.includes( slug );
  };

  const toggleExpandCategory = ( slug: string ) => {
    if ( isCategoryExpanded( slug ) ) {
      expandedCategories.value = expandedCategories.value.filter( ( item ) => item !== slug );
    } else {
      expandedCategories.value = [ ...expandedCategories.value, slug ];
    }
  };

  const handleToggleCategory = ( slug: string ) => {
    const willSelect = !props.selectedCategories.includes( slug );
    emit( 'toggleCategory', slug );

    if ( willSelect && !isCategoryExpanded( slug ) ) {
      expandedCategories.value = [ ...expandedCategories.value, slug ];
    }
  };

  const getSelectedSubCount = ( categorySlug: string ): number => {
    const prefix = `${ categorySlug }:`;
    return props.selectedSubCategories.filter( ( key ) => key.startsWith( prefix ) ).length;
  };

  const statusTabs: { value: StatusTabValue; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Publicados' },
    { value: 'draft', label: 'Rascunhos' },
    { value: 'archived', label: 'Arquivados' }
  ];

  const stockStatusOptions = [
    STOCK_STATUS_META.in_stock,
    STOCK_STATUS_META.low_stock,
    STOCK_STATUS_META.out_of_stock
  ];

  const handleStatusTabUpdate = ( value: string | number ) => {
    if ( value === 'all' || value === 'active' || value === 'draft' || value === 'archived' ) {
      emit( 'update:statusTab', value );
    }
  };
</script>
