<template>
  <div class="space-y-4">
    <div v-for="group in groups" :key="group.id">
      <div class="flex items-center justify-between gap-2 mb-2.5">
        <span class="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {{ group.label }}:
          <strong class="normal-case tracking-normal font-semibold text-foreground ml-1">
            {{ getSelectedOption( group )?.label ?? '' }}
          </strong>
        </span>
      </div>

      <!-- Visual Swatch Selector -->
      <div role="radiogroup" class="flex flex-wrap items-center gap-3" v-if="group.type === 'swatch'" :aria-label="group.label">
        <button type="button" role="radio" class="group/swatch relative w-9 h-9 rounded-full border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="option in group.options" :key="option.id" :title="option.inStock ? option.label : `${ option.label } (Indisponível)`" :aria-label="option.inStock ? option.label : `${ option.label } — Indisponível`" :aria-checked="selectedOptions[ group.id ] === option.id" :disabled="!option.inStock" :class="[ selectedOptions[ group.id ] === option.id ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 shadow-warm-sm' : 'border-gold-light/60 hover:scale-105 hover:border-primary', option.inStock ? 'cursor-pointer' : 'opacity-45 cursor-not-allowed' ]" :style="getSwatchStyle( option )" @click="selectOption( group.id, option )">
          <span class="sr-only">{{ option.label }}</span>
          <span class="absolute inset-0 flex items-center justify-center pointer-events-none" v-if="!option.inStock">
            <span class="w-8 h-[1.5px] bg-destructive rotate-45 rounded-full" />
          </span>
        </button>
      </div>

      <!-- Architectural Pill Selector -->
      <div role="radiogroup" class="flex flex-wrap items-center gap-2" v-else :aria-label="group.label">
        <button type="button" role="radio" class="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs sm:text-[13px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="option in group.options" :key="option.id" :aria-checked="selectedOptions[ group.id ] === option.id" :disabled="!option.inStock" :class="[ selectedOptions[ group.id ] === option.id ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-warm-sm' : 'bg-card/90 text-foreground border-border hover:border-primary hover:text-gold-dark', option.inStock ? 'cursor-pointer' : 'opacity-50 line-through cursor-not-allowed bg-surface/60 hover:border-border hover:text-foreground' ]" @click="selectOption( group.id, option )">
          <span>{{ option.label }}</span>
          <span class="text-[11px] opacity-80 tabular-nums" v-if="!option.inStock">
            (Esgotado)
          </span>
          <span class="text-[11px] tabular-nums" v-else-if="option.priceDelta !== 0" :class="selectedOptions[ group.id ] === option.id ? 'text-primary-foreground/85' : 'text-muted-foreground'">
            {{ option.priceDelta > 0 ? `+${ formatCurrency( option.priceDelta ) }` : formatCurrency( option.priceDelta ) }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { formatCurrency } from '@/data/products';
  import type { ProductVariationGroup, ProductVariationOption } from '@/data/product-details';

  const props = defineProps<{
    groups: ProductVariationGroup[];
    selectedOptions: Record<string, string>;
  }>();

  const emit = defineEmits<{
    ( e: 'select', groupId: string, optionId: string ): void;
  }>();

  const getSelectedOption = ( group: ProductVariationGroup ): ProductVariationOption | undefined => {
    const selectedId = props.selectedOptions[ group.id ];
    return group.options.find( ( opt ) => opt.id === selectedId ) ?? group.options[ 0 ];
  };

  const getSwatchStyle = ( option: ProductVariationOption ) => {
    const primary = option.swatchHex ?? '#89692C';
    if ( option.swatchAccentHex ) {
      return {
        background: `linear-gradient(135deg, ${ primary } 58%, ${ option.swatchAccentHex } 58%)`
      };
    }

    return { backgroundColor: primary };
  };

  const selectOption = ( groupId: string, option: ProductVariationOption ) => {
    if ( !option.inStock ) {
      return;
    }

    emit( 'select', groupId, option.id );
  };
</script>
