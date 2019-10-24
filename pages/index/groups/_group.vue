<template>
  <div>
    Gruppe {{ this.$route.params.group }}
    <br />
    <br />
    <nuxt-link to="/">
      zurück zur Übersicht
    </nuxt-link>
  </div>
</template>

<script>
export default {
  // TODO: test for actual group names
  /* validate({ params }) {
    return /^\d+$/.test(params.group)
  } */
}
</script>

<style></style>
