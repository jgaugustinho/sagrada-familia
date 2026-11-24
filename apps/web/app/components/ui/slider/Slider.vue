<template>
  <SliderRoot data-slot="slider" v-slot="{ modelValue: currentModelValue }" v-bind="forwarded" :class="cn( 'relative flex w-full touch-none items-center py-2 select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col', props.class )">
    <SliderTrack class="bg-surface-warm relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5" data-slot="slider-track">
      <SliderRange class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" data-slot="slider-range" />
    </SliderTrack>

    <SliderThumb class="block size-4 shrink-0 rounded-full border-2 border-primary bg-card shadow-warm-sm ring-offset-background transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing" data-slot="slider-thumb" v-for="( _, key ) in ( currentModelValue ?? defaultValue ?? [ 0 ] )" :key="key" />
  </SliderRoot>
</template>

<script setup lang="ts">
  import type { SliderRootEmits, SliderRootProps } from 'reka-ui';
  import type { HTMLAttributes } from 'vue';
  import { computed } from 'vue';
  import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui';
  import { cn } from 'cn';

  const props = defineProps<SliderRootProps & { class?: HTMLAttributes[ 'class' ] }>();
  const emits = defineEmits<SliderRootEmits>();

  const delegatedProps = computed( () => {
    const { class: _, ...delegated } = props;
    return delegated;
  } );

  const forwarded = useForwardPropsEmits( delegatedProps, emits );
</script>
