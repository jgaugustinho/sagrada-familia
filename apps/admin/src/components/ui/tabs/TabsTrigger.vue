<template>
  <TabsTrigger data-slot="tabs-trigger" v-bind="delegatedProps" :class="cn( 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-gold-light/45 data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:font-semibold data-[state=active]:shadow-warm-sm', props.class )">
    <slot />
  </TabsTrigger>
</template>

<script setup lang="ts">
  import type { TabsTriggerProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { TabsTrigger } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
