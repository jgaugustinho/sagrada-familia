# Project Rules

- **Language**: Always communicate and write documentation, comments, and rules in English.
- **Preserve user edits**: Always inspect the file on disk first and perform targeted edits (`edit_file`) rather than full-file overwrites (`write_file`).
- **Vue SFC tag order**: `<template>` first, followed by `<script setup lang="ts">`, then `<style scoped>`.
- **Formatting**: Adhere to the user's editor settings (2-space indentation, semicolons required, no trailing commas on last items, inner spaces for non-empty brackets/parentheses in `<script>`, no spaces inside quotes in `<template>`, single-line CSS selectors).
