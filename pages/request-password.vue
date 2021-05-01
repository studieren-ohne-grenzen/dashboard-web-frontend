<template>
  <div class="w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img
      alt="Dashboard Logo"
      src="logo.png"
      class="mx-auto py-8 px-2 w-64 dark:opacity-80"
    />
    <div class="bg-white max-w-md dark:bg-gray-900 xs:mx-auto xs:rounded p-8">
      <form @submit.prevent="sendRequest">
        <label class="block text-sogblue-dark mb-1 dark:text-gray-300">
          Alternative Mail
        </label>
        <input
          ref="mail"
          v-model="mail"
          v-focus
          :class="emailError ? 'border-red-500 border-2' : 'border-none'"
          class="w-full sog_texteditor"
        />
        <div
          v-if="emailError"
          class="flex-grow w-full text-red-600 dark:text-red-400 mb-4"
        >
          Keine gültige Mailadresse eingegeben.
        </div>
        <div class="flex mb-8 justify-between flex-wrap items-end">
          <button
            :disabled="!changeEmailSubmittable"
            :class="
              changeEmailSubmittable
                ? 'sog_button_active'
                : 'sog_button_inactive'
            "
            class="mr-2 mt-4"
          >
            Zurücksetzen
          </button>
          <nuxt-link to="/login" class="sog_button_secondary mt-4">
            Abbrechen
          </nuxt-link>
        </div>
      </form>
    </div>
    <AlertBox />
  </div>
</template>

<script>
import validate from '~/components/validateEmails'
import AlertBox from '~/components/alertbox'

export default {
  components: {
    AlertBox,
  },
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      },
    },
  },
  data() {
    return {
      mail: '',
      emailError: false,
      changeEmailSubmittable: false,
    }
  },
  head() {
    return {
      title: 'Passwort zurücksetzen',
    }
  },
  options: {
    auth: 'guest',
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
    mail() {
      this.validateEmails()
    },
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
    validateEmails() {
      this.changeEmailSubmittable = false
      if (this.mail === '') {
        this.emailError = false
      } else if (!validate(this.mail)) {
        this.emailError = true
      } else {
        this.changeEmailSubmittable = true
        this.emailError = false
      }
    },
    sendRequest() {
      this.$store.dispatch('user/requestPassword', this.mail)
    },
  },
}
</script>

<style></style>
