<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
.container {
  @apply max-w-7xl mx-auto px-3 sm:px-6 lg:px-8;
}

.action-bar {
  @apply max-w-7xl mx-auto px-6 sm:px-11 lg:px-14;
  @apply pb-6 flex items-center justify-between;
}

.action-bar-title {
  @apply text-3xl font-medium text-gray-900;
}

.action-button {
  @apply px-3 py-2 rounded-md text-sm font-medium bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white;
}
.secondary-action-button {
  @apply px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-gray-700;
}

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
  @apply antialiased bg-gray-100;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
