<template>
  <Sheet :open="open" @update:open="emit( 'update:open', $event )">
    <SheetContent side="right" class="w-[92vw] sm:max-w-xl lg:max-w-2xl p-0 gap-0 flex flex-col bg-card text-foreground">
      <template v-if="product">
        <SheetHeader class="border-b border-gold-light/25 bg-surface/45 px-6 py-5 pr-12 text-left shrink-0 space-y-2">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
              Visualização rápida
            </span>
            <Badge variant="outline" class="rounded-full border-gold-light/50 bg-background/85 px-2.5 py-0 text-[11px] font-mono text-muted-foreground">
              {{ product.sku }}
            </Badge>
          </div>

          <SheetTitle class="font-serif text-xl sm:text-2xl font-semibold leading-snug text-foreground">
            {{ product.name }}
          </SheetTitle>

          <SheetDescription class="text-xs text-muted-foreground">
            {{ product.categoryLabel }} &rsaquo; {{ product.subCategoryLabel }}
          </SheetDescription>
        </SheetHeader>

        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <!-- Hero Thumbnail -->
          <div class="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gold-light/35 bg-surface/60 shadow-warm-sm">
            <img class="w-full h-full object-cover" :src="product.imageUrl" :alt="product.name" />

            <div class="absolute top-3 left-3 flex flex-wrap items-center gap-2">
              <Badge variant="outline" class="rounded-full backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold" :class="getProductStatusMeta( product.status ).badgeClass">
                <span class="size-1.5 rounded-full" aria-hidden="true" :class="getProductStatusMeta( product.status ).dotClass" />
                {{ getProductStatusMeta( product.status ).label }}
              </Badge>

              <Badge variant="outline" class="rounded-full border-gold-light bg-card/95 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-semibold text-gold-dark tabular-nums" v-if="discountPercentage !== null">
                <Tag class="size-3" aria-hidden="true" />
                -{{ discountPercentage }}% &middot; Em oferta
              </Badge>
            </div>
          </div>

          <!-- Pricing Breakdown -->
          <div class="rounded-xl border border-gold-light/30 bg-surface/40 p-4 space-y-2">
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Precificação
            </p>

            <div class="flex flex-wrap items-baseline gap-2.5 tabular-nums">
              <span class="font-serif text-3xl font-semibold tracking-tight text-foreground">
                {{ formatCurrency( product.price ) }}
              </span>

              <span class="text-sm text-muted-foreground line-through" v-if="discountPercentage !== null && product.originalPrice !== undefined">
                {{ formatCurrency( product.originalPrice ) }}
              </span>
            </div>

            <p class="text-xs text-muted-foreground">
              Estimativa à vista no PIX (5% de desconto):
              <strong class="font-semibold text-gold-dark tabular-nums">{{ formatCurrency( getPixPrice( product.price ) ) }}</strong>
            </p>
          </div>

          <!-- Stock & Variations Summary -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="rounded-xl border border-gold-light/30 bg-background/80 p-3.5 space-y-1.5">
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Estoque atual
              </span>

              <div class="flex items-center justify-between gap-2">
                <span class="text-lg font-semibold text-foreground tabular-nums">
                  {{ product.stock }} un.
                </span>

                <Badge variant="outline" class="rounded-full px-2 py-0.5 text-[11px] font-medium" :class="getStockStatusMeta( product.stock ).badgeClass">
                  <span class="size-1.5 rounded-full" aria-hidden="true" :class="getStockStatusMeta( product.stock ).dotClass" />
                  {{ getStockStatusMeta( product.stock ).label }}
                </Badge>
              </div>
            </div>

            <div class="rounded-xl border border-gold-light/30 bg-background/80 p-3.5 space-y-1.5">
              <span class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Estrutura
              </span>

              <p class="text-sm font-semibold text-foreground">
                {{ product.variationCount > 0 ? `Produto com ${ product.variationCount } variações` : 'Produto simples' }}
              </p>

              <p class="text-xs text-muted-foreground leading-snug" v-if="product.variationSummary">
                {{ product.variationSummary }}
              </p>
            </div>
          </div>

          <!-- Quick Status Control -->
          <div class="space-y-2">
            <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Alterar status rapidamente
            </p>

            <div class="grid grid-cols-3 gap-2">
              <button type="button" class="rounded-xl border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="statusOption in statusOptions" :key="statusOption.value" :aria-pressed="product.status === statusOption.value" :class="product.status === statusOption.value ? 'border-primary bg-primary/10 text-gold-dark shadow-warm-sm' : 'border-gold-light/45 bg-background text-muted-foreground hover:text-foreground hover:bg-surface/65'" @click="handleQuickStatusChange( statusOption.value )">
                {{ statusOption.label }}
              </button>
            </div>
          </div>

          <Separator class="bg-gold-light/25" />

          <!-- Catalog Metadata -->
          <dl class="space-y-2.5 text-xs sm:text-sm">
            <div class="flex items-center justify-between gap-4">
              <dt class="text-muted-foreground">Slug</dt>
              <dd class="font-mono text-xs text-foreground truncate max-w-[360px]">{{ product.slug }}</dd>
            </div>

            <div class="flex items-center justify-between gap-4">
              <dt class="text-muted-foreground">Categoria</dt>
              <dd class="font-medium text-foreground">{{ product.categoryLabel }}</dd>
            </div>

            <div class="flex items-center justify-between gap-4">
              <dt class="text-muted-foreground">Subcategoria</dt>
              <dd class="font-medium text-foreground">{{ product.subCategoryLabel }}</dd>
            </div>

            <div class="flex items-center justify-between gap-4">
              <dt class="text-muted-foreground">Criado em</dt>
              <dd class="text-foreground tabular-nums">{{ formatDateTime( product.createdAt ) }}</dd>
            </div>

            <div class="flex items-center justify-between gap-4">
              <dt class="text-muted-foreground">Atualizado em</dt>
              <dd class="text-foreground tabular-nums">{{ formatDateTime( product.updatedAt ) }}</dd>
            </div>
          </dl>
        </div>

        <SheetFooter class="flex-row items-center justify-between gap-3 border-t border-gold-light/25 bg-surface/40 px-6 py-4 shrink-0">
          <Button type="button" variant="outline" class="rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" @click="emit( 'duplicate', product )">
            <Copy class="size-4 text-gold-dark" aria-hidden="true" />
            <span>Duplicar</span>
          </Button>

          <Button class="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark font-semibold shadow-warm-sm cursor-pointer" :as-child="true">
            <RouterLink :to="{ name: 'product-edit', params: { id: product.id } }">
              <Pencil class="size-4" aria-hidden="true" />
              <span>Editar produto</span>
            </RouterLink>
          </Button>
        </SheetFooter>
      </template>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { Copy, Pencil, Tag } from '@lucide/vue';
  import { RouterLink } from 'vue-router';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Button } from '@sagrada-familia/ui/button';
  import { Separator } from '@sagrada-familia/ui/separator';
  import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@sagrada-familia/ui/sheet';
  import { formatCurrency, formatDateTime, getDiscountPercentage, getPixPrice, getProductStatusMeta, getStockStatusMeta, PRODUCT_STATUS_META, type AdminProduct, type ProductStatus } from '@/data/products';

  const props = defineProps<{
    open: boolean;
    product: AdminProduct | null;
  }>();

  const emit = defineEmits<{
    'update:open': [ value: boolean ];
    duplicate: [ product: AdminProduct ];
    changeStatus: [ product: AdminProduct, status: ProductStatus ];
  }>();

  const discountPercentage = computed( () => {
    if ( !props.product ) {
      return null;
    }

    return getDiscountPercentage( props.product.price, props.product.originalPrice );
  } );

  const statusOptions = [
    PRODUCT_STATUS_META.active,
    PRODUCT_STATUS_META.draft,
    PRODUCT_STATUS_META.archived
  ];

  const handleQuickStatusChange = ( status: ProductStatus ) => {
    if ( !props.product || props.product.status === status ) {
      return;
    }

    emit( 'changeStatus', props.product, status );
  };
</script>
