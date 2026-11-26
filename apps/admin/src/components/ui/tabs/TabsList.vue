<template>
  <TabsList data-slot="tabs-list" v-bind="delegatedProps" :class="cn( 'inline-flex items-center gap-1 rounded-xl border border-gold-light/30 bg-surface/65 p-1 text-muted-foreground', props.class )">
    <slot />
  </TabsList>
</template>

<script setup lang="ts">
  import type { TabsListProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { TabsList } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<TabsListProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
