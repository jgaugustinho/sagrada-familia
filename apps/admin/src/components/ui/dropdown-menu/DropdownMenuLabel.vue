<template>
  <DropdownMenuLabel data-slot="dropdown-menu-label" v-bind="delegatedProps" :data-inset="inset ? '' : undefined" :class="cn( 'px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground data-[inset]:pl-8', props.class )">
    <slot />
  </DropdownMenuLabel>
</template>

<script setup lang="ts">
  import type { DropdownMenuLabelProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { DropdownMenuLabel } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<DropdownMenuLabelProps & { class?: HTMLAttributes[ 'class' ]; inset?: boolean }>();

  const delegatedProps = computed( () => {
    const { class: _, inset: _inset, ...delegated } = props;
    return delegated;
  } );
</script>
