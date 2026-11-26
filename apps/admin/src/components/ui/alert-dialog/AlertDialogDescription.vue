<template>
  <AlertDialogDescription data-slot="alert-dialog-description" v-bind="delegatedProps" :class="cn( 'text-sm text-muted-foreground leading-relaxed', props.class )">
    <slot />
  </AlertDialogDescription>
</template>

<script setup lang="ts">
  import type { AlertDialogDescriptionProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { AlertDialogDescription } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
