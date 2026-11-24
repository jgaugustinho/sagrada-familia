<template>
  <component data-slot="card-title" :is="as" :class="cn( 'leading-none font-semibold tracking-tight', props.class )">
    <slot />
  </component>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = withDefaults( defineProps<{
    as?: string;
    class?: HTMLAttributes[ 'class' ];
  }>(), {
    as: 'h3'
  } );
</script>
