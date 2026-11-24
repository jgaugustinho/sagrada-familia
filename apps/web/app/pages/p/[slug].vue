<template>
  <div class="flex flex-col flex-1">
    <template v-if="detail">
      <!-- Band 1: Subtle Editorial Breadcrumb Bar -->
      <nav class="w-full bg-surface/60 border-b border-gold-light/25 py-3" aria-label="Navegação estrutural">
        <div class="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList class="text-xs text-muted-foreground">
              <BreadcrumbItem>
                <BreadcrumbLink class="hover:text-gold-dark" as-child>
                  <NuxtLink to="/">Início</NuxtLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator class="text-gold-light/80" />

              <BreadcrumbItem>
                <BreadcrumbLink class="hover:text-gold-dark" as-child>
                  <NuxtLink :to="`/c/${ detail.product.categorySlug }`">{{ detail.product.categoryLabel }}</NuxtLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator class="text-gold-light/80" />

              <BreadcrumbItem class="hidden sm:inline-flex">
                <BreadcrumbLink class="hover:text-gold-dark" as-child>
                  <NuxtLink :to="`/c/${ detail.product.categorySlug }/${ detail.product.subCategorySlug }`">{{ detail.product.subCategoryLabel }}</NuxtLink>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator class="hidden sm:inline-flex text-gold-light/80" />

              <BreadcrumbItem class="min-w-0">
                <BreadcrumbPage class="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">
                  {{ detail.product.name }}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>

      <!-- Band 2: Hero Product Stage (Gallery + Buy Box) -->
      <section class="w-full bg-background surface-linen py-7 sm:py-11 lg:py-12" aria-labelledby="product-page-title">
        <div class="relative z-10 container mx-auto px-4">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <!-- Left Column: Sticky Multi-Image Gallery -->
            <div class="lg:col-span-7 lg:sticky lg:top-24">
              <ProductGallery v-model:active-image-id="activeImageId" :media="detail.media" :discount-percentage="discountPercentage" :product-name="detail.product.name" />
            </div>

            <!-- Right Column: Editorial Buy Box -->
            <div class="lg:col-span-5 space-y-5">
              <!-- Product Title, SKU/Share Utility Row & Short Description -->
              <div>
                <h1 id="product-page-title" class="font-serif text-3xl sm:text-[2.25rem] font-semibold tracking-tight leading-[1.12] text-foreground">
                  {{ detail.product.name }}
                </h1>

                <div class="mt-2.5 flex items-center justify-between gap-3 pb-3 border-b border-gold-light/55">
                  <span class="text-xs font-medium text-muted-foreground tabular-nums">
                    Ref. {{ activeSku }}
                  </span>

                  <ProductShareMenu :product-name="detail.product.name" :image-url="detail.media[ 0 ]?.url" />
                </div>

                <p class="mt-3.5 text-sm sm:text-[15px] text-muted-foreground leading-relaxed">
                  {{ detail.shortDescription }}
                </p>

                <a class="link-editorial mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:text-primary transition-colors" href="#detalhes-da-peca">
                  <span>Ler descrição completa e ficha técnica</span>
                  <ArrowDown class="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              <!-- Offer & Pricing Card -->
              <div class="rounded-2xl bg-card/90 border border-gold-light/40 p-5 shadow-warm-sm">
                <!-- Conditional Offer & Savings Row -->
                <div class="flex flex-wrap items-center gap-2 mb-2.5" v-if="discountPercentage !== null">
                  <Badge class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide hover:bg-primary">
                    -{{ discountPercentage }}% OFF
                  </Badge>

                  <span class="text-xs font-semibold text-gold-dark tabular-nums" v-if="savingsAmount > 0">
                    Economize {{ formatCurrency( savingsAmount ) }}
                  </span>
                </div>

                <!-- Old Price (Crossed Out) -->
                <div class="text-xs sm:text-sm text-muted-foreground line-through tabular-nums" v-if="effectiveOriginalPrice && effectiveOriginalPrice > effectivePrice">
                  De {{ formatCurrency( effectiveOriginalPrice ) }}
                </div>

                <!-- Primary PIX Price -->
                <div class="mt-0.5 flex flex-wrap items-baseline gap-2.5">
                  <span class="text-3xl sm:text-[2.15rem] font-bold text-gold-dark leading-none tracking-tight tabular-nums">
                    {{ formatCurrency( pixPrice ) }}
                  </span>

                  <span class="inline-flex items-center rounded-full bg-primary/12 border border-primary/25 px-2.5 py-0.5 text-xs font-semibold text-gold-dark">
                    5% OFF no PIX
                  </span>
                </div>

                <!-- Card Price & Installments -->
                <p class="mt-2 text-xs sm:text-sm text-muted-foreground leading-snug tabular-nums">
                  ou <strong class="font-semibold text-foreground">{{ formatCurrency( effectivePrice ) }}</strong> em até <strong class="font-semibold text-foreground">{{ detail.product.maxInstallments }}x</strong> de <strong class="font-semibold text-foreground">{{ formatCurrency( installmentPrice ) }}</strong> sem juros
                </p>

                <!-- Expandable Installments Table -->
                <div class="mt-3 pt-3 border-t border-border/75">
                  <button type="button" class="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark hover:text-primary transition-colors cursor-pointer focus:outline-none focus-visible:underline" :aria-expanded="isInstallmentsOpen" @click="isInstallmentsOpen = !isInstallmentsOpen">
                    <CreditCard class="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{{ isInstallmentsOpen ? 'Ocultar opções de parcelamento' : 'Ver opções de parcelamento' }}</span>
                    <ChevronDown class="w-3.5 h-3.5 transition-transform duration-200" aria-hidden="true" :class="isInstallmentsOpen ? 'rotate-180' : ''" />
                  </button>

                  <div class="mt-3 rounded-xl bg-surface/65 border border-gold-light/30 p-3 space-y-2 text-xs tabular-nums" v-if="isInstallmentsOpen">
                    <div class="flex items-center justify-between pb-2 border-b border-border/75">
                      <span class="font-semibold text-gold-dark">À vista no PIX (5% OFF)</span>
                      <span class="font-bold text-gold-dark">{{ formatCurrency( pixPrice ) }}</span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      <div class="flex items-center justify-between py-0.5 text-muted-foreground" v-for="row in installmentRows" :key="row.count">
                        <span>
                          <strong class="font-semibold text-foreground">{{ row.count }}x</strong> de {{ formatCurrency( row.value ) }}
                        </span>
                        <span class="text-[11px] text-gold-dark font-medium">sem juros</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Product Variations -->
              <div class="pt-1" v-if="detail.variationGroups.length > 0">
                <ProductVariationSelector :groups="detail.variationGroups" :selected-options="selectedOptions" @select="handleSelectVariation" />
              </div>

              <!-- Quantity Stepper & Primary Add to Cart CTA -->
              <div class="space-y-3 pt-1">
                <div class="flex items-stretch gap-3">
                  <!-- Quantity Stepper -->
                  <div class="inline-flex items-center rounded-full border border-gold-light/55 bg-card px-1.5 shadow-warm-sm shrink-0" role="group" aria-label="Quantidade do produto">
                    <button type="button" class="w-9 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-surface hover:text-gold-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer" aria-label="Diminuir quantidade" :disabled="quantity <= 1" @click="decrementQuantity">
                      <Minus class="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    <span class="w-8 text-center text-sm font-semibold text-foreground tabular-nums" aria-live="polite">
                      {{ quantity }}
                    </span>

                    <button type="button" class="w-9 h-10 rounded-full flex items-center justify-center text-foreground hover:bg-surface hover:text-gold-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer" aria-label="Aumentar quantidade" :disabled="quantity >= 20" @click="incrementQuantity">
                      <Plus class="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <!-- Primary Add to Cart Button -->
                  <Button type="button" size="lg" class="flex-1 h-12 rounded-full font-semibold text-sm tracking-wide btn-sheen shadow-warm-md cursor-pointer transition-all duration-200" :class="isAdded ? 'bg-dark text-background hover:bg-dark' : 'bg-primary text-primary-foreground hover:bg-gold-dark'" @click="handleAddToCart">
                    <Check class="w-4 h-4" aria-hidden="true" v-if="isAdded" />
                    <ShoppingCart class="w-4 h-4" aria-hidden="true" v-else />
                    <span>{{ isAdded ? 'Adicionado ao carrinho' : 'Adicionar ao carrinho' }}</span>
                  </Button>
                </div>

                <!-- Dispatch Status -->
                <div class="flex items-center text-xs text-muted-foreground px-1">
                  <span class="inline-flex items-center gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true" />
                    <span>Em estoque · Postagem em até <strong class="font-medium text-foreground">24h úteis</strong></span>
                  </span>
                </div>
              </div>

              <!-- Brazilian CEP Shipping Calculator -->
              <ProductShippingCalculator :order-subtotal="shippingSubtotal" />
            </div>
          </div>
        </div>
      </section>

      <!-- Band 3: Editorial Story & Technical Dossier -->
      <ProductEditorialDossier :detail="detail" :active-specs="activeSpecs" />

      <!-- Band 4: Mid-Page Related Carousel (Same Category) -->
      <section class="w-full bg-background surface-linen py-14 sm:py-20" aria-labelledby="same-category-products-heading" v-if="sameCategoryProducts.length > 0">
        <div class="relative z-10 container mx-auto px-4">
          <SectionHeader heading-id="same-category-products-heading" eyebrow="Na Mesma Categoria" title="Peças Semelhantes" :action-label="`Ver ${ detail.product.categoryLabel.toLowerCase() }`" :action-to="`/c/${ detail.product.categorySlug }`" v-reveal />

          <div v-reveal="{ delay: 100 }">
            <ProductCarousel aria-label="Peças semelhantes na mesma categoria" card-surface="elevated" :products="sameCategoryProducts" />
          </div>
        </div>
      </section>

      <!-- Band 5: Deep-Brown Atelier Promise Breather -->
      <ProductAtelierPromise :whatsapp-href="whatsappHref" />

      <!-- Band 6: Bottom Related Carousel (Most Popular Items) -->
      <section class="w-full bg-background surface-linen py-14 sm:py-20" aria-labelledby="popular-products-heading" v-if="popularProducts.length > 0">
        <div class="relative z-10 container mx-auto px-4">
          <SectionHeader heading-id="popular-products-heading" eyebrow="Destaques do Acervo" title="Os Mais Populares" action-label="Ver mais vendidos" action-to="/c/mais-vendidos" v-reveal />

          <div v-reveal="{ delay: 100 }">
            <ProductCarousel aria-label="Produtos mais populares da loja" card-surface="elevated" :products="popularProducts" />
          </div>
        </div>
      </section>
    </template>

    <!-- Graceful Not-Found State -->
    <section class="w-full bg-background surface-linen py-20 sm:py-28 flex-1" v-else>
      <div class="relative z-10 container mx-auto px-4">
        <div class="max-w-lg mx-auto rounded-2xl bg-card/95 border border-gold-light/40 p-8 sm:p-12 text-center shadow-warm-md">
          <div class="flex items-center justify-center gap-3 mb-3" aria-hidden="true">
            <span class="h-px w-8 bg-gold-light/60" />
            <span class="text-xs leading-none text-gold-light">†</span>
            <span class="h-px w-8 bg-gold-light/60" />
          </div>

          <h1 class="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            Peça não encontrada no acervo
          </h1>

          <p class="mt-3 text-sm text-muted-foreground leading-relaxed">
            O artigo religioso que você procura pode ter mudado de endereço ou não está mais disponível no catálogo atual.
          </p>

          <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button as-child class="rounded-full bg-primary text-primary-foreground hover:bg-gold-dark px-6 font-semibold btn-sheen">
              <NuxtLink to="/p">Explorar todo o catálogo</NuxtLink>
            </Button>

            <Button as-child variant="outline" class="rounded-full border-gold-light/60 text-gold-dark hover:bg-surface px-6 font-semibold">
              <NuxtLink to="/">Voltar ao início</NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, ref, watch } from 'vue';
  import { ArrowDown, Check, ChevronDown, CreditCard, Minus, Plus, ShoppingCart } from '@lucide/vue';
  import SectionHeader from '@/components/home/SectionHeader.vue';
  import ProductAtelierPromise from '@/components/product/ProductAtelierPromise.vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import ProductEditorialDossier from '@/components/product/ProductEditorialDossier.vue';
  import ProductGallery from '@/components/product/ProductGallery.vue';
  import ProductShareMenu from '@/components/product/ProductShareMenu.vue';
  import ProductShippingCalculator from '@/components/product/ProductShippingCalculator.vue';
  import ProductVariationSelector from '@/components/product/ProductVariationSelector.vue';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@sagrada-familia/ui/breadcrumb';
  import { Button } from '@sagrada-familia/ui/button';
  import { useCartPreview } from '@/composables/useCartPreview';
  import { formatCurrency, getDiscountPercentage, getInstallmentPrice, getPixPrice } from '@/data/products';
  import { getPopularProducts, getProductDetailBySlug, getSimilarProducts, type ProductTechnicalSpec, type ProductVariationOption } from '@/data/product-details';

  const route = useRoute();
  const { addToCart } = useCartPreview();

  const slug = computed( () => {
    const raw = route.params.slug;
    return Array.isArray( raw ) ? ( raw[ 0 ] ?? '' ) : ( raw ?? '' );
  } );

  const detail = computed( () => getProductDetailBySlug( slug.value ) );

  const selectedOptions = ref<Record<string, string>>( {} );
  const activeImageId = ref<string>( '' );
  const quantity = ref<number>( 1 );
  const isInstallmentsOpen = ref<boolean>( false );
  const isAdded = ref<boolean>( false );

  let addedTimer: ReturnType<typeof setTimeout> | null = null;

  watch(
    detail,
    ( nextDetail ) => {
      if ( !nextDetail ) {
        selectedOptions.value = {};
        activeImageId.value = '';
        return;
      }

      const initialSelections: Record<string, string> = {};
      for ( const group of nextDetail.variationGroups ) {
        const firstAvailable = group.options.find( ( opt ) => opt.inStock ) ?? group.options[ 0 ];
        if ( firstAvailable ) {
          initialSelections[ group.id ] = firstAvailable.id;
        }
      }

      selectedOptions.value = initialSelections;
      activeImageId.value = nextDetail.media[ 0 ]?.id ?? '';
      quantity.value = 1;
      isInstallmentsOpen.value = false;
      isAdded.value = false;
    },
    { immediate: true }
  );

  const selectedOptionObjects = computed<ProductVariationOption[]>( () => {
    if ( !detail.value ) {
      return [];
    }

    const chosen: ProductVariationOption[] = [];
    for ( const group of detail.value.variationGroups ) {
      const selectedId = selectedOptions.value[ group.id ];
      const match = group.options.find( ( opt ) => opt.id === selectedId ) ?? group.options[ 0 ];
      if ( match ) {
        chosen.push( match );
      }
    }

    return chosen;
  } );

  const selectedPriceDelta = computed( () => {
    return selectedOptionObjects.value.reduce( ( sum, opt ) => sum + opt.priceDelta, 0 );
  } );

  const effectivePrice = computed( () => {
    if ( !detail.value ) {
      return 0;
    }

    return Math.max( 1, +( detail.value.product.price + selectedPriceDelta.value ).toFixed( 2 ) );
  } );

  const effectiveOriginalPrice = computed<number | undefined>( () => {
    const baseOriginal = detail.value?.product.originalPrice;
    if ( baseOriginal === undefined ) {
      return undefined;
    }

    return Math.max( effectivePrice.value, +( baseOriginal + selectedPriceDelta.value ).toFixed( 2 ) );
  } );

  const discountPercentage = computed( () => {
    return getDiscountPercentage( effectivePrice.value, effectiveOriginalPrice.value );
  } );

  const savingsAmount = computed( () => {
    if ( !effectiveOriginalPrice.value || effectiveOriginalPrice.value <= effectivePrice.value ) {
      return 0;
    }

    return +( effectiveOriginalPrice.value - effectivePrice.value ).toFixed( 2 );
  } );

  const pixPrice = computed( () => {
    return getPixPrice( effectivePrice.value );
  } );

  const installmentPrice = computed( () => {
    if ( !detail.value ) {
      return 0;
    }

    return getInstallmentPrice( effectivePrice.value, detail.value.product.maxInstallments );
  } );

  const installmentRows = computed( () => {
    if ( !detail.value ) {
      return [];
    }

    return Array.from( { length: detail.value.product.maxInstallments }, ( _, idx ) => {
      const count = idx + 1;
      return {
        count,
        value: getInstallmentPrice( effectivePrice.value, count )
      };
    } );
  } );

  const shippingSubtotal = computed( () => {
    return +( effectivePrice.value * quantity.value ).toFixed( 2 );
  } );

  const activeSku = computed( () => {
    if ( !detail.value ) {
      return '';
    }

    const suffixes = selectedOptionObjects.value.map( ( opt ) => opt.skuSuffix ).filter( Boolean );
    return suffixes.length > 0 ? `${ detail.value.sku }-${ suffixes.join( '-' ) }` : detail.value.sku;
  } );

  const activeSpecs = computed<ProductTechnicalSpec[]>( () => {
    if ( !detail.value ) {
      return [];
    }

    const dimensions = selectedOptionObjects.value.find( ( opt ) => opt.dimensions )?.dimensions;
    const weight = selectedOptionObjects.value.find( ( opt ) => opt.weight )?.weight;

    return detail.value.baseSpecs.map( ( spec ) => {
      if ( spec.label === 'Dimensões' && dimensions ) {
        return { label: spec.label, value: dimensions };
      }
      if ( spec.label === 'Peso aproximado' && weight ) {
        return { label: spec.label, value: weight };
      }
      return spec;
    } );
  } );

  const sameCategoryProducts = computed( () => {
    if ( !detail.value ) {
      return [];
    }

    return getSimilarProducts( detail.value.product, 8 );
  } );

  const popularProducts = computed( () => {
    if ( !detail.value ) {
      return [];
    }

    const excludeIds = new Set( sameCategoryProducts.value.map( ( item ) => item.id ) );
    return getPopularProducts( detail.value.product, excludeIds, 8 );
  } );

  const whatsappHref = computed( () => {
    const productName = detail.value?.product.name ?? 'uma peça do site';
    const text = encodeURIComponent( `Olá! Gostaria de mais informações sobre: ${ productName }` );
    return `https://wa.me/5541999113465?text=${ text }`;
  } );

  useHead( {
    title: () => detail.value ? `${ detail.value.product.name } | Sagrada Família` : 'Peça não encontrada | Sagrada Família',
    meta: [
      {
        name: 'description',
        content: () => detail.value?.shortDescription ?? 'Artigos religiosos selecionados com reverência na Sagrada Família.'
      }
    ]
  } );

  const handleSelectVariation = ( groupId: string, optionId: string ) => {
    selectedOptions.value = {
      ...selectedOptions.value,
      [ groupId ]: optionId
    };

    const group = detail.value?.variationGroups.find( ( g ) => g.id === groupId );
    const option = group?.options.find( ( opt ) => opt.id === optionId );
    if ( option?.imageId ) {
      activeImageId.value = option.imageId;
    }
  };

  const decrementQuantity = () => {
    if ( quantity.value > 1 ) {
      quantity.value -= 1;
    }
  };

  const incrementQuantity = () => {
    if ( quantity.value < 20 ) {
      quantity.value += 1;
    }
  };

  const handleAddToCart = () => {
    addToCart( quantity.value );
    isAdded.value = true;

    if ( addedTimer ) {
      clearTimeout( addedTimer );
    }

    addedTimer = setTimeout( () => {
      isAdded.value = false;
      addedTimer = null;
    }, 1800 );
  };

  onUnmounted( () => {
    if ( addedTimer ) {
      clearTimeout( addedTimer );
    }
  } );
</script>
