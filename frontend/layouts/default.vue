<template>
  <div>
    <Nuxt />
  </div>
</template>
<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  @apply antialiased bg-neutral-100 pb-8;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  @apply max-w-7xl mx-auto px-3 sm:px-6 lg:px-8;
}

.content {
  @apply px-3 sm:px-5 lg:px-6 text-neutral-700;
}
</style>
