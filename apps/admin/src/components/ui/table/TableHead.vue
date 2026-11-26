<template>
  <th data-slot="table-head" :class="cn( 'h-11 px-3.5 text-left align-middle text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', props.class )">
    <slot />
  </th>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
