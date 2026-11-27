<template>
  <Sheet :open="open" @update:open="emit( 'update:open', $event )">
    <SheetContent side="right" class="w-[92vw] sm:max-w-xl lg:max-w-2xl p-0 gap-0 flex flex-col bg-card text-foreground">
      <template v-if="product">
        <SheetHeader class="border-b border-gold-light/25 bg-surface/45 px-6 py-4 pr-12 text-left shrink-0 space-y-0">
          <div class="flex items-center gap-4 min-w-0">
            <img class="aspect-square size-20 sm:size-24 rounded-xl border border-gold-light/40 bg-card object-cover shrink-0 shadow-warm-sm" :src="product.imageUrl" :alt="product.name" />

            <div class="min-w-0 flex-1 space-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                  Edição rápida
                </span>

                <Badge variant="outline" class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" :class="getProductStatusMeta( draftStatus ).badgeClass">
                  <span class="size-1.5 rounded-full" aria-hidden="true" :class="getProductStatusMeta( draftStatus ).dotClass" />
                  {{ getProductStatusMeta( draftStatus ).label }}
                </Badge>

                <Badge variant="outline" class="rounded-full border-gold-light bg-card px-2 py-0.5 text-[11px] font-semibold text-gold-dark tabular-nums" v-if="draftDiscountPercentage !== null">
                  <Tag class="size-3" aria-hidden="true" />
                  -{{ draftDiscountPercentage }}%
                </Badge>
              </div>

              <SheetTitle class="font-sans text-lg sm:text-xl font-semibold leading-snug text-foreground line-clamp-2">
                {{ draftName.trim() || product.name }}
              </SheetTitle>

              <SheetDescription class="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                <span class="font-mono">{{ draftSku.trim() || product.sku }}</span>
                <span aria-hidden="true">&bull;</span>
                <span>{{ product.variationCount > 0 ? `${ product.variationCount } variações` : 'Produto simples' }}</span>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <form id="quick-edit-product-form" class="flex-1 overflow-y-auto px-6 py-5 space-y-5" @submit.prevent="handleSubmit">
          <!-- Status Selector -->
          <div class="space-y-2">
            <p class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Status de publicação
            </p>

            <div class="grid grid-cols-3 gap-2">
              <button type="button" class="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="statusOption in statusOptions" :key="statusOption.value" :aria-pressed="draftStatus === statusOption.value" :class="draftStatus === statusOption.value ? 'border-primary bg-surface text-gold-dark shadow-warm-sm' : 'border-gold-light/45 bg-background text-muted-foreground hover:text-foreground hover:bg-surface/55'" @click="draftStatus = statusOption.value">
                <span class="size-1.5 rounded-full shrink-0" aria-hidden="true" :class="statusOption.dotClass" />
                <span>{{ statusOption.label }}</span>
              </button>
            </div>
          </div>

          <!-- Identification -->
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            <div class="space-y-1.5 sm:col-span-8">
              <Label for="quick-edit-name" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Nome do produto
              </Label>

              <Input id="quick-edit-name" type="text" class="h-10 rounded-xl border-gold-light/50 bg-background" placeholder="Ex.: Imagem Sagrada Família 30cm" v-model="draftName" />
            </div>

            <div class="space-y-1.5 sm:col-span-4">
              <Label for="quick-edit-sku" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                SKU
              </Label>

              <Input id="quick-edit-sku" type="text" class="h-10 rounded-xl border-gold-light/50 bg-background font-mono text-xs sm:text-sm" placeholder="SF-IMG-001" v-model="draftSku" />
            </div>
          </div>

          <!-- Category & Subcategory -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div class="space-y-1.5">
              <Label for="quick-edit-category" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Categoria
              </Label>

              <Select :model-value="draftCategorySlug" @update:model-value="handleCategoryChange">
                <SelectTrigger id="quick-edit-category" class="h-10 rounded-xl border-gold-light/50 bg-background">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="category in adminCategories" :key="category.slug" :value="category.slug">
                      {{ category.label }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-1.5">
              <Label for="quick-edit-subcategory" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Subcategoria
              </Label>

              <Select v-model="draftSubCategorySlug">
                <SelectTrigger id="quick-edit-subcategory" class="h-10 rounded-xl border-gold-light/50 bg-background">
                  <SelectValue placeholder="Selecione uma subcategoria" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="sub in availableSubCategories" :key="sub.slug" :value="sub.slug">
                      {{ sub.label }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <!-- Pricing & Stock -->
          <div class="rounded-xl border border-gold-light/30 bg-surface/35 p-4 space-y-3.5">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div class="space-y-1.5">
                <Label for="quick-edit-price" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Preço de venda
                </Label>

                <InputGroup class="h-10">
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>R$</InputGroupText>
                  </InputGroupAddon>

                  <InputGroupInput id="quick-edit-price" type="number" min="0.01" step="0.01" inputmode="decimal" class="tabular-nums" v-model="draftPrice" />
                </InputGroup>
              </div>

              <div class="space-y-1.5">
                <Label for="quick-edit-original-price" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Preço original (De)
                </Label>

                <InputGroup class="h-10">
                  <InputGroupAddon align="inline-start">
                    <InputGroupText>R$</InputGroupText>
                  </InputGroupAddon>

                  <InputGroupInput id="quick-edit-original-price" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="Opcional" class="tabular-nums" v-model="draftOriginalPrice" />

                  <InputGroupAddon align="inline-end" v-if="draftOriginalPrice.trim().length > 0">
                    <InputGroupButton aria-label="Remover preço promocional" @click="draftOriginalPrice = ''">
                      <X class="size-3.5" aria-hidden="true" />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div class="space-y-1.5">
                <Label for="quick-edit-stock" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Estoque
                </Label>

                <InputGroup class="h-10">
                  <InputGroupInput id="quick-edit-stock" type="number" min="0" step="1" inputmode="numeric" class="tabular-nums" v-model="draftStock" />

                  <InputGroupAddon align="inline-end">
                    <InputGroupText>un.</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>

            <p class="text-xs font-medium text-amber-800" v-if="originalPriceError">
              O preço original deve ser maior que o preço de venda para exibir promoção.
            </p>

            <div class="flex flex-wrap items-center justify-between gap-2 border-t border-gold-light/20 pt-2.5 text-xs">
              <span class="text-muted-foreground">
                Estimativa à vista no PIX (5%):
                <strong class="font-semibold text-gold-dark tabular-nums">{{ isPriceValid ? formatCurrency( getPixPrice( parsedPrice ) ) : '—' }}</strong>
              </span>

              <Badge variant="outline" class="rounded-full px-2 py-0.5 text-[11px] font-medium" :class="liveStockMeta.badgeClass">
                <span class="size-1.5 rounded-full" aria-hidden="true" :class="liveStockMeta.dotClass" />
                {{ liveStockMeta.label }}
              </Badge>
            </div>
          </div>

          <!-- Read-only Catalog Metadata -->
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 rounded-xl border border-gold-light/25 bg-background/70 px-4 py-3 text-xs">
            <div class="flex items-center justify-between gap-3">
              <dt class="text-muted-foreground shrink-0">Slug</dt>
              <dd class="font-mono text-foreground truncate">{{ product.slug }}</dd>
            </div>

            <div class="flex items-center justify-between gap-3" v-if="product.variationSummary">
              <dt class="text-muted-foreground shrink-0">Variações</dt>
              <dd class="font-medium text-foreground truncate">{{ product.variationSummary }}</dd>
            </div>

            <div class="flex items-center justify-between gap-3">
              <dt class="text-muted-foreground shrink-0">Criado em</dt>
              <dd class="text-foreground tabular-nums">{{ formatDateTime( product.createdAt ) }}</dd>
            </div>

            <div class="flex items-center justify-between gap-3">
              <dt class="text-muted-foreground shrink-0">Atualizado em</dt>
              <dd class="text-foreground tabular-nums">{{ formatDateTime( product.updatedAt ) }}</dd>
            </div>
          </dl>
        </form>

        <SheetFooter class="flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 border-t border-gold-light/25 bg-surface/40 px-6 py-4 shrink-0">
          <div class="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" class="h-9 rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" @click="emit( 'duplicate', product )">
              <Copy class="size-3.5 text-gold-dark" aria-hidden="true" />
              <span>Duplicar</span>
            </Button>

            <Button variant="outline" size="sm" class="h-9 rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" :as-child="true">
              <RouterLink :to="{ name: 'product-edit', params: { id: product.id } }">
                <Pencil class="size-3.5 text-gold-dark" aria-hidden="true" />
                <span>Edição completa</span>
              </RouterLink>
            </Button>
          </div>

          <div class="flex items-center justify-end gap-2">
            <Button type="button" variant="outline" class="h-9 rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" @click="emit( 'update:open', false )">
              Cancelar
            </Button>

            <Button type="submit" form="quick-edit-product-form" class="h-9 rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark font-semibold shadow-warm-sm cursor-pointer" :disabled="!isDirty || !isValid">
              Salvar alterações
            </Button>
          </div>
        </SheetFooter>
      </template>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
  import type { AcceptableValue } from 'reka-ui';
  import { computed, ref, watch } from 'vue';
  import { Copy, Pencil, Tag, X } from '@lucide/vue';
  import { RouterLink } from 'vue-router';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Button } from '@sagrada-familia/ui/button';
  import { Input } from '@sagrada-familia/ui/input';
  import { Label } from '@sagrada-familia/ui/label';
  import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@sagrada-familia/ui/select';
  import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
  import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@sagrada-familia/ui/sheet';
  import type { QuickEditProductPayload } from '@/composables/useProductsTable';
  import { adminCategories, formatCurrency, formatDateTime, getCategoryBySlug, getDiscountPercentage, getPixPrice, getProductStatusMeta, getStockStatusMeta, PRODUCT_STATUS_META, type AdminProduct, type ProductStatus } from '@/data/products';

  const props = defineProps<{
    open: boolean;
    product: AdminProduct | null;
  }>();

  const emit = defineEmits<{
    'update:open': [ value: boolean ];
    duplicate: [ product: AdminProduct ];
    save: [ productId: string, payload: QuickEditProductPayload ];
  }>();

  const draftName = ref<string>( '' );
  const draftSku = ref<string>( '' );
  const draftCategorySlug = ref<string>( '' );
  const draftSubCategorySlug = ref<string>( '' );
  const draftPrice = ref<string>( '' );
  const draftOriginalPrice = ref<string>( '' );
  const draftStock = ref<string>( '' );
  const draftStatus = ref<ProductStatus>( 'active' );

  const syncFormFromProduct = ( product: AdminProduct | null ) => {
    if ( !product ) {
      return;
    }

    draftName.value = product.name;
    draftSku.value = product.sku;
    draftCategorySlug.value = product.categorySlug;
    draftSubCategorySlug.value = product.subCategorySlug;
    draftPrice.value = String( product.price );
    draftOriginalPrice.value = product.originalPrice !== undefined ? String( product.originalPrice ) : '';
    draftStock.value = String( product.stock );
    draftStatus.value = product.status;
  };

  watch( [ () => props.open, () => props.product ], ( [ isOpen, currentProduct ] ) => {
    if ( isOpen && currentProduct ) {
      syncFormFromProduct( currentProduct );
    }
  }, { immediate: true } );

  const statusOptions = [
    PRODUCT_STATUS_META.active,
    PRODUCT_STATUS_META.draft,
    PRODUCT_STATUS_META.archived
  ];

  const availableSubCategories = computed( () => {
    return getCategoryBySlug( draftCategorySlug.value )?.subCategories ?? [];
  } );

  const handleCategoryChange = ( value: AcceptableValue ) => {
    if ( typeof value !== 'string' ) {
      return;
    }

    draftCategorySlug.value = value;
    draftSubCategorySlug.value = getCategoryBySlug( value )?.subCategories[ 0 ]?.slug ?? '';
  };

  const parsedPrice = computed( () => Number( draftPrice.value ) );
  const hasOriginalPrice = computed( () => draftOriginalPrice.value.trim().length > 0 );
  const parsedOriginalPrice = computed( () => Number( draftOriginalPrice.value ) );
  const parsedStock = computed( () => Number( draftStock.value ) );

  const isPriceValid = computed( () => {
    return draftPrice.value.trim().length > 0 && Number.isFinite( parsedPrice.value ) && parsedPrice.value > 0;
  } );

  const originalPriceError = computed( () => {
    if ( !hasOriginalPrice.value ) {
      return false;
    }

    if ( !Number.isFinite( parsedOriginalPrice.value ) ) {
      return true;
    }

    return isPriceValid.value && parsedOriginalPrice.value <= parsedPrice.value;
  } );

  const isStockValid = computed( () => {
    return draftStock.value.trim().length > 0 && Number.isFinite( parsedStock.value ) && parsedStock.value >= 0;
  } );

  const isValid = computed( () => {
    return (
      draftName.value.trim().length > 0
      && draftSku.value.trim().length > 0
      && draftCategorySlug.value.length > 0
      && draftSubCategorySlug.value.length > 0
      && isPriceValid.value
      && isStockValid.value
      && !originalPriceError.value
    );
  } );

  const draftDiscountPercentage = computed( () => {
    if ( !isPriceValid.value || !hasOriginalPrice.value || !Number.isFinite( parsedOriginalPrice.value ) ) {
      return null;
    }

    return getDiscountPercentage( parsedPrice.value, parsedOriginalPrice.value );
  } );

  const liveStockMeta = computed( () => {
    const stockValue = isStockValid.value ? Math.round( parsedStock.value ) : 0;
    return getStockStatusMeta( stockValue );
  } );

  const isDirty = computed( () => {
    const product = props.product;
    if ( !product ) {
      return false;
    }

    const currentOriginalPrice = product.originalPrice ?? null;
    const nextOriginalPrice = hasOriginalPrice.value && Number.isFinite( parsedOriginalPrice.value )
      ? +parsedOriginalPrice.value.toFixed( 2 )
      : null;

    return (
      draftName.value.trim() !== product.name
      || draftSku.value.trim() !== product.sku
      || draftCategorySlug.value !== product.categorySlug
      || draftSubCategorySlug.value !== product.subCategorySlug
      || +parsedPrice.value.toFixed( 2 ) !== product.price
      || nextOriginalPrice !== currentOriginalPrice
      || Math.round( parsedStock.value ) !== product.stock
      || draftStatus.value !== product.status
    );
  } );

  const handleSubmit = () => {
    if ( !props.product || !isValid.value || !isDirty.value ) {
      return;
    }

    emit( 'save', props.product.id, {
      name: draftName.value.trim(),
      sku: draftSku.value.trim(),
      categorySlug: draftCategorySlug.value,
      subCategorySlug: draftSubCategorySlug.value,
      price: parsedPrice.value,
      originalPrice: hasOriginalPrice.value ? parsedOriginalPrice.value : undefined,
      stock: Math.round( parsedStock.value ),
      status: draftStatus.value
    } );
  };
</script>
