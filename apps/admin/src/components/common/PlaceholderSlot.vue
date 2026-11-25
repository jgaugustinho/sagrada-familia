<template>
  <Card class="bg-card/95 border-gold-light/35 shadow-warm-sm py-0 gap-0 overflow-hidden">
    <CardHeader class="px-6 pt-5 pb-4 border-b border-gold-light/20 flex flex-row items-start justify-between gap-4 space-y-0">
      <div class="space-y-1 min-w-0">
        <CardTitle class="font-serif text-xl font-semibold tracking-tight text-foreground">
          {{ title }}
        </CardTitle>
        <CardDescription class="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {{ description }}
        </CardDescription>
      </div>

      <Badge variant="outline" class="shrink-0 rounded-full border-gold-light/50 bg-surface/60 px-2.5 py-0.5 text-[11px] font-medium text-gold-dark">
        {{ badgeLabel }}
      </Badge>
    </CardHeader>

    <CardContent class="p-5 sm:p-6">
      <div class="rounded-xl border border-dashed border-gold-light/60 bg-surface/35 flex flex-col items-center justify-center text-center px-6 py-8" :class="minHeightClass">
        <span class="w-11 h-11 rounded-full bg-gold-bright/10 border border-gold-light/45 text-gold-dark flex items-center justify-center mb-3.5" aria-hidden="true">
          <component class="size-5 stroke-[1.75]" :is="icon" />
        </span>

        <p class="text-sm font-semibold text-foreground">
          {{ placeholderLabel }}
        </p>

        <p class="mt-1 text-xs text-muted-foreground leading-relaxed max-w-sm">
          {{ placeholderHint }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import type { Component } from 'vue';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@sagrada-familia/ui/card';

  withDefaults( defineProps<{
    title: string;
    description: string;
    placeholderLabel: string;
    placeholderHint: string;
    icon: Component;
    badgeLabel?: string;
    minHeightClass?: string;
  }>(), {
    badgeLabel: 'Espaço reservado',
    minHeightClass: 'min-h-[260px]'
  } );
</script>
