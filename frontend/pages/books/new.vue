<template>
  <div>
    <TheHeader />
    <div class="container">
      <div class="content pb-6 flex items-center justify-between">
        <h2 class="text-3xl font-medium text-neutral-900">
          <v-btn tag="a" :to="`/books`"> Books </v-btn>
          <span class="text-neutral-500 font-light">
            &middot; New Book
          </span>
        </h2>
      </div>
    </div>

    <div class="container">
      <div class="bg-secondary-50 shadow overflow-hidden sm:rounded-lg">
        <div class="content py-10 grid grid-cols-6 gap-6">
          <div class="col-span-6">
            <label>Book Name</label>
            <h2
              class="text-3xl font-semibold tracking-tight sm:text-4xl border-b border-secondary-500 border-opacity-40"
            >
              <input
                type="text"
                v-model="book.name"
                class="w-full rounded-md bg-transparent focus:bg-white"
              />
            </h2>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label>ISBN</label>
            <div
              class="text-lg leading-6 font-medium border-b border-secondary-500 border-opacity-40"
            >
              <input
                type="text"
                v-model="book.isbn"
                class="w-full rounded-md bg-transparent focus:bg-white"
              />
            </div>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label>Author</label>
            <div
              class="text-lg leading-6 font-medium border-b border-secondary-500 border-opacity-40"
            >
              <select
                type="text"
                v-model="book.author_id"
                class="w-full rounded-md bg-transparent focus:bg-white"
              >
                <option
                  v-for="author in authors"
                  :key="author.id"
                  :value="author.id"
                >
                  {{ author.first_name }} {{ author.last_name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="bg-secondary-100 border-t border-secondary-200 px-6 py-5 text-right"
        >
          <v-btn class="text neutral" :to="`/books`">
            &larr; Cancel
          </v-btn>
          <v-btn class="secondary" @click="save"> Save </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, params }) {
    const book = {};
    const authors = await $axios.$get(`/authors`);
    return { book, authors };
  },
  methods: {
    async save() {
      await this.$axios.post(`/books`, this.book);
      this.$router.push(`/books`);
    }
  }
};
</script>
<style scoped>
label {
  @apply text-sm text-secondary-500;
}
</style>
