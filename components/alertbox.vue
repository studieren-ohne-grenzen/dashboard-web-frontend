<template>
  <div
    v-if="$store.getters['alertbox/active']"
    class="top-0 left-0 w-full h-full fixed flex items-center sm:px-2 bg-sogblue-transparent dark:bg-black-transparent"
  >
    <form
      class="p-4 max-w-2xl mx-auto bg-white dark:bg-gray-900 sm:rounded shadow-2xl"
      @submit.prevent="confirmAction"
    >
      <h1 class="text-2xl text-sogblue dark:text-gray-400 mb-2">
        {{ $store.getters['alertbox/title'] }}
      </h1>
      <div class="mb-4 dark:text-gray-300">
        {{ $store.getters['alertbox/message'] }}
      </div>
      <div class="w-full flex justify-end">
        <button
          v-if="$store.getters['alertbox/showCancel']"
          type="reset"
          :class="
            !$store.getters['alertbox/defaultToAction']
              ? 'sog_button_active'
              : 'sog_button_secondary'
          "
          class="flex-grow xs:flex-grow-0 mr-2"
          @click="cancelAlert"
        >
          {{ $store.getters['alertbox/cancelName'] }}
        </button>
        <button
          type="submit"
          :class="
            $store.getters['alertbox/defaultToAction']
              ? 'sog_button_active'
              : 'sog_button_secondary'
          "
          class="flex-grow xs:flex-grow-0"
        >
          {{ $store.getters['alertbox/actionName'] }}
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

<style></style>
