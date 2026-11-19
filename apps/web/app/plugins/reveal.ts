import type { Directive } from 'vue';

export interface RevealOptions {
  delay?: number;
}

export default defineNuxtPlugin( ( nuxtApp ) => {
  const delayMap = new WeakMap<Element, number>();
  const cleanupTimerMap = new WeakMap<Element, ReturnType<typeof setTimeout>>();
  let observer: IntersectionObserver | null = null;

  const getObserver = (): IntersectionObserver => {
    if ( observer ) {
      return observer;
    }

    observer = new IntersectionObserver(
      ( entries ) => {
        for ( const entry of entries ) {
          if ( !entry.isIntersecting ) {
            continue;
          }

          const target = entry.target as HTMLElement;
          const delay = delayMap.get( target ) ?? 0;

          target.classList.remove( 'reveal-pending' );
          target.classList.add( 'reveal-visible' );
          observer?.unobserve( target );

          const cleanupTimer = setTimeout( () => {
            target.style.transitionDelay = '';
            target.style.willChange = 'auto';
            cleanupTimerMap.delete( target );
          }, delay + 720 );

          cleanupTimerMap.set( target, cleanupTimer );
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    return observer;
  };

  const revealDirective: Directive<HTMLElement, RevealOptions | undefined> = {
    getSSRProps() {
      return {};
    },
    mounted( el, binding ) {
      if ( !import.meta.client || typeof IntersectionObserver === 'undefined' ) {
        return;
      }

      if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
        return;
      }

      // Keep elements already visible above the fold immediately shown without flash
      if ( el.getBoundingClientRect().top < window.innerHeight * 0.92 ) {
        return;
      }

      const delay = binding.value?.delay ?? 0;
      delayMap.set( el, delay );

      if ( delay > 0 ) {
        el.style.transitionDelay = `${ delay }ms`;
      }

      el.classList.add( 'reveal-pending' );
      getObserver().observe( el );
    },
    beforeUnmount( el ) {
      observer?.unobserve( el );
      const pendingTimer = cleanupTimerMap.get( el );
      if ( pendingTimer ) {
        clearTimeout( pendingTimer );
        cleanupTimerMap.delete( el );
      }
    }
  };

  nuxtApp.vueApp.directive( 'reveal', revealDirective );
} );
