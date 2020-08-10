<template>
  <div class="bggradient w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img alt="Dashboard Logo" src="logo.png" class="mx-auto py-8 px-2 w-64" />
    <div class="bg-white max-w-md bg-white xs:mx-auto xs:rounded p-8">
      <form @keydown.enter="login">
        <label class="block text-sogblue-dark mb-1">Alternative Mail</label>
        <input
          ref="mail"
          v-model="mail"
          v-focus
          :class="emailError ? 'border-red-500 border-2' : 'border-none'"
          class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
        <div v-if="emailError" class="flex-grow w-full text-red-600 mb-4">
          Keine gültige Mailadresse eingegeben.
        </div>
        <div class="text-gray mb-4">
          Wir senden dir an deine alternative Mail-Adresse einen Link zum
          Zurücksetzen des Passworts.
        </div>
        <button
          :disabled="!changeEmailSubmittable"
          :class="
            changeEmailSubmittable
              ? 'cursor-pointer bg-sogblue hover:bg-sogblue-darker'
              : 'cursor-default bg-sogblue-lightest hover:bg-sogblue-lightest'
          "
          class="xs:float-left rounded py-2 px-4 text-white"
        >
          Zurücksetzen
        </button>
        <div class="w-full mt-8 xs:mt-0 mb-12">
          <nuxt-link
            to="/login"
            class="xs:float-right rounded py-2 px-4 bg-white border border-sogblue hover:bg-sogblue-light text-sogblue hover:text-white"
          >
            Abbrechen
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import validate from '~/components/validateEmails'

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
      mail: '',
      emailError: false,
      changeEmailSubmittable: false,
    }
  },
  options: {
    auth: 'guest',
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
  },
  head() {
    return {
      title: 'Passwort zurücksetzen',
    }
  },
}
</script>

<style></style>
