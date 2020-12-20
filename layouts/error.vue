<template>
  <div class="w-screen h-screen">
    <div class="max-w-lg mx-auto p-4">
      <div class="text-white clearfix text-6xl">
        {{ error.statusCode }}
        <span v-if="error.statusCode === 404" class="align-baseline text-base">
          Seite nicht gefunden
        </span>
        <span v-else class="align-baseline text-base">
          Ein Fehler ist aufgetreten
        </span>
      </div>
      <nuxt-link to="/" class="text-sogblue-lightest">
        Zurück zur Startseite
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head: {
    bodyAttrs: {
      class: 'light',
    },
  },
}
</script>
