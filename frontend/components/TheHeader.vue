<template>
  <header class="bg-gray-800 mb-6">
    <div class="container">
      <div class="flex items-center justify-between h-16">
        <nav class="flex items-baseline space-x-4">
          <NuxtLink :to="`/books`">
            Books
          </NuxtLink>
          <NuxtLink :to="`/authors`">
            Authors
          </NuxtLink>
        </nav>
        <div class="flex-shrink-0 text-3xl">
          <NuxtLink :to="`/books`">📚</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
nav a {
  @apply px-3 py-2 rounded-md text-sm font-medium;
  @apply text-gray-300 hover:bg-gray-700 hover:text-white;
}
nav a.nuxt-link-active {
  @apply bg-gray-900 text-white;
}
</style>
