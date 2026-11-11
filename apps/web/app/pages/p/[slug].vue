<template>
  <div>
    <h1>Produto: {{ route.params.slug }}</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
