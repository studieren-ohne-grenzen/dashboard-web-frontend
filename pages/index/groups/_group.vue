<template>
  <div>
    {{ thisGroup.name }}
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
  validate({ params }) {
    return true
  },
  computed: {
    thisGroup() {
      return this.$store.getters['groups/allGroups'].find(
        (group) =>
          !decodeURIComponent(this.$route.params.group).localeCompare(
            group.name
          )
      )
    },
  },
}
</script>

<style></style>
