<template>
  <DropdownMenuCheckboxItem data-slot="dropdown-menu-checkbox-item" v-bind="forwarded" :class="cn( 'relative flex cursor-pointer select-none items-center gap-2 rounded-lg py-2 pr-2.5 pl-8 text-xs sm:text-sm outline-none transition-colors focus:bg-surface focus:text-gold-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4', props.class )">
    <span class="pointer-events-none absolute left-2.5 flex size-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Check class="size-3.5 text-primary" aria-hidden="true" />
      </DropdownMenuItemIndicator>
    </span>

    <slot />
  </DropdownMenuCheckboxItem>
</template>

<script setup lang="ts">
  import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { Check } from '@lucide/vue';
  import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<DropdownMenuCheckboxItemProps & { class?: HTMLAttributes[ 'class' ] }>();
  const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
