<template>
  <div class="relative" ref="containerRef">
    <button type="button" class="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card/85 px-3 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary hover:text-gold-dark transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-haspopup="menu" aria-label="Compartilhar produto nas redes sociais" :aria-expanded="isOpen" @click="toggleMenu">
      <Check class="w-3 h-3 text-primary" aria-hidden="true" v-if="isCopied" />
      <Share2 class="w-3 h-3" aria-hidden="true" v-else />
      <span>{{ isCopied ? 'Link copiado' : 'Compartilhar' }}</span>
    </button>

    <div role="menu" aria-label="Opções de compartilhamento" class="absolute right-0 top-full mt-2 z-30 w-56 rounded-2xl bg-popover border border-gold-light/45 shadow-warm-md p-2 animate-fade-in" v-if="isOpen">
      <p class="px-2.5 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        Compartilhar peça
      </p>

      <div class="space-y-0.5">
        <a target="_blank" rel="noopener noreferrer" role="menuitem" class="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-foreground hover:bg-surface hover:text-gold-dark transition-colors" :href="whatsappUrl" @click="closeMenu">
          <svg class="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path :d="WHATSAPP_BUBBLE_PATH" />
            <path fill="currentColor" stroke="none" :d="WHATSAPP_PHONE_PATH" />
          </svg>
          <span>WhatsApp</span>
        </a>

        <a target="_blank" rel="noopener noreferrer" role="menuitem" class="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-foreground hover:bg-surface hover:text-gold-dark transition-colors" :href="facebookUrl" @click="closeMenu">
          <svg class="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
          <span>Facebook</span>
        </a>

        <a target="_blank" rel="noopener noreferrer" role="menuitem" class="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-foreground hover:bg-surface hover:text-gold-dark transition-colors" :href="xUrl" @click="closeMenu">
          <svg class="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span>X (Twitter)</span>
        </a>

        <a target="_blank" rel="noopener noreferrer" role="menuitem" class="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-foreground hover:bg-surface hover:text-gold-dark transition-colors" :href="pinterestUrl" @click="closeMenu">
          <svg class="w-4 h-4 text-primary shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-3.64 19.31c-.09-.82-.17-2.08.04-2.97.19-.81 1.24-5.26 1.24-5.26s-.32-.63-.32-1.57c0-1.47.85-2.57 1.91-2.57.9 0 1.34.68 1.34 1.49 0 .91-.58 2.26-.88 3.52-.25 1.05.53 1.91 1.56 1.91 1.88 0 3.32-1.98 3.32-4.84 0-2.53-1.82-4.3-4.42-4.3-3.01 0-4.78 2.26-4.78 4.59 0 .91.35 1.89.79 2.42.09.11.1.2.07.31-.08.33-.26 1.05-.3 1.2-.05.19-.15.23-.35.14-1.31-.61-2.13-2.52-2.13-4.06 0-3.31 2.41-6.35 6.94-6.35 3.64 0 6.47 2.6 6.47 6.07 0 3.62-2.28 6.53-5.45 6.53-1.06 0-2.07-.55-2.41-1.21l-.66 2.5c-.24.92-.88 2.07-1.31 2.77A10 10 0 1 0 12 2Z" />
          </svg>
          <span>Pinterest</span>
        </a>
      </div>

      <div class="mt-1.5 pt-1.5 border-t border-border/75">
        <button type="button" role="menuitem" class="w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-foreground hover:bg-surface hover:text-gold-dark transition-colors cursor-pointer" @click="copyLink">
          <Check class="w-4 h-4 text-primary shrink-0" aria-hidden="true" v-if="isCopied" />
          <Link2 class="w-4 h-4 text-primary shrink-0" aria-hidden="true" v-else />
          <span>{{ isCopied ? 'Link copiado!' : 'Copiar link' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import { Check, Link2, Share2 } from '@lucide/vue';

  const WHATSAPP_BUBBLE_PATH = 'M3 21l1.65-3.8A9 9 0 1 1 21 12a9 9 0 0 1-13.2 7.95L3 21z';
  const WHATSAPP_PHONE_PATH = 'M9.5 8.8c.2-.45.45-.46.7-.47h.55c.18 0 .42.06.64.52.23.48.77 1.72.84 1.85.07.13.12.28.02.45-.1.18-.15.29-.3.45-.15.16-.31.35-.44.47-.14.13-.29.28-.12.56.17.28.75 1.24 1.61 2 1.1.97 2.02 1.27 2.31 1.42.29.14.46.12.63-.07.17-.19.74-.85.94-1.15.2-.3.4-.25.67-.15.27.1 1.73.81 2.03.96.3.15.5.22.57.34.07.13.07.73-.18 1.44-.25.7-1.45 1.37-2 1.44-.51.07-1.16.1-1.88-.12-.44-.14-1-.32-1.72-.63-3.02-1.3-4.99-4.35-5.14-4.55-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.04-2.49z';

  const props = defineProps<{
    productName: string;
    imageUrl?: string;
  }>();

  const containerRef = ref<HTMLElement | null>( null );
  const isOpen = ref( false );
  const isCopied = ref( false );
  const currentUrl = ref( '' );
  let copyTimer: ReturnType<typeof setTimeout> | null = null;

  const whatsappUrl = computed( () => {
    const message = currentUrl.value ? `${ props.productName } — ${ currentUrl.value }` : props.productName;
    return `https://wa.me/?text=${ encodeURIComponent( message ) }`;
  } );

  const facebookUrl = computed( () => {
    return `https://www.facebook.com/sharer/sharer.php?u=${ encodeURIComponent( currentUrl.value ) }`;
  } );

  const xUrl = computed( () => {
    return `https://twitter.com/intent/tweet?text=${ encodeURIComponent( props.productName ) }&url=${ encodeURIComponent( currentUrl.value ) }`;
  } );

  const pinterestUrl = computed( () => {
    const params = new URLSearchParams( {
      url: currentUrl.value,
      description: props.productName
    } );
    if ( props.imageUrl ) {
      params.set( 'media', props.imageUrl );
    }
    return `https://pinterest.com/pin/create/button/?${ params.toString() }`;
  } );

  const toggleMenu = () => {
    if ( import.meta.client ) {
      currentUrl.value = window.location.href;
    }
    isOpen.value = !isOpen.value;
  };

  const closeMenu = () => {
    isOpen.value = false;
  };

  const copyLink = async () => {
    if ( !import.meta.client || typeof navigator === 'undefined' || !navigator.clipboard ) {
      return;
    }

    try {
      await navigator.clipboard.writeText( window.location.href );
      isCopied.value = true;
      isOpen.value = false;

      if ( copyTimer ) {
        clearTimeout( copyTimer );
      }

      copyTimer = setTimeout( () => {
        isCopied.value = false;
        copyTimer = null;
      }, 1800 );
    } catch {
      // Ignore clipboard permission errors silently
    }
  };

  const handleDocumentClick = ( event: MouseEvent ) => {
    if ( !isOpen.value || !containerRef.value ) {
      return;
    }

    if ( !containerRef.value.contains( event.target as Node ) ) {
      isOpen.value = false;
    }
  };

  const handleWindowKeydown = ( event: KeyboardEvent ) => {
    if ( event.key === 'Escape' && isOpen.value ) {
      isOpen.value = false;
    }
  };

  onMounted( () => {
    if ( import.meta.client ) {
      document.addEventListener( 'click', handleDocumentClick );
      window.addEventListener( 'keydown', handleWindowKeydown );
    }
  } );

  onUnmounted( () => {
    if ( import.meta.client ) {
      document.removeEventListener( 'click', handleDocumentClick );
      window.removeEventListener( 'keydown', handleWindowKeydown );
    }
    if ( copyTimer ) {
      clearTimeout( copyTimer );
    }
  } );
</script>
