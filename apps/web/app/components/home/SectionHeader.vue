<template>
  <div class="mb-7 sm:mb-10" :class="align === 'center' ? 'text-center max-w-2xl mx-auto' : 'flex flex-col sm:flex-row sm:items-end justify-between gap-4'">
    <div :class="align === 'center' ? 'flex flex-col items-center' : ''">
      <span class="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-2" :class="tone === 'dark' ? 'text-gold-bright' : 'text-gold-dark'">
        {{ eyebrow }}
      </span>

      <div class="flex items-center justify-center gap-3 mb-2.5" aria-hidden="true" v-if="align === 'center' && ornament">
        <span class="h-px w-8 bg-gold-light/60" />
        <span class="text-xs leading-none" :class="tone === 'dark' ? 'text-gold-bright' : 'text-gold-light'">†</span>
        <span class="h-px w-8 bg-gold-light/60" />
      </div>

      <h2 class="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-[1.1]" :id="headingId" :class="tone === 'dark' ? 'text-background' : 'text-foreground'">
        {{ title }}
      </h2>

      <p class="mt-2.5 text-sm sm:text-base leading-relaxed" v-if="subtitle" :class="[ tone === 'dark' ? 'text-background/75' : 'text-muted-foreground', align === 'center' ? 'max-w-xl' : 'max-w-2xl' ]">
        {{ subtitle }}
      </p>
    </div>

    <NuxtLink class="group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-colors shrink-0" v-if="actionLabel && actionTo" :to="actionTo" :class="[ align === 'center' ? 'mt-4' : '', tone === 'dark' ? 'text-gold-bright hover:text-background' : 'text-gold-dark hover:text-primary' ]">
      <span class="link-editorial">{{ actionLabel }}</span>
      <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  import { ArrowRight } from '@lucide/vue';

  withDefaults( defineProps<{
    headingId: string;
    eyebrow: string;
    title: string;
    subtitle?: string;
    align?: 'left' | 'center';
    tone?: 'light' | 'dark';
    ornament?: boolean;
    actionLabel?: string;
    actionTo?: string;
  }>(), {
    subtitle: undefined,
    align: 'left',
    tone: 'light',
    ornament: false,
    actionLabel: undefined,
    actionTo: undefined
  } );
</script>
