<template>
  <section class="relative w-full overflow-hidden bg-gradient-to-b from-surface-warm/80 via-surface-warm to-surface-warm/70 border-y border-gold-light/35 py-14 sm:py-20" aria-labelledby="seasonal-showcase-heading" v-if="campaign">
    <div class="pointer-events-none absolute -top-28 -right-28 w-96 h-96 rounded-full bg-background/45 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

    <svg class="star-ornament-mask pointer-events-none select-none absolute -top-10 -right-8 sm:-top-12 sm:right-2 lg:right-8 z-[1] w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[400px] lg:h-[400px] text-gold-dark opacity-[0.18]" viewBox="0 0 360 360" fill="none" aria-hidden="true">
      <circle cx="220" cy="138" r="22" stroke="currentColor" stroke-width="1.25" />
      <circle cx="220" cy="138" r="11" stroke="currentColor" stroke-width="1.1" stroke-opacity="0.85" />
      <circle cx="220" cy="138" r="56" stroke="currentColor" stroke-width="1" stroke-opacity="0.7" stroke-dasharray="2 5" />
      <path d="M220 34 C224 120 238 134 312 138 C238 142 224 156 220 242 C216 156 202 142 128 138 C202 134 216 120 220 34 Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
      <line x1="220" y1="8" x2="220" y2="26" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-opacity="0.8" />
      <line x1="220" y1="250" x2="220" y2="294" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-opacity="0.8" />
      <line x1="92" y1="138" x2="120" y2="138" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-opacity="0.8" />
      <line x1="320" y1="138" x2="346" y2="138" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-opacity="0.8" />
      <line x1="238" y1="120" x2="292" y2="66" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-opacity="0.75" />
      <line x1="238" y1="156" x2="292" y2="210" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-opacity="0.75" />
      <line x1="202" y1="156" x2="148" y2="210" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-opacity="0.75" />
      <line x1="202" y1="120" x2="148" y2="66" stroke="currentColor" stroke-width="1.05" stroke-linecap="round" stroke-opacity="0.75" />
      <path d="M116 60 C117 72 118 73 130 74 C118 75 117 76 116 88 C115 76 114 75 102 74 C114 73 115 72 116 60 Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" stroke-opacity="0.9" />
      <path d="M92 196 C92.8 204.5 93.5 205.2 102 206 C93.5 206.8 92.8 207.5 92 216 C91.2 207.5 90.5 206.8 82 206 C90.5 205.2 91.2 204.5 92 196 Z" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round" stroke-opacity="0.85" />
      <path d="M306 221 C306.8 230.2 307.8 231.2 317 232 C307.8 232.8 306.8 233.8 306 243 C305.2 233.8 304.2 232.8 295 232 C304.2 231.2 305.2 230.2 306 221 Z" stroke="currentColor" stroke-width="1.15" stroke-linejoin="round" stroke-opacity="0.85" />
      <circle cx="158" cy="46" r="1.8" fill="currentColor" fill-opacity="0.8" />
      <circle cx="64" cy="152" r="1.6" fill="currentColor" fill-opacity="0.75" />
    </svg>

    <div class="relative z-10 container mx-auto px-4">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-7 sm:mb-10" v-reveal>
        <div>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-dark text-background px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 shadow-warm-sm">
            <Sparkles class="w-3.5 h-3.5 text-gold-bright" />
            <span>{{ campaign.badge }}</span>
          </span>

          <h2 id="seasonal-showcase-heading" class="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-[1.1] text-foreground">
            {{ campaign.title }}
          </h2>

          <p class="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {{ campaign.subtitle }}
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-between lg:justify-end gap-5 sm:gap-7 shrink-0">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3" aria-label="Tempo restante da campanha">
            <div class="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-dark">
              <Clock class="w-3.5 h-3.5 text-primary" />
              <span>Termina em</span>
            </div>

            <div class="flex items-center gap-1.5">
              <template v-for="( unit, index ) in countdownUnits" :key="unit.label">
                <span class="font-serif text-xl text-gold-light select-none" aria-hidden="true" v-if="index > 0">:</span>
                <div class="flex flex-col items-center min-w-[2.75rem] px-2.5 py-1.5 rounded-xl bg-card/85 border border-gold-light/35 shadow-warm-sm">
                  <span class="font-serif text-2xl sm:text-[1.75rem] font-semibold leading-none tabular-nums text-foreground">{{ unit.value }}</span>
                  <span class="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{{ unit.label }}</span>
                </div>
              </template>
            </div>
          </div>

          <NuxtLink class="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:text-primary transition-colors shrink-0" :to="campaign.to">
            <span class="link-editorial">{{ campaign.ctaLabel }}</span>
            <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </NuxtLink>
        </div>
      </div>

      <div v-reveal="{ delay: 100 }">
        <ProductCarousel card-surface="elevated" :aria-label="campaign.title" :products="campaign.products" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import { ArrowRight, Clock, Sparkles } from '@lucide/vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import { activeSeasonalCampaign } from '@/data/products';

  interface CountdownUnit {
    label: string;
    value: string;
  }

  const campaign = activeSeasonalCampaign;

  const getRemainingMs = (): number => {
    if ( !campaign ) {
      return 0;
    }

    return Math.max( 0, new Date( campaign.endsAt ).getTime() - Date.now() );
  };

  const remainingMs = useState<number>( 'seasonal-campaign-remaining-ms', getRemainingMs );

  const updateRemainingMs = () => {
    remainingMs.value = getRemainingMs();
  };

  const padUnit = ( value: number ): string => String( value ).padStart( 2, '0' );

  const countdownUnits = computed<CountdownUnit[]>( () => {
    const totalSeconds = Math.floor( remainingMs.value / 1000 );
    const days = Math.floor( totalSeconds / 86400 );
    const hours = Math.floor( ( totalSeconds % 86400 ) / 3600 );
    const minutes = Math.floor( ( totalSeconds % 3600 ) / 60 );
    const seconds = totalSeconds % 60;

    return [
      { label: 'dias', value: padUnit( days ) },
      { label: 'horas', value: padUnit( hours ) },
      { label: 'min', value: padUnit( minutes ) },
      { label: 'seg', value: padUnit( seconds ) }
    ];
  } );

  let countdownTimer: ReturnType<typeof setInterval> | null = null;

  onMounted( () => {
    updateRemainingMs();
    countdownTimer = setInterval( updateRemainingMs, 1000 );
  } );

  onUnmounted( () => {
    if ( countdownTimer ) {
      clearInterval( countdownTimer );
    }
  } );
</script>

<style scoped>
  .star-ornament-mask {
    -webkit-mask-image: radial-gradient(circle at 62% 40%, #000 58%, transparent 98%);
    mask-image: radial-gradient(circle at 62% 40%, #000 58%, transparent 98%);
  }
</style>
