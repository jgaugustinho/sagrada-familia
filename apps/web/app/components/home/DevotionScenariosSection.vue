<template>
  <section class="container mx-auto px-4" aria-labelledby="devotion-scenarios-heading">
    <div class="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
      <span class="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
        Monte o Conjunto
      </span>
      <h2 id="devotion-scenarios-heading" class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
        Cenários de Devoção
      </h2>
      <p class="mt-2 text-sm sm:text-base font-medium text-foreground/80 leading-relaxed">
        Tudo o que a intenção pede, reunido em um só lugar para inspirar a sua oração em família.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <article class="flex flex-col bg-card text-card-foreground border border-border rounded-2xl overflow-hidden shadow-sm" v-for="scenario in devotionScenarios" :key="scenario.id">
        <div class="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-dark">
          <img class="w-full h-full object-cover" loading="lazy" :src="scenario.imageUrl" :alt="scenario.imageAlt" />

          <div class="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-transparent" aria-hidden="true" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" aria-hidden="true" />

          <div class="absolute inset-x-0 top-0 p-5 sm:p-7 text-white">
            <span class="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              {{ scenario.eyebrow }}
            </span>
            <h3 class="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              {{ scenario.title }}
            </h3>
          </div>
        </div>

        <ol class="divide-y divide-border px-4 sm:px-6 py-2">
          <li class="group/row flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3.5 py-3.5" v-for="( product, index ) in scenario.products" :key="product.id">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <span class="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                {{ index + 1 }}
              </span>

              <NuxtLink class="relative block w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-secondary/40 border border-border shrink-0" :to="`/p/${ product.slug }`">
                <img class="w-full h-full object-cover transition-transform duration-300 motion-reduce:transition-none group-hover/row:scale-105 motion-reduce:group-hover/row:scale-100" loading="lazy" :src="product.imageUrl" :alt="product.imageAlt" />
              </NuxtLink>

              <NuxtLink class="min-w-0 flex-1 text-xs sm:text-sm font-semibold text-foreground leading-snug line-clamp-2 hover:text-primary transition-colors focus:outline-none focus-visible:underline" :to="`/p/${ product.slug }`">
                {{ product.name }}
              </NuxtLink>
            </div>

            <div class="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-9 sm:pl-0 shrink-0">
              <div class="text-left sm:text-right">
                <span class="block text-[11px] text-muted-foreground line-through leading-tight" v-if="product.originalPrice && product.originalPrice > product.price">
                  {{ formatCurrency( product.originalPrice ) }}
                </span>

                <p class="text-xs sm:text-sm font-bold text-primary leading-tight whitespace-nowrap">
                  {{ formatCurrency( getPixPrice( product.price ) ) }}
                  <span class="text-[11px] font-semibold text-foreground/80">no PIX</span>
                </p>

                <p class="text-[11px] text-muted-foreground leading-tight whitespace-nowrap">
                  ou <span class="font-semibold text-foreground">{{ product.maxInstallments }}x</span> de <span class="font-semibold text-foreground">{{ formatCurrency( getInstallmentPrice( product.price, product.maxInstallments ) ) }}</span> sem juros
                </p>
              </div>

              <Button type="button" size="sm" class="font-semibold shadow-sm cursor-pointer shrink-0">
                <ShoppingCart class="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </Button>
            </div>
          </li>
        </ol>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ShoppingCart } from '@lucide/vue';
  import { Button } from '@/components/ui/button';
  import { devotionScenarios, formatCurrency, getInstallmentPrice, getPixPrice } from '@/data/products';
</script>
