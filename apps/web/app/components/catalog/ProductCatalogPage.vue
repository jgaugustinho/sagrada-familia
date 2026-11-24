<template>
  <div class="flex flex-col">
    <!-- Editorial Category Header -->
    <section class="relative w-full overflow-hidden bg-gradient-to-br from-dark via-dark to-dark-deep text-background border-b border-gold-light/25 pt-5 pb-7 sm:pt-7 sm:pb-9 antialiased" aria-labelledby="catalog-heading">
      <div class="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold-bright/[0.08] blur-3xl" aria-hidden="true" />
      <div class="pointer-events-none absolute -bottom-24 left-1/4 w-64 h-64 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />

      <div class="relative z-10 container mx-auto px-4">
        <Breadcrumb class="mb-4">
          <BreadcrumbList class="text-background/70">
            <template v-for="( crumb, index ) in context.breadcrumbTrail" :key="crumb.label">
              <BreadcrumbSeparator class="text-gold-light/70" v-if="index > 0" />
              <BreadcrumbItem>
                <BreadcrumbLink class="hover:text-gold-bright" as-child v-if="crumb.to">
                  <NuxtLink :to="crumb.to">
                    {{ crumb.label }}
                  </NuxtLink>
                </BreadcrumbLink>
                <BreadcrumbPage class="text-background font-medium" v-else>
                  {{ crumb.label }}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </template>
          </BreadcrumbList>
        </Breadcrumb>

        <div>
          <span class="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright mb-1.5">
            † {{ context.eyebrow }}
          </span>

          <h1 id="catalog-heading" class="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.1] text-background">
            <TreePine class="inline-block w-7 h-7 sm:w-9 sm:h-9 text-gold-bright mr-2.5 -mt-1.5 shrink-0" aria-hidden="true" v-if="context.slug === 'natal-2026'" /><span>{{ context.title }}</span>
          </h1>

          <p class="mt-2.5 text-sm sm:text-base text-background/75 max-w-2xl leading-relaxed">
            {{ context.description }}
          </p>
        </div>

        <!-- Horizontal Quick-Filter Pills (Synced with Sidebar) -->
        <div class="mt-5 -mx-4 px-4 sm:-mx-1 sm:px-1 py-1.5 flex items-center sm:flex-wrap gap-2 overflow-x-auto quick-pills-scroll" role="group" v-if="context.primaryFilterOptions.length > 0" :aria-label="`Atalhos de ${ context.primaryFilterTitle }`">
          <button type="button" class="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs sm:text-[13px] whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :class="selectedPrimary.length === 0 ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-warm-sm' : 'bg-dark-deep/55 text-background/85 border-gold-light/30 hover:border-gold-bright hover:text-gold-bright'" :aria-pressed="selectedPrimary.length === 0" @click="clearPrimarySelection">
            <span>Todas</span>
            <span class="text-[11px] tabular-nums opacity-80">({{ context.products.length }})</span>
          </button>

          <button type="button" class="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs sm:text-[13px] whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" v-for="option in context.primaryFilterOptions" :key="option.slug" :class="selectedPrimary.includes( option.slug ) ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-warm-sm' : 'bg-dark-deep/55 text-background/85 border-gold-light/30 hover:border-gold-bright hover:text-gold-bright'" :aria-pressed="selectedPrimary.includes( option.slug )" @click="togglePrimary( option.slug )">
            <span>{{ option.label }}</span>
            <span class="text-[11px] tabular-nums opacity-80">({{ primaryCounts[ option.slug ] ?? 0 }})</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Two-Column Catalog Workspace -->
    <section class="w-full bg-background surface-linen py-8 sm:py-12 flex-1 [overflow-anchor:none]" aria-label="Catálogo de produtos" ref="catalogWorkspaceRef">
      <div class="relative z-10 container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-7 lg:gap-9 items-start">
          <!-- Left Column: Sticky Desktop Filter Sidebar -->
          <aside class="hidden lg:block sticky top-24 space-y-5" aria-label="Filtros do catálogo">
            <div class="rounded-2xl bg-card/95 border border-border/85 shadow-warm-sm p-5">
              <div class="flex items-center justify-between pb-3.5 mb-1 border-b border-border/80">
                <div class="flex items-center gap-2">
                  <SlidersHorizontal class="w-4 h-4 text-primary" aria-hidden="true" />
                  <h2 class="text-sm font-bold uppercase tracking-[0.14em] text-foreground">
                    Filtros
                  </h2>
                  <Badge class="rounded-full px-2 py-0 text-[11px] tabular-nums" v-if="activeFilterChips.length > 0">
                    {{ activeFilterChips.length }}
                  </Badge>
                </div>

                <button type="button" class="link-editorial text-xs font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer" v-if="activeFilterChips.length > 0" @click="clearAllFilters">
                  Limpar tudo
                </button>
              </div>

              <CatalogFilters id-prefix="desktop" :context="context" :primary-counts="primaryCounts" :devotion-counts="devotionCounts" :attribute-counts="attributeCounts" :price-bounds="priceBounds" :selected-primary="selectedPrimary" :selected-devotions="selectedDevotions" :selected-attributes="selectedAttributes" :price-range="priceRange" @toggle-primary="togglePrimary" @toggle-devotion="toggleDevotion" @toggle-attribute="toggleAttribute" @update:price-range="updatePriceRange" @commit-price-range="scrollToCatalogTopIfNeeded" />
            </div>

            <!-- Consultative Micro-Card -->
            <div class="rounded-2xl bg-gradient-to-br from-dark via-dark to-dark-deep border border-gold-bright/30 p-5 text-background shadow-warm-sm">
              <span class="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
                † Consultoria Sacra
              </span>
              <p class="mt-1.5 font-serif text-xl font-semibold leading-snug text-background">
                Dúvida nas proporções ou acabamento?
              </p>
              <p class="mt-1.5 text-xs text-background/75 leading-relaxed">
                Nossa equipe ajuda você a escolher a peça ideal para seu oratório ou presente sacramental.
              </p>
              <a target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-gold-dark px-4 py-2 text-xs font-semibold transition-colors btn-sheen focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :href="WHATSAPP_HREF">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path :d="WHATSAPP_BUBBLE_PATH" />
                  <path fill="currentColor" stroke="none" :d="WHATSAPP_PHONE_PATH" />
                </svg>
                <span>Falar no WhatsApp</span>
              </a>
            </div>
          </aside>

          <!-- Right Column: Toolbar, Active Chips, Grid & Progressive Loader -->
          <div class="min-w-0">
            <!-- Top Utility Bar -->
            <div class="rounded-2xl bg-card/90 border border-border/80 shadow-warm-sm px-3.5 sm:px-4 py-3 mb-5">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <!-- Mobile Filter Drawer Trigger + Desktop Result Count -->
                <div class="flex items-center gap-3">
                  <Sheet v-model:open="isMobileFiltersOpen">
                    <SheetTrigger as-child>
                      <Button type="button" variant="outline" class="lg:hidden rounded-full border-gold-light/65 bg-background text-foreground hover:bg-surface hover:text-gold-dark h-9 px-4 text-xs font-semibold shadow-warm-sm cursor-pointer">
                        <SlidersHorizontal class="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                        <span>Filtrar</span>
                        <Badge class="ml-0.5 rounded-full px-1.5 py-0 text-[10px] tabular-nums" v-if="activeFilterChips.length > 0">
                          {{ activeFilterChips.length }}
                        </Badge>
                      </Button>
                    </SheetTrigger>

                    <SheetContent side="left" class="w-[88vw] max-w-sm p-0 gap-0 flex flex-col bg-card text-foreground">
                      <SheetHeader class="p-4 border-b border-border bg-surface text-left shrink-0">
                        <div class="flex items-center justify-between pr-8">
                          <SheetTitle class="font-serif text-xl font-semibold text-foreground">
                            Filtrar Peças
                          </SheetTitle>
                          <button type="button" class="text-xs font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer" v-if="activeFilterChips.length > 0" @click="clearAllFilters">
                            Limpar tudo
                          </button>
                        </div>
                        <SheetDescription class="text-xs text-muted-foreground">
                          Refine por {{ context.primaryFilterTitle.toLowerCase() }}, faixa de preço{{ context.mode === 'single' ? ' e atributos' : '' }}.
                        </SheetDescription>
                      </SheetHeader>

                      <div class="flex-1 overflow-y-auto px-4 py-2">
                        <CatalogFilters id-prefix="mobile" :context="context" :primary-counts="primaryCounts" :devotion-counts="devotionCounts" :attribute-counts="attributeCounts" :price-bounds="priceBounds" :selected-primary="selectedPrimary" :selected-devotions="selectedDevotions" :selected-attributes="selectedAttributes" :price-range="priceRange" @toggle-primary="togglePrimary" @toggle-devotion="toggleDevotion" @toggle-attribute="toggleAttribute" @update:price-range="updatePriceRange" @commit-price-range="scrollToCatalogTopIfNeeded" />
                      </div>

                      <SheetFooter class="p-4 border-t border-border bg-background shrink-0">
                        <Button type="button" class="w-full rounded-full bg-primary text-primary-foreground hover:bg-gold-dark font-semibold text-sm h-10 cursor-pointer" @click="isMobileFiltersOpen = false">
                          Ver {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'peça' : 'peças' }}
                        </Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>

                  <p class="text-xs sm:text-sm text-muted-foreground tabular-nums">
                    <span class="hidden sm:inline">Exibindo </span>
                    <strong class="font-semibold text-foreground">{{ visibleProducts.length }}</strong>
                    de
                    <strong class="font-semibold text-foreground">{{ filteredProducts.length }}</strong>
                    {{ filteredProducts.length === 1 ? 'peça' : 'peças' }}
                  </p>
                </div>

                <!-- Sort Selector -->
                <div class="flex items-center gap-2 ml-auto">
                  <span class="hidden sm:inline text-xs font-medium text-muted-foreground">
                    Ordenar por:
                  </span>
                  <Select v-model="sortBy">
                    <SelectTrigger class="w-[175px] sm:w-[205px]" aria-label="Ordenar produtos por">
                      <SelectValue placeholder="Mais Relevantes" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in sortOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <!-- Active Filter Chips Row -->
              <div class="mt-3 pt-3 border-t border-border/70 flex flex-wrap items-center gap-2" v-if="activeFilterChips.length > 0">
                <button type="button" class="group inline-flex items-center gap-1.5 rounded-full bg-surface/85 border border-gold-light/60 px-3 py-1 text-xs font-medium text-foreground hover:border-primary hover:text-gold-dark transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="chip in activeFilterChips" :key="chip.key" :aria-label="`Remover filtro ${ chip.label }`" @click="chip.onRemove()">
                  <span>{{ chip.label }}</span>
                  <X class="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                </button>

                <button type="button" class="link-editorial ml-1 text-xs font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer" @click="clearAllFilters">
                  Limpar filtros
                </button>
              </div>
            </div>

            <!-- 3-Column Elevated Product Grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5" v-if="visibleProducts.length > 0">
              <ProductCard surface="elevated" v-for="product in visibleProducts" :key="product.id" :product="product" />
            </div>

            <!-- Empty State -->
            <div class="rounded-2xl bg-card/95 border border-gold-light/40 p-8 sm:p-12 text-center shadow-warm-sm" v-else>
              <div class="flex items-center justify-center gap-3 mb-3" aria-hidden="true">
                <span class="h-px w-8 bg-gold-light/60" />
                <span class="text-xs leading-none text-gold-light">†</span>
                <span class="h-px w-8 bg-gold-light/60" />
              </div>

              <h2 class="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
                Nenhuma peça encontrada com esses filtros
              </h2>
              <p class="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Tente ajustar a faixa de preço ou remover alguns filtros selecionados para visualizar mais opções do acervo.
              </p>
              <Button type="button" class="mt-6 rounded-full bg-primary text-primary-foreground hover:bg-gold-dark px-6 py-2.5 text-sm font-semibold shadow-warm-sm cursor-pointer" @click="clearAllFilters">
                Limpar filtros aplicados
              </Button>
            </div>

            <!-- Progressive Loader Footer -->
            <div class="mt-8 sm:mt-10 flex items-center justify-end gap-3 sm:gap-4" v-if="filteredProducts.length > 0">
              <p class="text-xs sm:text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                <strong class="font-semibold text-foreground">{{ visibleProducts.length }}</strong> de <strong class="font-semibold text-foreground">{{ filteredProducts.length }}</strong> {{ filteredProducts.length === 1 ? 'peça' : 'peças' }}
              </p>

              <Button type="button" variant="outline" class="rounded-full border-primary/45 bg-background text-gold-dark hover:bg-primary hover:text-primary-foreground hover:border-primary px-5 sm:px-6 py-2 h-auto text-xs sm:text-sm font-semibold shadow-warm-sm transition-all cursor-pointer shrink-0 whitespace-nowrap" v-if="hasMoreProducts" @click="loadMoreProducts">
                <Plus class="w-4 h-4" aria-hidden="true" />
                <span>Carregar mais produtos</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, ref, watch } from 'vue';
  import { Plus, SlidersHorizontal, TreePine, X } from '@lucide/vue';
  import CatalogFilters from '@/components/catalog/CatalogFilters.vue';
  import ProductCard from '@/components/product/ProductCard.vue';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@sagrada-familia/ui/breadcrumb';
  import { Button } from '@sagrada-familia/ui/button';
  import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@sagrada-familia/ui/select';
  import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@sagrada-familia/ui/sheet';
  import { getCatalogContext, type CatalogProduct } from '@/data/catalog';
  import { formatCurrency, getDiscountPercentage, getPixPrice } from '@/data/products';

  type SortOption = 'relevance' | 'best-sellers' | 'newest' | 'price-asc' | 'price-desc' | 'discount';

  interface ActiveChip {
    key: string;
    label: string;
    onRemove: () => void;
  }

  const PAGE_SIZE = 9;
  const WHATSAPP_BUBBLE_PATH = 'M3 21l1.65-3.8A9 9 0 1 1 21 12a9 9 0 0 1-13.2 7.95L3 21z';
  const WHATSAPP_PHONE_PATH = 'M9.5 8.8c.2-.45.45-.46.7-.47h.55c.18 0 .42.06.64.52.23.48.77 1.72.84 1.85.07.13.12.28.02.45-.1.18-.15.29-.3.45-.15.16-.31.35-.44.47-.14.13-.29.28-.12.56.17.28.75 1.24 1.61 2 1.1.97 2.02 1.27 2.31 1.42.29.14.46.12.63-.07.17-.19.74-.85.94-1.15.2-.3.4-.25.67-.15.27.1 1.73.81 2.03.96.3.15.5.22.57.34.07.13.07.73-.18 1.44-.25.7-1.45 1.37-2 1.44-.51.07-1.16.1-1.88-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.35-5.14-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.04-2.49z';
  const WHATSAPP_HREF = 'https://wa.me/5541999113465?text=Ol%C3%A1!%20Gostaria%20de%20ajuda%20para%20escolher%20uma%20pe%C3%A7a%20sacra.';

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Mais Relevantes' },
    { value: 'best-sellers', label: 'Mais Vendidos' },
    { value: 'newest', label: 'Lançamentos' },
    { value: 'price-asc', label: 'Menor Preço' },
    { value: 'price-desc', label: 'Maior Preço' },
    { value: 'discount', label: 'Maior Desconto' }
  ];

  const props = defineProps<{
    categorySlug: string;
    subCategorySlug?: string;
  }>();

  const context = computed( () => getCatalogContext( props.categorySlug, props.subCategorySlug ) );

  const priceBounds = computed<[ number, number ]>( () => {
    const prices = context.value.products.map( ( product ) => getPixPrice( product.price ) );
    if ( prices.length === 0 ) {
      return [ 0, 500 ];
    }

    return [ Math.floor( Math.min( ...prices ) ), Math.ceil( Math.max( ...prices ) ) ];
  } );

  const selectedPrimary = ref<string[]>( [] );
  const selectedDevotions = ref<string[]>( [] );
  const selectedAttributes = ref<Record<string, string[]>>( {} );
  const priceRange = ref<[ number, number ]>( [ priceBounds.value[ 0 ], priceBounds.value[ 1 ] ] );
  const sortBy = ref<SortOption>( 'relevance' );
  const visibleCount = ref<number>( PAGE_SIZE );
  const isMobileFiltersOpen = ref<boolean>( false );
  const catalogWorkspaceRef = ref<HTMLElement | null>( null );

  const scrollToCatalogTopIfNeeded = async () => {
    await nextTick();
    if ( typeof window === 'undefined' || !catalogWorkspaceRef.value ) {
      return;
    }

    const rect = catalogWorkspaceRef.value.getBoundingClientRect();
    const headerOffset = 84;
    if ( rect.top < headerOffset ) {
      const targetTop = Math.max( 0, window.scrollY + rect.top - headerOffset );
      const prefersReducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
      window.scrollTo( {
        top: targetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      } );
    }
  };

  const cloneAttributeRecord = ( source: Record<string, string[]> ): Record<string, string[]> => {
    const copy: Record<string, string[]> = {};
    for ( const [ key, values ] of Object.entries( source ) ) {
      copy[ key ] = [ ...values ];
    }
    return copy;
  };

  const resetStateFromContext = () => {
    const ctx = context.value;
    selectedPrimary.value = [ ...ctx.initialPrimarySelection ];
    selectedDevotions.value = [ ...ctx.initialDevotionSelection ];
    selectedAttributes.value = cloneAttributeRecord( ctx.initialAttributeSelections );
    priceRange.value = [ priceBounds.value[ 0 ], priceBounds.value[ 1 ] ];
    sortBy.value = ctx.slug === 'mais-vendidos' ? 'best-sellers' : ctx.slug === 'lancamentos' ? 'newest' : 'relevance';
    visibleCount.value = PAGE_SIZE;
    isMobileFiltersOpen.value = false;
  };

  watch(
    () => [ props.categorySlug, props.subCategorySlug ],
    resetStateFromContext,
    { immediate: true }
  );

  const matchesPrimary = ( product: CatalogProduct, selection: string[] ): boolean => {
    if ( selection.length === 0 ) {
      return true;
    }

    const key = context.value.mode === 'single' ? product.subCategorySlug : product.categorySlug;
    return selection.includes( key );
  };

  const matchesDevotion = ( product: CatalogProduct, selection: string[] ): boolean => {
    if ( selection.length === 0 ) {
      return true;
    }

    return selection.includes( product.devotionSlug );
  };

  const matchesPrice = ( product: CatalogProduct, range: [ number, number ] ): boolean => {
    const pix = getPixPrice( product.price );
    return pix >= range[ 0 ] && pix <= range[ 1 ];
  };

  const matchesAttributes = ( product: CatalogProduct, attrs: Record<string, string[]>, excludeGroupId?: string ): boolean => {
    for ( const [ groupId, selected ] of Object.entries( attrs ) ) {
      if ( groupId === excludeGroupId || selected.length === 0 ) {
        continue;
      }

      const productValues = product.attributes[ groupId ] ?? [];
      if ( !selected.some( ( slug ) => productValues.includes( slug ) ) ) {
        return false;
      }
    }

    return true;
  };

  const primaryCounts = computed<Record<string, number>>( () => {
    const counts: Record<string, number> = {};
    for ( const opt of context.value.primaryFilterOptions ) {
      counts[ opt.slug ] = 0;
    }

    for ( const product of context.value.products ) {
      if ( !matchesDevotion( product, selectedDevotions.value ) ) {
        continue;
      }
      if ( !matchesPrice( product, priceRange.value ) ) {
        continue;
      }
      if ( !matchesAttributes( product, selectedAttributes.value ) ) {
        continue;
      }

      const key = context.value.mode === 'single' ? product.subCategorySlug : product.categorySlug;
      counts[ key ] = ( counts[ key ] ?? 0 ) + 1;
    }

    return counts;
  } );

  const devotionCounts = computed<Record<string, number>>( () => {
    const counts: Record<string, number> = {};
    for ( const opt of context.value.devotionOptions ) {
      counts[ opt.slug ] = 0;
    }

    for ( const product of context.value.products ) {
      if ( !matchesPrimary( product, selectedPrimary.value ) ) {
        continue;
      }
      if ( !matchesPrice( product, priceRange.value ) ) {
        continue;
      }

      counts[ product.devotionSlug ] = ( counts[ product.devotionSlug ] ?? 0 ) + 1;
    }

    return counts;
  } );

  const attributeCounts = computed<Record<string, Record<string, number>>>( () => {
    const result: Record<string, Record<string, number>> = {};

    for ( const group of context.value.attributeGroups ) {
      const groupCounts: Record<string, number> = {};
      for ( const opt of group.options ) {
        groupCounts[ opt.slug ] = 0;
      }

      for ( const product of context.value.products ) {
        if ( !matchesPrimary( product, selectedPrimary.value ) ) {
          continue;
        }
        if ( !matchesPrice( product, priceRange.value ) ) {
          continue;
        }
        if ( !matchesAttributes( product, selectedAttributes.value, group.id ) ) {
          continue;
        }

        const values = product.attributes[ group.id ] ?? [];
        for ( const slug of values ) {
          groupCounts[ slug ] = ( groupCounts[ slug ] ?? 0 ) + 1;
        }
      }

      result[ group.id ] = groupCounts;
    }

    return result;
  } );

  const filteredProducts = computed<CatalogProduct[]>( () => {
    const matching = context.value.products.filter( ( product ) => {
      return (
        matchesPrimary( product, selectedPrimary.value )
        && matchesDevotion( product, selectedDevotions.value )
        && matchesPrice( product, priceRange.value )
        && matchesAttributes( product, selectedAttributes.value )
      );
    } );

    const sorted = [ ...matching ];
    switch ( sortBy.value ) {
      case 'best-sellers':
        sorted.sort( ( a, b ) => a.salesRank - b.salesRank );
        break;
      case 'newest':
        sorted.sort( ( a, b ) => Number( Boolean( b.isNew ) ) - Number( Boolean( a.isNew ) ) || a.createdOrder - b.createdOrder );
        break;
      case 'price-asc':
        sorted.sort( ( a, b ) => getPixPrice( a.price ) - getPixPrice( b.price ) );
        break;
      case 'price-desc':
        sorted.sort( ( a, b ) => getPixPrice( b.price ) - getPixPrice( a.price ) );
        break;
      case 'discount':
        sorted.sort( ( a, b ) => ( getDiscountPercentage( b.price, b.originalPrice ) ?? 0 ) - ( getDiscountPercentage( a.price, a.originalPrice ) ?? 0 ) );
        break;
      default:
        break;
    }

    return sorted;
  } );

  const visibleProducts = computed<CatalogProduct[]>( () => {
    return filteredProducts.value.slice( 0, visibleCount.value );
  } );

  const hasMoreProducts = computed<boolean>( () => {
    return visibleProducts.value.length < filteredProducts.value.length;
  } );

  const isCustomPriceRange = computed<boolean>( () => {
    return priceRange.value[ 0 ] > priceBounds.value[ 0 ] || priceRange.value[ 1 ] < priceBounds.value[ 1 ];
  } );

  const togglePrimary = ( slug: string ) => {
    if ( selectedPrimary.value.includes( slug ) ) {
      selectedPrimary.value = selectedPrimary.value.filter( ( item ) => item !== slug );
    } else {
      selectedPrimary.value = [ ...selectedPrimary.value, slug ];
    }
    visibleCount.value = PAGE_SIZE;
    scrollToCatalogTopIfNeeded();
  };

  const clearPrimarySelection = () => {
    selectedPrimary.value = [];
    visibleCount.value = PAGE_SIZE;
    scrollToCatalogTopIfNeeded();
  };

  const toggleDevotion = ( slug: string ) => {
    if ( selectedDevotions.value.includes( slug ) ) {
      selectedDevotions.value = selectedDevotions.value.filter( ( item ) => item !== slug );
    } else {
      selectedDevotions.value = [ ...selectedDevotions.value, slug ];
    }
    visibleCount.value = PAGE_SIZE;
    scrollToCatalogTopIfNeeded();
  };

  const toggleAttribute = ( groupId: string, optionSlug: string ) => {
    const current = selectedAttributes.value[ groupId ] ?? [];
    const next = current.includes( optionSlug )
      ? current.filter( ( item ) => item !== optionSlug )
      : [ ...current, optionSlug ];

    selectedAttributes.value = {
      ...selectedAttributes.value,
      [ groupId ]: next
    };
    visibleCount.value = PAGE_SIZE;
    scrollToCatalogTopIfNeeded();
  };

  const updatePriceRange = ( nextRange: [ number, number ] ) => {
    priceRange.value = nextRange;
    visibleCount.value = PAGE_SIZE;
  };

  const resetPriceRange = () => {
    updatePriceRange( [ priceBounds.value[ 0 ], priceBounds.value[ 1 ] ] );
    scrollToCatalogTopIfNeeded();
  };

  const clearAllFilters = () => {
    selectedPrimary.value = [];
    selectedDevotions.value = [];
    selectedAttributes.value = {};
    priceRange.value = [ priceBounds.value[ 0 ], priceBounds.value[ 1 ] ];
    visibleCount.value = PAGE_SIZE;
    scrollToCatalogTopIfNeeded();
  };

  const loadMoreProducts = () => {
    visibleCount.value += PAGE_SIZE;
  };

  const activeFilterChips = computed<ActiveChip[]>( () => {
    const chips: ActiveChip[] = [];

    for ( const slug of selectedPrimary.value ) {
      const option = context.value.primaryFilterOptions.find( ( item ) => item.slug === slug );
      if ( option ) {
        chips.push( {
          key: `primary-${ slug }`,
          label: option.label,
          onRemove: () => togglePrimary( slug )
        } );
      }
    }

    for ( const slug of selectedDevotions.value ) {
      const option = context.value.devotionOptions.find( ( item ) => item.slug === slug );
      if ( option ) {
        chips.push( {
          key: `devotion-${ slug }`,
          label: option.label,
          onRemove: () => toggleDevotion( slug )
        } );
      }
    }

    if ( isCustomPriceRange.value ) {
      chips.push( {
        key: 'price-range',
        label: `Preço: ${ formatCurrency( priceRange.value[ 0 ] ) } — ${ formatCurrency( priceRange.value[ 1 ] ) }`,
        onRemove: resetPriceRange
      } );
    }

    for ( const group of context.value.attributeGroups ) {
      const activeSlugs = selectedAttributes.value[ group.id ] ?? [];
      for ( const slug of activeSlugs ) {
        const option = group.options.find( ( item ) => item.slug === slug );
        if ( option ) {
          chips.push( {
            key: `attr-${ group.id }-${ slug }`,
            label: `${ group.title }: ${ option.label }`,
            onRemove: () => toggleAttribute( group.id, slug )
          } );
        }
      }
    }

    return chips;
  } );

  watch( sortBy, () => {
    visibleCount.value = PAGE_SIZE;
    scrollToCatalogTopIfNeeded();
  } );
</script>

<style scoped>
  .quick-pills-scroll {
    scrollbar-width: none;
  }

  .quick-pills-scroll::-webkit-scrollbar {
    display: none;
  }
</style>
