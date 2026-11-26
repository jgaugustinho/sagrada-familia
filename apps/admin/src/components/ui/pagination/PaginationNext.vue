<template>
  <PaginationNext data-slot="pagination-next" v-bind="forwarded" :class="cn( buttonVariants( { variant: 'outline', size } ), 'gap-1 rounded-lg border-gold-light/45 bg-background/85 px-2.5 text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer', props.class )">
    <slot>
      <span class="hidden sm:inline">Próximo</span>
      <ChevronRight class="size-4" aria-hidden="true" />
    </slot>
  </PaginationNext>
</template>

<script setup lang="ts">
  import type { PaginationNextProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@sagrada-familia/ui/button';
  import { computed } from 'vue';
  import { ChevronRight } from '@lucide/vue';
  import { PaginationNext, useForwardProps } from 'reka-ui';
  import { cn } from 'cn';
  import { buttonVariants } from '@sagrada-familia/ui/button';

  const props = withDefaults( defineProps<PaginationNextProps & { size?: ButtonVariants[ 'size' ]; class?: HTMLAttributes[ 'class' ] }>(), {
    size: 'sm'
  } );

  const delegatedProps = computed( () => {
    const { class: _, size: _size, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardProps( delegatedProps );
</script>
