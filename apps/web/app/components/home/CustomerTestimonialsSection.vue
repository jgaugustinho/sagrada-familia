<template>
  <section class="container mx-auto px-4" aria-labelledby="customer-testimonials-heading">
    <div class="relative rounded-3xl bg-dark text-dark-foreground border border-white/10 shadow-md overflow-hidden p-6 sm:p-8 lg:p-10 xl:p-12">
      <div class="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div class="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

      <Carousel aria-label="Depoimentos de clientes" v-slot="{ canScrollPrev, canScrollNext, scrollSnaps, selectedIndex, scrollPrev, scrollNext, scrollTo }" :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch gap-8 lg:gap-10">
          <div class="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                † Fé &amp; Confiança
              </span>

              <h2 id="customer-testimonials-heading" class="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Lares abençoados em todo o Brasil
              </h2>

              <p class="mt-2.5 text-sm text-white/75 leading-relaxed">
                Cada peça é inspecionada à mão e embalada com proteção reforçada para chegar intacta ao seu cantinho de oração.
              </p>
            </div>

            <div class="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-5 space-y-3.5">
              <div class="flex items-center gap-3.5">
                <div class="flex items-baseline gap-1 shrink-0">
                  <span class="text-3xl font-bold text-white tabular-nums">4,9</span>
                  <span class="text-xs font-medium text-white/55">/ 5,0</span>
                </div>

                <div class="min-w-0">
                  <div class="flex items-center gap-0.5" aria-label="Nota média de 4,9 em 5 estrelas">
                    <Star class="w-4 h-4 fill-primary text-primary" v-for="star in 5" :key="star" />
                  </div>
                  <p class="mt-1 text-xs text-white/75">
                    Mais de 2.400 famílias atendidas
                  </p>
                </div>
              </div>

              <div class="border-t border-white/10 pt-3 flex items-start gap-2.5 text-xs text-white/85 leading-snug">
                <ShieldCheck class="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Embalagem reforçada anti-impacto para imagens sacras</span>
              </div>
            </div>

            <div class="hidden md:flex items-center gap-3">
              <Button type="button" variant="outline" size="icon" class="size-10 rounded-full border-white/20 bg-white/5 text-white hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer" aria-label="Depoimento anterior" :disabled="!canScrollPrev" @click="handlePrev( scrollPrev )">
                <ArrowLeft class="w-4 h-4" />
              </Button>

              <Button type="button" variant="outline" size="icon" class="size-10 rounded-full border-white/20 bg-white/5 text-white hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer" aria-label="Próximo depoimento" :disabled="!canScrollNext" @click="handleNext( scrollNext )">
                <ArrowRight class="w-4 h-4" />
              </Button>

              <span class="ml-1 text-xs font-medium text-white/55 tabular-nums" v-if="scrollSnaps.length > 0">
                {{ selectedIndex + 1 }} / {{ scrollSnaps.length }}
              </span>
            </div>
          </div>

          <div class="lg:col-span-8 min-w-0 flex flex-col justify-center">
            <CarouselContent class="-ml-4 py-1">
              <CarouselItem class="pl-4 basis-[86%] md:basis-1/2" v-for="item in customerTestimonials" :key="item.id">
                <article class="flex flex-col justify-between h-full rounded-2xl bg-white/[0.04] border border-white/10 p-5 sm:p-6 transition-colors duration-300 hover:border-primary/40 hover:bg-white/[0.06]">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-4">
                      <div class="flex items-center gap-0.5" :aria-label="`Avaliação ${ item.rating } de 5 estrelas`">
                        <Star class="w-4 h-4 fill-primary text-primary" v-for="star in item.rating" :key="star" />
                      </div>

                      <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                        <BadgeCheck class="w-3.5 h-3.5" />
                        <span>Compra Verificada</span>
                      </span>
                    </div>

                    <Quote class="w-6 h-6 text-primary/35 mb-2" aria-hidden="true" />

                    <p class="text-sm text-white/90 leading-relaxed">
                      &ldquo;{{ item.quote }}&rdquo;
                    </p>
                  </div>

                  <div class="mt-6 pt-4 border-t border-white/10 space-y-4">
                    <div class="flex items-center gap-3">
                      <img class="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0" loading="lazy" :src="item.authorAvatarUrl" :alt="item.authorName" />

                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-white truncate">
                          {{ item.authorName }}
                        </p>
                        <p class="text-xs text-white/60 truncate">
                          {{ item.authorLocation }}
                        </p>
                      </div>
                    </div>

                    <NuxtLink class="group/prod flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 p-2.5 transition-colors duration-200 hover:bg-white/[0.08] hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" :to="`/p/${ item.productSlug }`">
                      <img class="w-10 h-10 rounded-lg object-cover bg-white/10 shrink-0" loading="lazy" :src="item.productImageUrl" :alt="item.productName" />

                      <div class="min-w-0 flex-1">
                        <span class="block text-[10px] font-semibold uppercase tracking-wider text-primary">
                          Item adquirido
                        </span>
                        <span class="block text-xs font-medium text-white/85 truncate transition-colors group-hover/prod:text-white">
                          {{ item.productName }}
                        </span>
                      </div>

                      <ArrowUpRight class="w-4 h-4 text-white/50 shrink-0 transition-transform duration-200 group-hover/prod:text-primary group-hover/prod:translate-x-0.5 group-hover/prod:-translate-y-0.5" />
                    </NuxtLink>
                  </div>
                </article>
              </CarouselItem>
            </CarouselContent>

            <div class="mt-5 flex md:hidden items-center justify-center gap-2" role="tablist" aria-label="Paginação de depoimentos" v-if="scrollSnaps.length > 1">
              <button type="button" role="tab" v-for="( _, index ) in scrollSnaps" :key="index" :aria-label="`Ir para o depoimento ${ index + 1 }`" :aria-selected="selectedIndex === index" :class="[ 'h-2 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', selectedIndex === index ? 'w-7 bg-primary' : 'w-2 bg-white/25 hover:bg-white/50' ]" @click="goToSlide( index, scrollTo )" />
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
  import Autoplay from 'embla-carousel-autoplay';
  import { ref } from 'vue';
  import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Quote, ShieldCheck, Star } from '@lucide/vue';
  import { Button } from '@/components/ui/button';
  import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
  import { customerTestimonials } from '@/data/testimonials';

  const carouselOptions = {
    align: 'start' as const,
    slidesToScroll: 'auto' as const,
    loop: true
  };

  const carouselPlugins = [
    Autoplay( {
      delay: 8000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: ( emblaRoot ) => emblaRoot.closest<HTMLElement>( '[data-slot="carousel"]' ) ?? emblaRoot.parentElement
    } )
  ];

  const carouselApi = ref<CarouselApi | null>( null );

  const onInitApi = ( api: CarouselApi ) => {
    carouselApi.value = api;
  };

  const resetAutoplay = () => {
    carouselApi.value?.plugins()?.autoplay?.reset();
  };

  const handlePrev = ( scrollPrev: () => void ) => {
    scrollPrev();
    resetAutoplay();
  };

  const handleNext = ( scrollNext: () => void ) => {
    scrollNext();
    resetAutoplay();
  };

  const goToSlide = ( index: number, scrollTo: ( index: number ) => void ) => {
    scrollTo( index );
    resetAutoplay();
  };
</script>
