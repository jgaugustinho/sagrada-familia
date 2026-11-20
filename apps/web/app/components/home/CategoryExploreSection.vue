<template>
  <section class="w-full bg-surface border-y border-gold-light/20 py-14 sm:py-20" aria-labelledby="category-explore-heading">
    <div class="container mx-auto px-4">
      <SectionHeader heading-id="category-explore-heading" eyebrow="Navegue pela Loja" title="Explore por Categoria" align="center" ornament v-reveal />

      <div v-reveal="{ delay: 100 }">
        <Carousel aria-label="Categorias de produtos" v-slot="{ scrollSnaps, selectedIndex, scrollTo }" :opts="carouselOptions">
          <div class="-my-3">
            <CarouselContent class="-ml-4 py-3">
              <CarouselItem class="pl-4 basis-1/3 md:basis-1/4 lg:basis-[12.5%]" v-for="category in categories" :key="category.slug">
                <NuxtLink class="group flex flex-col items-center text-center focus:outline-none" :to="category.to">
                  <div class="relative w-full max-w-[104px] sm:max-w-[120px] lg:max-w-[104px] xl:max-w-[118px] 2xl:max-w-[134px] p-1.5 rounded-full border border-gold-light/55 bg-background/75 shadow-warm-sm transition-all duration-300 ease-out motion-reduce:transition-none group-hover:border-primary group-hover:shadow-warm-md group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 group-focus-visible:ring-2 group-focus-visible:ring-primary">
                    <div class="relative aspect-square w-full rounded-full overflow-hidden bg-surface-warm/60">
                      <img class="w-full h-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" loading="lazy" :src="category.imageUrl" :alt="category.label" />
                      <span class="absolute inset-0 rounded-full ring-1 ring-inset ring-dark/5 pointer-events-none" aria-hidden="true" />
                    </div>
                  </div>

                  <span class="mt-3 text-xs sm:text-sm font-medium text-foreground leading-snug transition-colors duration-200 group-hover:text-gold-dark">
                    {{ category.label }}
                  </span>
                </NuxtLink>
              </CarouselItem>
            </CarouselContent>
          </div>

          <div class="mt-8 flex lg:hidden items-center justify-center gap-2" role="tablist" aria-label="Paginação de categorias" v-if="scrollSnaps.length > 1">
            <button type="button" role="tab" v-for="( _, index ) in scrollSnaps" :key="index" :aria-label="`Ir para a página ${ index + 1 }`" :aria-selected="selectedIndex === index" :class="[ 'h-1.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', selectedIndex === index ? 'w-7 bg-primary' : 'w-2 bg-primary/25 hover:bg-primary/50' ]" @click="scrollTo( index )" />
          </div>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import SectionHeader from '@/components/home/SectionHeader.vue';
  import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
  import { categoryPath, mainMenu } from '@/data/main-menu';
  import { DUMMY_PRIMARY_IMAGE } from '@/data/products';

  const categories = mainMenu
    .filter( ( item ) => item.slug !== 'promocoes' )
    .map( ( category ) => ( {
      label: category.label,
      slug: category.slug,
      to: categoryPath( category ),
      imageUrl: category.groups[ 0 ]?.featured.imageUrl ?? DUMMY_PRIMARY_IMAGE
    } ) );

  const carouselOptions = {
    align: 'start' as const,
    slidesToScroll: 'auto' as const,
    loop: true
  };
</script>
