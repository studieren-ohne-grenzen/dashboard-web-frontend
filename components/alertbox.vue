<template>
  <div
    v-if="this.$store.getters['alertbox/active']"
    class="top-0 left-0 w-full h-full fixed flex items-center sm:px-2 bg-sogblue-transparent dark:bg-black-transparent"
  >
    <form
      class="p-4 max-w-2xl mx-auto bg-white dark:bg-gray-900 sm:rounded shadow-2xl"
      @submit.prevent="confirmAction"
    >
      <h1 class="text-2xl text-sogblue dark:text-gray-400 mb-2">
        {{ this.$store.getters['alertbox/title'] }}
      </h1>
      <div class="mb-4 dark:text-gray-300">
        {{ this.$store.getters['alertbox/message'] }}
      </div>
      <div class="w-full flex justify-end w-full">
        <button
          v-if="this.$store.getters['alertbox/showCancel']"
          type="reset"
          :class="
            !this.$store.getters['alertbox/defaultToAction']
              ? 'buttonactive'
              : 'buttoninactive'
          "
          class="rounded flex-grow xs:flex-grow-0 mr-2 py-2 px-4 border border-sogblue"
          @click="cancelAlert"
        >
          {{ this.$store.getters['alertbox/cancelName'] }}
        </button>
        <button
          type="submit"
          :class="
            this.$store.getters['alertbox/defaultToAction']
              ? 'buttonactive'
              : 'buttoninactive'
          "
          class="rounded flex-grow xs:flex-grow-0 py-2 px-4 border border-sogblue dark:bg-sogblue dark:hover:bg-sogblue-light dark:text-black"
        >
          {{ this.$store.getters['alertbox/actionName'] }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AlertBox',
  methods: {
    cancelAlert() {
      this.$store.commit('alertbox/hideAlert')
    },
    confirmAction() {
      const action = this.$store.getters['alertbox/action']
      const params = this.$store.getters['alertbox/params']
      if (this.$store.getters['alertbox/actionIsRedirect'])
        this.$router.push(this.$store.getters['alertbox/action'])
      else if (action !== '') {
        this.$store.dispatch(action, params)
      }
      this.$store.commit('alertbox/hideAlert')
    },
  },
}
</script>

<style scoped>
.buttonactive {
  @apply text-white dark:text-black;
  @apply bg-sogblue-default;
}
.buttonactive:hover {
  @apply bg-sogblue-darker dark:bg-sogblue-light;
}
.buttoninactive {
  @apply text-sogblue-default dark:bg-gray-800 dark:text-gray-300 dark:border-gray-900;
}
.buttoninactive:hover {
  @apply text-white;
  @apply bg-sogblue-light dark:bg-gray-700;
}
</style>
