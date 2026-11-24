<template>
  <DialogTitle data-slot="sheet-title" v-bind="forwardedProps" :class="cn( 'text-foreground font-semibold', props.class )">
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
  import type { DialogTitleProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { DialogTitle, useForwardProps } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<DialogTitleProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwardedProps = useForwardProps( delegatedProps );
</script>
