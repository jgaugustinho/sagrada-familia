<template>
  <PaginationEllipsis data-slot="pagination-ellipsis" v-bind="delegatedProps" :class="cn( 'flex size-8 items-center justify-center text-muted-foreground', props.class )">
    <slot>
      <MoreHorizontal class="size-4" aria-hidden="true" />
      <span class="sr-only">Mais páginas</span>
    </slot>
  </PaginationEllipsis>
</template>

<script setup lang="ts">
  import type { PaginationEllipsisProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { MoreHorizontal } from '@lucide/vue';
  import { PaginationEllipsis } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
