<template>
  <AlertDialogCancel data-slot="alert-dialog-cancel" v-bind="delegatedProps" :class="cn( buttonVariants( { variant: 'outline' } ), 'rounded-xl border-gold-light/50 bg-background text-foreground hover:bg-surface hover:text-gold-dark cursor-pointer', props.class )">
    <slot />
  </AlertDialogCancel>
</template>

<script setup lang="ts">
  import type { AlertDialogCancelProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { AlertDialogCancel } from 'reka-ui';
  import { cn } from 'cn';
  import { buttonVariants } from '@sagrada-familia/ui/button';

  const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
