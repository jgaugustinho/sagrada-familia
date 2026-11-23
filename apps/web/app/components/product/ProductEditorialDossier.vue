<template>
  <section id="detalhes-da-peca" class="w-full bg-surface border-y border-gold-light/25 py-14 sm:py-20" aria-labelledby="product-dossier-heading">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_1fr] gap-y-7 lg:gap-x-12 items-start">
        <!-- Mobile 1st / Desktop Left Top: Full Editorial Description -->
        <div class="lg:col-span-7 lg:col-start-1 lg:row-start-1" v-reveal>
          <span class="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-2">
            † Curadoria Sagrada Família
          </span>

          <h2 id="product-dossier-heading" class="font-serif text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.12] text-foreground">
            Sobre a Peça
          </h2>

          <div class="mt-5 space-y-4 text-sm sm:text-[15.5px] leading-relaxed text-foreground/85">
            <p v-for="( paragraph, index ) in detail.fullDescriptionParagraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Mobile 2nd / Desktop Right: Technical Details Dossier -->
        <div class="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2" v-reveal="{ delay: 100 }">
          <div class="rounded-2xl bg-card border border-gold-light/40 shadow-warm-sm p-6 sm:p-7">
            <div class="pb-4 mb-2 border-b border-gold-light/30">
              <h3 class="font-serif text-2xl font-semibold text-foreground">
                Ficha Técnica
              </h3>
            </div>

            <dl class="divide-y divide-border/75 text-xs sm:text-sm">
              <div class="py-3 flex items-baseline justify-between gap-4" v-for="spec in activeSpecs" :key="spec.label">
                <dt class="text-muted-foreground font-medium shrink-0">
                  {{ spec.label }}
                </dt>
                <dd class="text-foreground font-medium text-right tabular-nums">
                  {{ spec.value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Mobile 3rd / Desktop Left Bottom: Care & Policies Accordion -->
        <div class="lg:col-span-7 lg:col-start-1 lg:row-start-2" v-reveal>
          <div class="rounded-2xl bg-card/85 border border-border/85 px-5 shadow-warm-sm">
            <Accordion type="single" collapsible>
              <AccordionItem value="care" class="border-border/75">
                <AccordionTrigger class="text-sm font-semibold text-foreground hover:text-gold-dark hover:no-underline cursor-pointer">
                  Cuidados e Conservação
                </AccordionTrigger>
                <AccordionContent class="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                  <ul class="space-y-2 list-disc pl-4">
                    <li v-for="( tip, idx ) in detail.careInstructions" :key="idx">
                      {{ tip }}
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="packaging" class="border-border/75">
                <AccordionTrigger class="text-sm font-semibold text-foreground hover:text-gold-dark hover:no-underline cursor-pointer">
                  Embalagem Anti-Impacto e Envio
                </AccordionTrigger>
                <AccordionContent class="text-xs sm:text-[13px] text-muted-foreground leading-relaxed space-y-2.5">
                  <p>
                    Cada peça é conferida manualmente e acomodada em proteção reforçada contra impactos durante o transporte para todo o Brasil.
                  </p>
                  <NuxtLink class="link-editorial inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:text-primary" to="/politica-de-postagem-e-entrega">
                    Ver política de postagem e entrega →
                  </NuxtLink>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="returns" class="border-b-0">
                <AccordionTrigger class="text-sm font-semibold text-foreground hover:text-gold-dark hover:no-underline cursor-pointer">
                  Trocas e Devoluções Garantidas
                </AccordionTrigger>
                <AccordionContent class="text-xs sm:text-[13px] text-muted-foreground leading-relaxed space-y-2.5">
                  <p>
                    Caso a peça não atenda às suas expectativas ou sofra qualquer avaria no trajeto, garantimos troca rápida e atendimento humanizado em até 7 dias corridos.
                  </p>
                  <NuxtLink class="link-editorial inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:text-primary" to="/politica-de-trocas-e-devolucoes">
                    Ver política de trocas e devoluções →
                  </NuxtLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
  import type { ProductEditorialDetail, ProductTechnicalSpec } from '@/data/product-details';

  defineProps<{
    detail: ProductEditorialDetail;
    activeSpecs: ProductTechnicalSpec[];
  }>();
</script>
