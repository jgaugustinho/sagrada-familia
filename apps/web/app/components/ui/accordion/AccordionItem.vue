<template>
  <AccordionItem data-slot="accordion-item" v-slot="slotProps" v-bind="forwardedProps" :class="cn( 'border-b border-border last:border-b-0', props.class )">
    <slot v-bind="slotProps" />
  </AccordionItem>
</template>

<script setup lang="ts">
  import type { AccordionItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { AccordionItem, useForwardProps } from 'reka-ui';
  import { cn } from '@/lib/utils';

  const props = defineProps<AccordionItemProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwardedProps = useForwardProps( delegatedProps );
</script>
