<template>
  <div class="bggradient w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img alt="Dashboard Logo" src="logo.png" class="mx-auto py-8 px-2 w-64" />
    <div class="bg-white max-w-md bg-white xs:mx-auto xs:rounded p-8">
      <div v-if="$auth.$state.redirect">Login first!</div>
      <form @keydown.enter="login">
        <label class="block text-sogblue-dark mb-1">Benutzername</label>
        <input
          ref="username"
          v-model="username"
          placeholder="vorname.nachname"
          class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
        <label class="block text-sogblue-dark mb-1">Passwort</label>
        <input
          v-model="password"
          type="password"
          placeholder="********"
          class="p-2 mb-8 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
        <button
          class="xs:float-left rounded py-2 px-4 bg-sogblue hover:bg-sogblue-darker text-white"
          @click="login"
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
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    },
  },
  methods: {
    login() {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        .catch((e) => {
          this.error = e + ''
        })
    },
  },
}
</script>

<style></style>
