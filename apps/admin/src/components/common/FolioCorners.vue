<template>
  <svg class="pointer-events-none select-none absolute w-4 h-4 text-gold-light/55" viewBox="0 0 20 20" fill="none" aria-hidden="true" v-for="cornerClass in folioCornerClasses" :key="cornerClass" :class="cornerClass">
    <path d="M 1 18 L 1 4 Q 1 1 4 1 L 18 1" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
    <path d="M 5 11 L 5 5 L 11 5" stroke="currentColor" stroke-width="0.75" stroke-opacity="0.55" stroke-linecap="round" />
  </svg>
</template>

<script setup lang="ts">
  const folioCornerClasses = [
    'top-2.5 left-2.5',
    'top-2.5 right-2.5 rotate-90',
    'bottom-2.5 right-2.5 rotate-180',
    'bottom-2.5 left-2.5 -rotate-90'
  ] as const;
</script>
