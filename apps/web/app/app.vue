<script setup lang="ts">
  import { Button } from '@/components/ui/button'
  import { ShoppingBag, Star, AlertCircle, LogIn } from '@lucide/vue'
</script>

<template>
  <!-- bg-background testa a cor base do tema (branco no claro, escuro no dark) -->
  <div class="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 gap-8">

    <div class="text-center space-y-3 max-w-md">
      <!-- text-primary testa o seu dourado (#916c28) -->
      <h1 class="text-3xl font-bold text-primary flex items-center justify-center gap-2">
        <Star class="w-8 h-8" />
        Shadcn Configurado
      </h1>
      <!-- text-muted-foreground testa as cores neutras geradas pro texto de apoio -->
      <p class="text-muted-foreground">
        Se o título acima estiver dourado e os botões abaixo respeitarem a paleta da loja, o mapeamento HSL com Tailwind v3 foi um sucesso.
      </p>
    </div>

    <!-- bg-card e border-border testam as variáveis de estrutura do shadcn -->
    <div class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 border border-border p-8 rounded-xl bg-card shadow-sm">

      <!-- Botão Default: Deve ter fundo dourado e texto claro -->
      <Button class="gap-2">
        <ShoppingBag class="w-4 h-4" />
        Primária
      </Button>

      <!-- Botão Secondary: Deve ter fundo bege e texto escuro -->
      <Button variant="secondary" class="gap-2">
        <LogIn class="w-4 h-4" />
        Secundária
      </Button>

      <!-- Botão Destructive: Deve ter fundo vermelho (padrão shadcn ajustado no CSS) -->
      <Button variant="destructive" class="gap-2">
        <AlertCircle class="w-4 h-4" />
        Destructive
      </Button>

      <!-- Teste direto de classes utilitárias fora das variants padrão do botão -->
      <Button variant="outline" class="gap-2 border-dark text-dark hover:bg-dark hover:text-dark-foreground">
        Outline Customizado
      </Button>
    </div>

  </div>
</template>