<template>
  <li role="presentation" aria-hidden="true" data-slot="breadcrumb-separator" :class="cn( '[&>svg]:size-3.5 text-gold-light', props.class )">
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { ChevronRight } from '@lucide/vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
