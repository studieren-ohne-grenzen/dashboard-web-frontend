<template>
  <div
    class="w-full lg:width-auto lg:width-container min-h-screen h-full lg:pt-8 pb-4 lg:pb-8"
  >
    <div class="flex flex-wrap sm:pt-4 sm:px-2 max-w-5xl m-auto items-end">
      <div class="w-screen sm:w-auto py-4 pb-6 sm:py-2 lg:pl-0 sm:pr-12">
        <img
          alt="Dashboard Logo"
          src="@/static/logo.png"
          class="m-auto dark:opacity-80"
          style="max-width: 8rem"
        />
      </div>
      <ul class="flex flex-grow">
        <li
          v-if="!$store.getters['user/inactive']"
          class="ml-2 sm:ml-0"
          :class="
            this.$router.currentRoute.path === '/groups'
              ? 'tabactive'
              : 'tabinactive'
          "
        >
          <nuxt-link
            class="inline-block py-2 px-3 sm:px-8 font-normal"
            to="/groups"
          >
            Gruppen
          </nuxt-link>
        </li>
        <li
          v-if="!$store.getters['user/inactive']"
          class="ml-2 sm:ml-0"
          :class="
            this.$router.currentRoute.path === '/profile'
              ? 'tabactive'
              : 'tabinactive'
          "
        >
          <nuxt-link
            class="inline-block py-2 px-3 sm:px-8 font-normal"
            to="/profile"
          >
            Mein Profil
          </nuxt-link>
        </li>
        <li class="px-1 flex-grow">
          <button
            class="inline-block float-right py-2 pr-2 sm:pr-0 sm:pl-4 text-white hover:text-white dark:text-gray-300 dark:hover:text-white font-normal"
            @click="logout()"
          >
            Abmelden
          </button>
        </li>
      </ul>
    </div>
    <div class="sm:px-2 lg:mx-auto">
      <div
        class="max-w-5xl bg-white dark:bg-gray-900 lg:mx-auto sm:rounded p-4 sm:p-8"
      >
        <Nuxt-child></Nuxt-child>
      </div>
    </div>
    <AlertBox />
  </div>
</template>

<script>
import AlertBox from '~/components/alertbox'

export default {
  components: {
    AlertBox,
  },
  options: {
    auth: true,
    layout(context) {
      return context.store.getters['user/darkMode'] ? 'dark' : 'default'
    },
  },
  computed: {
    darkMode() {
      return this.$store.getters['user/darkMode']
    },
  },
  watch: {
    darkMode() {
      if (this.darkMode) this.$nuxt.setLayout('dark')
      else this.$nuxt.setLayout('default')
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
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style>
.tabactive {
  @apply px-1;
  @apply h-10;
  @apply bg-white dark:bg-gray-900;
  @apply rounded-t;
  @apply text-sogblue-darker dark:text-white;
}

.tabactive:hover {
  @apply text-sogblue-default dark:text-white;
}

.tabinactive {
  @apply px-1;
  @apply text-white dark:text-gray-300;
}

.tabinactive:hover {
  @apply text-white;
}
</style>
