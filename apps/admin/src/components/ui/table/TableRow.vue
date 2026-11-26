<template>
  <tr data-slot="table-row" :class="cn( 'border-b border-gold-light/20 transition-colors hover:bg-surface/45 data-[state=selected]:bg-primary/[0.06]', props.class )">
    <slot />
  </tr>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
