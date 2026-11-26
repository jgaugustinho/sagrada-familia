<template>
  <div role="group" data-slot="input-group-addon" :data-align="align" :class="cn( inputGroupAddonVariants( { align } ), props.class )">
    <slot />
  </div>
</template>

<script setup lang="ts">
  import type { HTMLAttributes } from 'vue';
  import type { InputGroupAddonVariants } from '.';
  import { cn } from 'cn';
  import { inputGroupAddonVariants } from '.';

  const props = withDefaults( defineProps<{
    align?: InputGroupAddonVariants[ 'align' ];
    class?: HTMLAttributes[ 'class' ];
  }>(), {
    align: 'inline-start'
  } );
</script>
