<template>
  <Button :type="type" :variant="variant" :size="size" :class="cn( 'rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface/80 cursor-pointer', props.class )">
    <slot />
  </Button>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@sagrada-familia/ui/button';
  import { cn } from 'cn';
  import { Button } from '@sagrada-familia/ui/button';

  const props = withDefaults( defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: ButtonVariants[ 'variant' ];
    size?: ButtonVariants[ 'size' ];
    class?: HTMLAttributes[ 'class' ];
  }>(), {
    type: 'button',
    variant: 'ghost',
    size: 'icon-xs'
  } );
</script>
