<template>
  <section class="relative overflow-hidden w-full bg-card surface-linen text-foreground border-t border-gold-light/30 py-14 sm:py-20" aria-labelledby="daily-liturgy-heading" v-if="isLoading || liturgy">
    <svg class="pointer-events-none select-none absolute -bottom-8 -right-4 sm:-bottom-10 sm:right-4 lg:right-10 z-[1] w-44 h-56 sm:w-56 sm:h-72 lg:w-64 lg:h-80 text-primary opacity-[0.11]" viewBox="0 0 140 180" fill="none" aria-hidden="true">
      <path d="M 60 12 H 80 V 48 H 122 V 68 H 80 V 168 H 60 V 68 H 18 V 48 H 60 Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="miter" />
      <path d="M 64 16 H 76 V 52 H 118 V 64 H 76 V 164 H 64 V 64 H 22 V 52 H 64 Z" stroke="currentColor" stroke-width="0.95" stroke-opacity="0.75" stroke-linejoin="miter" />
      <path d="M 70 50 L 72.5 55.5 L 78 58 L 72.5 60.5 L 70 66 L 67.5 60.5 L 62 58 L 67.5 55.5 Z" stroke="currentColor" stroke-width="0.95" stroke-opacity="0.8" stroke-linejoin="round" />
    </svg>

    <div class="relative z-10 container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <div class="animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10" aria-label="Carregando liturgia do dia" v-if="isLoading">
          <div class="lg:col-span-5 space-y-4">
            <div class="h-4 w-40 rounded bg-surface" />
            <div class="h-8 w-3/4 rounded bg-surface" />
            <div class="h-20 w-full rounded-xl bg-surface" />
            <div class="h-10 w-full rounded-lg bg-surface" />
            <div class="h-10 w-full rounded-lg bg-surface" />
          </div>

          <div class="lg:col-span-7 rounded-2xl bg-background border border-gold-light/25 p-6 space-y-3">
            <div class="h-6 w-40 rounded-full bg-surface" />
            <div class="h-4 w-full rounded bg-surface" />
            <div class="h-4 w-full rounded bg-surface" />
            <div class="h-4 w-5/6 rounded bg-surface" />
            <div class="h-4 w-2/3 rounded bg-surface" />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 items-start gap-8 lg:gap-10" v-else-if="liturgy">
          <!-- Left Column: Celebration summary, Psalm refrain, and compact reading selector pills -->
          <div class="lg:col-span-5 space-y-5" v-reveal>
            <div>
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span class="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                  <CalendarDays class="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{{ formattedDate }}</span>
                </span>

                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface/90 border border-gold-light/35 text-[11px] font-semibold text-foreground shrink-0">
                  <span class="w-2 h-2 rounded-full shrink-0" aria-hidden="true" :class="liturgicalColorDotClass" />
                  <span>Cor Litúrgica: {{ liturgy.cor }}</span>
                </span>
              </div>

              <h2 id="daily-liturgy-heading" class="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight leading-[1.1] text-foreground">
                Liturgia do Dia
              </h2>

              <p class="mt-2 text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
                {{ liturgy.liturgia }}
              </p>
            </div>

            <blockquote class="rounded-xl bg-surface/75 border-l-2 border-primary px-4 py-3" v-if="psalm?.refrao">
              <span class="block text-[11px] font-bold uppercase tracking-[0.16em] text-gold-dark">
                Salmo Responsorial • {{ psalm.referencia }}
              </span>

              <p class="mt-1 text-sm sm:text-[15px] font-medium italic text-foreground leading-relaxed">
                &ldquo;{{ psalm.refrao }}&rdquo;
              </p>
            </blockquote>

            <div v-if="availableTabs.length > 0">
              <p class="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Leituras da Santa Missa
              </p>

              <div class="flex flex-wrap gap-2" role="tablist" aria-label="Selecionar leitura da Santa Missa">
                <button :id="`liturgy-tab-${ tab.key }`" type="button" role="tab" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer" v-for="tab in availableTabs" :key="tab.key" :aria-selected="activeTab?.key === tab.key" :aria-controls="`liturgy-panel-${ tab.key }`" :class="activeTab?.key === tab.key ? 'bg-primary text-primary-foreground border-primary shadow-warm-sm' : 'bg-background text-foreground border-gold-light/45 hover:border-primary hover:text-gold-dark'" @click="selectTab( tab.key )">
                  <span>{{ tab.label }}</span>
                  <span class="text-[11px] font-medium tabular-nums" :class="activeTab?.key === tab.key ? 'text-primary-foreground/85' : 'text-muted-foreground'">
                    {{ tab.reading.referencia }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Column: Compact Missal reading folio -->
          <div class="relative overflow-hidden lg:col-span-7 rounded-2xl bg-background border border-gold-light/30 shadow-warm-sm p-5 sm:p-7" v-if="activeTab" v-reveal="{ delay: 100 }">
            <svg class="pointer-events-none select-none absolute w-4 h-4 text-gold-light/60" viewBox="0 0 20 20" fill="none" aria-hidden="true" v-for="cornerClass in folioCornerClasses" :key="cornerClass" :class="cornerClass">
              <path d="M 1 18 L 1 4 Q 1 1 4 1 L 18 1" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
              <path d="M 5 11 L 5 5 L 11 5" stroke="currentColor" stroke-width="0.75" stroke-opacity="0.55" stroke-linecap="round" />
            </svg>

            <Transition name="reading-fade" mode="out-in" @after-enter="updateReadingMeasurement">
              <div class="relative z-10" role="tabpanel" :id="`liturgy-panel-${ activeTab.key }`" :key="activeTab.key" :aria-labelledby="`liturgy-tab-${ activeTab.key }`">
                <div class="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-border/80">
                  <span class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-semibold tracking-wide text-gold-dark">
                    <BookOpen class="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{{ activeTab.fullTitle }} • {{ activeTab.reading.referencia }}</span>
                  </span>

                  <span class="text-xs font-medium text-muted-foreground" v-if="activeTab.reading.titulo">
                    {{ activeTab.reading.titulo }}
                  </span>
                </div>

                <div class="relative overflow-hidden transition-[max-height] duration-500 ease-out motion-reduce:transition-none" :style="readingWrapperStyle">
                  <div ref="readingTextRef">
                    <div class="space-y-2.5 text-sm sm:text-[15px] leading-[1.75]" v-if="activeTab.key === 'salmo'">
                      <p class="font-medium text-gold-dark" v-if="activeTab.reading.refrao">
                        <strong class="font-bold text-primary mr-1.5">R.</strong>{{ activeTab.reading.refrao }}
                      </p>

                      <template v-for="( strophe, index ) in psalmStrophes" :key="index">
                        <p class="text-foreground/90 whitespace-pre-line">
                          {{ strophe }}
                        </p>
                        <p class="font-medium text-gold-dark" v-if="activeTab.reading.refrao && !strophe.includes( activeTab.reading.refrao )">
                          <strong class="font-bold text-primary mr-1.5">R.</strong>{{ activeTab.reading.refrao }}
                        </p>
                      </template>
                    </div>

                    <p class="text-sm sm:text-[15px] text-foreground/90 leading-[1.8] whitespace-pre-line" v-else>{{ activeReadingDisplay.prefix }}<span class="font-serif text-[2.65rem] sm:text-[2.95rem] font-semibold text-primary float-left leading-[0.8] mr-1.5 mt-1 select-none" v-if="activeReadingDisplay.dropCap">{{ activeReadingDisplay.dropCap }}</span><template v-for="( segment, index ) in activeReadingDisplay.segments" :key="index"><sup class="text-[11px] font-semibold text-gold-light align-super leading-none mr-1 select-none" v-if="segment.isVerse">{{ segment.text }}</sup><template v-else>{{ segment.text }}</template></template></p>
                  </div>

                  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background via-background/85 to-transparent transition-opacity duration-300" aria-hidden="true" v-if="isReadingTruncated" :class="isExpanded ? 'opacity-0' : 'opacity-100'" />
                </div>

                <div class="mt-5 pt-4 border-t border-border/80 flex flex-wrap items-center justify-between gap-3" v-if="closingAcclamation || isReadingTruncated">
                  <p class="italic text-xs sm:text-sm font-medium text-muted-foreground" v-if="closingAcclamation">
                    {{ closingAcclamation }}
                  </p>

                  <Button type="button" variant="outline" size="sm" class="ml-auto rounded-full border-gold-light/50 text-gold-dark hover:bg-primary hover:text-primary-foreground hover:border-primary font-semibold cursor-pointer" v-if="isReadingTruncated" :aria-expanded="isExpanded" @click="isExpanded = !isExpanded">
                    <span>{{ isExpanded ? 'Recolher leitura' : 'Continuar lendo' }}</span>
                    <ChevronDown class="w-4 h-4 transition-transform duration-200" :class="isExpanded ? 'rotate-180' : ''" />
                  </Button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';
  import { BookOpen, CalendarDays, ChevronDown } from '@lucide/vue';
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

  type ReadingTabKey = 'evangelho' | 'primeiraLeitura' | 'salmo' | 'segundaLeitura';

  interface ReadingTabItem {
    key: ReadingTabKey;
    label: string;
    fullTitle: string;
    reading: LiturgyReading;
  }

  const LITURGY_API_URL = 'https://liturgia.up.railway.app/v2/';
  const CACHE_KEY = 'sf-daily-liturgy-v2';
  const VERSE_PATTERN = /(^|[\s\n])(\d{1,3})(?![ªº])(?=[\p{L}"“'‘(])/gu;
  const COLLAPSED_READING_HEIGHT = 148;
  const folioCornerClasses = [
    'top-2.5 left-2.5',
    'top-2.5 right-2.5 rotate-90',
    'bottom-2.5 right-2.5 rotate-180',
    'bottom-2.5 left-2.5 -rotate-90'
  ] as const;

  const isLoading = ref( true );
  const liturgy = ref<DailyLiturgyData | null>( null );
  const activeTabKey = ref<ReadingTabKey>( 'evangelho' );
  const isExpanded = ref( false );
  const readingNaturalHeight = ref( 0 );
  const readingTextRef = ref<HTMLElement | null>( null );

  const firstReading = computed( () => liturgy.value?.leituras.primeiraLeitura?.[ 0 ] ?? null );
  const secondReading = computed( () => liturgy.value?.leituras.segundaLeitura?.[ 0 ] ?? null );
  const psalm = computed( () => liturgy.value?.leituras.salmo?.[ 0 ] ?? null );
  const gospel = computed( () => liturgy.value?.leituras.evangelho?.[ 0 ] ?? null );

  const availableTabs = computed<ReadingTabItem[]>( () => {
    const tabs: ReadingTabItem[] = [];

    if ( firstReading.value ) {
      tabs.push( {
        key: 'primeiraLeitura',
        label: '1ª Leitura',
        fullTitle: 'Primeira Leitura',
        reading: firstReading.value
      } );
    }

    if ( psalm.value ) {
      tabs.push( {
        key: 'salmo',
        label: 'Salmo',
        fullTitle: 'Salmo Responsorial',
        reading: psalm.value
      } );
    }

    if ( secondReading.value ) {
      tabs.push( {
        key: 'segundaLeitura',
        label: '2ª Leitura',
        fullTitle: 'Segunda Leitura',
        reading: secondReading.value
      } );
    }

    if ( gospel.value ) {
      tabs.push( {
        key: 'evangelho',
        label: 'Evangelho',
        fullTitle: 'Evangelho do Dia',
        reading: gospel.value
      } );
    }

    return tabs;
  } );

  const activeTab = computed( () => {
    return availableTabs.value.find( ( tab ) => tab.key === activeTabKey.value ) ?? availableTabs.value[ 0 ] ?? null;
  } );

  const selectTab = ( key: ReadingTabKey ) => {
    if ( activeTabKey.value === key ) {
      return;
    }

    activeTabKey.value = key;
    isExpanded.value = false;
  };

  const parseVerseSegments = ( rawText?: string ): TextSegment[] => {
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
  };

  const psalmStrophes = computed<string[]>( () => {
    if ( activeTab.value?.key !== 'salmo' ) {
      return [];
    }

    const rawText = activeTab.value.reading.texto?.trim();
    if ( !rawText ) {
      return [];
    }

    return rawText
      .split( /\n(?=\s*[—–-])/ )
      .map( ( strophe ) => strophe.trim() )
      .filter( Boolean );
  } );

  const activeReadingDisplay = computed( () => {
    const segments = parseVerseSegments( activeTab.value?.reading.texto );
    if ( segments.length === 0 ) {
      return {
        prefix: '',
        dropCap: '',
        segments: [] as TextSegment[]
      };
    }

    // Remove the opening verse number so the serif Drop Cap opens the passage cleanly
    if ( segments[ 0 ]?.isVerse ) {
      segments.shift();
    }

    for ( let index = 0; index < segments.length; index++ ) {
      const segment = segments[ index ];
      if ( !segment || segment.isVerse ) {
        continue;
      }

      const match = segment.text.match( /\p{L}/u );
      if ( match && match.index !== undefined ) {
        const prefix = segment.text.slice( 0, match.index ).trimStart();
        if ( /[—–-]/.test( prefix ) ) {
          return {
            prefix: '',
            dropCap: '',
            segments
          };
        }

        const dropCap = match[ 0 ].toUpperCase();
        segment.text = segment.text.slice( match.index + match[ 0 ].length );

        return {
          prefix,
          dropCap,
          segments
        };
      }
    }

    return {
      prefix: '',
      dropCap: '',
      segments
    };
  } );

  const closingAcclamation = computed( () => {
    const key = activeTab.value?.key;
    if ( key === 'evangelho' ) {
      return 'Palavra da Salvação. — Glória a vós, Senhor.';
    }
    if ( key === 'salmo' ) {
      return '';
    }
    return 'Palavra do Senhor. — Graças a Deus.';
  } );

  const isReadingTruncated = computed( () => {
    return readingNaturalHeight.value > COLLAPSED_READING_HEIGHT + 10;
  } );

  const readingWrapperStyle = computed( () => {
    if ( !isReadingTruncated.value || readingNaturalHeight.value === 0 ) {
      return undefined;
    }

    return {
      maxHeight: isExpanded.value ? `${ readingNaturalHeight.value }px` : `${ COLLAPSED_READING_HEIGHT }px`
    };
  } );

  const updateReadingMeasurement = () => {
    const el = readingTextRef.value;
    if ( !el ) {
      readingNaturalHeight.value = 0;
      return;
    }

    readingNaturalHeight.value = el.scrollHeight;
    if ( !isReadingTruncated.value ) {
      isExpanded.value = false;
    }
  };

  watch(
    readingTextRef,
    ( el, _prev, onCleanup ) => {
      if ( !el ) {
        return;
      }

      updateReadingMeasurement();

      if ( typeof ResizeObserver !== 'undefined' ) {
        const observer = new ResizeObserver( updateReadingMeasurement );
        observer.observe( el );
        onCleanup( () => observer.disconnect() );
      }

      document.fonts?.ready.then( updateReadingMeasurement );
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
      branco: 'bg-background border border-gold-light/60',
      verde: 'bg-emerald-700',
      roxo: 'bg-purple-800',
      vermelho: 'bg-red-800',
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

<style scoped>
  .reading-fade-enter-active,
  .reading-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .reading-fade-enter-from {
    opacity: 0;
    transform: translateY(4px);
  }

  .reading-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }

  @media (prefers-reduced-motion: reduce) {
    .reading-fade-enter-active,
    .reading-fade-leave-active {
      transition: none;
    }
  }
</style>
