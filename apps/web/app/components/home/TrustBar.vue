<template>
  <section class="w-full bg-surface border-b border-gold-light/25" aria-label="Vantagens e garantias da loja">
    <div class="container mx-auto px-4">
      <ul class="grid grid-cols-2 lg:grid-cols-4">
        <li class="group flex flex-col sm:flex-row items-center sm:items-start lg:items-center text-center sm:text-left gap-3 sm:gap-3.5 px-3 py-5 sm:px-5 sm:py-6 border-gold-light/25 transition-colors duration-300 hover:bg-background/45" v-for="( item, index ) in trustItems" :key="item.title" :class="[ index % 2 === 1 ? 'border-l' : '', index >= 2 ? 'border-t lg:border-t-0' : '', index > 0 ? 'lg:border-l' : '' ]">
          <div class="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-background/85 text-primary border border-gold-light/40 flex items-center justify-center shrink-0 transition-all duration-300 ease-out motion-reduce:transition-none group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:shadow-warm-sm group-hover:-translate-y-0.5" aria-hidden="true">
            <span class="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <span class="trust-sheen absolute inset-y-0 -left-full w-3/4 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12" />
            </span>
            <component class="trust-icon relative z-10 w-[18px] h-[18px] stroke-[1.6]" :is="item.icon" />
          </div>

          <div class="min-w-0">
            <p class="text-xs sm:text-sm font-semibold text-foreground leading-snug transition-colors duration-300 group-hover:text-gold-dark">
              {{ item.title }}
            </p>
            <p class="mt-0.5 text-[11px] sm:text-xs text-muted-foreground leading-snug">
              {{ item.subtitle }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { Headset, PackageCheck, ShieldCheck, Truck } from '@lucide/vue';

  const trustItems = [
    {
      icon: PackageCheck,
      title: 'Embalagem Anti-Impacto',
      subtitle: 'Proteção reforçada para imagens sacras'
    },
    {
      icon: Truck,
      title: 'Envio para Todo o Brasil',
      subtitle: 'Rastreamento completo até o seu lar'
    },
    {
      icon: ShieldCheck,
      title: 'Compra 100% Segura',
      subtitle: 'Dados protegidos e garantia de entrega'
    },
    {
      icon: Headset,
      title: 'Atendimento Humanizado',
      subtitle: 'Suporte dedicado no pré e pós-venda'
    }
  ];
</script>

<style scoped>
  .group:hover .trust-sheen {
    animation: trust-sheen-sweep 0.7s ease-out;
  }

  .group:hover .trust-icon {
    animation: trust-pulse 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes trust-sheen-sweep {
    from {
      transform: translateX(0) skewX(-12deg);
    }

    to {
      transform: translateX(340%) skewX(-12deg);
    }
  }

  @keyframes trust-pulse {
    0% {
      transform: scale(1);
    }

    45% {
      transform: scale(1.18);
    }

    100% {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .group:hover .trust-sheen {
      animation: none;
    }

    .group:hover .trust-icon {
      animation: none;
    }
  }
</style>
