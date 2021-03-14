<template>
  <div>
    <TheHeader />
    <div class="container">
      <div class="content pb-6 flex items-center justify-between">
        <h2 class="text-3xl font-medium text-neutral-900">
          <v-btn tag="a" :to="`/authors`"> Authors </v-btn>
          <span class="text-neutral-500 font-light">
            &middot; #{{ author.id }}
          </span>
        </h2>
      </div>
    </div>

    <div class="container">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="content py-10 grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label>First Name</label>
            <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
              {{ author.first_name }}
            </h2>
          </div>
          <div class="col-span-6 sm:col-span-3">
            <label>Last Name</label>
            <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
              {{ author.last_name }}
            </h2>
          </div>
        </div>
        <div
          class="bg-neutral-50 border-t border-neutral-100 px-6 py-5 text-right"
        >
          <v-btn class="text neutral" :to="`/authors`">
            &larr; Back to listing
          </v-btn>
          <v-btn class="secondary" :to="`/authors/${author.id}/edit`">
            Edit Author
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, params }) {
    const author = await $axios.$get(`/authors/${params.id}`);
    return { author };
  }
};
</script>
<style scoped>
label {
  @apply text-sm text-neutral-400;
}
</style>
