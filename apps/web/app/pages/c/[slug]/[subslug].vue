<template>
  <ProductCatalogPage :category-slug="categorySlug" :sub-category-slug="subCategorySlug" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import ProductCatalogPage from '@/components/catalog/ProductCatalogPage.vue';
  import { getCatalogContext } from '@/data/catalog';

  const route = useRoute();
  const categorySlug = computed( () => String( route.params.slug ?? '' ) );
  const subCategorySlug = computed( () => String( route.params.subslug ?? '' ) );
  const pageTitle = computed( () => `${ getCatalogContext( categorySlug.value, subCategorySlug.value ).title } — Sagrada Família` );

  useHead( {
    title: pageTitle
  } );
</script>
