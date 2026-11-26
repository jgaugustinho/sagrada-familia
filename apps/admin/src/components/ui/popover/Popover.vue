<template>
  <PopoverRoot data-slot="popover" v-slot="slotProps" v-bind="forwarded">
    <slot v-bind="slotProps" />
  </PopoverRoot>
</template>

<script setup lang="ts">
  import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui';
  import { PopoverRoot, useForwardPropsEmits } from 'reka-ui';

  const props = defineProps<PopoverRootProps>();
  const emits = defineEmits<PopoverRootEmits>();

  const forwarded = useForwardPropsEmits( props, emits );
</script>
