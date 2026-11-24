<template>
  <AccordionContent class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm" data-slot="accordion-content" v-bind="forwardedProps">
    <div :class="cn( 'pt-0 pb-4', props.class )">
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
  import type { AccordionContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { AccordionContent, useForwardProps } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<AccordionContentProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwardedProps = useForwardProps( delegatedProps );
</script>
