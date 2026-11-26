<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-gold-light/25 bg-surface/35 px-4 py-3.5 sm:px-6">
    <div class="flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-5">
      <p class="text-xs sm:text-sm text-muted-foreground tabular-nums">
        <template v-if="totalItems > 0">
          Exibindo
          <strong class="font-semibold text-foreground">{{ pageRangeStart }}&ndash;{{ pageRangeEnd }}</strong>
          de
          <strong class="font-semibold text-foreground">{{ totalItems }}</strong>
          {{ totalItems === 1 ? singularLabel : itemLabel }}
        </template>
        <template v-else>
          Nenhum registro encontrado
        </template>
      </p>

      <div class="flex items-center gap-2">
        <span class="text-xs font-medium text-muted-foreground whitespace-nowrap">
          Por página
        </span>

        <Select :model-value="String( pageSize )" @update:model-value="handlePageSizeChange">
          <SelectTrigger aria-label="Itens por página" class="h-8 w-[76px] rounded-lg border-gold-light/50 bg-background px-2.5 text-xs font-semibold tabular-nums">
            <SelectValue />
          </SelectTrigger>

          <SelectContent align="start" class="min-w-[5rem]">
            <SelectGroup>
              <SelectItem v-for="option in PAGE_SIZE_OPTIONS" :key="option" :value="String( option )">
                {{ option }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-end gap-3" v-if="totalItems > 0">
      <Pagination class="mx-0 w-auto justify-end" :items-per-page="pageSize" :total="totalItems" :page="page" :sibling-count="1" :show-edges="true" @update:page="emit( 'update:page', $event )">
        <PaginationContent v-slot="{ items }">
          <PaginationFirst class="hidden sm:inline-flex" v-if="totalPages > 5" />
          <PaginationPrevious />

          <template v-for="( item, index ) in items" :key="index">
            <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">
              {{ item.value }}
            </PaginationItem>

            <PaginationEllipsis v-else :index="index" />
          </template>

          <PaginationNext />
          <PaginationLast class="hidden sm:inline-flex" v-if="totalPages > 5" />
        </PaginationContent>
      </Pagination>

      <div class="hidden sm:flex items-center gap-1.5 border-l border-gold-light/30 pl-3" v-if="totalPages > 5">
        <span class="text-xs text-muted-foreground whitespace-nowrap">
          Ir para
        </span>

        <Input type="number" aria-label="Ir para página" class="h-8 w-14 rounded-lg border-gold-light/50 bg-background px-2 text-center text-xs font-semibold tabular-nums" :min="1" :max="totalPages" :model-value="jumpDraft" @update:model-value="jumpDraft = String( $event )" @blur="commitJumpPage" @keydown.enter="commitJumpPage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { AcceptableValue } from 'reka-ui';
  import { computed, ref, watch } from 'vue';
  import { Input } from '@sagrada-familia/ui/input';
  import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@sagrada-familia/ui/select';
  import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
  import { PAGE_SIZE_OPTIONS, type PageSizeOption } from './types';

  const props = withDefaults( defineProps<{
    page: number;
    pageSize: PageSizeOption;
    totalItems: number;
    pageRangeStart: number;
    pageRangeEnd: number;
    singularLabel?: string;
    itemLabel?: string;
  }>(), {
    singularLabel: 'produto',
    itemLabel: 'produtos'
  } );

  const emit = defineEmits<{
    'update:page': [ page: number ];
    'update:pageSize': [ size: PageSizeOption ];
  }>();

  const totalPages = computed( () => {
    return Math.max( 1, Math.ceil( props.totalItems / props.pageSize ) );
  } );

  const jumpDraft = ref<string>( String( props.page ) );

  watch( () => props.page, ( nextPage ) => {
    jumpDraft.value = String( nextPage );
  } );

  const commitJumpPage = () => {
    const parsed = Math.round( Number( jumpDraft.value ) );
    if ( !Number.isFinite( parsed ) || jumpDraft.value.trim().length === 0 ) {
      jumpDraft.value = String( props.page );
      return;
    }

    const clamped = Math.min( totalPages.value, Math.max( 1, parsed ) );
    jumpDraft.value = String( clamped );
    if ( clamped !== props.page ) {
      emit( 'update:page', clamped );
    }
  };

  const handlePageSizeChange = ( value: AcceptableValue ) => {
    const parsed = Number( value );
    if ( parsed === 10 || parsed === 25 || parsed === 50 || parsed === 100 ) {
      emit( 'update:pageSize', parsed );
    }
  };
</script>
