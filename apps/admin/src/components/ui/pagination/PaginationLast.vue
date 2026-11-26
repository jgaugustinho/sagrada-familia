<template>
  <PaginationLast data-slot="pagination-last" v-bind="forwarded" :class="cn( buttonVariants( { variant: 'outline', size } ), 'rounded-lg border-gold-light/45 bg-background/85 text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer', props.class )">
    <slot>
      <ChevronsRight class="size-4" aria-hidden="true" />
      <span class="sr-only">Última página</span>
    </slot>
  </PaginationLast>
</template>

<script setup lang="ts">
  import type { PaginationLastProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@sagrada-familia/ui/button';
  import { computed } from 'vue';
  import { ChevronsRight } from '@lucide/vue';
  import { PaginationLast, useForwardProps } from 'reka-ui';
  import { cn } from 'cn';
  import { buttonVariants } from '@sagrada-familia/ui/button';

  const props = withDefaults( defineProps<PaginationLastProps & { size?: ButtonVariants[ 'size' ]; class?: HTMLAttributes[ 'class' ] }>(), {
    size: 'icon-sm'
  } );

  const delegatedProps = computed( () => {
    const { class: _, size: _size, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardProps( delegatedProps );
</script>
