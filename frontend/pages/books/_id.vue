<template>
  <div>
    <TheHeader />
    <div class="action-bar">
      <h2 class="action-bar-title">
        <NuxtLink :to="`/books`"> Books </NuxtLink>
      </h2>
      <div>
        <NuxtLink :to="`/books`" class="secondary-action-button">
          &larr; Go back
        </NuxtLink>
        <NuxtLink :to="`/books/edit/${book.id}`" class="action-button">
          Edit Book
        </NuxtLink>
      </div>
    </div>

    <div class="container">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 pt-5 sm:px-6">
          <div class="label">
            Book Name
          </div>
          <div class="text-lg leading-6 text-gray-900 text-3xl font-light">
            {{ book.name }}
          </div>
        </div>
        <div class="flex flex-row">
          <div class="px-4 py-5 sm:px-6">
            <div class="label">
              ISBN
            </div>
            <div class="text-lg leading-6 font-medium text-gray-900">
              {{ book.isbn }}
            </div>
          </div>
          <div class="px-4 py-5 sm:px-6">
            <div class="label">
              Author
            </div>
            <div class="text-lg leading-6 font-medium text-gray-900">
              {{ book.author.first_name }} {{ book.author.last_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, params }) {
    const book = await $axios.$get(`/books/${params.id}`);
    return { book };
  }
};
</script>
<style scoped>
.label {
  @apply mt-1 max-w-2xl text-sm text-gray-500;
}
</style>
