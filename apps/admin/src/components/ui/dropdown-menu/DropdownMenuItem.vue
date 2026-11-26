<template>
  <DropdownMenuItem data-slot="dropdown-menu-item" v-bind="forwarded" :data-inset="inset ? '' : undefined" :data-variant="variant" :class="cn( 'relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-2 text-xs sm:text-sm outline-none transition-colors focus:bg-surface focus:text-gold-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4', props.class )">
    <slot />
  </DropdownMenuItem>
</template>

<script setup lang="ts">
  import type { DropdownMenuItemEmits, DropdownMenuItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { DropdownMenuItem, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  const props = withDefaults( defineProps<DropdownMenuItemProps & { class?: HTMLAttributes[ 'class' ]; inset?: boolean; variant?: 'default' | 'destructive' }>(), {
    variant: 'default'
  } );

  const emits = defineEmits<DropdownMenuItemEmits>();

  const delegatedProps = computed( () => {
    const { class: _, inset: _inset, variant: _variant, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
