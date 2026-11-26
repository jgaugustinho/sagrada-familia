<template>
  <Sonner class="toaster group" v-bind="delegatedProps" :toast-options="mergedToastOptions" />
</template>

<script setup lang="ts">
  import 'vue-sonner/style.css';
  import type { ToasterProps } from 'vue-sonner';
  import { computed } from 'vue';
  import { Toaster as Sonner } from 'vue-sonner';

  const props = defineProps<ToasterProps>();

  const delegatedProps = computed( () => {
    const { toastOptions: _, ...delegated } = props;
    return delegated;
  } );

  const mergedToastOptions = computed<ToasterProps[ 'toastOptions' ]>( () => ( {
    ...props.toastOptions,
    classes: {
      toast: 'group toast rounded-xl border font-sans shadow-warm-md',
      default: 'border-gold-light/45 bg-card text-foreground',
      success: '!border-emerald-600/35 !bg-emerald-50 !text-emerald-950 [&_[data-icon]]:text-emerald-600 [&_[data-description]]:!text-emerald-800',
      error: '!border-red-600/35 !bg-red-50 !text-red-950 [&_[data-icon]]:text-red-600 [&_[data-description]]:!text-red-800',
      warning: '!border-amber-600/40 !bg-amber-50 !text-amber-950 [&_[data-icon]]:text-amber-600 [&_[data-description]]:!text-amber-800',
      info: '!border-sky-600/35 !bg-sky-50 !text-sky-950 [&_[data-icon]]:text-sky-600 [&_[data-description]]:!text-sky-800',
      title: 'text-sm font-semibold',
      description: 'text-xs opacity-90',
      actionButton: 'rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-gold-dark',
      cancelButton: 'rounded-lg bg-surface text-foreground text-xs font-medium hover:bg-surface-warm',
      closeButton: 'border-gold-light/40 bg-card text-muted-foreground hover:text-foreground',
      ...props.toastOptions?.classes
    }
  } ) );
</script>
