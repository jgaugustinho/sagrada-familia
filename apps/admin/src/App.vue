<template>
  <main class="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-background text-foreground">
    <!-- Left Atelier Brand Panel -->
    <aside class="hidden lg:flex lg:col-span-5 xl:col-span-6 relative flex-col justify-between overflow-hidden bg-dark-deep text-background surface-dark border-r border-gold-light/20 p-8 xl:p-12" aria-label="Apresentação do Painel Administrativo">
      <img class="pointer-events-none select-none absolute inset-0 w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1465848059293-208e11dfea17?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D" alt="Interior da Basílica de Santa Maria com altar e arcos sacros" aria-hidden="true" />

      <!-- Layered dark-espresso shading for text legibility and warm gold depth -->
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-deep/95 via-dark-deep/75 to-dark-deep/80" aria-hidden="true" />
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-dark-deep/85 via-dark/55 to-dark-deep/35" aria-hidden="true" />
      <div class="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gold-bright/[0.09] blur-3xl" aria-hidden="true" />

      <div class="pointer-events-none select-none absolute inset-x-0 bottom-0 overflow-hidden text-center" aria-hidden="true">
        <p class="wordmark-fade font-serif font-semibold uppercase tracking-[0.06em] text-[clamp(3rem,5.2vw,5.75rem)] leading-[0.82] text-gold-bright/[0.06] whitespace-nowrap">
          Sagrada Família
        </p>
      </div>

      <div class="relative z-10 flex items-center justify-between gap-4">
        <img src="/images/horizontal_2D_logo.png" alt="Sagrada Família — Artigos Religiosos" class="logo-gold block h-16 xl:h-[4.5rem] w-auto object-contain select-none" />

        <span class="inline-flex items-center gap-1.5 rounded-full border border-gold-bright/30 bg-gold-bright/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-bright">Painel Administrativo</span>
      </div>

      <div class="relative z-10 my-auto py-6 space-y-6 max-w-lg">
        <div class="space-y-3.5">
          <span class="block text-xs font-semibold uppercase tracking-[0.22em] text-gold-bright">GESTÃO DO ACERVO</span>

          <div class="flex items-center gap-3" aria-hidden="true">
            <span class="h-px w-10 bg-gold-bright/45" />
            <span class="text-xs leading-none text-gold-bright">†</span>
            <span class="h-px w-10 bg-gold-bright/45" />
          </div>

          <h2 class="font-serif text-4xl xl:text-[2.75rem] font-semibold tracking-tight leading-[1.08] text-background drop-shadow-sm">
            Curadoria, pedidos e cuidado em um só lugar.
          </h2>

          <p class="text-sm xl:text-[15px] text-background/80 leading-relaxed max-w-md">
            Gerencie o catálogo sacro, acompanhe cada envio e preserve o padrão de atendimento da Sagrada Família.
          </p>
        </div>

        <ul class="rounded-2xl border border-gold-light/25 bg-dark-deep/60 backdrop-blur-md divide-y divide-gold-light/15 shadow-warm-md" aria-label="Recursos do painel administrativo">
          <li class="flex items-start gap-3.5 px-5 py-3.5" v-for="pillar in atelierPillars" :key="pillar.key">
            <span class="w-9 h-9 rounded-full bg-gold-bright/10 border border-gold-bright/30 text-gold-bright flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
              <component class="w-4 h-4 stroke-[1.75]" :is="pillar.icon" />
            </span>

            <div class="min-w-0">
              <h3 class="text-sm font-semibold text-background leading-snug">
                {{ pillar.title }}
              </h3>
              <p class="mt-0.5 text-xs text-background/70 leading-relaxed">
                {{ pillar.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div class="relative z-10 border-t border-gold-light/15 pt-5 flex items-center justify-between gap-4 text-xs text-background/60">
        <span>&copy; 2026 Sagrada Família — Artigos Religiosos</span>
        <span>Curitiba, PR</span>
      </div>
    </aside>

    <!-- Right Linen Form Canvas -->
    <section class="lg:col-span-7 xl:col-span-6 relative flex flex-col justify-center lg:justify-between gap-5 lg:gap-0 min-h-screen lg:min-h-0 bg-background surface-linen px-5 py-6 sm:px-10 sm:py-8" aria-labelledby="login-heading">
      <div class="relative z-10">
        <div class="lg:hidden flex flex-col items-center text-center gap-2.5">
          <img src="/images/vertical_3D_logo.png" alt="Sagrada Família — Artigos Religiosos" class="block h-32 sm:h-40 w-auto object-contain select-none" />
          <div class="flex items-center justify-center gap-3 w-full max-w-[300px]">
            <span class="h-px flex-1 bg-gold-light/60" aria-hidden="true" />
            <span class="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark whitespace-nowrap">PAINEL ADMINISTRATIVO</span>
            <span class="h-px flex-1 bg-gold-light/60" aria-hidden="true" />
          </div>
        </div>

        <div class="hidden lg:flex items-center justify-end">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-gold-light/40 bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-warm-sm">
            <ShieldCheck class="size-3.5 text-primary shrink-0" aria-hidden="true" />
            <span>Acesso restrito</span>
          </span>
        </div>
      </div>

      <div class="relative z-10 w-full max-w-[440px] mx-auto lg:my-auto lg:py-6">
        <Card class="relative overflow-hidden bg-card/95 border-gold-light/35 shadow-warm-lg py-0 gap-0">
          <svg class="pointer-events-none select-none absolute w-4 h-4 text-gold-light/55" viewBox="0 0 20 20" fill="none" aria-hidden="true" v-for="cornerClass in folioCornerClasses" :key="cornerClass" :class="cornerClass">
            <path d="M 1 18 L 1 4 Q 1 1 4 1 L 18 1" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
            <path d="M 5 11 L 5 5 L 11 5" stroke="currentColor" stroke-width="0.75" stroke-opacity="0.55" stroke-linecap="round" />
          </svg>

          <CardHeader class="relative z-10 px-6 pt-7 pb-5 sm:px-8 sm:pt-8 space-y-2">
            <span class="block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">ACESSO RESTRITO</span>

            <CardTitle id="login-heading" as="h1" class="font-serif text-3xl sm:text-[2.15rem] font-semibold tracking-tight leading-[1.1] text-foreground">
              Entrar no Painel
            </CardTitle>

            <CardDescription class="text-sm leading-relaxed">
              Informe seu e-mail e senha para acessar a área administrativa.
            </CardDescription>
          </CardHeader>

          <CardContent class="relative z-10 px-6 pb-7 sm:px-8 sm:pb-8">
            <form class="space-y-5" novalidate @submit.prevent="handleSubmit">
              <div class="space-y-2">
                <Label for="login-email" class="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/85">
                  E-mail
                </Label>

                <div class="relative">
                  <Mail class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/75" aria-hidden="true" />
                  <Input id="login-email" name="email" type="email" autocomplete="email" placeholder="nome@sagradafamilia.com.br" class="h-11 rounded-xl border-gold-light/50 bg-background pl-10 pr-3.5 text-sm shadow-warm-sm" :model-value="email" @update:model-value="handleEmailUpdate" />
                </div>
              </div>

              <div class="space-y-2">
                <Label for="login-password" class="text-xs font-semibold uppercase tracking-[0.12em] text-foreground/85">
                  Senha
                </Label>

                <div class="relative">
                  <Lock class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/75" aria-hidden="true" />
                  <Input id="login-password" name="password" autocomplete="current-password" placeholder="••••••••" class="h-11 rounded-xl border-gold-light/50 bg-background pl-10 pr-11 text-sm shadow-warm-sm" :type="showPassword ? 'text' : 'password'" :model-value="password" @update:model-value="handlePasswordUpdate" />
                  <button type="button" class="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer" :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'" :aria-pressed="showPassword" @click="togglePasswordVisibility">
                    <EyeOff class="size-4" aria-hidden="true" v-if="showPassword" />
                    <Eye class="size-4" aria-hidden="true" v-else />
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-between gap-3 pt-0.5">
                <div class="flex items-center gap-2.5">
                  <Checkbox id="login-remember" class="cursor-pointer" :model-value="rememberMe" @update:model-value="handleRememberUpdate" />
                  <Label for="login-remember" class="text-xs sm:text-sm font-normal text-muted-foreground cursor-pointer">
                    Manter conectado
                  </Label>
                </div>

                <button type="button" class="link-editorial text-xs sm:text-sm font-semibold text-gold-dark hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer" @click="handleForgotPassword">
                  Esqueci minha senha
                </button>
              </div>

              <Button type="submit" size="lg" class="group w-full h-11 rounded-xl bg-primary text-primary-foreground hover:bg-gold-dark font-semibold tracking-wide shadow-warm-sm btn-sheen cursor-pointer">
                <span>Entrar</span>
                <ArrowRight class="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
              </Button>
            </form>
          </CardContent>

          <Separator class="bg-gold-light/25" />

          <CardFooter class="relative z-10 justify-center px-6 py-4 sm:px-8 bg-surface/40">
            <p class="text-xs text-muted-foreground text-center">
              Problemas para acessar?
              <button type="button" class="link-editorial font-semibold text-gold-dark hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer" @click="handleAdminHelp">
                Fale com o administrador
              </button>
            </p>
          </CardFooter>
        </Card>
      </div>

      <p class="relative z-10 text-xs text-muted-foreground/80 text-center">
        Sagrada Família &bull; Área Administrativa
      </p>
    </section>
  </main>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ArrowRight, Eye, EyeOff, Lock, Mail, PackageCheck, ShieldCheck, Sparkles } from '@lucide/vue';
  import { Button } from '@sagrada-familia/ui/button';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@sagrada-familia/ui/card';
  import { Checkbox } from '@sagrada-familia/ui/checkbox';
  import { Input } from '@sagrada-familia/ui/input';
  import { Label } from '@sagrada-familia/ui/label';
  import { Separator } from '@sagrada-familia/ui/separator';

  const folioCornerClasses = [
    'top-2.5 left-2.5',
    'top-2.5 right-2.5 rotate-90',
    'bottom-2.5 right-2.5 rotate-180',
    'bottom-2.5 left-2.5 -rotate-90'
  ] as const;

  const atelierPillars = [
    {
      key: 'catalog',
      icon: Sparkles,
      title: 'Catálogo & Acervo',
      description: 'Controle de peças, variações e destaques da loja'
    },
    {
      key: 'orders',
      icon: PackageCheck,
      title: 'Pedidos & Envios',
      description: 'Acompanhamento da vistoria manual até a entrega'
    },
    {
      key: 'security',
      icon: ShieldCheck,
      title: 'Ambiente Protegido',
      description: 'Acesso restrito à equipe autorizada Sagrada Família'
    }
  ];

  const email = ref( '' );
  const password = ref( '' );
  const rememberMe = ref( false );
  const showPassword = ref( false );

  const handleEmailUpdate = ( value: string | number ) => {
    email.value = String( value );
  };

  const handlePasswordUpdate = ( value: string | number ) => {
    password.value = String( value );
  };

  const handleRememberUpdate = ( value: boolean | 'indeterminate' ) => {
    rememberMe.value = value === true;
  };

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };

  const handleSubmit = () => {
    // No-op until authentication API endpoints are implemented
  };

  const handleForgotPassword = () => {
    // No-op until password recovery flow is implemented
  };

  const handleAdminHelp = () => {
    // No-op until support workflow is defined
  };
</script>
