<template>
  <section class="container mx-auto px-4" aria-labelledby="devotion-explore-heading">
    <div class="flex items-end justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <span class="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
          Fé &amp; Intercessão
        </span>
        <h2 id="devotion-explore-heading" class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
          Escolha pela sua Devoção
        </h2>
      </div>

      <NuxtLink class="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0" to="/c/devocionais">
        <span>Ver todas</span>
        <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </NuxtLink>
    </div>

    <Carousel aria-label="Navegação por devoções" v-slot="{ scrollSnaps, selectedIndex, scrollTo }" :opts="carouselOptions">
      <div class="relative">
        <CarouselContent class="-ml-4 py-2">
          <CarouselItem class="pl-4 basis-1/3 md:basis-1/4 lg:basis-[12.5%]" v-for="devotion in devotions" :key="devotion.slug">
            <NuxtLink class="group flex flex-col items-center text-center focus:outline-none" :to="devotion.to">
              <div class="relative aspect-[3/4] w-full max-w-[96px] sm:max-w-[112px] lg:max-w-[96px] xl:max-w-[112px] 2xl:max-w-[128px] rounded-t-full rounded-b-2xl overflow-hidden bg-secondary border-2 border-border shadow-sm transition-all duration-300 ease-out motion-reduce:transition-none group-hover:border-primary group-hover:ring-4 group-hover:ring-primary/15 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-primary">
                <img class="w-full h-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" loading="lazy" :src="devotion.imageUrl" :alt="devotion.label" />
                <span class="absolute inset-0 rounded-t-full rounded-b-2xl ring-1 ring-inset ring-black/5 pointer-events-none" aria-hidden="true" />
              </div>

              <span class="mt-3 text-xs sm:text-sm font-semibold text-foreground leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-primary">
                {{ devotion.label }}
              </span>
            </NuxtLink>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious class="hidden lg:inline-flex -left-5 z-10 size-10 bg-card/95 text-foreground border-border backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" />
        <CarouselNext class="hidden lg:inline-flex -right-5 z-10 size-10 bg-card/95 text-foreground border-border backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground hover:border-primary" />
      </div>

      <div class="mt-5 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Paginação de devoções" v-if="scrollSnaps.length > 1">
        <button type="button" role="tab" v-for="( _, index ) in scrollSnaps" :key="index" :aria-label="`Ir para a página ${ index + 1 }`" :aria-selected="selectedIndex === index" :class="[ 'h-2 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', selectedIndex === index ? 'w-7 bg-primary' : 'w-2 bg-primary/25 hover:bg-primary/50' ]" @click="scrollTo( index )" />
      </div>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
  import { ArrowRight } from '@lucide/vue';
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
