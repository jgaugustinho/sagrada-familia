<template>
  <TableRow class="hover:bg-transparent">
    <TableCell :colspan="colspan" :class="cn( 'p-6 text-center align-middle', props.class )">
      <div class="flex flex-col items-center justify-center py-6">
        <slot />
      </div>
    </TableCell>
  </TableRow>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';
  import TableCell from './TableCell.vue';
  import TableRow from './TableRow.vue';

  const props = withDefaults( defineProps<{
    class?: HTMLAttributes[ 'class' ];
    colspan?: number;
  }>(), {
    colspan: 1
  } );
</script>
