<template>
  <div>
    <div v-if="$auth.$state.redirect">Login first!</div>
    <form class="m-8" @keydown.enter="login">
      <input
        ref="username"
        v-model="username"
        placeholder="anything"
        class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
      />
      <input
        v-model="password"
        type="password"
        placeholder="123"
        class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
      />
      <button
        class="rounded py-2 px-4 bg-sogblue hover:bg-sogblue-darker text-white"
        @click="login"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '123',
      error: null
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
    }
  },
  methods: {
    login() {
      this.error = null
      return this.$auth
        .loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .catch((e) => {
          this.error = e + ''
        })
    }
  }
}
</script>

<style></style>
