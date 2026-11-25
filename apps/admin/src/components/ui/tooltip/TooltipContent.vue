<template>
  <TooltipPortal>
    <TooltipContent data-slot="tooltip-content" v-bind="{ ...$attrs, ...forwarded }" :class="cn( 'z-50 overflow-hidden rounded-lg border border-gold-bright/30 bg-dark-deep px-3 py-1.5 text-xs font-medium text-background shadow-warm-md data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out', props.class )">
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>

<script setup lang="ts">
  import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { TooltipContent, TooltipPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  defineOptions( {
    inheritAttrs: false
  } );

  const props = withDefaults( defineProps<TooltipContentProps & { class?: HTMLAttributes[ 'class' ] }>(), {
    sideOffset: 6
  } );

  const emits = defineEmits<TooltipContentEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
