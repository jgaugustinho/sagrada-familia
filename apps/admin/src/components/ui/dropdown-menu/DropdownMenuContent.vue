<template>
  <DropdownMenuPortal>
    <DropdownMenuContent data-slot="dropdown-menu-content" v-bind="{ ...$attrs, ...forwarded }" :class="cn( 'z-50 max-h-[var(--reka-dropdown-menu-content-available-height)] min-w-[11rem] overflow-x-hidden overflow-y-auto rounded-xl border border-gold-light/45 bg-popover p-1.5 text-popover-foreground shadow-warm-md data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out', props.class )">
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<script setup lang="ts">
  import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { DropdownMenuContent, DropdownMenuPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  defineOptions( {
    inheritAttrs: false
  } );

  const props = withDefaults( defineProps<DropdownMenuContentProps & { class?: HTMLAttributes[ 'class' ] }>(), {
    sideOffset: 6
  } );

  const emits = defineEmits<DropdownMenuContentEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
