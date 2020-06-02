<template>
  <div class="bggradient w-screen min-h-screen h-full pt-4 lg:pt-32">
    <img alt="Dashboard Logo" src="logo.png" class="mx-auto py-8 px-2 w-64" />
    <div class="bg-white max-w-md bg-white xs:mx-auto xs:rounded p-8">
      <div v-if="$auth.$state.redirect">Login first!</div>
      <form @keydown.enter="login">
        <label class="block text-sogblue-dark mb-1">Alternative Mail</label>
        <input
          ref="mail"
          v-model="mail"
          v-focus
          placeholder="maria.schmidt@gmail.com"
          class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
        <div class="text-gray mb-4">
          Wir senden dir an deine alternative Mail-Adresse einen Link zum
          Zurücksetzen des Passworts.
        </div>
        <button
          class="xs:float-left rounded py-2 px-4 bg-sogblue hover:bg-sogblue-darker text-white"
        >
          Zurücksetzen
        </button>
        <div class="w-full mt-8 xs:mt-0 mb-12">
          <nuxt-link
            to="/"
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
    }
  },
  options: {
    auth: false,
  },
}
</script>

<style></style>
