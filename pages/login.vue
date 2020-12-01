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
        <label class="block text-sogblue-dark dark:text-gray-300 mb-1">
          Benutzername
        </label>
        <input
          ref="username"
          v-model="username"
          placeholder="vorname.nachname"
          class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:ring-2 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-white dark:focus:ring-gray-500"
        />
        <label class="block text-sogblue-dark mb-1 dark:text-gray-300">
          Passwort
        </label>
        <input
          v-model="password"
          type="password"
          placeholder="********"
          class="p-2 mb-8 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:ring-2 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-white dark:focus:ring-gray-500"
        />
        <button
          class="xs:float-left rounded py-2 px-4 bg-sogblue hover:bg-sogblue-darker text-white dark:bg-sogblue dark:hover:bg-sogblue-light dark:text-black"
        >
          Login
        </button>
        <div class="w-full mt-8 xs:mt-0 mb-8">
          <nuxt-link
            to="/request-password"
            class="xs:float-right rounded py-2 px-4 bg-white border border-sogblue hover:bg-sogblue-light text-sogblue hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-900"
          >
            Passwort vergessen
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
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
    layout: 'dark',
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
  },
  methods: {
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
