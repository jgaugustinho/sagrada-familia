<template>
  <article class="group relative flex flex-col h-full bg-card text-card-foreground border border-border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ease-out motion-reduce:transition-none hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:shadow-lg hover:border-primary/35">
    <NuxtLink class="relative block aspect-square w-full overflow-hidden bg-secondary/40" :to="`/p/${ product.slug }`">
      <div class="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-1.5" v-if="product.isNew || discountPercentage !== null">
        <Badge class="rounded-full px-2.5 py-1 font-bold tracking-wide shadow-sm bg-dark text-dark-foreground hover:bg-dark" v-if="product.isNew">
          Novo
        </Badge>

        <Badge class="rounded-full px-2.5 py-1 font-bold tracking-wide shadow-sm hover:bg-primary" v-if="discountPercentage !== null">
          -{{ discountPercentage }}%
        </Badge>
      </div>

      <img class="w-full h-full object-cover transition-all duration-500 ease-out motion-reduce:transition-none group-hover:opacity-0 group-hover:scale-105 motion-reduce:group-hover:scale-100" loading="lazy" :src="product.imageUrl" :alt="product.imageAlt" />

      <img class="absolute inset-0 w-full h-full object-cover opacity-0 scale-100 transition-all duration-500 ease-out motion-reduce:transition-none group-hover:opacity-100 group-hover:scale-105 motion-reduce:group-hover:scale-100" loading="lazy" aria-hidden="true" alt="" :src="product.hoverImageUrl" />
    </NuxtLink>

    <div class="flex flex-col flex-1 p-3.5 sm:p-4 xl:p-5">
      <h3 class="text-sm sm:text-base font-semibold text-foreground leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-primary">
        <NuxtLink class="focus:outline-none focus-visible:underline" :to="`/p/${ product.slug }`">
          {{ product.name }}
        </NuxtLink>
      </h3>

      <div class="mt-auto pt-3">
        <div class="min-h-[1.25rem] flex items-center">
          <span class="text-[13px] sm:text-sm text-muted-foreground line-through" v-if="product.originalPrice && product.originalPrice > product.price">
            {{ formatCurrency( product.originalPrice ) }}
          </span>
        </div>

        <p class="mt-0.5 text-base sm:text-lg font-bold text-primary leading-tight">
          {{ formatCurrency( pixPrice ) }}
          <span class="text-xs font-semibold tracking-wide text-foreground/80">no PIX</span>
        </p>

        <p class="mt-1 text-xs text-muted-foreground leading-snug">
          ou <span class="font-semibold text-foreground">{{ product.maxInstallments }}x</span> de <span class="font-semibold text-foreground">{{ formatCurrency( installmentPrice ) }}</span> sem juros
        </p>

        <Button type="button" class="mt-4 w-full h-auto min-h-9 py-2 has-[>svg]:px-2.5 sm:has-[>svg]:px-3 whitespace-normal text-xs sm:text-sm leading-tight font-semibold shadow-sm cursor-pointer">
          <ShoppingCart class="w-4 h-4" />
          <span>Adicionar ao carrinho</span>
        </Button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { ShoppingCart } from '@lucide/vue';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { formatCurrency, getDiscountPercentage, getInstallmentPrice, getPixPrice, type Product } from '@/data/products';

  const props = defineProps<{
    product: Product;
  }>();

  const discountPercentage = computed( () => {
    return getDiscountPercentage( props.product.price, props.product.originalPrice );
  } );

  const pixPrice = computed( () => {
    return getPixPrice( props.product.price );
  } );

  const installmentPrice = computed( () => {
    return getInstallmentPrice( props.product.price, props.product.maxInstallments );
  } );
</script>
