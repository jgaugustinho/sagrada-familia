<template>
  <DialogPortal>
    <DialogOverlay class="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" data-slot="sheet-overlay" />
    <DialogContent data-slot="sheet-content" :class="cn( sheetVariants( { side } ), props.class )" v-bind="{ ...$attrs, ...forwarded }">
      <slot />

      <DialogClose class="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none" v-if="!hideClose">
        <X class="size-5" />
        <span class="sr-only">Fechar</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

<script setup lang="ts">
  import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { SheetVariants } from '.';
  import { computed } from 'vue';
  import { X } from '@lucide/vue';
  import { DialogClose,
           DialogContent,
           DialogOverlay,
           DialogPortal,
           useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';
  import { sheetVariants } from '.';

  interface SheetContentProps extends DialogContentProps {
    class?: HTMLAttributes[ 'class' ];
    side?: SheetVariants[ 'side' ];
    hideClose?: boolean;
  }

  defineOptions( {
    inheritAttrs: false
  } );

  const props = withDefaults( defineProps<SheetContentProps>(), {
    side: 'right',
    hideClose: false
  } );

  const emits = defineEmits<DialogContentEmits>();

  const delegatedProps = computed( () => {
    const { class: _, side: _side, hideClose: _hideClose, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
