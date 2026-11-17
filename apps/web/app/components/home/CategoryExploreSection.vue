<template>
  <section class="container mx-auto px-4" aria-labelledby="category-explore-heading">
    <div class="mb-6 sm:mb-8">
      <span class="block text-xs font-semibold uppercase tracking-wider text-primary mb-1">
        Navegue pela Loja
      </span>
      <h2 id="category-explore-heading" class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
        Explore por Categoria
      </h2>
    </div>

    <Carousel aria-label="Categorias de produtos" v-slot="{ scrollSnaps, selectedIndex, scrollTo }" :opts="carouselOptions">
      <CarouselContent class="-ml-4 py-2">
        <CarouselItem class="pl-4 basis-1/3 md:basis-1/4 lg:basis-[12.5%]" v-for="category in categories" :key="category.slug">
          <NuxtLink class="group flex flex-col items-center text-center focus:outline-none" :to="category.to">
            <div class="relative aspect-square w-full max-w-[96px] sm:max-w-[112px] lg:max-w-[96px] xl:max-w-[112px] 2xl:max-w-[128px] rounded-full overflow-hidden bg-secondary border-2 border-border shadow-sm transition-all duration-300 ease-out motion-reduce:transition-none group-hover:border-primary group-hover:ring-4 group-hover:ring-primary/15 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-primary">
              <img class="w-full h-full object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" loading="lazy" :src="category.imageUrl" :alt="category.label" />
              <span class="absolute inset-0 rounded-full ring-1 ring-inset ring-black/5 pointer-events-none" aria-hidden="true" />
            </div>

            <span class="mt-3 text-xs sm:text-sm font-semibold text-foreground leading-snug transition-colors duration-200 group-hover:text-primary">
              {{ category.label }}
            </span>
          </NuxtLink>
        </CarouselItem>
      </CarouselContent>

      <div class="mt-5 flex lg:hidden items-center justify-center gap-2" role="tablist" aria-label="Paginação de categorias" v-if="scrollSnaps.length > 1">
        <button type="button" role="tab" v-for="( _, index ) in scrollSnaps" :key="index" :aria-label="`Ir para a página ${ index + 1 }`" :aria-selected="selectedIndex === index" :class="[ 'h-2 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary', selectedIndex === index ? 'w-7 bg-primary' : 'w-2 bg-primary/25 hover:bg-primary/50' ]" @click="scrollTo( index )" />
      </div>
    </Carousel>
  </section>
</template>

<script setup lang="ts">
  import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
  import { categoryPath, mainMenu } from '@/data/main-menu';
  import { DUMMY_PRIMARY_IMAGE } from '@/data/products';

  interface ExploreCategory {
    label: string;
    slug: string;
    to: string;
    imageUrl: string;
  }

  const categories: ExploreCategory[] = mainMenu
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
