<template>
  <div>
    <TheHeader />
    <div class="action-bar">
      <h2 class="action-bar-title">
        <NuxtLink :to="`/books`"> Books </NuxtLink>
      </h2>
      <div>
        <NuxtLink :to="`/books/add`" class="action-button">
          Add Book
        </NuxtLink>
      </div>
    </div>
    <div class="container">
      <div
        class="bg-white shadow overflow-hidden sm:rounded-lg divide-y divide-gray-100"
      >
        <div v-for="book in books" :key="book.id" class="px-4 py-5 sm:px-6">
          <NuxtLink
            :to="`/books/${book.id}`"
            class="flex items-center justify-between "
          >
            <div class="text-lg leading-6 font-medium text-gray-900">
              {{ book.name }}
            </div>
            <div class="mt-1 max-w-2xl text-sm text-gray-500">
              View details &rarr;
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const books = await $axios.$get("/books");
    return { books };
  }
};
</script>
