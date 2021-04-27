<template>
  <div class="w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img
      alt="Dashboard Logo"
      src="~/static/logo.png"
      class="mx-auto py-8 px-2 w-64 dark:opacity-80"
    />
    <div class="bg-white dark:bg-gray-900 max-w-md xs:mx-auto xs:rounded p-8">
      <Nuxt-child></Nuxt-child>
    </div>
  </div>
</template>

<script>
export default {
  options: {
    auth: false,
    layout(context) {
      return context.store.getters['user/darkMode'] ? 'dark' : 'default'
    },
  },
  mounted() {
    if (this.$store.getters['user/darkMode']) this.$nuxt.setLayout('dark')
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      this.$store.commit('user/setLocalDarkMode', { darkModeState: true })
    else this.$store.commit('user/setLocalDarkMode', { darkModeState: false })
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this.handleDarkMode)
  },
  destroyed() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.handleDarkMode)
  },
  methods: {
    handleDarkMode(event) {
      if (event.matches) {
        this.$store.commit('user/setLocalDarkMode', { darkModeState: true })
      } else {
        this.$store.commit('user/setLocalDarkMode', { darkModeState: false })
      }
    },
  },
}
</script>

<style></style>
