<template>
  <div role="group" data-slot="input-group" :class="cn( 'relative flex h-9 w-full items-center rounded-xl border border-gold-light/50 bg-background shadow-warm-sm transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring has-[input:disabled]:opacity-50 has-[input:disabled]:cursor-not-allowed', props.class )">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    class?: HTMLAttributes[ 'class' ];
  }>();
</script>
