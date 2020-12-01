<template>
  <div class="w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img
      alt="Dashboard Logo"
      src="logo.png"
      class="mx-auto py-8 px-2 w-64 dark:opacity-80"
    />
    <div
      class="bg-white max-w-md bg-white dark:bg-gray-900 xs:mx-auto xs:rounded p-8"
    >
      <form @submit.prevent="sendRequest">
        <label class="block text-sogblue-dark mb-1 dark:text-gray-300">
          Alternative Mail
        </label>
        <input
          ref="mail"
          v-model="mail"
          v-focus
          :class="emailError ? 'border-red-500 border-2' : 'border-none'"
          class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:ring-2 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-white dark:focus:ring-gray-500"
        />
        <div
          v-if="emailError"
          class="flex-grow w-full text-red-600 dark:text-red-400 mb-4"
        >
          Keine gültige Mailadresse eingegeben.
        </div>
        <button
          :disabled="!changeEmailSubmittable"
          :class="
            changeEmailSubmittable
              ? 'cursor-pointer bg-sogblue hover:bg-sogblue-darker dark:bg-sogblue dark:hover:bg-sogblue-light'
              : 'cursor-default bg-sogblue-lightest hover:bg-sogblue-lightest dark:bg-gray-800 dark:hover:bg-gray-800'
          "
          class="xs:float-left rounded py-2 px-4 text-white dark:text-black"
        >
          Zurücksetzen
        </button>
        <div class="w-full mt-8 xs:mt-0 mb-12">
          <nuxt-link
            to="/login"
            class="xs:float-right rounded py-2 px-4 bg-white border border-sogblue hover:bg-sogblue-light text-sogblue hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-900"
          >
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
    layout: 'dark',
  },
  watch: {
    mail() {
      this.validateEmails()
    },
  },
  methods: {
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
