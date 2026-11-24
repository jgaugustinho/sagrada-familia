<template>
  <div class="rounded-2xl bg-surface/65 border border-gold-light/35 p-4 sm:p-5">
    <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
      <div class="flex items-center gap-2">
        <Truck class="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
        <h2 class="text-xs font-bold uppercase tracking-[0.14em] text-foreground">
          Calcular Frete e Prazo
        </h2>
      </div>

      <a target="_blank" rel="noopener noreferrer" class="link-editorial text-[11px] font-semibold text-gold-dark hover:text-primary transition-colors" href="https://buscacepinter.correios.com.br/app/endereco/index.php">
        Não sei meu CEP
      </a>
    </div>

    <!-- CEP Input Form -->
    <form class="flex items-center gap-2" @submit.prevent="handleCalculate">
      <div class="relative flex-1">
        <label class="sr-only" for="product-cep-input">CEP de entrega</label>
        <input id="product-cep-input" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="9" placeholder="00000-000" class="flex h-10 w-full rounded-xl border border-gold-light/50 bg-background px-3.5 py-2 text-sm font-medium text-foreground tabular-nums shadow-warm-sm transition-colors placeholder:text-muted-foreground/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary" :value="cepInput" :aria-invalid="Boolean( cepError )" @input="handleCepInput" />
      </div>

      <Button type="submit" variant="outline" class="h-10 px-4 sm:px-5 rounded-xl border-primary/45 bg-background text-gold-dark hover:bg-primary hover:text-primary-foreground hover:border-primary text-xs sm:text-sm font-semibold shadow-warm-sm transition-colors cursor-pointer shrink-0" :disabled="isCalculating">
        <Loader2 class="w-4 h-4 animate-spin" aria-hidden="true" v-if="isCalculating" />
        <span>{{ isCalculating ? 'Calculando' : 'Calcular' }}</span>
      </Button>
    </form>

    <p class="mt-2 text-xs text-destructive font-medium" role="alert" v-if="cepError">
      {{ cepError }}
    </p>

    <!-- Free Shipping Threshold Hint (shown before or after quote when below threshold) -->
    <div class="mt-3 rounded-xl bg-background/80 border border-gold-light/30 px-3 py-2.5" v-if="quote">
      <div class="flex items-center justify-between gap-2 text-xs">
        <div class="flex items-center gap-1.5 min-w-0">
          <MapPin class="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
          <span class="text-muted-foreground truncate">
            Entrega para <strong class="font-semibold text-foreground">{{ quote.cityLabel }}</strong> ({{ quote.cepFormatted }})
          </span>
        </div>

        <button type="button" class="text-[11px] font-semibold text-gold-dark hover:text-primary underline-offset-2 hover:underline shrink-0 cursor-pointer" @click="clearQuote">
          Alterar
        </button>
      </div>

      <!-- Free Shipping Progress -->
      <div class="mt-2.5 pt-2.5 border-t border-border/70" v-if="quote.remainingForFreeShipping > 0">
        <p class="text-[11px] text-muted-foreground leading-snug tabular-nums">
          Faltam <strong class="font-semibold text-gold-dark">{{ formatCurrency( quote.remainingForFreeShipping ) }}</strong> no pedido para liberar <strong class="font-semibold text-foreground">Frete Grátis</strong> no envio econômico.
        </p>
        <div class="mt-1.5 h-1.5 w-full rounded-full bg-surface-warm overflow-hidden" aria-hidden="true">
          <div class="h-full rounded-full bg-primary transition-all duration-300" :style="{ width: `${ freeProgressPercent }%` }" />
        </div>
      </div>

      <div class="mt-2.5 pt-2.5 border-t border-border/70 flex items-center gap-1.5 text-[11px] font-medium text-gold-dark" v-else>
        <Sparkles class="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
        <span>Parabéns! Frete Grátis desbloqueado no envio econômico (ou escolha outra modalidade abaixo).</span>
      </div>
    </div>

    <!-- Shipping Options Radio List -->
    <div role="radiogroup" aria-label="Modalidades de envio disponíveis" class="mt-3 space-y-2" v-if="quote">
      <button type="button" role="radio" class="w-full text-left rounded-xl border px-3.5 py-3 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" v-for="option in quote.options" :key="option.id" :aria-checked="selectedMethodId === option.id" :class="selectedMethodId === option.id ? 'bg-card border-primary shadow-warm-sm ring-1 ring-primary/25' : 'bg-background/75 border-border/80 hover:border-gold-light hover:bg-card/85'" @click="selectedMethodId = option.id">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start gap-2.5 min-w-0">
            <span class="mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors" :class="selectedMethodId === option.id ? 'border-primary bg-primary/10' : 'border-gold-light/70'">
              <span class="w-2 h-2 rounded-full bg-primary" v-if="selectedMethodId === option.id" />
            </span>

            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="text-xs sm:text-[13px] font-semibold text-foreground">
                  {{ option.carrier }}
                </span>
                <span class="text-[11px] text-muted-foreground">
                  · {{ option.service }}
                </span>
                <Badge class="rounded-full px-2 py-0 text-[10px] font-semibold" v-if="option.badge" :class="option.isFree ? 'bg-primary text-primary-foreground hover:bg-primary' : 'bg-surface-warm text-gold-dark hover:bg-surface-warm'">
                  {{ option.badge }}
                </Badge>
              </div>

              <p class="mt-0.5 text-[11px] text-muted-foreground leading-snug">
                Receba em <strong class="font-medium text-foreground">{{ option.deliveryWindow }}</strong>
                <span v-if="option.note"> · {{ option.note }}</span>
              </p>
            </div>
          </div>

          <div class="text-right shrink-0 tabular-nums">
            <span class="block text-[10px] text-muted-foreground line-through leading-tight" v-if="option.originalPrice">
              {{ formatCurrency( option.originalPrice ) }}
            </span>
            <span class="text-xs sm:text-sm font-bold" :class="option.isFree ? 'text-primary' : 'text-foreground'">
              {{ option.isFree ? 'Grátis' : formatCurrency( option.price ) }}
            </span>
          </div>
        </div>
      </button>

      <p class="pt-1 text-[11px] text-muted-foreground/85 leading-snug">
        Simulação estimada · Prazo contado a partir da postagem em até 24h úteis.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, ref } from 'vue';
  import { Loader2, MapPin, Sparkles, Truck } from '@lucide/vue';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Button } from '@sagrada-familia/ui/button';
  import { formatCurrency } from '@/data/products';
  import { calculateMockShipping, formatCep, FREE_SHIPPING_THRESHOLD, type ShippingQuoteResult } from '@/data/product-details';

  const props = defineProps<{
    orderSubtotal: number;
  }>();

  const cepInput = ref( '' );
  const activeCepDigits = ref( '' );
  const cepError = ref( '' );
  const isCalculating = ref( false );
  const selectedMethodId = ref( 'pac' );
  let calcTimer: ReturnType<typeof setTimeout> | null = null;

  const quote = computed<ShippingQuoteResult | null>( () => {
    if ( !activeCepDigits.value ) {
      return null;
    }

    return calculateMockShipping( activeCepDigits.value, props.orderSubtotal );
  } );

  const freeProgressPercent = computed( () => {
    return Math.min( 100, Math.max( 6, Math.round( ( props.orderSubtotal / FREE_SHIPPING_THRESHOLD ) * 100 ) ) );
  } );

  const handleCepInput = ( event: Event ) => {
    const target = event.target as HTMLInputElement;
    cepInput.value = formatCep( target.value );
    if ( cepError.value ) {
      cepError.value = '';
    }
  };

  const handleCalculate = () => {
    const digits = cepInput.value.replace( /\D/g, '' );
    if ( digits.length !== 8 ) {
      cepError.value = 'Informe um CEP válido com 8 dígitos (ex.: 80010-000).';
      return;
    }

    cepError.value = '';
    isCalculating.value = true;

    if ( calcTimer ) {
      clearTimeout( calcTimer );
    }

    calcTimer = setTimeout( () => {
      activeCepDigits.value = digits;
      selectedMethodId.value = 'pac';
      isCalculating.value = false;
      calcTimer = null;
    }, 360 );
  };

  const clearQuote = () => {
    activeCepDigits.value = '';
    cepInput.value = '';
    cepError.value = '';
  };

  onUnmounted( () => {
    if ( calcTimer ) {
      clearTimeout( calcTimer );
    }
  } );
</script>
