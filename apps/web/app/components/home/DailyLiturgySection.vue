<template>
  <section class="container mx-auto px-4" aria-labelledby="daily-liturgy-heading" v-if="isLoading || liturgy">
    <div class="rounded-3xl bg-card text-card-foreground border border-border shadow-sm overflow-hidden">
      <div class="p-6 sm:p-8 lg:p-10 animate-pulse space-y-6" aria-label="Carregando liturgia do dia" v-if="isLoading">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
          <div class="h-4 w-48 rounded bg-secondary" />
          <div class="h-6 w-36 rounded-full bg-secondary" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-5 space-y-4">
            <div class="h-3 w-32 rounded bg-secondary" />
            <div class="h-7 w-3/4 rounded bg-secondary" />
            <div class="h-24 w-full rounded-xl bg-secondary" />
          </div>

          <div class="lg:col-span-7 space-y-3">
            <div class="h-6 w-40 rounded-full bg-secondary" />
            <div class="h-4 w-full rounded bg-secondary" />
            <div class="h-4 w-full rounded bg-secondary" />
            <div class="h-4 w-5/6 rounded bg-secondary" />
            <div class="h-4 w-2/3 rounded bg-secondary" />
          </div>
        </div>
      </div>

      <template v-else-if="liturgy">
        <div class="px-6 sm:px-8 lg:px-10 py-4 border-b border-border bg-secondary/40 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-xs sm:text-sm font-medium text-foreground">
            <CalendarDays class="w-4 h-4 text-primary shrink-0" />
            <span>{{ formattedDate }}</span>
          </div>

          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold text-foreground shadow-sm">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" aria-hidden="true" :class="liturgicalColorDotClass" />
            <span>Cor Litúrgica: {{ liturgy.cor }}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
          <div class="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 bg-secondary/15">
            <div>
              <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Cross class="w-3.5 h-3.5" />
                <span>Liturgia &amp; Santo do Dia</span>
              </span>

              <h2 id="daily-liturgy-heading" class="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                {{ liturgy.liturgia }}
              </h2>

              <div class="mt-5 rounded-xl bg-background/85 border border-border border-l-4 border-l-primary p-4" v-if="psalm">
                <div class="flex items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-wider text-primary mb-1.5">
                  <span>Salmo Responsorial</span>
                  <span>{{ psalm.referencia }}</span>
                </div>

                <p class="text-sm font-medium italic text-foreground leading-relaxed" v-if="psalm.refrao">
                  &ldquo;{{ psalm.refrao }}&rdquo;
                </p>
              </div>
            </div>

            <div class="space-y-2.5 pt-2" v-if="firstReading || psalm || secondReading">
              <p class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Leituras da Santa Missa
              </p>

              <div class="flex flex-wrap gap-2">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground" v-if="firstReading">
                  <BookOpen class="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>1ª Leitura: <strong class="font-semibold">{{ firstReading.referencia }}</strong></span>
                </span>

                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground" v-if="psalm">
                  <BookOpen class="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Salmo: <strong class="font-semibold">{{ psalm.referencia }}</strong></span>
                </span>

                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background border border-border text-xs font-medium text-foreground" v-if="secondReading">
                  <BookOpen class="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>2ª Leitura: <strong class="font-semibold">{{ secondReading.referencia }}</strong></span>
                </span>
              </div>
            </div>
          </div>

          <div class="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between" v-if="gospel">
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
                <Badge class="rounded-full px-3 py-1 font-bold tracking-wide hover:bg-primary">
                  Evangelho • {{ gospel.referencia }}
                </Badge>

                <span class="text-xs font-medium text-muted-foreground" v-if="gospel.titulo">
                  {{ gospel.titulo }}
                </span>
              </div>

              <div class="relative">
                <p class="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line" ref="gospelTextRef" :class="isExpanded ? '' : 'line-clamp-6'">
                  <template v-for="( segment, index ) in gospelSegments" :key="index">
                    <sup class="text-[11px] font-semibold text-stone-400 align-super leading-none mr-1 select-none" v-if="segment.isVerse">{{ segment.text }}</sup>
                    <template v-else>{{ segment.text }}</template>
                  </template>
                </p>

                <div class="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent" aria-hidden="true" v-if="isGospelTruncated && !isExpanded" />
              </div>
            </div>

            <div class="mt-5 pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-3">
              <p class="text-xs italic text-muted-foreground">
                Palavra da Salvação. — Glória a vós, Senhor.
              </p>

              <Button type="button" variant="outline" size="sm" class="rounded-full font-semibold cursor-pointer" v-if="isGospelTruncated" :aria-expanded="isExpanded" @click="isExpanded = !isExpanded">
                <span>{{ isExpanded ? 'Recolher Evangelho' : 'Continuar lendo' }}</span>
                <ChevronDown class="w-4 h-4 transition-transform duration-200" :class="isExpanded ? 'rotate-180' : ''" />
              </Button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { BookOpen, CalendarDays, ChevronDown, Cross } from '@lucide/vue';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';

  interface LiturgyReading {
    referencia: string;
    titulo?: string;
    refrao?: string;
    texto: string;
  }

  interface DailyLiturgyData {
    data: string;
    liturgia: string;
    cor: string;
    leituras: {
      primeiraLeitura?: LiturgyReading[];
      salmo?: LiturgyReading[];
      segundaLeitura?: LiturgyReading[];
      evangelho?: LiturgyReading[];
    };
  }

  interface CachedDailyLiturgy {
    dateKey: string;
    payload: DailyLiturgyData;
  }

  interface TextSegment {
    text: string;
    isVerse: boolean;
  }

  const LITURGY_API_URL = 'https://liturgia.up.railway.app/v2/';
  const CACHE_KEY = 'sf-daily-liturgy-v2';
  const VERSE_PATTERN = /(^|[\s\n])(\d{1,3})(?![ªº])(?=[\p{L}"“'‘(])/gu;

  const isLoading = ref( true );
  const liturgy = ref<DailyLiturgyData | null>( null );
  const isExpanded = ref( false );
  const isGospelTruncated = ref( false );
  const gospelTextRef = ref<HTMLElement | null>( null );

  const firstReading = computed( () => liturgy.value?.leituras.primeiraLeitura?.[ 0 ] ?? null );
  const secondReading = computed( () => liturgy.value?.leituras.segundaLeitura?.[ 0 ] ?? null );
  const psalm = computed( () => liturgy.value?.leituras.salmo?.[ 0 ] ?? null );
  const gospel = computed( () => liturgy.value?.leituras.evangelho?.[ 0 ] ?? null );

  const gospelSegments = computed<TextSegment[]>( () => {
    const rawText = gospel.value?.texto;
    if ( !rawText ) {
      return [];
    }

    const segments: TextSegment[] = [];
    let lastIndex = 0;

    for ( const match of rawText.matchAll( VERSE_PATTERN ) ) {
      const fullMatchIndex = match.index ?? 0;
      const prefix = match[ 1 ] ?? '';
      const verseNumber = match[ 2 ] ?? '';
      const verseStart = fullMatchIndex + prefix.length;

      if ( verseStart > lastIndex ) {
        segments.push( {
          text: rawText.slice( lastIndex, verseStart ),
          isVerse: false
        } );
      }

      segments.push( {
        text: verseNumber,
        isVerse: true
      } );

      lastIndex = verseStart + verseNumber.length;
    }

    if ( lastIndex < rawText.length ) {
      segments.push( {
        text: rawText.slice( lastIndex ),
        isVerse: false
      } );
    }

    return segments;
  } );

  const updateGospelTruncation = () => {
    const el = gospelTextRef.value;
    if ( !el ) {
      isGospelTruncated.value = false;
      return;
    }

    if ( isExpanded.value ) {
      const lineHeight = parseFloat( getComputedStyle( el ).lineHeight );
      if ( !Number.isNaN( lineHeight ) && el.scrollHeight <= lineHeight * 6 + 2 ) {
        isGospelTruncated.value = false;
        isExpanded.value = false;
        return;
      }

      isGospelTruncated.value = true;
      return;
    }

    isGospelTruncated.value = el.scrollHeight > el.clientHeight + 1;
  };

  watch(
    gospelTextRef,
    ( el, _prev, onCleanup ) => {
      if ( !el ) {
        return;
      }

      updateGospelTruncation();

      if ( typeof ResizeObserver !== 'undefined' ) {
        const observer = new ResizeObserver( updateGospelTruncation );
        observer.observe( el );
        onCleanup( () => observer.disconnect() );
      }

      document.fonts?.ready.then( updateGospelTruncation );
    },
    { flush: 'post' }
  );

  const formattedDate = computed( () => {
    const rawDate = liturgy.value?.data;
    if ( !rawDate ) {
      return '';
    }

    const parts = rawDate.split( '/' ).map( Number );
    if ( parts.length === 3 ) {
      const [ day, month, year ] = parts;
      if ( day && month && year ) {
        const parsed = new Date( year, month - 1, day );
        const formatted = new Intl.DateTimeFormat( 'pt-BR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        } ).format( parsed );

        return formatted.charAt( 0 ).toUpperCase() + formatted.slice( 1 );
      }
    }

    return rawDate;
  } );

  const liturgicalColorDotClass = computed( () => {
    const color = ( liturgy.value?.cor ?? '' ).trim().toLowerCase();

    const colorMap: Record<string, string> = {
      branco: 'bg-white border border-stone-300',
      verde: 'bg-emerald-600',
      roxo: 'bg-purple-700',
      vermelho: 'bg-red-700',
      rosa: 'bg-rose-400'
    };

    return colorMap[ color ] ?? 'bg-primary';
  } );

  const getTodayKey = (): string => {
    const now = new Date();
    const day = String( now.getDate() ).padStart( 2, '0' );
    const month = String( now.getMonth() + 1 ).padStart( 2, '0' );
    const year = now.getFullYear();

    return `${ day }/${ month }/${ year }`;
  };

  const readCachedLiturgy = ( todayKey: string ): DailyLiturgyData | null => {
    try {
      const raw = localStorage.getItem( CACHE_KEY );
      if ( !raw ) {
        return null;
      }

      const cached = JSON.parse( raw ) as CachedDailyLiturgy;
      if ( cached.dateKey === todayKey && cached.payload?.leituras?.evangelho?.[ 0 ]?.texto ) {
        return cached.payload;
      }

      return null;
    } catch {
      return null;
    }
  };

  const saveCachedLiturgy = ( dateKey: string, payload: DailyLiturgyData ) => {
    try {
      const entry: CachedDailyLiturgy = { dateKey, payload };
      localStorage.setItem( CACHE_KEY, JSON.stringify( entry ) );
    } catch {
      // Ignore storage quota or private mode failures
    }
  };

  onMounted( async () => {
    const todayKey = getTodayKey();
    const cached = readCachedLiturgy( todayKey );

    if ( cached ) {
      liturgy.value = cached;
      isLoading.value = false;
      return;
    }

    try {
      const response = await fetch( LITURGY_API_URL );
      if ( !response.ok ) {
        return;
      }

      const data = ( await response.json() ) as DailyLiturgyData;
      if ( !data.leituras?.evangelho?.[ 0 ]?.texto ) {
        return;
      }

      liturgy.value = data;
      saveCachedLiturgy( todayKey, data );
    } catch {
      // Leave liturgy null when the external API is unreachable
    } finally {
      isLoading.value = false;
    }
  } );
</script>
