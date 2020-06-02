<template>
  <div>
    <nuxt-link to="/">
      Zurück zur Gruppenübersicht
    </nuxt-link>
    <h1>
      {{ thisGroup.name }}
    </h1>
    <h2>Administrator:innen</h2>
    <div v-if="!thisGroup.admins.length">
      Diese Gruppe hat keine Administrator:innen.
    </div>
    <div v-for="admin in thisGroup.admins" v-else :key="admin.name">
      {{ admin.name }}
    </div>
    <div v-if="thisGroup.membership === 'admin'">
      <h2>Mitglieder</h2>
      <div v-if="!thisGroup.members.length">
        Diese Gruppe hat keine Mitglieder.
      </div>
      <div v-for="member in thisGroup.members" v-else :key="member.name">
        {{ member.name }}
      </div>
    </div>
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
