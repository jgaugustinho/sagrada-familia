# Project Rules

- **Language**: Always communicate and write documentation, comments, and rules in English.
- **Preserve user edits**: Always inspect the file on disk first and perform targeted edits (`edit_file`) rather than full-file overwrites (`write_file`).
- **Vue SFC tag order**: `<template>` first, followed by `<script setup lang="ts">`, then `<style scoped>`.
- **Attribute Order in HTML/Vue Elements**: Always place native HTML attributes first (`type`, `class`, `aria-*`, `role`, `id`, `name`, `alt`, `title`, static `placeholder`, etc.), followed by Vue directives and bindings (`v-model`, `:dynamic-props`, `@events` / event listeners).
- **Formatting & Code Style**: Before creating or editing code, read `apps/web/eslint.config.mjs` and strictly follow all rules defined there. Keep HTML/Vue opening tags on a single line.