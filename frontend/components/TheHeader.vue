<template>
  <header class="bg-neutral-800 mb-6">
    <div class="container">
      <div class="flex items-center justify-center h-16">
        <nav class="flex items-baseline space-x-4">
          <NuxtLink :to="`/books`"> Books </NuxtLink>
          <NuxtLink :to="`/authors`"> Authors </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
<style scoped>
nav a {
  @apply px-3 py-2 rounded-full text-sm font-medium;
  @apply text-neutral-300 hover:bg-neutral-700 hover:text-white;
}
nav a.nuxt-link-active {
  @apply bg-neutral-900 text-white;
}
</style>
