<template>
  <article class="group relative flex flex-col h-full rounded-2xl border p-2 sm:p-2.5 transition-all duration-300 ease-out motion-reduce:transition-none hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:shadow-warm-md" :class="surface === 'elevated' ? 'bg-card/90 border-border/60 shadow-warm-sm hover:bg-card hover:border-gold-light/60' : 'bg-transparent border-transparent hover:bg-card hover:border-border/80'">
    <NuxtLink class="relative block aspect-square w-full rounded-xl overflow-hidden bg-surface/70 ring-1 ring-inset ring-dark/5" :to="`/p/${ product.slug }`">
      <div class="absolute top-2.5 left-2.5 z-10 flex flex-wrap items-center gap-1.5" v-if="product.isNew || discountPercentage !== null">
        <Badge class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide shadow-warm-sm bg-dark/90 text-background backdrop-blur-sm hover:bg-dark/90" v-if="product.isNew">
          Novo
        </Badge>

        <Badge class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide shadow-warm-sm hover:bg-primary" v-if="discountPercentage !== null">
          -{{ discountPercentage }}%
        </Badge>
      </div>

      <span class="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-background/90 backdrop-blur-sm border border-gold-light/40 text-[11px] font-semibold text-gold-dark flex items-center justify-center tabular-nums shadow-warm-sm" v-if="rank !== undefined">
        {{ String( rank ).padStart( 2, '0' ) }}
      </span>

      <img class="w-full h-full object-cover transition-all duration-500 ease-out motion-reduce:transition-none group-hover:opacity-0 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100" loading="lazy" :src="product.imageUrl" :alt="product.imageAlt" />

      <img class="absolute inset-0 w-full h-full object-cover opacity-0 scale-100 transition-all duration-500 ease-out motion-reduce:transition-none group-hover:opacity-100 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100" loading="lazy" aria-hidden="true" alt="" :src="product.hoverImageUrl" />
    </NuxtLink>

    <div class="flex flex-col flex-1 pt-3 px-1 pb-1">
      <h3 class="text-sm font-medium text-foreground leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-gold-dark">
        <NuxtLink class="focus:outline-none focus-visible:underline" :to="`/p/${ product.slug }`">
          {{ product.name }}
        </NuxtLink>
      </h3>

      <div class="mt-auto pt-3">
        <div class="min-h-[1.125rem] flex items-center">
          <span class="text-xs text-muted-foreground line-through tabular-nums" v-if="product.originalPrice && product.originalPrice > product.price">
            {{ formatCurrency( product.originalPrice ) }}
          </span>
        </div>

        <p class="mt-0.5 text-base sm:text-lg font-bold text-gold-dark leading-tight tabular-nums">
          {{ formatCurrency( pixPrice ) }}
          <span class="text-xs font-medium text-muted-foreground">no PIX</span>
        </p>

        <p class="mt-1 text-xs text-muted-foreground leading-snug tabular-nums">
          ou <span class="font-semibold text-foreground">{{ product.maxInstallments }}x</span> de <span class="font-semibold text-foreground">{{ formatCurrency( installmentPrice ) }}</span> sem juros
        </p>

        <Button type="button" variant="outline" class="mt-3.5 w-full h-auto min-h-9 py-2 has-[>svg]:px-2.5 sm:has-[>svg]:px-3 whitespace-normal rounded-full text-xs font-semibold tracking-wide leading-tight shadow-none transition-all duration-200 cursor-pointer" :class="isAdded ? 'bg-dark text-background border-dark hover:bg-dark hover:text-background' : 'bg-primary/10 sm:bg-transparent text-gold-dark border-primary/40 hover:bg-primary hover:text-primary-foreground hover:border-primary'" @click="handleAddToCart">
          <Check class="w-3.5 h-3.5" v-if="isAdded" />
          <ShoppingCart class="w-3.5 h-3.5" v-else />
          <span>{{ isAdded ? 'Adicionado' : 'Adicionar ao carrinho' }}</span>
        </Button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, ref } from 'vue';
  import { Check, ShoppingCart } from '@lucide/vue';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { useCartPreview } from '@/composables/useCartPreview';
  import { formatCurrency, getDiscountPercentage, getInstallmentPrice, getPixPrice, type Product } from '@/data/products';

  const props = withDefaults( defineProps<{
    product: Product;
    rank?: number;
    surface?: 'default' | 'elevated';
  }>(), {
    rank: undefined,
    surface: 'default'
  } );

  const { addToCart } = useCartPreview();
  const isAdded = ref( false );
  let addedTimer: ReturnType<typeof setTimeout> | null = null;

  const discountPercentage = computed( () => {
    return getDiscountPercentage( props.product.price, props.product.originalPrice );
  } );

  const pixPrice = computed( () => {
    return getPixPrice( props.product.price );
  } );

  const installmentPrice = computed( () => {
    return getInstallmentPrice( props.product.price, props.product.maxInstallments );
  } );

  const handleAddToCart = () => {
    addToCart( 1 );
    isAdded.value = true;
    if ( addedTimer ) {
      clearTimeout( addedTimer );
    }

    addedTimer = setTimeout( () => {
      isAdded.value = false;
    }, 1600 );
  };

  onUnmounted( () => {
    if ( addedTimer ) {
      clearTimeout( addedTimer );
    }
  } );
</script>
