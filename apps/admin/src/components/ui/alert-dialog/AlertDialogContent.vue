<template>
  <AlertDialogPortal>
    <AlertDialogOverlay data-slot="alert-dialog-overlay" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />

    <AlertDialogContent data-slot="alert-dialog-content" v-bind="{ ...$attrs, ...forwarded }" :class="cn( 'fixed left-1/2 top-1/2 z-50 flex flex-col w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-gold-light/45 bg-card p-6 text-card-foreground shadow-warm-lg data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out', props.class )">
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

<script setup lang="ts">
  import type { AlertDialogContentEmits, AlertDialogContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { AlertDialogContent, AlertDialogOverlay, AlertDialogPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  defineOptions( {
    inheritAttrs: false
  } );

  const props = defineProps<AlertDialogContentProps & { class?: HTMLAttributes[ 'class' ] }>();
  const emits = defineEmits<AlertDialogContentEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
