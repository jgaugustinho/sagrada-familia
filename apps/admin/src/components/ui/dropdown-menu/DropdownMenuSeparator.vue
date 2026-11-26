<template>
  <DropdownMenuSeparator data-slot="dropdown-menu-separator" v-bind="delegatedProps" :class="cn( '-mx-1.5 my-1 h-px bg-gold-light/25', props.class )" />
</template>

<script setup lang="ts">
  import type { DropdownMenuSeparatorProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { DropdownMenuSeparator } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<DropdownMenuSeparatorProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );
</script>
