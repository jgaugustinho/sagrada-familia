<template>
  <input data-slot="input-group-control" :class="cn( 'h-full w-full min-w-0 flex-1 bg-transparent px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:cursor-not-allowed', props.class )" :value="props.modelValue ?? props.defaultValue ?? ''" @input="handleInput" />
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
