<template>
  <section class="container mx-auto px-4" aria-labelledby="seasonal-showcase-heading" v-if="campaign">
    <div class="relative rounded-2xl border border-primary/25 bg-gradient-to-br from-secondary/75 via-card to-secondary/40 p-5 sm:p-7 lg:p-8 shadow-sm">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <Badge class="mb-2.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-primary">
            <Sparkles class="w-3.5 h-3.5" />
            <span>{{ campaign.badge }}</span>
          </Badge>

          <h2 id="seasonal-showcase-heading" class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
            {{ campaign.title }}
          </h2>

          <p class="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
            {{ campaign.subtitle }}
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-6 shrink-0">
          <div class="flex items-center gap-2.5" aria-label="Tempo restante da campanha">
            <div class="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Clock class="w-3.5 h-3.5 text-primary" />
              <span>Termina em:</span>
            </div>

            <div class="flex items-center gap-1.5">
              <div class="inline-flex items-baseline gap-0.5 px-2 py-1 rounded-lg bg-background/90 border border-border shadow-sm" v-for="unit in countdownUnits" :key="unit.label">
                <span class="text-xs sm:text-sm font-bold tabular-nums text-primary">{{ unit.value }}</span>
                <span class="text-[10px] font-semibold uppercase text-muted-foreground">{{ unit.label }}</span>
              </div>
            </div>
          </div>

          <NuxtLink class="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0" :to="campaign.to">
            <span>{{ campaign.ctaLabel }}</span>
            <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </NuxtLink>
        </div>
      </div>

      <ProductCarousel :aria-label="campaign.title" :products="campaign.products" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted } from 'vue';
  import { ArrowRight, Clock, Sparkles } from '@lucide/vue';
  import ProductCarousel from '@/components/product/ProductCarousel.vue';
  import { Badge } from '@/components/ui/badge';
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
      { label: 'd', value: padUnit( days ) },
      { label: 'h', value: padUnit( hours ) },
      { label: 'm', value: padUnit( minutes ) },
      { label: 's', value: padUnit( seconds ) }
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
