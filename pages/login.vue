<template>
  <div class="w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img
      alt="Dashboard Logo"
      src="logo.png"
      class="mx-auto py-8 px-2 w-64 dark:opacity-80"
    />
    <div class="bg-white max-w-md dark:bg-gray-900 xs:mx-auto xs:rounded p-8">
      <div
        v-if="wrongLogin"
        class="block p-2 mb-8 rounded border border-red-600 text-red-600 dark:text-red-400 dark:bg-gray-800"
      >
        Falsche Logindaten
      </div>
      <div
        v-else-if="otherError"
        class="block p-2 mb-8 rounded border border-red-600 text-red-600 dark:text-red-400 dark:bg-gray-800"
      >
        Fehler bei der Kommunikation mit dem Server
      </div>
      <form @submit.prevent="login">
        <label class="sog_textlabel">Benutzername</label>
        <input
          ref="username"
          v-model="username"
          v-focus
          placeholder="vorname.nachname"
          class="w-full sog_texteditor"
        />
        <label class="sog_textlabel">Passwort</label>
        <input
          v-model="password"
          type="password"
          placeholder="********"
          class="w-full sog_texteditor"
        />
        <div class="flex mb-8 justify-between flex-wrap items-end">
          <button class="sog_button_active mr-2 mt-4">Login</button>
          <nuxt-link to="/request-password" class="sog_button_secondary mt-4">
            Passwort vergessen
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      },
    },
  },
  data() {
    return {
      username: '',
      password: '',
      error: null,
      wrongLogin: false,
      otherError: false,
    }
  },
  options: {
    auth: 'guest',
    layout(context) {
      return context.store.getters['user/darkMode'] ? 'dark' : 'default'
    },
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
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
    async login() {
      this.error = null
      await this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((e) => {
          if (e.response && e.response.status === 403) {
            this.wrongLogin = true
            this.otherError = false
          } else {
            // Anderer Fehler
            this.wrongLogin = false
            this.otherError = true
          }
          this.error = e + ''
        })
      this.password = ''
    },
  },
}
</script>

<style></style>
