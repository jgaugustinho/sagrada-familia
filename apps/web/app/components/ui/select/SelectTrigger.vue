<template>
  <SelectTrigger data-slot="select-trigger" v-bind="forwardedProps" :class="cn( 'flex h-9 w-full items-center justify-between gap-2 rounded-full border border-gold-light/55 bg-card px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground shadow-warm-sm transition-colors hover:border-primary/70 focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1', props.class )">
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="size-4 shrink-0 text-gold-dark opacity-80" />
    </SelectIcon>
  </SelectTrigger>
</template>

<script setup lang="ts">
  import type { SelectTriggerProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { ChevronDown } from '@lucide/vue';
  import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui';
  import { cn } from '@/lib/utils';

  const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwardedProps = useForwardProps( delegatedProps );
</script>
