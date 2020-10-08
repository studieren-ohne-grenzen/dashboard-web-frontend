<template>
  <div class="w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img alt="Dashboard Logo" src="logo.png" class="mx-auto py-8 px-2 w-64" />
    <div class="bg-white max-w-md bg-white xs:mx-auto xs:rounded p-8">
      <div
        v-else-if="wrongLogin"
        class="block p-2 mb-8 rounded border border-red-600 text-red-600"
      >
        Falsche Logindaten
      </div>
      <div
        v-else-if="otherError"
        class="block p-2 mb-8 rounded border border-red-600 text-red-600"
      >
        Fehler bei der Kommunikation mit dem Server
      </div>
      <form @submit.prevent="login">
        <label class="block text-sogblue-dark mb-1">Benutzername</label>
        <input
          ref="username"
          v-model="username"
          placeholder="vorname.nachname"
          class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
        <label class="block text-sogblue-dark mb-1">Passwort</label>
        <input
          v-model="password"
          type="password"
          placeholder="********"
          class="p-2 mb-8 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
        <button
          class="xs:float-left rounded py-2 px-4 bg-sogblue hover:bg-sogblue-darker text-white"
        >
          Login
        </button>
        <div class="w-full mt-8 xs:mt-0 mb-8">
          <nuxt-link
            to="/request-password"
            class="xs:float-right rounded py-2 px-4 bg-white border border-sogblue hover:bg-sogblue-light text-sogblue hover:text-white"
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
