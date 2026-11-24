<template>
  <SelectPortal>
    <SelectContent data-slot="select-content" v-bind="{ ...$attrs, ...forwarded }" :class="cn( 'relative z-50 max-h-80 min-w-[11rem] overflow-hidden rounded-xl border border-gold-light/45 bg-popover text-popover-foreground shadow-warm-md data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', props.class )">
      <SelectViewport :class="cn( 'p-1.5', position === 'popper' && 'w-full min-w-[var(--reka-select-trigger-width)]' )">
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>

<script setup lang="ts">
  import type { SelectContentEmits, SelectContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  defineOptions( {
    inheritAttrs: false
  } );

  const props = withDefaults( defineProps<SelectContentProps & { class?: HTMLAttributes[ 'class' ] }>(), {
    position: 'popper'
  } );
  const emits = defineEmits<SelectContentEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
