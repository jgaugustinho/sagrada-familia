<template>
  <footer class="relative overflow-hidden bg-background text-background antialiased surface-dark" aria-label="Rodapé institucional da Sagrada Família">
    <!-- Top textured linen bridge extending DailyLiturgySection seamlessly behind the floating card -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28 overflow-hidden border-b border-gold-light/25" aria-hidden="true">
      <div class="w-full h-full bg-background surface-linen" />
    </div>
    <!-- Lower dark backdrop starting below the linen bridge to prevent top subpixel seams -->
    <div class="pointer-events-none absolute inset-x-0 top-24 sm:top-28 bottom-0 bg-dark-deep" aria-hidden="true" />
    <div class="pointer-events-none absolute top-40 right-1/4 w-96 h-64 rounded-full bg-gold-bright/[0.06] blur-3xl" aria-hidden="true" />

    <div class="relative z-10 container mx-auto px-4 pt-5 sm:pt-7">
      <!-- Floating Two-Column Consultative Bridge Card -->
      <div class="rounded-2xl bg-gradient-to-br from-dark via-dark to-dark-deep border border-gold-bright/30 shadow-warm-lg overflow-hidden" v-reveal>
        <div class="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gold-light/20">
          <div class="lg:col-span-7 p-5 sm:p-7 lg:p-8 flex flex-col justify-between gap-5">
            <div>
              <span class="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright">
                † Atendimento Consultivo
              </span>

              <h2 class="mt-1.5 font-serif text-2xl sm:text-3xl lg:text-[2rem] font-semibold tracking-tight text-background leading-[1.12]">
                Dúvida para escolher uma imagem ou montar seu oratório?
              </h2>

              <p class="mt-2 text-sm text-background/75 leading-relaxed max-w-xl">
                Converse com quem entende de arte sacra para acertar nas proporções, acabamentos e presentes sacramentais.
              </p>
            </div>

            <div class="space-y-2.5">
              <div class="flex flex-wrap items-center gap-3">
                <a target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-gold-dark px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold shadow-warm-sm transition-colors btn-sheen focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :href="CONTACT.whatsappHref">
                  <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path :d="WHATSAPP_BUBBLE_PATH" />
                    <path fill="currentColor" stroke="none" :d="WHATSAPP_PHONE_PATH" />
                  </svg>
                  <span>Falar no WhatsApp</span>
                </a>

                <NuxtLink to="/contato" class="inline-flex items-center gap-1.5 rounded-full border border-gold-light/35 px-4 sm:px-5 py-2.5 sm:py-3 text-sm font-semibold text-background/90 hover:border-gold-bright hover:text-gold-bright transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright">
                  <span>Ou envie uma mensagem</span>
                </NuxtLink>
              </div>

              <p class="inline-flex items-center gap-2 text-xs text-background/75">
                <span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
                <span>{{ CONTACT.hours }}</span>
              </p>
            </div>
          </div>

          <div class="lg:col-span-5 flex flex-col justify-center divide-y divide-gold-light/15 bg-dark-deep/45">
            <div class="group/pillar flex items-start gap-3.5 p-4 sm:px-6 sm:py-4 transition-colors duration-200 hover:bg-background/[0.03]" v-for="pillar in pillars" :key="pillar.key">
              <span class="w-9 h-9 rounded-full bg-gold-bright/10 border border-gold-bright/30 text-gold-bright flex items-center justify-center shrink-0 transition-all duration-300 ease-out motion-reduce:transition-none group-hover/pillar:bg-primary group-hover/pillar:text-primary-foreground group-hover/pillar:border-primary group-hover/pillar:-translate-y-0.5 motion-reduce:group-hover/pillar:translate-y-0" aria-hidden="true">
                <component class="w-4 h-4 stroke-[1.75] transition-transform duration-300 motion-reduce:transition-none group-hover/pillar:scale-110 motion-reduce:group-hover/pillar:scale-100" :is="pillar.icon" />
              </span>

              <div class="min-w-0">
                <h3 class="text-sm font-semibold text-background leading-snug transition-colors duration-200 group-hover/pillar:text-gold-bright">
                  {{ pillar.title }}
                </h3>
                <p class="mt-0.5 text-xs text-background/70 leading-relaxed">
                  {{ pillar.subtitle }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Grid: Shared Brand column + Desktop columns / Mobile Accordion -->
      <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,2.5fr)_minmax(0,2.5fr)_minmax(0,3fr)] gap-6 lg:gap-10 py-8 sm:py-10" v-reveal="{ delay: 80 }">
        <!-- Column 1: Vertical Gold Crest & Socials -->
        <div class="min-w-0 flex flex-col items-center text-center md:items-start md:text-left">
          <NuxtLink to="/" class="group inline-flex items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-dark-deep" aria-label="Página Inicial — Sagrada Família">
            <img src="/images/vertical_2D_logo.png" alt="Sagrada Família — Artigos Religiosos" class="logo-gold block h-16 md:h-20 w-auto object-contain select-none transition-[filter,transform] duration-300 motion-reduce:transition-none group-hover:brightness-110" />
          </NuxtLink>

          <p class="mt-1.5 text-sm text-background/75 leading-relaxed max-w-sm">
            Peças sacras selecionadas com reverência e acabamento artesanal para abençoar o seu lar, fortalecer a devoção diária e inspirar a oração em família todos os dias.
          </p>

          <ul class="mt-3.5 md:mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2.5" aria-label="Redes sociais da Sagrada Família">
            <li v-for="social in socials" :key="social.key">
              <a target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center size-9 rounded-full border border-gold-light/25 bg-dark/65 text-background/85 transition-all duration-200 motion-reduce:transition-none hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-bright" :href="social.href" :aria-label="social.label" :title="social.label">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-if="social.key === 'whatsapp'">
                  <path :d="WHATSAPP_BUBBLE_PATH" />
                  <path fill="currentColor" stroke="none" :d="WHATSAPP_PHONE_PATH" />
                </svg>

                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-else-if="social.key === 'instagram'">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>

                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" v-else>
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <!-- Tablet & Desktop Columns 2-3 -->
        <nav class="hidden md:block min-w-0" v-for="col in linkColumns" :key="col.id" :aria-labelledby="`footer-nav-${ col.id }`">
          <h3 class="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-bright mb-3.5" :id="`footer-nav-${ col.id }`">
            {{ col.title }}
          </h3>

          <ul class="space-y-2">
            <li v-for="item in col.items" :key="item.label">
              <NuxtLink class="group/link inline-flex items-center gap-2 text-sm text-background/75 hover:text-gold-bright transition-colors" :to="item.to">
                <span class="link-editorial footer-link">{{ item.label }}</span>
                <span class="rounded-full bg-gold-bright/15 border border-gold-bright/30 px-1.5 py-0.5 text-[10px] font-semibold text-gold-bright leading-none" v-if="item.badge">
                  {{ item.badge }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Tablet & Desktop Column 4 -->
        <div class="hidden md:block min-w-0 space-y-3">
          <h3 class="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-bright">
            Atendimento &amp; Loja
          </h3>

          <ul class="space-y-2.5 text-sm text-background/80">
            <li>
              <a target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 hover:text-gold-bright transition-colors" :href="CONTACT.whatsappHref">
                <svg class="w-4 h-4 text-gold-bright shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path :d="WHATSAPP_BUBBLE_PATH" />
                  <path fill="currentColor" stroke="none" :d="WHATSAPP_PHONE_PATH" />
                </svg>
                <span class="tabular-nums">{{ CONTACT.whatsappDisplay }}</span>
              </a>
            </li>

            <li>
              <a class="inline-flex items-start gap-2.5 hover:text-gold-bright transition-colors break-all" :href="`mailto:${ CONTACT.email }`">
                <Mail class="w-4 h-4 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />
                <span>{{ CONTACT.email }}</span>
              </a>
            </li>

            <li class="flex items-start gap-2.5 text-xs text-background/70 leading-relaxed">
              <Clock class="w-4 h-4 text-gold-light shrink-0 mt-0.5" aria-hidden="true" />
              <span>{{ CONTACT.hours }}</span>
            </li>

            <li class="flex items-start gap-2.5 text-xs text-background/70 leading-relaxed">
              <MapPin class="w-4 h-4 text-gold-light shrink-0 mt-0.5" aria-hidden="true" />
              <span>{{ CONTACT.address }}</span>
            </li>
          </ul>
        </div>

        <!-- Mobile Accordion (replaces columns 2-4 on small screens) -->
        <div class="md:hidden">
          <Accordion type="single" class="border-t border-gold-light/20" collapsible>
            <AccordionItem class="border-b border-gold-light/20" v-for="col in linkColumns" :key="col.id" :value="col.id">
              <AccordionTrigger class="text-xs font-semibold uppercase tracking-[0.16em] text-gold-bright hover:no-underline py-3.5">
                <span>{{ col.title }}</span>
                <template #icon>
                  <ChevronDown class="text-gold-bright pointer-events-none size-4 shrink-0 transition-transform duration-200" />
                </template>
              </AccordionTrigger>

              <AccordionContent>
                <ul class="space-y-1 pt-1 pb-1">
                  <li v-for="item in col.items" :key="item.label">
                    <NuxtLink class="flex items-center gap-2.5 py-2 text-sm text-background/80 hover:text-gold-bright transition-colors" :to="item.to">
                      <span>{{ item.label }}</span>
                      <span class="rounded-full bg-gold-bright/15 px-1.5 py-0.5 text-[10px] font-semibold text-gold-bright leading-none" v-if="item.badge">
                        {{ item.badge }}
                      </span>
                    </NuxtLink>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem class="border-b border-gold-light/20" value="atendimento">
              <AccordionTrigger class="text-xs font-semibold uppercase tracking-[0.16em] text-gold-bright hover:no-underline py-3.5">
                <span>Atendimento &amp; Loja</span>
                <template #icon>
                  <ChevronDown class="text-gold-bright pointer-events-none size-4 shrink-0 transition-transform duration-200" />
                </template>
              </AccordionTrigger>

              <AccordionContent>
                <ul class="space-y-1 pt-1 pb-1 text-sm text-background/80">
                  <li>
                    <a target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 py-2 hover:text-gold-bright transition-colors" :href="CONTACT.whatsappHref">
                      <svg class="w-4 h-4 text-gold-bright shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path :d="WHATSAPP_BUBBLE_PATH" />
                        <path fill="currentColor" stroke="none" :d="WHATSAPP_PHONE_PATH" />
                      </svg>
                      <span class="tabular-nums">{{ CONTACT.whatsappDisplay }}</span>
                    </a>
                  </li>
                  <li>
                    <a class="inline-flex items-start gap-2.5 py-2 hover:text-gold-bright transition-colors break-all" :href="`mailto:${ CONTACT.email }`">
                      <Mail class="w-4 h-4 text-gold-bright shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{{ CONTACT.email }}</span>
                    </a>
                  </li>
                  <li class="flex items-start gap-2.5 py-1.5 text-xs text-background/70">
                    <Clock class="w-4 h-4 text-gold-light shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{{ CONTACT.hours }}</span>
                  </li>
                  <li class="flex items-start gap-2.5 py-1.5 text-xs text-background/70">
                    <MapPin class="w-4 h-4 text-gold-light shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{{ CONTACT.address }}</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <AbsoluteFooter />
    </div>

    <!-- Overlapping Monumental Bottom Wordmark -->
    <div class="pointer-events-none select-none absolute inset-x-0 bottom-0 z-[1] overflow-hidden text-center" aria-hidden="true">
      <p class="wordmark-fade font-serif font-semibold uppercase tracking-[0.04em] sm:tracking-[0.08em] text-[11vw] sm:text-[clamp(3.6rem,10.5vw,9.5rem)] leading-[0.82] text-gold-bright/[0.09] sm:text-gold-bright/[0.065] whitespace-nowrap">
        Sagrada Família
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { ChevronDown, Clock, Mail, MapPin, PackageCheck, QrCode, Truck } from '@lucide/vue';
  import AbsoluteFooter from '@/components/footer/AbsoluteFooter.vue';
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@sagrada-familia/ui/accordion';

  const WHATSAPP_BUBBLE_PATH = 'M3 21l1.65-3.8A9 9 0 1 1 21 12a9 9 0 0 1-13.2 7.95L3 21z';
  const WHATSAPP_PHONE_PATH = 'M9.5 8.8c.2-.45.45-.46.7-.47h.55c.18 0 .42.06.64.52.23.48.77 1.72.84 1.85.07.13.12.28.02.45-.1.18-.15.29-.3.45-.15.16-.31.35-.44.47-.14.13-.29.28-.12.56.17.28.75 1.24 1.61 2 1.1.97 2.02 1.27 2.31 1.42.29.14.46.12.63-.07.17-.19.74-.85.94-1.15.2-.3.4-.25.67-.15.27.1 1.73.81 2.03.96.3.15.5.22.57.34.07.13.07.73-.18 1.44-.25.7-1.45 1.37-2 1.44-.51.07-1.16.1-1.88-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.35-5.14-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.04-2.49z';

  const CONTACT = {
    whatsappDisplay: '(41) 99911-3465',
    whatsappHref: 'https://wa.me/5541999113465?text=Ol%C3%A1!%20Gostaria%20de%20ajuda%20para%20escolher%20uma%20pe%C3%A7a%20sacra.',
    email: 'contato@sagradafamilia.com.br',
    hours: 'Seg. a Sex., 9h às 18h • Sáb., 9h às 14h',
    address: 'R. Eng. Benedito Mário da Silva, 436, Loja 3 – Cajuru, Curitiba - PR'
  };

  const pillars = [
    {
      key: 'packaging',
      icon: PackageCheck,
      title: 'Embalagem Anti-Impacto',
      subtitle: 'Vistoria manual e proteção reforçada em duas camadas'
    },
    {
      key: 'shipping',
      icon: Truck,
      title: 'Envio para Todo o Brasil',
      subtitle: 'Despacho ágil com rastreamento completo até a entrega'
    },
    {
      key: 'payment',
      icon: QrCode,
      title: '5% OFF no Pix ou 10x sem juros',
      subtitle: 'Condições facilitadas e ambiente 100% seguro'
    }
  ];

  const linkColumns = [
    {
      id: 'navegacao',
      title: 'Navegação',
      items: [
        { label: 'Mais Vendidos', to: '/c/mais-vendidos' },
        { label: 'Promoções', to: '/c/promocoes', badge: 'Ofertas' },
        { label: 'Lançamentos', to: '/c/lancamentos', badge: 'Novidades' },
        { label: 'Todos os Produtos', to: '/p' },
        { label: 'Sobre Nós', to: '/sobre-nos' }
      ]
    },
    {
      id: 'politicas',
      title: 'Ajuda & Políticas',
      items: [
        { label: 'Minha Conta', to: '/minha-conta' },
        { label: 'Rastreie o seu Pedido', to: '/minha-conta#pedidos' },
        { label: 'Postagem e Entrega', to: '/politica-de-postagem-e-entrega' },
        { label: 'Trocas e Devoluções', to: '/politica-de-trocas-e-devolucoes' },
        { label: 'Política de Privacidade', to: '/politica-de-privacidade' }
      ]
    }
  ];

  const socials = [
    {
      key: 'whatsapp',
      label: 'Atendimento via WhatsApp',
      href: CONTACT.whatsappHref
    },
    {
      key: 'instagram',
      label: 'Instagram @sagradafamilia.ac',
      href: 'https://www.instagram.com/sagradafamilia.ac/'
    },
    {
      key: 'facebook',
      label: 'Facebook Sagrada Família',
      href: 'https://www.facebook.com/profile.php?id=61588938385250'
    }
  ];
</script>

<style scoped>
  .footer-link::after {
    background-color: hsl(var(--gold-bright));
  }

  .group\/link:hover .footer-link::after, .group\/link:focus-visible .footer-link::after {
    transform: scaleX(1);
  }
</style>
