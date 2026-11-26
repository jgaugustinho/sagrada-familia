<template>
  <DialogDescription data-slot="dialog-description" v-bind="delegatedProps" :class="cn( 'text-sm text-muted-foreground leading-relaxed', props.class )">
    <slot />
  </DialogDescription>
</template>

<script setup lang="ts">
  import type { DialogDescriptionProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { DialogDescription } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
