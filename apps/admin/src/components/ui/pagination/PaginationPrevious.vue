<template>
  <PaginationPrev data-slot="pagination-previous" v-bind="forwarded" :class="cn( buttonVariants( { variant: 'outline', size } ), 'gap-1 rounded-lg border-gold-light/45 bg-background/85 px-2.5 text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer', props.class )">
    <slot>
      <ChevronLeft class="size-4" aria-hidden="true" />
      <span class="hidden sm:inline">Anterior</span>
    </slot>
  </PaginationPrev>
</template>

<script setup lang="ts">
  import type { PaginationPrevProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@sagrada-familia/ui/button';
  import { computed } from 'vue';
  import { ChevronLeft } from '@lucide/vue';
  import { PaginationPrev, useForwardProps } from 'reka-ui';
  import { cn } from 'cn';
  import { buttonVariants } from '@sagrada-familia/ui/button';

  const props = withDefaults( defineProps<PaginationPrevProps & { size?: ButtonVariants[ 'size' ]; class?: HTMLAttributes[ 'class' ] }>(), {
    size: 'sm'
  } );

  const delegatedProps = computed( () => {
    const { class: _, size: _size, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardProps( delegatedProps );
</script>
