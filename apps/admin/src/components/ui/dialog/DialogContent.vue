<template>
  <DialogPortal>
    <DialogOverlay data-slot="dialog-overlay" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />

    <DialogContent data-slot="dialog-content" v-bind="{ ...$attrs, ...forwarded }" :class="cn( 'fixed left-1/2 top-1/2 z-50 flex flex-col w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border border-gold-light/45 bg-card p-6 text-card-foreground shadow-warm-lg data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out', props.class )">
      <slot />

      <DialogClose class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none cursor-pointer" v-if="!hideClose">
        <X class="size-4" aria-hidden="true" />
        <span class="sr-only">Fechar</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<script setup lang="ts">
  import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { X } from '@lucide/vue';
  import { DialogClose, DialogContent, DialogOverlay, DialogPortal, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  defineOptions( {
    inheritAttrs: false
  } );

  const props = withDefaults( defineProps<DialogContentProps & { class?: HTMLAttributes[ 'class' ]; hideClose?: boolean }>(), {
    hideClose: false
  } );

  const emits = defineEmits<DialogContentEmits>();

  const delegatedProps = computed( () => {
    const { class: _, hideClose: _hideClose, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
