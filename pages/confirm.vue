<template>
  <div class="bggradient w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img
      alt="Dashboard Logo"
      src="~/static/logo.png"
      class="mx-auto py-8 px-2 w-64"
    />
    <div class="bg-white max-w-md bg-white xs:mx-auto xs:rounded p-8">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
export default {
  options: {
    auth: false,
  },
}
</script>

<style></style>
