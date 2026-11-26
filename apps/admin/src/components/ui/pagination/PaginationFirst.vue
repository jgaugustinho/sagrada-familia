<template>
  <PaginationFirst data-slot="pagination-first" v-bind="forwarded" :class="cn( buttonVariants( { variant: 'outline', size } ), 'rounded-lg border-gold-light/45 bg-background/85 text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer', props.class )">
    <slot>
      <ChevronsLeft class="size-4" aria-hidden="true" />
      <span class="sr-only">Primeira página</span>
    </slot>
  </PaginationFirst>
</template>

<script setup lang="ts">
  import type { PaginationFirstProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@sagrada-familia/ui/button';
  import { computed } from 'vue';
  import { ChevronsLeft } from '@lucide/vue';
  import { PaginationFirst, useForwardProps } from 'reka-ui';
  import { cn } from 'cn';
  import { buttonVariants } from '@sagrada-familia/ui/button';

  const props = withDefaults( defineProps<PaginationFirstProps & { size?: ButtonVariants[ 'size' ]; class?: HTMLAttributes[ 'class' ] }>(), {
    size: 'icon-sm'
  } );

  const delegatedProps = computed( () => {
    const { class: _, size: _size, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardProps( delegatedProps );
</script>
