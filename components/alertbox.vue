<template>
  <div
    v-if="this.$store.getters['alertbox/alert'].active"
    class="top-0 left-0 w-full h-full fixed sm:px-2 bg-sogblue-transparent"
  >
    <form
      class="p-4 max-w-2xl my-24 sm:my-64 mx-auto bg-white sm:rounded shadow-2xl"
      @submit.prevent="confirmAction"
    >
      <h1 class="text-2xl text-sogblue">
        {{ this.$store.getters['alertbox/alert'].title }}
      </h1>
      <div class="mb-4">
        {{ this.$store.getters['alertbox/alert'].message }}
      </div>
      <div class="w-full text-right">
        <button
          v-if="this.$store.getters['alertbox/alert'].showCancel"
          :type="
            !this.$store.getters['alertbox/alert'].defaultToAction
              ? 'reset'
              : 'button'
          "
          :class="
            !this.$store.getters['alertbox/alert'].defaultToAction
              ? 'buttonactive'
              : 'buttoninactive'
          "
          class="rounded mr-2 py-2 px-4 border border-sogblue"
          @click="cancelAlert"
        >
          {{ this.$store.getters['alertbox/alert'].cancelName }}
        </button>
        <button
          :type="
            this.$store.getters['alertbox/alert'].defaultToAction
              ? 'submit'
              : 'button'
          "
          :class="
            this.$store.getters['alertbox/alert'].defaultToAction
              ? 'buttonactive'
              : 'buttoninactive'
          "
          class="rounded py-2 px-4 border border-sogblue"
        >
          {{ this.$store.getters['alertbox/alert'].actionName }}
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
      const action = this.$store.getters['alertbox/alert'].action
      const params = this.$store.getters['alertbox/alert'].params
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
