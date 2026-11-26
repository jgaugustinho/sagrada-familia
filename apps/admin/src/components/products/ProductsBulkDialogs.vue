<template>
  <!-- 1. Bulk Price Change Dialog -->
  <Dialog :open="activeModal === 'price'" @update:open="handleOpenUpdate">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Alterar preço em massa</DialogTitle>
        <DialogDescription>
          Ajuste o valor de venda dos <strong class="font-semibold text-foreground tabular-nums">{{ selectedProducts.length }}</strong> produtos selecionados.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 min-w-0">
        <div class="space-y-1.5">
          <Label for="bulk-price-mode" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Tipo de ajuste
          </Label>

          <Select v-model="priceMode">
            <SelectTrigger id="bulk-price-mode" class="h-10 rounded-xl border-gold-light/50 bg-background">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="set">Definir preço fixo (R$)</SelectItem>
                <SelectItem value="increase-percent">Aumentar por percentual (%)</SelectItem>
                <SelectItem value="decrease-percent">Reduzir por percentual (%)</SelectItem>
                <SelectItem value="increase-fixed">Aumentar valor fixo (R$)</SelectItem>
                <SelectItem value="decrease-fixed">Reduzir valor fixo (R$)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-1.5">
          <Label for="bulk-price-value" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {{ isPricePercentMode ? 'Percentual (%)' : 'Valor (R$)' }}
          </Label>

          <InputGroup class="h-10">
            <InputGroupAddon align="inline-start" v-if="!isPricePercentMode">
              <InputGroupText>R$</InputGroupText>
            </InputGroupAddon>

            <InputGroupInput id="bulk-price-value" type="number" min="0.01" step="0.01" inputmode="decimal" class="tabular-nums" :placeholder="isPricePercentMode ? '10' : '99,90'" v-model="priceInput" />

            <InputGroupAddon align="inline-end" v-if="isPricePercentMode">
              <InputGroupText>%</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div class="rounded-xl border border-gold-light/30 bg-surface/40 p-3.5 space-y-2" v-if="previewProducts.length > 0 && isPriceValid">
          <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            Prévia da alteração
          </p>

          <ul class="space-y-1.5 text-xs">
            <li class="flex items-center justify-between gap-3 min-w-0" v-for="item in previewProducts" :key="item.id">
              <span class="min-w-0 truncate text-foreground/90">{{ item.name }}</span>
              <span class="shrink-0 tabular-nums font-medium">
                <span class="text-muted-foreground">{{ formatCurrency( item.price ) }}</span>
                <span class="mx-1 text-gold-dark">&rarr;</span>
                <strong class="text-foreground">{{ formatCurrency( calculateNextPrice( item.price, priceMode, parsedPriceValue ) ) }}</strong>
              </span>
            </li>
          </ul>

          <p class="text-[11px] text-muted-foreground" v-if="selectedProducts.length > 3">
            + {{ selectedProducts.length - 3 }} outros produtos selecionados
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" class="rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" @click="closeModal">
          Cancelar
        </Button>

        <Button type="button" class="rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark font-semibold shadow-warm-sm cursor-pointer" :disabled="!isPriceValid" @click="submitPrice">
          Aplicar alteração
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- 2. Bulk Promotion Dialog -->
  <Dialog :open="activeModal === 'promotion'" @update:open="handleOpenUpdate">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Gerenciar promoção em massa</DialogTitle>
        <DialogDescription>
          Aplique um desconto promocional ou remova ofertas dos <strong class="font-semibold text-foreground tabular-nums">{{ selectedProducts.length }}</strong> produtos selecionados.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 min-w-0">
        <ButtonGroup class="w-full">
          <Button type="button" size="sm" class="flex-1 text-xs font-semibold cursor-pointer" :variant="promoMode === 'apply-percent' ? 'default' : 'outline'" :class="promoMode !== 'apply-percent' && 'border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark'" @click="promoMode = 'apply-percent'">
            Aplicar desconto (%)
          </Button>

          <Button type="button" size="sm" class="flex-1 text-xs font-semibold cursor-pointer" :variant="promoMode === 'remove' ? 'default' : 'outline'" :class="promoMode !== 'remove' && 'border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark'" @click="promoMode = 'remove'">
            Remover promoção
          </Button>
        </ButtonGroup>

        <div class="space-y-2.5" v-if="promoMode === 'apply-percent'">
          <Label for="bulk-promo-percent" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Percentual de desconto
          </Label>

          <InputGroup class="h-10">
            <InputGroupInput id="bulk-promo-percent" type="number" min="1" max="90" inputmode="numeric" placeholder="15" class="tabular-nums" v-model="promoPercentInput" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>%</InputGroupText>
            </InputGroupAddon>
          </InputGroup>

          <div class="flex flex-wrap gap-2">
            <button type="button" class="rounded-full border px-3 py-1 text-xs font-semibold transition-colors cursor-pointer" v-for="preset in [ 10, 15, 20, 30 ]" :key="preset" :class="Number( promoPercentInput ) === preset ? 'border-primary bg-primary text-primary-foreground' : 'border-gold-light/50 bg-background text-foreground hover:border-primary hover:text-gold-dark'" @click="promoPercentInput = String( preset )">
              -{{ preset }}%
            </button>
          </div>
        </div>

        <p class="rounded-xl border border-gold-light/35 bg-surface/40 px-3.5 py-3 text-xs text-muted-foreground leading-relaxed" v-else>
          Os produtos selecionados voltarão ao preço original cadastrado e deixarão de exibir o selo de promoção.
        </p>

        <div class="rounded-xl border border-gold-light/30 bg-surface/40 p-3.5 space-y-2" v-if="previewProducts.length > 0 && isPromoValid">
          <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            Prévia da alteração
          </p>

          <ul class="space-y-1.5 text-xs">
            <li class="flex items-center justify-between gap-3 min-w-0" v-for="item in previewProducts" :key="item.id">
              <span class="min-w-0 truncate text-foreground/90">{{ item.name }}</span>
              <span class="shrink-0 tabular-nums font-medium">
                <span class="text-muted-foreground">{{ formatCurrency( item.price ) }}</span>
                <span class="mx-1 text-gold-dark">&rarr;</span>
                <strong class="text-foreground">{{ formatCurrency( calculateNextPromotionPrice( item.price, item.originalPrice, promoMode, parsedPromoPercent ).price ) }}</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" class="rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" @click="closeModal">
          Cancelar
        </Button>

        <Button type="button" class="rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark font-semibold shadow-warm-sm cursor-pointer" :disabled="!isPromoValid" @click="submitPromotion">
          {{ promoMode === 'remove' ? 'Remover promoções' : 'Aplicar promoção' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- 3. Bulk Stock Adjustment Dialog -->
  <Dialog :open="activeModal === 'stock'" @update:open="handleOpenUpdate">
    <DialogContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Ajustar estoque em massa</DialogTitle>
        <DialogDescription>
          Atualize as quantidades em estoque dos <strong class="font-semibold text-foreground tabular-nums">{{ selectedProducts.length }}</strong> produtos selecionados.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 min-w-0">
        <div class="space-y-1.5">
          <Label for="bulk-stock-mode" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Operação de estoque
          </Label>

          <Select v-model="stockMode">
            <SelectTrigger id="bulk-stock-mode" class="h-10 rounded-xl border-gold-light/50 bg-background">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="set">Definir quantidade fixa</SelectItem>
                <SelectItem value="add">Adicionar ao estoque (+)</SelectItem>
                <SelectItem value="subtract">Remover do estoque (-)</SelectItem>
                <SelectItem value="out-of-stock">Marcar como esgotado (0)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="space-y-1.5" v-if="stockMode !== 'out-of-stock'">
          <Label for="bulk-stock-value" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Quantidade
          </Label>

          <InputGroup class="h-10">
            <InputGroupInput id="bulk-stock-value" type="number" min="0" inputmode="numeric" placeholder="10" class="tabular-nums" v-model="stockInput" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>un.</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div class="rounded-xl border border-gold-light/30 bg-surface/40 p-3.5 space-y-2" v-if="previewProducts.length > 0 && isStockValid">
          <p class="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            Prévia do estoque
          </p>

          <ul class="space-y-1.5 text-xs">
            <li class="flex items-center justify-between gap-3 min-w-0" v-for="item in previewProducts" :key="item.id">
              <span class="min-w-0 truncate text-foreground/90">{{ item.name }}</span>
              <span class="shrink-0 tabular-nums font-medium">
                <span class="text-muted-foreground">{{ item.stock }} un.</span>
                <span class="mx-1 text-gold-dark">&rarr;</span>
                <strong class="text-foreground">{{ calculateNextStock( item.stock, stockMode, parsedStockValue ) }} un.</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" class="rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" @click="closeModal">
          Cancelar
        </Button>

        <Button type="button" class="rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark font-semibold shadow-warm-sm cursor-pointer" :disabled="!isStockValid" @click="submitStock">
          Atualizar estoque
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- 4. Bulk Category Reassignment Dialog -->
  <Dialog :open="activeModal === 'category'" @update:open="handleOpenUpdate">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Alterar categoria em massa</DialogTitle>
        <DialogDescription>
          Mova os <strong class="font-semibold text-foreground tabular-nums">{{ selectedProducts.length }}</strong> produtos selecionados para uma nova categoria.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4">
        <div class="space-y-1.5">
          <Label for="bulk-category-select" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Categoria
          </Label>

          <Select v-model="selectedCategorySlug">
            <SelectTrigger id="bulk-category-select" class="h-10 rounded-xl border-gold-light/50 bg-background">
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
          <Label for="bulk-subcategory-select" class="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Subcategoria
          </Label>

          <Select v-model="selectedSubCategorySlug">
            <SelectTrigger id="bulk-subcategory-select" class="h-10 rounded-xl border-gold-light/50 bg-background">
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

      <DialogFooter>
        <Button type="button" variant="outline" class="rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer" @click="closeModal">
          Cancelar
        </Button>

        <Button type="button" class="rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark font-semibold shadow-warm-sm cursor-pointer" :disabled="!selectedCategorySlug || !selectedSubCategorySlug" @click="submitCategory">
          Mover produtos
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- 5. Single / Bulk Delete Confirmation AlertDialog -->
  <AlertDialog :open="activeModal === 'delete'" @update:open="handleOpenUpdate">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ singleDeleteTarget ? 'Excluir produto?' : `Excluir ${ selectedProducts.length } ${ selectedProducts.length === 1 ? 'produto selecionado' : 'produtos selecionados' }?` }}
        </AlertDialogTitle>

        <AlertDialogDescription v-if="singleDeleteTarget">
          Tem certeza que deseja excluir <strong class="font-semibold text-foreground">{{ singleDeleteTarget.name }}</strong> ({{ singleDeleteTarget.sku }})? <strong class="font-semibold text-destructive">Esta ação é permanente e não poderá ser desfeita.</strong>
        </AlertDialogDescription>

        <AlertDialogDescription v-else>
          Tem certeza que deseja excluir os <strong class="font-semibold text-foreground tabular-nums">{{ selectedProducts.length }}</strong> produtos selecionados? <strong class="font-semibold text-destructive">Esta ação é permanente e não poderá ser desfeita.</strong>
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction variant="destructive" @click="emit( 'confirmDelete' )">
          Excluir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { Button } from '@sagrada-familia/ui/button';
  import { Label } from '@sagrada-familia/ui/label';
  import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@sagrada-familia/ui/select';
  import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
  import { ButtonGroup } from '@/components/ui/button-group';
  import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
  import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group';
  import { calculateNextPrice, calculateNextPromotionPrice, calculateNextStock, type BulkPriceMode, type BulkPromotionMode, type BulkStockMode } from '@/composables/useProductsTable';
  import { adminCategories, formatCurrency, getCategoryBySlug, type AdminProduct } from '@/data/products';

  export type BulkModalType = 'price' | 'promotion' | 'stock' | 'category' | 'delete' | null;

  const props = defineProps<{
    activeModal: BulkModalType;
    selectedProducts: AdminProduct[];
    singleDeleteTarget: AdminProduct | null;
  }>();

  const emit = defineEmits<{
    'update:activeModal': [ value: BulkModalType ];
    confirmPrice: [ mode: BulkPriceMode, value: number ];
    confirmPromotion: [ mode: BulkPromotionMode, discountPercent: number ];
    confirmStock: [ mode: BulkStockMode, value: number ];
    confirmCategory: [ categorySlug: string, subCategorySlug: string ];
    confirmDelete: [];
  }>();

  const defaultCategory = adminCategories[ 0 ];
  const defaultCategorySlug = defaultCategory?.slug ?? '';
  const defaultSubCategorySlug = defaultCategory?.subCategories[ 0 ]?.slug ?? '';

  // Local draft state for modals
  const priceMode = ref<BulkPriceMode>( 'increase-percent' );
  const priceInput = ref<string>( '10' );

  const promoMode = ref<BulkPromotionMode>( 'apply-percent' );
  const promoPercentInput = ref<string>( '15' );

  const stockMode = ref<BulkStockMode>( 'set' );
  const stockInput = ref<string>( '10' );

  const selectedCategorySlug = ref<string>( defaultCategorySlug );
  const selectedSubCategorySlug = ref<string>( defaultSubCategorySlug );

  const previewProducts = computed( () => props.selectedProducts.slice( 0, 3 ) );

  // Price validation
  const isPricePercentMode = computed( () => priceMode.value === 'increase-percent' || priceMode.value === 'decrease-percent' );
  const parsedPriceValue = computed( () => Number( priceInput.value ) );
  const isPriceValid = computed( () => {
    if ( priceInput.value.trim().length === 0 || !Number.isFinite( parsedPriceValue.value ) || parsedPriceValue.value <= 0 ) {
      return false;
    }

    if ( priceMode.value === 'decrease-percent' && parsedPriceValue.value >= 100 ) {
      return false;
    }

    return true;
  } );

  // Promotion validation
  const parsedPromoPercent = computed( () => Number( promoPercentInput.value ) );
  const isPromoValid = computed( () => {
    if ( promoMode.value === 'remove' ) {
      return true;
    }

    return promoPercentInput.value.trim().length > 0 && Number.isFinite( parsedPromoPercent.value ) && parsedPromoPercent.value >= 1 && parsedPromoPercent.value <= 90;
  } );

  // Stock validation
  const parsedStockValue = computed( () => Number( stockInput.value ) );
  const isStockValid = computed( () => {
    if ( stockMode.value === 'out-of-stock' ) {
      return true;
    }

    return stockInput.value.trim().length > 0 && Number.isFinite( parsedStockValue.value ) && parsedStockValue.value >= 0;
  } );

  // Cascading subcategories
  const availableSubCategories = computed( () => {
    return getCategoryBySlug( selectedCategorySlug.value )?.subCategories ?? [];
  } );

  watch( selectedCategorySlug, ( nextSlug ) => {
    const firstSub = getCategoryBySlug( nextSlug )?.subCategories[ 0 ]?.slug ?? '';
    selectedSubCategorySlug.value = firstSub;
  } );

  watch( () => props.activeModal, ( modal ) => {
    if ( modal === 'price' ) {
      priceMode.value = 'increase-percent';
      priceInput.value = '10';
    } else if ( modal === 'promotion' ) {
      promoMode.value = 'apply-percent';
      promoPercentInput.value = '15';
    } else if ( modal === 'stock' ) {
      stockMode.value = 'set';
      stockInput.value = '10';
    } else if ( modal === 'category' ) {
      selectedCategorySlug.value = defaultCategorySlug;
      selectedSubCategorySlug.value = defaultSubCategorySlug;
    }
  } );

  const handleOpenUpdate = ( open: boolean ) => {
    if ( !open ) {
      emit( 'update:activeModal', null );
    }
  };

  const closeModal = () => {
    emit( 'update:activeModal', null );
  };

  const submitPrice = () => {
    if ( isPriceValid.value ) {
      emit( 'confirmPrice', priceMode.value, parsedPriceValue.value );
    }
  };

  const submitPromotion = () => {
    if ( isPromoValid.value ) {
      emit( 'confirmPromotion', promoMode.value, Math.round( parsedPromoPercent.value ) );
    }
  };

  const submitStock = () => {
    if ( isStockValid.value ) {
      emit( 'confirmStock', stockMode.value, parsedStockValue.value );
    }
  };

  const submitCategory = () => {
    if ( selectedCategorySlug.value && selectedSubCategorySlug.value ) {
      emit( 'confirmCategory', selectedCategorySlug.value, selectedSubCategorySlug.value );
    }
  };
</script>
