<template>
  <TabsRoot data-slot="tabs" v-slot="slotProps" v-bind="forwarded" :class="cn( 'flex flex-col gap-2', props.class )">
    <slot v-bind="slotProps" />
  </TabsRoot>
</template>

<script setup lang="ts">
  import type { TabsRootEmits, TabsRootProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { TabsRoot, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<TabsRootProps & { class?: HTMLAttributes[ 'class' ] }>();
  const emits = defineEmits<TabsRootEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
