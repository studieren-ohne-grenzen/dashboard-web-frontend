<template>
  <div
    v-if="this.$store.getters['alertbox/active']"
    class="top-0 left-0 w-full h-full fixed flex items-center sm:px-2 bg-sogblue-transparent"
  >
    <form
      class="p-4 max-w-2xl mx-auto bg-white sm:rounded shadow-2xl"
      @submit.prevent="confirmAction"
    >
      <h1 class="text-2xl text-sogblue mb-2">
        {{ this.$store.getters['alertbox/title'] }}
      </h1>
      <div class="mb-4">
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
          class="rounded flex-grow xs:flex-grow-0 py-2 px-4 border border-sogblue"
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
      this.$store.dispatch(action, params)
      this.$store.commit('alertbox/hideAlert')
    },
  },
}
</script>

<style scoped>
.buttonactive {
  @apply text-white;
  @apply bg-sogblue;
}
.buttonactive:hover {
  @apply bg-sogblue-darker;
}
.buttoninactive {
  @apply text-sogblue;
}
.buttoninactive:hover {
  @apply text-white;
  @apply bg-sogblue-light;
}
</style>
