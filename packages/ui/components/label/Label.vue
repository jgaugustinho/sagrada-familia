<template>
  <Label data-slot="label" v-bind="forwardedProps" :class="cn( 'flex items-center gap-2 text-sm leading-none font-medium text-foreground select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', props.class )">
    <slot />
  </Label>
</template>

<script setup lang="ts">
  import type { LabelProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { Label, useForwardProps } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<LabelProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwardedProps = useForwardProps( delegatedProps );
</script>
