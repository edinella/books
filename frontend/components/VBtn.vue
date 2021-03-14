<template>
  <component :is="tag" @click="handleClick" v-on="$listeners" class="v-btn">
    <slot />
  </component>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: "button"
    },
    to: {
      type: String
    }
  },
  methods: {
    handleClick() {
      if (this.to) {
        this.$router.push(this.to);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.v-btn {
  @apply cursor-pointer box-border;
}
button {
  @apply inline-flex rounded-md py-1.5 px-3 text-sm font-medium;
  @apply transition duration-200 ease-in-out;
}

button.primary {
  @apply bg-primary-300 hover:bg-primary-400;
  @apply text-primary-700 hover:text-primary-800;
  @apply border border-primary-300 hover:border-primary-400;
}
button.secondary {
  @apply bg-secondary-300 hover:bg-secondary-400;
  @apply text-secondary-700 hover:text-secondary-800;
  @apply border border-secondary-300 hover:border-secondary-400;
}
button.neutral {
  @apply bg-neutral-300 hover:bg-neutral-400;
  @apply text-neutral-700 hover:text-neutral-800;
  @apply border border-neutral-300 hover:border-neutral-400;
}

button.outlined,
button.outlined.primary,
button.outlined.secondary,
button.outlined.neutral {
  @apply border bg-transparent;
}
button.text,
button.text.primary,
button.text.secondary,
button.text.neutral {
  @apply border-transparent bg-transparent;
}

button.outlined.primary,
button.text.primary {
  @apply text-primary-600;
  @apply hover:bg-primary-700;
}
button.outlined.secondary,
button.text.secondary {
  @apply text-secondary-600;
  @apply hover:bg-secondary-700 hover:bg-opacity-5;
}

button.outlined.neutral,
button.text.neutral {
  @apply text-neutral-600;
  @apply hover:bg-neutral-700 hover:bg-opacity-5;
}

button.raised {
  @apply shadow-lg;
}
</style>
