<template>
  <div
    v-if="active"
    class="top-0 left-0 w-full h-full fixed sm:px-2 bg-sogblue-transparent"
  >
    <form
      class="p-4 max-w-2xl my-24 sm:my-64 mx-auto bg-white sm:rounded shadow-2xl"
    >
      <h1 class="text-2xl text-sogblue">
        {{ alertTitle }}
      </h1>
      <div class="mb-4">
        {{ alertMessage }}
      </div>
      <div class="w-full text-right">
        <button
          :type="!defaultToAction ? 'reset' : 'button'"
          :class="!defaultToAction ? 'buttonactive' : 'buttoninactive'"
          class="rounded mr-2 py-2 px-4 border border-sogblue"
          @click="cancelAlert"
        >
          {{ cancelName }}
        </button>
        <button
          :type="defaultToAction ? 'submit' : 'button'"
          :class="defaultToAction ? 'buttonactive' : 'buttoninactive'"
          class="rounded py-2 px-4 border border-sogblue"
        >
          {{ actionName }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AlertBox',
  props: {
    alertTitle: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    alertMessage: {
      type: String,
      default: '',
    },
    defaultToAction: {
      type: Boolean,
      default: false,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    actionName: {
      type: String,
      default: 'OK',
    },
    cancelName: {
      type: String,
      default: 'Abbrechen',
    },
  },
  methods: {
    cancelAlert() {
      this.active = false
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
