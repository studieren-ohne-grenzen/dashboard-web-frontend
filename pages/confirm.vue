<template>
  <div class="w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img
      alt="Dashboard Logo"
      src="~/static/logo.png"
      class="mx-auto py-8 px-2 w-64 dark:opacity-80"
    />
    <div
      class="bg-white dark:bg-gray-900 max-w-md bg-white xs:mx-auto xs:rounded p-8"
    >
      <Nuxt-child></Nuxt-child>
    </div>
  </div>
</template>

<script>
export default {
  options: {
    auth: false,
    layout: 'dark',
  },
}
</script>

<style></style>
