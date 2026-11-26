<template>
  <PaginationList data-slot="pagination-content" v-slot="slotProps" v-bind="delegatedProps" :class="cn( 'flex flex-row items-center gap-1', props.class )">
    <slot v-bind="slotProps" />
  </PaginationList>
</template>

<script setup lang="ts">
  import type { PaginationListProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { PaginationList } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<PaginationListProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
