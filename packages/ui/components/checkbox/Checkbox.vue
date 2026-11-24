<template>
  <CheckboxRoot data-slot="checkbox" v-bind="forwarded" :class="cn( 'peer inline-flex items-center justify-center size-4 shrink-0 rounded-[4px] border border-gold-light/70 bg-background shadow-warm-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary disabled:cursor-not-allowed disabled:opacity-50', props.class )">
    <CheckboxIndicator class="grid place-content-center text-current transition-none" data-slot="checkbox-indicator">
      <slot>
        <Check class="size-3.5 stroke-[2.5]" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<script setup lang="ts">
  import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { Check } from '@lucide/vue';
  import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes[ 'class' ] }>();
  const emits = defineEmits<CheckboxRootEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
