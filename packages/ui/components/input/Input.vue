<template>
  <input data-slot="input" :class="cn( 'flex h-9 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-1 text-sm text-foreground shadow-warm-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50', props.class )" :value="props.modelValue ?? props.defaultValue ?? ''" @input="handleInput" />
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import { cn } from 'cn';

  const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: HTMLAttributes[ 'class' ];
  }>();

  const emits = defineEmits<{
    ( e: 'update:modelValue', payload: string | number ): void;
  }>();

  const handleInput = ( event: Event ) => {
    const target = event.target as HTMLInputElement;
    emits( 'update:modelValue', target.value );
  };
</script>
