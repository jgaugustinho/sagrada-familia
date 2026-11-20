<template>
  <section class="relative w-full overflow-hidden bg-dark text-background border-y border-gold-light/20 py-14 sm:py-20 antialiased" aria-labelledby="customer-testimonials-heading">
    <div class="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gold-bright/10 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />

    <svg class="rosette-mask pointer-events-none select-none absolute top-1/2 -translate-y-1/2 -left-[250px] sm:-left-[230px] lg:-left-[200px] z-[1] w-[480px] h-[480px] sm:w-[540px] sm:h-[540px] text-gold-bright opacity-[0.14]" viewBox="0 0 520 520" fill="none" aria-hidden="true">
      <circle cx="260" cy="260" r="240" stroke="currentColor" stroke-width="1.2" />
      <circle cx="260" cy="260" r="212" stroke="currentColor" stroke-width="1" stroke-dasharray="3 6" />
      <circle cx="260" cy="260" r="176" stroke="currentColor" stroke-width="1.25" />
      <circle cx="260" cy="260" r="128" stroke="currentColor" stroke-width="1.15" />
      <circle cx="260" cy="260" r="76" stroke="currentColor" stroke-width="1.15" />
      <circle cx="260" cy="260" r="32" stroke="currentColor" stroke-width="1.25" />
      <line x1="20" y1="260" x2="500" y2="260" stroke="currentColor" stroke-width="1.15" />
      <line x1="260" y1="20" x2="260" y2="500" stroke="currentColor" stroke-width="1.15" />
      <line x1="90.3" y1="90.3" x2="429.7" y2="429.7" stroke="currentColor" stroke-width="1.15" />
      <line x1="429.7" y1="90.3" x2="90.3" y2="429.7" stroke="currentColor" stroke-width="1.15" />
      <line x1="38.3" y1="168.2" x2="481.7" y2="351.8" stroke="currentColor" stroke-width="0.95" stroke-opacity="0.8" />
      <line x1="168.2" y1="38.3" x2="351.8" y2="481.7" stroke="currentColor" stroke-width="0.95" stroke-opacity="0.8" />
      <line x1="351.8" y1="38.3" x2="168.2" y2="481.7" stroke="currentColor" stroke-width="0.95" stroke-opacity="0.8" />
      <line x1="481.7" y1="168.2" x2="38.3" y2="351.8" stroke="currentColor" stroke-width="0.95" stroke-opacity="0.8" />
      <polygon points="260,132 388,260 260,388 132,260" stroke="currentColor" stroke-width="1" stroke-opacity="0.9" />
      <polygon points="169.5,169.5 350.5,169.5 350.5,350.5 169.5,350.5" stroke="currentColor" stroke-width="1" stroke-opacity="0.9" />
      <circle cx="260" cy="108" r="24" stroke="currentColor" stroke-width="1.1" />
      <circle cx="367.5" cy="152.5" r="24" stroke="currentColor" stroke-width="1.1" />
      <circle cx="412" cy="260" r="24" stroke="currentColor" stroke-width="1.1" />
      <circle cx="367.5" cy="367.5" r="24" stroke="currentColor" stroke-width="1.1" />
      <circle cx="260" cy="412" r="24" stroke="currentColor" stroke-width="1.1" />
      <circle cx="152.5" cy="367.5" r="24" stroke="currentColor" stroke-width="1.1" />
      <circle cx="108" cy="260" r="24" stroke="currentColor" stroke-width="1.1" />
      <circle cx="152.5" cy="152.5" r="24" stroke="currentColor" stroke-width="1.1" />
    </svg>

    <div class="relative z-10 container mx-auto px-4" v-reveal>
      <Carousel aria-label="Depoimentos de clientes" v-slot="{ canScrollPrev, canScrollNext, scrollSnaps, selectedIndex, scrollPrev, scrollNext, scrollTo }" :opts="carouselOptions" :plugins="carouselPlugins" @init-api="onInitApi" @keydown.left="resetAutoplay" @keydown.right="resetAutoplay">
        <div class="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-8 lg:gap-12">
          <div class="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <span class="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright">
                † Fé &amp; Confiança
              </span>

              <h2 id="customer-testimonials-heading" class="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-background leading-[1.1]">
                Lares abençoados em todo o Brasil
              </h2>

              <p class="mt-3 text-sm sm:text-base text-background/75 leading-relaxed">
                Cada peça é inspecionada à mão e embalada com proteção reforçada para chegar intacta ao seu cantinho de oração.
              </p>
            </div>

            <div class="rounded-2xl bg-dark-deep/55 border border-gold-light/20 p-5 space-y-3.5">
              <div class="flex items-center gap-4">
                <div class="flex items-baseline gap-1 shrink-0">
                  <span class="font-serif text-4xl font-semibold text-background tabular-nums leading-none">4,9</span>
                  <span class="text-xs font-medium text-gold-light">/ 5,0</span>
                </div>

                <div class="min-w-0">
                  <div class="flex items-center gap-0.5" aria-label="Nota média de 4,9 em 5 estrelas">
                    <Star class="w-4 h-4 fill-gold-bright text-gold-bright" v-for="star in 5" :key="star" />
                  </div>
                  <p class="mt-1 text-xs text-background/75">
                    Mais de 2.400 famílias atendidas
                  </p>
                </div>
              </div>

              <div class="border-t border-gold-light/15 pt-3 flex items-start gap-2.5 text-xs text-background/85 leading-snug">
                <ShieldCheck class="w-4 h-4 text-gold-bright shrink-0 mt-0.5" />
                <span>Embalagem reforçada anti-impacto para imagens sacras</span>
              </div>
            </div>

            <div class="hidden md:flex items-center gap-3">
              <Button type="button" variant="outline" size="icon" class="size-10 rounded-full border-gold-light/25 bg-dark-deep/45 text-background hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer" aria-label="Depoimento anterior" :disabled="!canScrollPrev" @click="handlePrev( scrollPrev )">
                <ArrowLeft class="w-4 h-4" />
              </Button>

              <Button type="button" variant="outline" size="icon" class="size-10 rounded-full border-gold-light/25 bg-dark-deep/45 text-background hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer" aria-label="Próximo depoimento" :disabled="!canScrollNext" @click="handleNext( scrollNext )">
                <ArrowRight class="w-4 h-4" />
              </Button>

              <span class="ml-1 text-xs font-medium text-gold-light tabular-nums" v-if="scrollSnaps.length > 0">
                {{ String( selectedIndex + 1 ).padStart( 2, '0' ) }} / {{ String( scrollSnaps.length ).padStart( 2, '0' ) }}
              </span>
            </div>
          </div>

          <div class="lg:col-span-8 min-w-0 flex flex-col justify-center">
            <div class="-my-1">
              <CarouselContent class="-ml-4 py-1">
                <CarouselItem class="pl-4 basis-[86%] md:basis-1/2" v-for="item in customerTestimonials" :key="item.id">
                  <article class="flex flex-col justify-between h-full rounded-2xl bg-dark-deep/55 border border-gold-light/15 p-6 transition-colors duration-300 hover:border-gold-bright/35 hover:bg-dark-deep/75">
                    <div>
                      <div class="flex items-center justify-between gap-2 mb-4">
                        <div class="flex items-center gap-0.5" :aria-label="`Avaliação ${ item.rating } de 5 estrelas`">
                          <Star class="w-3.5 h-3.5 fill-gold-bright text-gold-bright" v-for="star in item.rating" :key="star" />
                        </div>

                        <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-gold-bright">
                          <BadgeCheck class="w-3.5 h-3.5" />
                          <span>Compra Verificada</span>
                        </span>
                      </div>

                      <Quote class="w-6 h-6 text-gold-bright/35 mb-2.5" aria-hidden="true" />

                      <p class="italic text-sm sm:text-[15px] text-background/95 leading-relaxed">
                        &ldquo;{{ item.quote }}&rdquo;
                      </p>
                    </div>

                    <div class="mt-6 pt-4 border-t border-gold-light/15 space-y-4">
                      <div class="flex items-center gap-3">
                        <img class="w-10 h-10 rounded-full object-cover border border-gold-light/30 shrink-0" loading="lazy" :src="item.authorAvatarUrl" :alt="item.authorName" />

                        <div class="min-w-0">
                          <p class="text-sm font-semibold text-background truncate">
                            {{ item.authorName }}
                          </p>
                          <p class="text-xs text-gold-light truncate">
                            {{ item.authorLocation }}
                          </p>
                        </div>
                      </div>

                      <NuxtLink class="group/prod flex items-center gap-3 rounded-xl bg-dark/60 border border-gold-light/15 p-2.5 transition-colors duration-200 hover:bg-dark/85 hover:border-gold-bright/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :to="`/p/${ item.productSlug }`">
                        <img class="w-10 h-10 rounded-lg object-cover bg-dark-deep shrink-0" loading="lazy" :src="item.productImageUrl" :alt="item.productName" />

                        <div class="min-w-0 flex-1">
                          <span class="block text-[10px] font-semibold uppercase tracking-wider text-gold-bright">
                            Item adquirido
                          </span>
                          <span class="block text-xs font-medium text-background/85 truncate transition-colors group-hover/prod:text-background">
                            {{ item.productName }}
                          </span>
                        </div>

                        <ArrowUpRight class="w-4 h-4 text-gold-light shrink-0 transition-transform duration-200 group-hover/prod:text-gold-bright group-hover/prod:translate-x-0.5 group-hover/prod:-translate-y-0.5" />
                      </NuxtLink>
                    </div>
                  </article>
                </CarouselItem>
              </CarouselContent>
            </div>

            <div class="mt-5 flex md:hidden items-center justify-center gap-2" role="tablist" aria-label="Paginação de depoimentos" v-if="scrollSnaps.length > 1">
              <button type="button" role="tab" v-for="( _, index ) in scrollSnaps" :key="index" :aria-label="`Ir para o depoimento ${ index + 1 }`" :aria-selected="selectedIndex === index" :class="[ 'h-1.5 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright', selectedIndex === index ? 'w-7 bg-gold-bright' : 'w-2 bg-background/25 hover:bg-background/50' ]" @click="goToSlide( index, scrollTo )" />
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
  import { DUMMY_PRIMARY_IMAGE } from '@/data/products';

  const customerTestimonials = [
    {
      id: 'test-maria-helena',
      authorName: 'Maria Helena Oliveira',
      authorLocation: 'Belo Horizonte, MG',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
      rating: 5,
      quote: 'Comprei a imagem da Sagrada Família para o altar da minha sala e me emocionei com a delicadeza do rosto e da pintura. Veio tão bem embalada com plástico bolha e caixa reforçada que chegou sem um único arranhão.',
      productName: 'Imagem Sagrada Família em Resina Importada 30cm',
      productSlug: 'imagem-sagrada-familia-resina-30cm',
      productImageUrl: DUMMY_PRIMARY_IMAGE
    },
    {
      id: 'test-carlos-eduardo',
      authorName: 'Carlos Eduardo Souza',
      authorLocation: 'Curitiba, PR',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
      rating: 5,
      quote: 'O Crucifixo de São Damião tem um acabamento em madeira impecável, muito acima do que eu esperava. Presenteei meus pais nas bodas de prata e todos ficaram encantados com a presença da peça na sala.',
      productName: 'Crucifixo de Parede São Damião em Madeira Maciça 35cm',
      productSlug: 'crucifixo-de-parede-sao-damiao',
      productImageUrl: DUMMY_PRIMARY_IMAGE
    },
    {
      id: 'test-ana-beatriz',
      authorName: 'Ana Beatriz Mendes',
      authorLocation: 'Campinas, SP',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
      rating: 5,
      quote: 'Tinha receio de comprar imagem sacra pela internet e quebrar no caminho, mas o cuidado da loja com a embalagem me surpreendeu. O manto azul de Nossa Senhora Aparecida é rico em detalhes dourados.',
      productName: 'Imagem Nossa Senhora Aparecida Manto Azul em Resina 25cm',
      productSlug: 'imagem-nossa-senhora-aparecida-resina-25cm',
      productImageUrl: DUMMY_PRIMARY_IMAGE
    },
    {
      id: 'test-joao-pedro',
      authorName: 'João Pedro Almeida',
      authorLocation: 'Recife, PE',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
      rating: 5,
      quote: 'A Bíblia Edição Pastoral tem letra realmente confortável para leitura diária e capa muito resistente. O envio foi super rápido e o atendimento pelo WhatsApp tirou todas as minhas dúvidas na hora.',
      productName: 'Bíblia Sagrada Edição Pastoral Letra Grande Capa Dura',
      productSlug: 'biblia-sagrada-edicao-pastoral',
      productImageUrl: DUMMY_PRIMARY_IMAGE
    },
    {
      id: 'test-lucia-fernandes',
      authorName: 'Lúcia Fernandes Costa',
      authorLocation: 'Goiânia, GO',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
      rating: 5,
      quote: 'Adquiri a imagem de São Miguel Arcanjo para o cantinho de oração da nossa família. As asas e a pintura clássica são de encher os olhos, e o preço com desconto no PIX valeu muito a pena.',
      productName: 'Imagem São Miguel Arcanjo Pintura Clássica em Resina 25cm',
      productSlug: 'imagem-sao-miguel-arcanjo-25cm',
      productImageUrl: DUMMY_PRIMARY_IMAGE
    },
    {
      id: 'test-roberto-lima',
      authorName: 'Roberto César Lima',
      authorLocation: 'Porto Alegre, RS',
      authorAvatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
      rating: 5,
      quote: 'O Terço de São Bento em madeira nobre é firme, leve na mão e muito bem montado. Já é a terceira compra que faço na Sagrada Família para presentear afilhados e amigos da paróquia.',
      productName: 'Terço de São Bento em Madeira Nobre com Entremeio Dourado',
      productSlug: 'terco-sao-bento-madeira-nobre',
      productImageUrl: DUMMY_PRIMARY_IMAGE
    }
  ];

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

<style scoped>
  .rosette-mask {
    -webkit-mask-image: radial-gradient(circle at center, #000 58%, transparent 94%);
    mask-image: radial-gradient(circle at center, #000 58%, transparent 94%);
  }
</style>
