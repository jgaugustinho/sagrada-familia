<template>
  <DialogClose data-slot="sheet-close" v-bind="forwardedProps">
    <slot />
  </DialogClose>
</template>

<script setup lang="ts">
  import type { DialogCloseProps } from 'reka-ui';
  import { DialogClose, useForwardProps } from 'reka-ui';

  const props = defineProps<DialogCloseProps>();
  const forwardedProps = useForwardProps( props );
</script>
