<template>
  <DropdownMenu>
    <DropdownMenuTrigger :as-child="true">
      <Button type="button" variant="outline" class="h-9 rounded-xl border-gold-light/55 bg-background/85 px-4 text-sm font-semibold text-foreground hover:bg-surface hover:text-gold-dark shadow-warm-sm cursor-pointer">
        <SlidersHorizontal class="size-4 text-gold-dark" aria-hidden="true" />
        <span>Colunas</span>
        <Badge variant="outline" class="ml-0.5 rounded-full border-gold-light/55 bg-surface/75 px-1.5 py-0 text-[10px] font-semibold text-gold-dark tabular-nums" v-if="isModified">
          {{ visibleCount }}/{{ columns.length }}
        </Badge>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-48">
      <DropdownMenuLabel>Colunas visíveis</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuCheckboxItem v-for="col in columns" :key="col.key" :model-value="col.visible" @select.prevent @update:model-value="emit( 'toggle', col.key )">
        {{ col.label }}
      </DropdownMenuCheckboxItem>

      <template v-if="isModified">
        <DropdownMenuSeparator />
        <DropdownMenuItem class="text-xs font-semibold text-gold-dark justify-center" @select="emit( 'reset' )">
          Restaurar padrão
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts" generic="K extends string = string">
  import { computed } from 'vue';
  import { SlidersHorizontal } from '@lucide/vue';
  import { Badge } from '@sagrada-familia/ui/badge';
  import { Button } from '@sagrada-familia/ui/button';
  import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
  import type { TableColumnOption } from './types';

  const props = defineProps<{
    columns: TableColumnOption<K>[];
  }>();

  const emit = defineEmits<{
    toggle: [ key: K ];
    reset: [];
  }>();

  const visibleCount = computed( () => props.columns.filter( ( col ) => col.visible ).length );
  const isModified = computed( () => props.columns.some( ( col ) => col.visible !== col.defaultVisible ) );
</script>
