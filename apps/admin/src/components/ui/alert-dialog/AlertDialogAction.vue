<template>
  <AlertDialogAction data-slot="alert-dialog-action" v-bind="delegatedProps" :class="cn( buttonVariants( { variant } ), 'rounded-xl cursor-pointer', props.class )">
    <slot />
  </AlertDialogAction>
</template>

<script setup lang="ts">
  import type { AlertDialogActionProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import type { ButtonVariants } from '@sagrada-familia/ui/button';
  import { computed } from 'vue';
  import { AlertDialogAction } from 'reka-ui';
  import { cn } from 'cn';
  import { buttonVariants } from '@sagrada-familia/ui/button';

  const props = withDefaults( defineProps<AlertDialogActionProps & { variant?: ButtonVariants[ 'variant' ]; class?: HTMLAttributes[ 'class' ] }>(), {
    variant: 'default'
  } );

  const delegatedProps = computed( () => {
    const { class: _, variant: _variant, ...delegated } = props;
    return delegated;
  } );
</script>
