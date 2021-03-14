<template>
  <div>
    <TheHeader />
    <div class="container">
      <div class="content pb-6 flex items-center justify-between">
        <h2 class="text-3xl font-medium text-neutral-900">
          <v-btn tag="a" :to="`/authors`"> Authors </v-btn>
        </h2>
        <div>
          <v-btn class="primary raised" :to="`/authors/new`">
            + New Author
          </v-btn>
        </div>
      </div>
    </div>

    <div class="container">
      <div
        class="bg-white shadow overflow-hidden sm:rounded-lg divide-y divide-neutral-100"
      >
        <v-btn
          v-for="author in authors"
          :key="author.id"
          tag="div"
          :to="`/authors/${author.id}`"
          class="px-4 py-5 sm:px-6 flex items-center justify-between hover:bg-primary-50"
        >
          <div class="text-lg leading-6 font-medium text-neutral-900">
            {{ author.first_name }} {{ author.last_name }}
          </div>
          <div class="mt-1 max-w-2xl text-sm text-neutral-500 flex-shrink-0">
            View details &rarr;
          </div>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import VBtn from "../../components/VBtn.vue";
export default {
  components: {
    VBtn
  },
  async asyncData({ $axios }) {
    const authors = await $axios.$get("/authors");
    return { authors };
  }
};
</script>
