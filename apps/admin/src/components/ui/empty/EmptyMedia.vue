<template>
  <div data-slot="empty-media" :data-variant="variant" :class="cn( emptyMediaVariants( { variant } ), props.class )">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import type { EmptyMediaVariants } from '.';
  import { cn } from 'cn';
  import { emptyMediaVariants } from '.';

  const props = withDefaults( defineProps<{
    variant?: EmptyMediaVariants[ 'variant' ];
    class?: HTMLAttributes[ 'class' ];
  }>(), {
    variant: 'default'
  } );
</script>
