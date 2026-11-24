<template>
  <SelectGroup data-slot="select-group" v-bind="delegatedProps" :class="cn( 'p-1 w-full', props.class )">
    <slot />
  </SelectGroup>
</template>

<script setup lang="ts">
  import type { SelectGroupProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { SelectGroup } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<SelectGroupProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
