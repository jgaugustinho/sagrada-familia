<template>
  <div>
    <!-- Payments & Security Certificates -->
    <div class="border-t border-gold-light/15 py-5 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
      <div class="space-y-2">
        <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
          Formas de Pagamento • Até 10x sem juros
        </p>

        <ul class="flex flex-wrap items-center gap-2" aria-label="Formas de pagamento aceitas">
          <li class="group inline-flex items-center gap-1.5 rounded-lg bg-background/[0.05] border border-gold-light/20 text-background/90 px-3 py-1.5 text-xs select-none transition-all duration-200 motion-reduce:transition-none hover:bg-background/[0.09] hover:border-gold-bright/45 hover:text-background hover:-translate-y-0.5 motion-reduce:hover:translate-y-0" v-for="method in paymentMethods" :key="method.key">
            <svg class="w-3.5 h-3.5 text-gold-bright shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round" aria-hidden="true" v-if="method.key === 'pix'">
              <path d="M12 2.5L21.5 12L12 21.5L2.5 12L12 2.5Z" />
              <path d="M8.5 12L12 8.5L15.5 12L12 15.5L8.5 12Z" fill="currentColor" stroke="none" />
            </svg>

            <svg class="w-5 h-3.5 text-gold-bright shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" viewBox="0 0 28 18" fill="none" aria-hidden="true" v-else-if="method.key === 'mastercard'">
              <circle cx="10.5" cy="9" r="6" fill="currentColor" fill-opacity="0.85" />
              <circle cx="17.5" cy="9" r="6" fill="currentColor" fill-opacity="0.45" />
            </svg>

            <svg class="w-3.5 h-3.5 text-gold-light shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true" v-else-if="method.key === 'elo'">
              <circle cx="12" cy="12" r="7.5" stroke-dasharray="32 14" />
              <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" />
            </svg>

            <CreditCard class="w-3.5 h-3.5 text-gold-light shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" aria-hidden="true" v-else />

            <span class="font-semibold tracking-wide" :class="method.key === 'visa' || method.key === 'amex' ? 'uppercase tracking-[0.08em]' : ''">
              {{ method.label }}
            </span>

            <span class="rounded-full bg-gold-bright/15 border border-gold-bright/30 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-gold-bright leading-none" v-if="method.badge">
              {{ method.badge }}
            </span>
          </li>
        </ul>
      </div>

      <div class="space-y-2">
        <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light">
          Segurança &amp; Certificados
        </p>

        <ul class="flex flex-wrap items-center gap-2" aria-label="Selos de segurança e proteção de dados">
          <li class="group inline-flex items-center gap-2.5 rounded-lg bg-background/[0.04] border border-gold-light/20 px-3 py-1.5 select-none transition-all duration-200 motion-reduce:transition-none hover:bg-background/[0.08] hover:border-gold-bright/45 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0" v-for="seal in securitySeals" :key="seal.key">
            <svg class="w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-if="seal.key === 'google-safe'">
              <path d="M12 2.5L4.5 5.8v5.7c0 4.9 3.2 9.4 7.5 10.5 4.3-1.1 7.5-5.6 7.5-10.5V5.8L12 2.5z" fill="currentColor" fill-opacity="0.14" />
              <path d="M9 12.2l2.1 2.1 4.2-4.3" />
            </svg>

            <svg class="w-5 h-5 text-gold-bright shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-else-if="seal.key === 'ssl'">
              <path d="M12 2.5L4.5 5.8v5.7c0 4.9 3.2 9.4 7.5 10.5 4.3-1.1 7.5-5.6 7.5-10.5V5.8L12 2.5z" fill="currentColor" fill-opacity="0.12" />
              <rect x="8.8" y="11" width="6.4" height="4.8" rx="1" />
              <path d="M10.2 11V9.4a1.8 1.8 0 0 1 3.6 0V11" />
            </svg>

            <svg class="w-5 h-5 text-gold-bright shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-else-if="seal.key === 'lgpd'">
              <path d="M12 2.5L4.5 5.8v5.7c0 4.9 3.2 9.4 7.5 10.5 4.3-1.1 7.5-5.6 7.5-10.5V5.8L12 2.5z" fill="currentColor" fill-opacity="0.12" />
              <circle cx="12" cy="9.6" r="1.8" />
              <path d="M8.8 15.2a3.4 3.4 0 0 1 6.4 0" />
            </svg>

            <svg class="w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110 motion-reduce:group-hover:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-else>
              <path d="M12 2.5l2.1 1.6 2.6-.3 1 2.4 2.4 1-.3 2.6L21.5 12l-1.7 2.2.3 2.6-2.4 1-1 2.4-2.6-.3L12 21.5l-2.1-1.6-2.6.3-1-2.4-2.4-1 .3-2.6L2.5 12l1.7-2.2-.3-2.6 2.4-1 1-2.4 2.6.3L12 2.5z" fill="currentColor" fill-opacity="0.14" />
              <path d="M9.2 12.2l2 2 3.8-4" />
            </svg>

            <div class="min-w-0 leading-none">
              <span class="block text-[9px] font-bold uppercase tracking-[0.14em] text-gold-light">
                {{ seal.eyebrow }}
              </span>
              <span class="block text-xs font-semibold text-background/90 leading-tight mt-0.5 whitespace-nowrap transition-colors duration-200 group-hover:text-background">
                {{ seal.title }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Colophon (centered on mobile with safe padding; left/right aligned on desktop) -->
    <div class="py-4 border-t border-gold-light/15 px-10 sm:px-14 md:pl-0 md:pr-16 flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-2 text-xs text-background/60">
      <p class="leading-relaxed">
        © 2026 Sagrada Família. Todos os direitos reservados. • CNPJ 66.251.124/0001-58
      </p>

      <p class="italic text-gold-light font-medium shrink-0">
        † Jesus, Maria e José, abençoai o nosso lar.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CreditCard } from '@lucide/vue';

  const paymentMethods = [
    { key: 'pix', label: 'Pix', badge: '5% OFF' },
    { key: 'visa', label: 'Visa' },
    { key: 'mastercard', label: 'Mastercard' },
    { key: 'elo', label: 'Elo' },
    { key: 'amex', label: 'Amex' }
  ];

  const securitySeals = [
    { key: 'google-safe', eyebrow: 'Verificado', title: 'Google Safe Browsing' },
    { key: 'ssl', eyebrow: 'Criptografia 256-bit', title: 'Certificado SSL' },
    { key: 'lgpd', eyebrow: 'Dados Protegidos', title: 'Conformidade LGPD' },
    { key: 'safe-store', eyebrow: 'Compra Garantida', title: 'Loja 100% Segura' }
  ];
</script>
