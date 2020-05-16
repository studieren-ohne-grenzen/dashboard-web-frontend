<template>
  <div
    v-if="this.$store.getters.alert.active"
    class="top-0 left-0 w-full h-full fixed sm:px-2 bg-sogblue-transparent"
  >
    <form
      class="p-4 max-w-2xl my-24 sm:my-64 mx-auto bg-white sm:rounded shadow-2xl"
    >
      <h1 class="text-2xl text-sogblue">
        {{ this.$store.getters.alert.title }}
      </h1>
      <div class="mb-4">
        {{ this.$store.getters.alert.message }}
      </div>
      <div class="w-full text-right">
        <button
          v-if="this.$store.getters.alert.showCancel"
          :type="
            !this.$store.getters.alert.defaultToAction ? 'reset' : 'button'
          "
          :class="
            !this.$store.getters.alert.defaultToAction
              ? 'buttonactive'
              : 'buttoninactive'
          "
          class="rounded mr-2 py-2 px-4 border border-sogblue"
          @click="cancelAlert"
        >
          {{ this.$store.getters.alert.cancelName }}
        </button>
        <button
          :type="
            this.$store.getters.alert.defaultToAction ? 'submit' : 'button'
          "
          :class="
            this.$store.getters.alert.defaultToAction
              ? 'buttonactive'
              : 'buttoninactive'
          "
          class="rounded py-2 px-4 border border-sogblue"
        >
          {{ this.$store.getters.alert.actionName }}
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
      this.$store.commit('hideAlert')
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
