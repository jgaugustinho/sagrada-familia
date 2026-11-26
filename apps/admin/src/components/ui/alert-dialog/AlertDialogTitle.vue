<template>
  <AlertDialogTitle data-slot="alert-dialog-title" v-bind="delegatedProps" :class="cn( 'font-sans text-lg sm:text-xl font-semibold tracking-tight text-foreground', props.class )">
    <slot />
  </AlertDialogTitle>
</template>

<script setup lang="ts">
  import type { AlertDialogTitleProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { AlertDialogTitle } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
