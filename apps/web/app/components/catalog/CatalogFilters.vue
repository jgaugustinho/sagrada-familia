<template>
  <Accordion class="w-full" type="multiple" v-model="openSections">
    <!-- Primary Filter: Subcategorias (Single Category) or Categorias (Mixed Collection) -->
    <AccordionItem class="border-b border-border/80" value="primary" v-if="context.primaryFilterOptions.length > 0">
      <AccordionTrigger class="py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-foreground hover:no-underline hover:text-gold-dark cursor-pointer">
        <span>{{ context.primaryFilterTitle }}</span>
      </AccordionTrigger>

      <AccordionContent class="pb-4">
        <ul class="space-y-1.5">
          <li v-for="option in context.primaryFilterOptions" :key="option.slug">
            <label class="group flex items-center justify-between gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-surface/75 cursor-pointer" :for="`${ idPrefix }-primary-${ option.slug }`">
              <span class="flex items-center gap-2.5 min-w-0">
                <Checkbox :id="`${ idPrefix }-primary-${ option.slug }`" :model-value="selectedPrimary.includes( option.slug )" @update:model-value="emit( 'togglePrimary', option.slug )" />
                <span class="truncate transition-colors" :class="selectedPrimary.includes( option.slug ) ? 'font-semibold text-gold-dark' : 'text-foreground/90 group-hover:text-gold-dark'">
                  {{ option.label }}
                </span>
              </span>

              <span class="text-xs tabular-nums shrink-0 rounded-full px-1.5 py-0.5 transition-colors" :class="selectedPrimary.includes( option.slug ) ? 'bg-primary/15 text-gold-dark font-semibold' : 'text-muted-foreground'">
                {{ primaryCounts[ option.slug ] ?? 0 }}
              </span>
            </label>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>

    <!-- Devotion Filter (Shown on /c/devocionais mixed catalog) -->
    <AccordionItem class="border-b border-border/80" value="devotion" v-if="context.showDevotionFilter && context.devotionOptions.length > 0">
      <AccordionTrigger class="py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-foreground hover:no-underline hover:text-gold-dark cursor-pointer">
        <span>Devoção</span>
      </AccordionTrigger>

      <AccordionContent class="pb-4">
        <ul class="space-y-1 max-h-56 overflow-y-auto pr-1">
          <li v-for="option in context.devotionOptions" :key="option.slug">
            <label class="group flex items-center justify-between gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-surface/75 cursor-pointer" :for="`${ idPrefix }-devotion-${ option.slug }`">
              <span class="flex items-center gap-2.5 min-w-0">
                <Checkbox :id="`${ idPrefix }-devotion-${ option.slug }`" :model-value="selectedDevotions.includes( option.slug )" @update:model-value="emit( 'toggleDevotion', option.slug )" />
                <span class="truncate transition-colors" :class="selectedDevotions.includes( option.slug ) ? 'font-semibold text-gold-dark' : 'text-foreground/90 group-hover:text-gold-dark'">
                  {{ option.label }}
                </span>
              </span>

              <span class="text-xs tabular-nums shrink-0 rounded-full px-1.5 py-0.5 transition-colors" :class="selectedDevotions.includes( option.slug ) ? 'bg-primary/15 text-gold-dark font-semibold' : 'text-muted-foreground'">
                {{ devotionCounts[ option.slug ] ?? 0 }}
              </span>
            </label>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>

    <!-- Price Range Filter (Dual-Thumb Slider + Manual Min/Max Inputs) -->
    <AccordionItem class="border-b border-border/80 last:border-b-0" value="price">
      <AccordionTrigger class="py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-foreground hover:no-underline hover:text-gold-dark cursor-pointer">
        <span>Faixa de Preço</span>
      </AccordionTrigger>

      <AccordionContent class="pb-4 pt-2">
        <div class="px-1.5">
          <Slider aria-label="Faixa de preço" :min="priceBounds[ 0 ]" :max="priceBounds[ 1 ]" :step="1" :min-steps-between-thumbs="1" :model-value="sliderModelValue" @update:model-value="handleSliderUpdate" @value-commit="emit( 'commitPriceRange' )" />

          <div class="mt-2 flex items-center justify-between text-[11px] text-muted-foreground tabular-nums">
            <span>{{ formatSliderBound( priceBounds[ 0 ] ) }}</span>
            <span>{{ formatSliderBound( priceBounds[ 1 ] ) }}</span>
          </div>
        </div>

        <div class="mt-3.5 grid grid-cols-2 gap-2.5">
          <div>
            <label class="block text-[11px] font-medium text-muted-foreground mb-1" :for="`${ idPrefix }-price-min`">
              Mínimo
            </label>
            <div class="relative">
              <span class="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                R$
              </span>
              <Input type="number" inputmode="numeric" class="pl-8 pr-2 h-9 text-xs sm:text-sm tabular-nums" :id="`${ idPrefix }-price-min`" :min="0" :max="priceBounds[ 1 ]" :model-value="minDraft" @update:model-value="minDraft = String( $event )" @blur="commitMinInput" @keydown.enter="handleEnterCommit( $event, commitMinInput )" />
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-medium text-muted-foreground mb-1" :for="`${ idPrefix }-price-max`">
              Máximo
            </label>
            <div class="relative">
              <span class="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                R$
              </span>
              <Input type="number" inputmode="numeric" class="pl-8 pr-2 h-9 text-xs sm:text-sm tabular-nums" :id="`${ idPrefix }-price-max`" :min="0" :max="priceBounds[ 1 ]" :model-value="maxDraft" @update:model-value="maxDraft = String( $event )" @blur="commitMaxInput" @keydown.enter="handleEnterCommit( $event, commitMaxInput )" />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

    <!-- Technical Attribute Filters (Strictly Single-Category Pages Only) -->
    <AccordionItem class="border-b border-border/80 last:border-b-0" v-for="group in context.attributeGroups" :key="group.id" :value="`attr-${ group.id }`">
      <AccordionTrigger class="py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-foreground hover:no-underline hover:text-gold-dark cursor-pointer">
        <span>{{ group.title }}</span>
      </AccordionTrigger>

      <AccordionContent class="pb-4">
        <div class="flex flex-wrap gap-2" v-if="group.display === 'pill'">
          <button type="button" class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="option in group.options" :key="option.slug" :class="( selectedAttributes[ group.id ] ?? [] ).includes( option.slug ) ? 'bg-primary text-primary-foreground border-primary font-semibold shadow-warm-sm' : 'bg-background text-foreground border-gold-light/55 hover:border-primary hover:text-gold-dark'" :aria-pressed="( selectedAttributes[ group.id ] ?? [] ).includes( option.slug )" @click="emit( 'toggleAttribute', group.id, option.slug )">
            <span>{{ option.label }}</span>
            <span class="text-[11px] tabular-nums opacity-75">({{ attributeCounts[ group.id ]?.[ option.slug ] ?? 0 }})</span>
          </button>
        </div>

        <ul class="space-y-1.5" v-else>
          <li v-for="option in group.options" :key="option.slug">
            <label class="group flex items-center justify-between gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-surface/75 cursor-pointer" :for="`${ idPrefix }-attr-${ group.id }-${ option.slug }`">
              <span class="flex items-center gap-2.5 min-w-0">
                <Checkbox :id="`${ idPrefix }-attr-${ group.id }-${ option.slug }`" :model-value="( selectedAttributes[ group.id ] ?? [] ).includes( option.slug )" @update:model-value="emit( 'toggleAttribute', group.id, option.slug )" />
                <span class="truncate transition-colors" :class="( selectedAttributes[ group.id ] ?? [] ).includes( option.slug ) ? 'font-semibold text-gold-dark' : 'text-foreground/90 group-hover:text-gold-dark'">
                  {{ option.label }}
                </span>
              </span>

              <span class="text-xs tabular-nums shrink-0 rounded-full px-1.5 py-0.5 transition-colors" :class="( selectedAttributes[ group.id ] ?? [] ).includes( option.slug ) ? 'bg-primary/15 text-gold-dark font-semibold' : 'text-muted-foreground'">
                {{ attributeCounts[ group.id ]?.[ option.slug ] ?? 0 }}
              </span>
            </label>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@sagrada-familia/ui/accordion';
  import { Checkbox } from '@sagrada-familia/ui/checkbox';
  import { Input } from '@sagrada-familia/ui/input';
  import { Slider } from '@/components/ui/slider';
  import type { CatalogContext } from '@/data/catalog';

  const formatSliderBound = ( value: number ): string => {
    return new Intl.NumberFormat( 'pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    } ).format( value );
  };

  const props = defineProps<{
    context: CatalogContext;
    primaryCounts: Record<string, number>;
    devotionCounts: Record<string, number>;
    attributeCounts: Record<string, Record<string, number>>;
    priceBounds: [ number, number ];
    selectedPrimary: string[];
    selectedDevotions: string[];
    selectedAttributes: Record<string, string[]>;
    priceRange: [ number, number ];
    idPrefix: string;
  }>();

  const emit = defineEmits<{
    ( e: 'togglePrimary' | 'toggleDevotion', slug: string ): void;
    ( e: 'toggleAttribute', groupId: string, optionSlug: string ): void;
    ( e: 'update:priceRange', range: [ number, number ] ): void;
    ( e: 'commitPriceRange' ): void;
  }>();

  const buildDefaultOpenSections = ( ctx: CatalogContext ): string[] => {
    return [
      'primary',
      'devotion',
      'price',
      ...ctx.attributeGroups.map( ( group ) => `attr-${ group.id }` )
    ];
  };

  const openSections = ref<string[]>( buildDefaultOpenSections( props.context ) );

  const minDraft = ref<string>( String( props.priceRange[ 0 ] ) );
  const maxDraft = ref<string>( String( props.priceRange[ 1 ] ) );

  const sliderModelValue = computed<[ number, number ]>( () => {
    const [ boundMin, boundMax ] = props.priceBounds;
    const clampedMin = Math.max( boundMin, Math.min( props.priceRange[ 0 ], boundMax ) );
    const clampedMax = Math.max( clampedMin, Math.min( props.priceRange[ 1 ], boundMax ) );
    return [ clampedMin, clampedMax ];
  } );

  watch(
    () => [ props.context.slug, props.context.subslug ],
    () => {
      openSections.value = buildDefaultOpenSections( props.context );
    }
  );

  watch(
    () => props.priceRange,
    ( nextRange ) => {
      minDraft.value = String( nextRange[ 0 ] );
      maxDraft.value = String( nextRange[ 1 ] );
    },
    { deep: true }
  );

  const handleSliderUpdate = ( payload: number[] | undefined ) => {
    if ( !payload || payload.length < 2 ) {
      return;
    }

    const first = payload[ 0 ] ?? props.priceBounds[ 0 ];
    const second = payload[ 1 ] ?? props.priceBounds[ 1 ];
    emit( 'update:priceRange', [ Math.min( first, second ), Math.max( first, second ) ] );
  };

  const commitMinInput = () => {
    const [ , boundMax ] = props.priceBounds;
    const currentMax = props.priceRange[ 1 ];
    const parsed = Number.parseFloat( minDraft.value );

    if ( Number.isNaN( parsed ) ) {
      minDraft.value = String( props.priceRange[ 0 ] );
      return;
    }

    const clamped = Math.min( boundMax, Math.max( 0, Math.round( parsed ) ) );
    minDraft.value = String( clamped );
    if ( clamped !== props.priceRange[ 0 ] ) {
      emit( 'update:priceRange', [ clamped, currentMax ] );
      emit( 'commitPriceRange' );
    }
  };

  const commitMaxInput = () => {
    const [ _, boundMax ] = props.priceBounds;
    const currentMin = props.priceRange[ 0 ];
    const parsed = Number.parseFloat( maxDraft.value );

    if ( Number.isNaN( parsed ) ) {
      maxDraft.value = String( props.priceRange[ 1 ] );
      return;
    }

    const clamped = Math.min( boundMax, Math.max( 0, Math.round( parsed ) ) );
    maxDraft.value = String( clamped );
    if ( clamped !== props.priceRange[ 1 ] ) {
      emit( 'update:priceRange', [ currentMin, clamped ] );
      emit( 'commitPriceRange' );
    }
  };

  const handleEnterCommit = ( event: KeyboardEvent, commitFn: () => void ) => {
    commitFn();
    ( event.target as HTMLInputElement | null )?.blur();
  };
</script>
