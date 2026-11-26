<template>
  <PaginationListItem data-slot="pagination-item" v-bind="delegatedProps" :class="cn( buttonVariants( { variant: isActive ? 'default' : 'outline', size } ), !isActive && 'border-gold-light/45 bg-background/85 text-foreground hover:bg-surface hover:text-gold-dark', isActive && 'shadow-warm-sm', 'rounded-lg cursor-pointer tabular-nums', props.class )">
    <slot />
  </PaginationListItem>
</template>

<script setup lang="ts">
  import type { PaginationListItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@sagrada-familia/ui/button';
  import { computed } from 'vue';
  import { PaginationListItem } from 'reka-ui';
  import { cn } from 'cn';
  import { buttonVariants } from '@sagrada-familia/ui/button';

  const props = withDefaults( defineProps<PaginationListItemProps & { size?: ButtonVariants[ 'size' ]; isActive?: boolean; class?: HTMLAttributes[ 'class' ] }>(), {
    size: 'icon-sm',
    isActive: false
  } );

  const delegatedProps = computed( () => {
    const { class: _, size: _size, isActive: _isActive, ...delegated } = props;
    return delegated;
  } );
</script>
