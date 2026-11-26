<template>
  <div class="min-h-screen flex bg-background text-foreground">
    <!-- Desktop Collapsible Sidebar -->
    <aside class="hidden lg:block sticky top-0 h-screen shrink-0 border-r border-gold-light/20 transition-[width] duration-200 ease-out motion-reduce:transition-none" aria-label="Barra lateral de navegação" :class="isSidebarCollapsed ? 'w-[76px]' : 'w-[272px]'">
      <AdminSidebar :collapsed="isSidebarCollapsed" @toggle-collapse="toggleSidebar" />
    </aside>

    <!-- Mobile Navigation Drawer -->
    <Sheet :open="isMobileMenuOpen" @update:open="handleMobileMenuUpdate">
      <SheetContent side="left" class="p-0 w-[288px] max-w-[86vw] bg-dark-deep border-r border-gold-light/20 gap-0" :hide-close="true">
        <SheetHeader class="sr-only">
          <SheetTitle>Menu de navegação</SheetTitle>
          <SheetDescription>Navegue pelas seções do painel administrativo da Sagrada Família</SheetDescription>
        </SheetHeader>

        <AdminSidebar :mobile="true" @navigate="closeMobileMenu" @close-mobile="closeMobileMenu" />
      </SheetContent>
    </Sheet>

    <!-- Main Workspace Canvas -->
    <div class="flex-1 min-w-0 flex flex-col bg-background surface-linen">
      <AdminTopbar @open-mobile-menu="openMobileMenu" />

      <main class="relative z-10 flex-1 w-full px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';
  import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@sagrada-familia/ui/sheet';
  import AdminSidebar from '@/components/layout/AdminSidebar.vue';
  import AdminTopbar from '@/components/layout/AdminTopbar.vue';

  const isSidebarCollapsed = ref( false );
  const isMobileMenuOpen = ref( false );

  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value;
  };

  const openMobileMenu = () => {
    isMobileMenuOpen.value = true;
  };

  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
  };

  const handleMobileMenuUpdate = ( open: boolean ) => {
    isMobileMenuOpen.value = open;
  };
</script>
