<template>
  <section class="relative w-full overflow-hidden bg-gradient-to-br from-dark via-dark to-dark-deep text-background border-y border-gold-light/25 py-14 sm:py-16 antialiased" aria-labelledby="atelier-promise-heading">
    <div class="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-gold-bright/[0.08] blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-24 right-1/4 w-64 h-64 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />

    <div class="relative z-10 container mx-auto px-4">
      <SectionHeader heading-id="atelier-promise-heading" eyebrow="Cuidado Sagrado" title="Do nosso acervo até o seu lar" subtitle="Cada detalhe do preparo à entrega reflete o respeito que a sua fé merece." align="center" tone="dark" ornament v-reveal />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5" v-reveal="{ delay: 100 }">
        <article class="rounded-2xl bg-background/[0.04] border border-gold-light/25 p-6 backdrop-blur-sm">
          <div class="w-10 h-10 rounded-full bg-primary/20 border border-gold-bright/40 text-gold-bright flex items-center justify-center mb-4" aria-hidden="true">
            <PackageCheck class="w-5 h-5 stroke-[1.6]" />
          </div>
          <h3 class="font-serif text-xl font-semibold text-background">
            Embalagem Tripla Anti-Impacto
          </h3>
          <p class="mt-2 text-xs sm:text-sm text-background/75 leading-relaxed">
            Esculturas, crucifixos e peças delicadas viajam protegidos por camadas de espuma de alta densidade e caixa rígida reforçada.
          </p>
        </article>

        <article class="rounded-2xl bg-background/[0.04] border border-gold-light/25 p-6 backdrop-blur-sm">
          <div class="w-10 h-10 rounded-full bg-primary/20 border border-gold-bright/40 text-gold-bright flex items-center justify-center mb-4" aria-hidden="true">
            <Gift class="w-5 h-5 stroke-[1.6]" />
          </div>
          <h3 class="font-serif text-xl font-semibold text-background">
            Pronto para Presentear
          </h3>
          <p class="mt-2 text-xs sm:text-sm text-background/75 leading-relaxed">
            Apresentação cuidada nos mínimos detalhes, acompanhada de cartão devocional para celebrar batismos, casamentos e bênçãos no lar.
          </p>
        </article>

        <article class="rounded-2xl bg-background/[0.04] border border-gold-light/25 p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div class="w-10 h-10 rounded-full bg-primary/20 border border-gold-bright/40 text-gold-bright flex items-center justify-center mb-4" aria-hidden="true">
              <HeartHandshake class="w-5 h-5 stroke-[1.6]" />
            </div>
            <h3 class="font-serif text-xl font-semibold text-background">
              Consultoria Sacra Personalizada
            </h3>
            <p class="mt-2 text-xs sm:text-sm text-background/75 leading-relaxed">
              Precisa de ajuda com medidas, acabamentos ou sugestões para presente? Nossa equipe orienta você com carinho.
            </p>
          </div>

          <a target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-primary text-primary-foreground hover:bg-gold-bright hover:text-dark-deep px-4 py-2 text-xs font-semibold transition-colors btn-sheen focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :href="whatsappHref">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path :d="WHATSAPP_BUBBLE_PATH" />
              <path fill="currentColor" stroke="none" :d="WHATSAPP_PHONE_PATH" />
            </svg>
            <span>Falar no WhatsApp</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Gift, HeartHandshake, PackageCheck } from '@lucide/vue';
  import SectionHeader from '@/components/home/SectionHeader.vue';

  const WHATSAPP_BUBBLE_PATH = 'M3 21l1.65-3.8A9 9 0 1 1 21 12a9 9 0 0 1-13.2 7.95L3 21z';
  const WHATSAPP_PHONE_PATH = 'M9.5 8.8c.2-.45.45-.46.7-.47h.55c.18 0 .42.06.64.52.23.48.77 1.72.84 1.85.07.13.12.28.02.45-.1.18-.15.29-.3.45-.15.16-.31.35-.44.47-.14.13-.29.28-.12.56.17.28.75 1.24 1.61 2 1.1.97 2.02 1.27 2.31 1.42.29.14.46.12.63-.07.17-.19.74-.85.94-1.15.2-.3.4-.25.67-.15.27.1 1.73.81 2.03.96.3.15.5.22.57.34.07.13.07.73-.18 1.44-.25.7-1.45 1.37-2 1.44-.51.07-1.16.1-1.88-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.35-5.14-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.04-2.49z';

  withDefaults( defineProps<{
    whatsappHref?: string;
  }>(), {
    whatsappHref: 'https://wa.me/5541999113465?text=Ol%C3%A1!%20Gostaria%20de%20ajuda%20sobre%20uma%20pe%C3%A7a%20do%20site.'
  } );
</script>
