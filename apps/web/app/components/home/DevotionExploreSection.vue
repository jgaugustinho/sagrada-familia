<template>
  <section class="w-full bg-background surface-linen py-14 sm:py-20" aria-labelledby="devotion-explore-heading">
    <div class="relative z-10 container mx-auto px-4">
      <SectionHeader heading-id="devotion-explore-heading" eyebrow="Fé & Intercessão" title="Escolha pela sua Devoção" align="center" ornament action-label="Ver todas as devoções" action-to="/c/devocionais" v-reveal />

      <div v-reveal="{ delay: 100 }">
        <Carousel aria-label="Navegação por devoções" v-slot="{ scrollSnaps, selectedIndex, scrollTo }" :opts="carouselOptions">
          <div class="relative -my-3">
            <CarouselContent class="-ml-4 py-3">
              <CarouselItem class="pl-4 basis-1/3 md:basis-1/4 lg:basis-[12.5%]" v-for="devotion in devotions" :key="devotion.slug">
                <NuxtLink class="group flex flex-col items-center text-center focus:outline-none" :to="devotion.to">
                  <div class="relative w-full max-w-[114px] sm:max-w-[130px] lg:max-w-[116px] xl:max-w-[132px] p-1.5 rounded-t-full rounded-b-2xl border border-gold-light/45 bg-card/80 shadow-warm-sm transition-all duration-300 ease-out motion-reduce:transition-none group-hover:border-primary group-hover:shadow-warm-md group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 group-focus-visible:ring-2 group-focus-visible:ring-primary">
                    <div class="relative aspect-[3/4] w-full rounded-t-full rounded-b-xl overflow-hidden bg-surface/60">
                      <img class="w-full h-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" loading="lazy" :src="devotion.imageUrl" :alt="devotion.label" />
                      <span class="absolute inset-0 rounded-t-full rounded-b-xl ring-1 ring-inset ring-dark/5 pointer-events-none" aria-hidden="true" />
                    </div>
                  </div>

                  <span class="mt-3 text-xs sm:text-sm font-medium text-foreground leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-gold-dark">
                    {{ devotion.label }}
                  </span>
                </NuxtLink>
              </CarouselItem>
            </CarouselContent>

            <CarouselPrevious class="hidden lg:inline-flex -left-5 z-10 size-10 bg-card/95 text-foreground border-gold-light/40 backdrop-blur-sm shadow-warm-sm hover:bg-primary hover:text-primary-foreground hover:border-primary" />
            <CarouselNext class="hidden lg:inline-flex -right-5 z-10 size-10 bg-card/95 text-foreground border-gold-light/40 backdrop-blur-sm shadow-warm-sm hover:bg-primary hover:text-primary-foreground hover:border-primary" />
          </div>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Paginação de devoções" v-if="scrollSnaps.length > 1">
            <button type="button" role="tab" v-for="( _, index ) in scrollSnaps" :key="index" :aria-label="`Ir para a página ${ index + 1 }`" :aria-selected="selectedIndex === index" :class="[ 'h-1.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', selectedIndex === index ? 'w-7 bg-primary' : 'w-2 bg-primary/25 hover:bg-primary/50' ]" @click="scrollTo( index )" />
          </div>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import SectionHeader from '@/components/home/SectionHeader.vue';
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
  import { devocionais } from '@/data/main-menu';
  import { DUMMY_PRIMARY_IMAGE } from '@/data/products';

  interface ExploreDevotion {
    label: string;
    slug: string;
    to: string;
    imageUrl: string;
  }

  const devotions: ExploreDevotion[] = devocionais.groups.flatMap( ( group ) =>
    group.items.map( ( item ) => ( {
      label: item.label,
      slug: item.slug,
      to: `/c/${ devocionais.slug }/${ item.slug }`,
      imageUrl: group.featured.imageUrl || DUMMY_PRIMARY_IMAGE
    } ) )
  );

  const carouselOptions = {
    align: 'start' as const,
    slidesToScroll: 'auto' as const,
    loop: true
  };
</script>
