<template>
  <SelectItem data-slot="select-item" v-bind="forwardedProps" :class="cn( 'relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pr-8 pl-3 text-xs sm:text-sm outline-none transition-colors focus:bg-surface focus:text-gold-dark data-[state=checked]:font-semibold data-[state=checked]:text-gold-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.class )">
    <span class="absolute right-2.5 flex size-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Check class="size-4 text-primary" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>

<script setup lang="ts">
  import type { SelectItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { Check } from '@lucide/vue';
  import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from 'reka-ui';
  import { cn } from '@/lib/utils';

  const props = defineProps<SelectItemProps & { class?: HTMLAttributes[ 'class' ] }>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwardedProps = useForwardProps( delegatedProps );
</script>
