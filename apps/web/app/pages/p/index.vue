<template>
  <ProductCatalogPage category-slug="todos" />
</template>

<script setup lang="ts">
  import ProductCatalogPage from '@/components/catalog/ProductCatalogPage.vue';

  useHead( {
    title: 'Todos os Produtos — Sagrada Família'
  } );
</script>
