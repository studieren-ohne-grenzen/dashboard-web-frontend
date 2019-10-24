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
  validate({ params }) {
    // TODO: test for actual group names
    return /^\d+$/.test(params.group)
  }
}
</script>

<style></style>
