<template>
  <DialogTitle data-slot="dialog-title" v-bind="delegatedProps" :class="cn( 'font-sans text-lg sm:text-xl font-semibold tracking-tight text-foreground', props.class )">
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
  import type { DialogTitleProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { DialogTitle } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<DialogTitleProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
