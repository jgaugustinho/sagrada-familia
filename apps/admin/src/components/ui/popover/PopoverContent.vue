<template>
  <PopoverPortal>
    <PopoverContent data-slot="popover-content" v-bind="{ ...$attrs, ...forwarded }" :class="cn( 'z-50 w-72 origin-[var(--reka-popover-content-transform-origin)] rounded-xl border border-gold-light/45 bg-popover p-4 text-popover-foreground shadow-warm-md outline-none data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out', props.class )">
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>

<script setup lang="ts">
  import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  defineOptions( {
    inheritAttrs: false
  } );

  const props = withDefaults( defineProps<PopoverContentProps & { class?: HTMLAttributes[ 'class' ] }>(), {
    align: 'start',
    sideOffset: 6
  } );

  const emits = defineEmits<PopoverContentEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
