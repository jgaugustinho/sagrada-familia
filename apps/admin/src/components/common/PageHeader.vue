<template>
  <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div class="space-y-2.5">
      <div class="flex items-center gap-3">
        <span class="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">{{ eyebrow }}</span>
        <span class="h-px w-8 bg-gold-light/55" aria-hidden="true" />
        <span class="text-xs leading-none text-gold-dark/80" aria-hidden="true">†</span>
      </div>

      <h1 class="font-serif text-3xl sm:text-[2.2rem] font-semibold tracking-tight leading-[1.08] text-foreground">
        {{ title }}
      </h1>

      <p class="text-sm text-muted-foreground leading-relaxed max-w-2xl" v-if="subtitle">
        {{ subtitle }}
      </p>
    </div>

    <div class="flex items-center gap-2.5 shrink-0" v-if="$slots.actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
  defineProps<{
    eyebrow: string;
    title: string;
    subtitle?: string;
  }>();
</script>
