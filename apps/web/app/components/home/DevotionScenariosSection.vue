<template>
  <section class="w-full bg-background surface-linen py-14 sm:py-20" aria-labelledby="devotion-scenarios-heading">
    <div class="relative z-10 container mx-auto px-4">
      <SectionHeader heading-id="devotion-scenarios-heading" eyebrow="Monte o Conjunto" title="Cenários de Devoção" subtitle="Tudo o que a intenção pede, reunido em um só lugar para inspirar a sua oração em família." align="center" ornament v-reveal />

      <div class="space-y-12 sm:space-y-14">
        <article class="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12" v-for="( scenario, scenarioIndex ) in devotionScenarios" :key="scenario.id" v-reveal :class="scenarioIndex > 0 ? 'pt-12 sm:pt-14 border-t border-gold-light/25' : ''">
          <div class="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-dark-deep shadow-warm-md" :class="[ 'lg:col-span-6', scenarioIndex % 2 === 1 ? 'lg:order-2' : '' ]">
            <img class="w-full h-full object-cover" loading="lazy" :src="scenario.imageUrl" :alt="scenario.imageAlt" />

            <div class="absolute inset-0 bg-gradient-to-b from-dark-deep/80 via-dark/20 to-dark-deep/55" aria-hidden="true" />

            <div class="absolute inset-x-0 top-0 p-5 sm:p-7 text-background pointer-events-none">
              <span class="block text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-bright">
                {{ scenario.eyebrow }}
              </span>
              <h3 class="mt-1.5 font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-background drop-shadow-sm">
                {{ scenario.title }}
              </h3>
            </div>

            <button type="button" class="group/pin absolute -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright cursor-pointer" v-for="( product, index ) in scenario.products" :key="`${ scenario.id }-pin-${ product.id }`" :aria-label="`Destacar item ${ index + 1 }: ${ product.name }`" :style="getHotspotStyle( scenario, index )" @mouseenter="setActiveProduct( scenario.id, index )" @focus="setActiveProduct( scenario.id, index )" @click="toggleActiveProduct( scenario.id, index )">
              <span class="absolute inset-0 rounded-full bg-gold-bright/65 animate-hotspot-pulse motion-reduce:animate-none pointer-events-none" aria-hidden="true" />
              <span class="relative w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center tabular-nums shadow-warm-md transition-all duration-200" :class="activeProductByScenario[ scenario.id ] === index ? 'bg-primary text-primary-foreground scale-110 ring-4 ring-gold-bright/45' : 'bg-card/95 text-foreground border border-gold-light/60 group-hover/pin:bg-primary group-hover/pin:text-primary-foreground'">
                {{ index + 1 }}
              </span>
            </button>

            <div class="absolute bottom-3.5 left-4 right-4 z-10 flex items-center justify-between gap-2 pointer-events-none">
              <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-deep/80 backdrop-blur-md border border-gold-light/30 text-[11px] font-medium text-background/95 truncate max-w-full" v-if="getActiveProduct( scenario )">
                {{ getActiveProduct( scenario )?.name }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-deep/65 backdrop-blur-md border border-gold-light/20 text-[11px] text-gold-bright/95" v-else>
                Toque nos pontos para explorar os itens
              </span>
            </div>
          </div>

          <div :class="[ 'lg:col-span-6', scenarioIndex % 2 === 1 ? 'lg:order-1' : '' ]">
            <ol class="divide-y divide-border/80">
              <li class="group/row flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3.5 py-4 px-3 -mx-3 rounded-xl transition-colors duration-200" v-for="( product, index ) in scenario.products" :key="product.id" :class="activeProductByScenario[ scenario.id ] === index ? 'bg-surface/85' : 'hover:bg-surface/50'" @mouseenter="setActiveProduct( scenario.id, index )" @mouseleave="clearActiveProduct( scenario.id )" @focusin="setActiveProduct( scenario.id, index )" @focusout="clearActiveProduct( scenario.id )">
                <div class="flex items-center gap-3 min-w-0 flex-1">
                  <span class="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 tabular-nums transition-colors duration-200" :class="activeProductByScenario[ scenario.id ] === index ? 'bg-primary text-primary-foreground' : 'bg-surface text-gold-dark border border-gold-light/40'">
                    {{ index + 1 }}
                  </span>

                  <NuxtLink class="relative block w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-surface/70 border border-border/80 shrink-0" :to="`/p/${ product.slug }`">
                    <img class="w-full h-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover/row:scale-105 motion-reduce:group-hover/row:scale-100" loading="lazy" :src="product.imageUrl" :alt="product.imageAlt" />
                  </NuxtLink>

                  <NuxtLink class="min-w-0 flex-1 text-xs sm:text-sm font-medium text-foreground leading-snug line-clamp-2 hover:text-gold-dark transition-colors focus:outline-none focus-visible:underline" :to="`/p/${ product.slug }`">
                    {{ product.name }}
                  </NuxtLink>
                </div>

                <div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-9 sm:pl-0 shrink-0">
                  <div class="text-left sm:text-right">
                    <span class="block text-[11px] text-muted-foreground line-through leading-tight tabular-nums" v-if="product.originalPrice && product.originalPrice > product.price">
                      {{ formatCurrency( product.originalPrice ) }}
                    </span>

                    <p class="text-xs sm:text-sm font-bold text-gold-dark leading-tight whitespace-nowrap tabular-nums">
                      {{ formatCurrency( getPixPrice( product.price ) ) }}
                      <span class="text-[11px] font-medium text-muted-foreground">no PIX</span>
                    </p>

                    <p class="text-[11px] text-muted-foreground leading-tight whitespace-nowrap tabular-nums">
                      ou <span class="font-semibold text-foreground">{{ product.maxInstallments }}x</span> de <span class="font-semibold text-foreground">{{ formatCurrency( getInstallmentPrice( product.price, product.maxInstallments ) ) }}</span> sem juros
                    </p>
                  </div>

                  <Button type="button" variant="outline" size="sm" class="rounded-full font-semibold shadow-none cursor-pointer shrink-0 transition-all duration-200" :class="addedProductIds[ product.id ] ? 'bg-dark text-background border-dark hover:bg-dark hover:text-background' : 'bg-transparent text-gold-dark border-primary/40 hover:bg-primary hover:text-primary-foreground hover:border-primary'" @click="handleAddSingle( product.id )">
                    <Check class="size-3.5" v-if="addedProductIds[ product.id ]" />
                    <ShoppingCart class="size-3.5" v-else />
                    <span>{{ addedProductIds[ product.id ] ? 'Adicionado' : 'Adicionar' }}</span>
                  </Button>
                </div>
              </li>
            </ol>

            <div class="mt-4 pt-5 border-t border-gold-light/35 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span class="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Conjunto completo ({{ scenario.products.length }} peças)
                </span>
                <p class="mt-0.5 text-lg font-bold text-gold-dark tabular-nums">
                  {{ formatCurrency( getScenarioPixTotal( scenario ) ) }}
                  <span class="text-xs font-medium text-muted-foreground">no PIX</span>
                </p>
              </div>

              <Button type="button" size="lg" class="rounded-full font-semibold btn-sheen cursor-pointer shadow-warm-sm" :class="addedScenarioIds[ scenario.id ] ? 'bg-dark text-background hover:bg-dark' : 'bg-primary text-primary-foreground hover:bg-gold-dark'" @click="handleAddScenario( scenario )">
                <Check class="w-4 h-4" v-if="addedScenarioIds[ scenario.id ]" />
                <ShoppingCart class="w-4 h-4" v-else />
                <span>{{ addedScenarioIds[ scenario.id ] ? 'Conjunto adicionado' : 'Adicionar conjunto completo' }}</span>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onUnmounted, ref } from 'vue';
  import { Check, ShoppingCart } from '@lucide/vue';
  import SectionHeader from '@/components/home/SectionHeader.vue';
  import { Button } from '@sagrada-familia/ui/button';
  import { useCartPreview } from '@/composables/useCartPreview';
  import { devotionScenarios, formatCurrency, getInstallmentPrice, getPixPrice, type DevotionScenario, type Product } from '@/data/products';

  const { addToCart } = useCartPreview();

  const activeProductByScenario = ref<Record<string, number | undefined>>( {} );
  const addedProductIds = ref<Record<string, boolean>>( {} );
  const addedScenarioIds = ref<Record<string, boolean>>( {} );
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  const getHotspotStyle = ( scenario: DevotionScenario, index: number ) => {
    const hotspot = scenario.hotspots?.[ index ];
    if ( !hotspot ) {
      return { display: 'none' };
    }

    return {
      left: `${ hotspot.x }%`,
      top: `${ hotspot.y }%`
    };
  };

  const setActiveProduct = ( scenarioId: string, index: number ) => {
    activeProductByScenario.value[ scenarioId ] = index;
  };

  const clearActiveProduct = ( scenarioId: string ) => {
    activeProductByScenario.value[ scenarioId ] = undefined;
  };

  const toggleActiveProduct = ( scenarioId: string, index: number ) => {
    activeProductByScenario.value[ scenarioId ] = activeProductByScenario.value[ scenarioId ] === index ? undefined : index;
  };

  const getActiveProduct = ( scenario: DevotionScenario ): Product | null => {
    const activeIndex = activeProductByScenario.value[ scenario.id ];
    if ( activeIndex === undefined ) {
      return null;
    }

    return scenario.products[ activeIndex ] ?? null;
  };

  const getScenarioPixTotal = ( scenario: DevotionScenario ): number => {
    return scenario.products.reduce( ( sum, product ) => sum + getPixPrice( product.price ), 0 );
  };

  const scheduleFeedbackReset = ( key: string, resetCallback: () => void ) => {
    const existing = timers.get( key );
    if ( existing ) {
      clearTimeout( existing );
    }

    timers.set(
      key,
      setTimeout( () => {
        resetCallback();
        timers.delete( key );
      }, 1600 )
    );
  };

  const handleAddSingle = ( productId: string ) => {
    addToCart( 1 );
    addedProductIds.value[ productId ] = true;
    scheduleFeedbackReset( `prod:${ productId }`, () => {
      addedProductIds.value[ productId ] = false;
    } );
  };

  const handleAddScenario = ( scenario: DevotionScenario ) => {
    addToCart( scenario.products.length );
    addedScenarioIds.value[ scenario.id ] = true;
    scheduleFeedbackReset( `scenario:${ scenario.id }`, () => {
      addedScenarioIds.value[ scenario.id ] = false;
    } );
  };

  onUnmounted( () => {
    for ( const timer of timers.values() ) {
      clearTimeout( timer );
    }
    timers.clear();
  } );
</script>
