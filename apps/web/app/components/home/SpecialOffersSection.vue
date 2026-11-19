<template>
  <section class="w-full bg-background surface-linen py-14 sm:py-20" aria-labelledby="special-offers-heading">
    <div class="relative z-10 container mx-auto px-4">
      <SectionHeader heading-id="special-offers-heading" eyebrow="Oportunidades da Semana" title="Ofertas Especiais" action-label="Ver todas" action-to="/c/promocoes" v-reveal />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <article class="lg:col-span-4 relative rounded-2xl bg-dark text-background border border-gold-light/20 p-6 sm:p-7 shadow-warm-md overflow-hidden flex flex-col justify-between antialiased" v-if="featuredOffer" v-reveal>
          <div class="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold-bright/10 blur-2xl" aria-hidden="true" />

          <div class="relative z-10 flex items-center justify-between gap-2">
            <span class="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-bright">
              Oferta em Destaque
            </span>
            <span class="rounded-full px-3 py-0.5 text-xs font-bold bg-gold-bright text-dark-deep tabular-nums" v-if="featuredDiscount !== null">
              -{{ featuredDiscount }}%
            </span>
          </div>

          <div class="relative z-10 my-5 flex justify-center">
            <NuxtLink class="group/feat block w-full max-w-[210px] p-1.5 rounded-t-full rounded-b-xl border border-gold-light/35 bg-dark-deep/50 shadow-warm-md transition-all duration-300 hover:border-gold-bright/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :to="`/p/${ featuredOffer.slug }`">
              <div class="aspect-[4/5] w-full rounded-t-full rounded-b-lg overflow-hidden bg-dark-deep">
                <img class="w-full h-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover/feat:scale-105 motion-reduce:group-hover/feat:scale-100" loading="lazy" :src="featuredOffer.imageUrl" :alt="featuredOffer.imageAlt" />
              </div>
            </NuxtLink>
          </div>

          <div class="relative z-10">
            <h3 class="font-serif text-xl sm:text-2xl font-semibold text-background leading-snug line-clamp-2">
              <NuxtLink class="hover:text-gold-bright transition-colors focus:outline-none focus-visible:underline" :to="`/p/${ featuredOffer.slug }`">
                {{ featuredOffer.name }}
              </NuxtLink>
            </h3>

            <div class="mt-3">
              <span class="block text-xs text-background/55 line-through tabular-nums" v-if="featuredOffer.originalPrice && featuredOffer.originalPrice > featuredOffer.price">
                {{ formatCurrency( featuredOffer.originalPrice ) }}
              </span>

              <p class="mt-0.5 text-2xl font-bold text-gold-bright tabular-nums leading-tight">
                {{ formatCurrency( getPixPrice( featuredOffer.price ) ) }}
                <span class="text-xs font-medium text-background/75">no PIX</span>
              </p>

              <p class="mt-1 text-xs text-background/70 tabular-nums">
                ou <span class="font-semibold text-background">{{ featuredOffer.maxInstallments }}x</span> de <span class="font-semibold text-background">{{ formatCurrency( getInstallmentPrice( featuredOffer.price, featuredOffer.maxInstallments ) ) }}</span> sem juros
              </p>
            </div>

            <Button type="button" size="lg" class="mt-5 w-full rounded-full font-semibold btn-sheen bg-primary text-primary-foreground hover:bg-gold-dark shadow-warm-sm cursor-pointer" @click="handleAddFeatured">
              <Check class="w-4 h-4" v-if="isFeaturedAdded" />
              <ShoppingCart class="w-4 h-4" v-else />
              <span>{{ isFeaturedAdded ? 'Adicionado ao carrinho' : 'Aproveitar oferta' }}</span>
            </Button>
          </div>
        </article>

        <div class="lg:col-span-8 min-w-0" v-reveal="{ delay: 120 }">
          <ProductCarousel item-basis-class="basis-[72%] sm:basis-[46%] lg:basis-1/3" aria-label="Ofertas especiais" :products="carouselOffers" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onUnmounted, ref } from 'vue';
  import { Check, ShoppingCart } from '@lucide/vue';
  import SectionHeader from '@/components/home/SectionHeader.vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import { Button } from '@/components/ui/button';
  import { useCartPreview } from '@/composables/useCartPreview';
  import { formatCurrency, getDiscountPercentage, getInstallmentPrice, getPixPrice, specialOfferProducts } from '@/data/products';

  const { addToCart } = useCartPreview();
  const isFeaturedAdded = ref( false );
  let featuredTimer: ReturnType<typeof setTimeout> | null = null;

  const featuredOffer = computed( () => {
    if ( specialOfferProducts.length === 0 ) {
      return null;
    }

    return specialOfferProducts.reduce( ( best, candidate ) => {
      const bestDiscount = getDiscountPercentage( best.price, best.originalPrice ) ?? 0;
      const candidateDiscount = getDiscountPercentage( candidate.price, candidate.originalPrice ) ?? 0;
      return candidateDiscount > bestDiscount ? candidate : best;
    } );
  } );

  const featuredDiscount = computed( () => {
    if ( !featuredOffer.value ) {
      return null;
    }

    return getDiscountPercentage( featuredOffer.value.price, featuredOffer.value.originalPrice );
  } );

  const carouselOffers = computed( () => {
    const featuredId = featuredOffer.value?.id;
    return specialOfferProducts.filter( ( product ) => product.id !== featuredId );
  } );

  const handleAddFeatured = () => {
    addToCart( 1 );
    isFeaturedAdded.value = true;
    if ( featuredTimer ) {
      clearTimeout( featuredTimer );
    }

    featuredTimer = setTimeout( () => {
      isFeaturedAdded.value = false;
    }, 1600 );
  };

  onUnmounted( () => {
    if ( featuredTimer ) {
      clearTimeout( featuredTimer );
    }
  } );
</script>
