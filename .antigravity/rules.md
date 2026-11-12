# Project Rules

- **Language**: Always communicate and write documentation, comments, and rules in English.
- **Preserve user edits**: Always inspect the file on disk first and perform targeted edits (`edit_file`) rather than full-file overwrites (`write_file`).
- **Vue SFC tag order**: `<template>` first, followed by `<script setup lang="ts">`, then `<style scoped>`.
- **Attribute Order in HTML/Vue Elements**: Always place native HTML attributes first (`type`, `class`, `aria-*`, `role`, `id`, `name`, `alt`, `title`, static `placeholder`, etc.), followed by Vue directives and bindings (`v-model`, `:dynamic-props`, `@events` / event listeners).
- **Formatting**: Adhere to the user's editor settings (2-space indentation, semicolons required, no trailing commas on last items, inner spaces for non-empty brackets/parentheses in `<script>`, no spaces inside quotes in `<template>`, single-line CSS selectors).
