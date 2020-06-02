<template>
  <div>
    <div class="flex flex-wrap items-center sm:flex-no-wrap">
      <nuxt-link class="text-sogblue flex-shrink-0 mr-8 my-3" to="/">
        <span class="text-2xl leading-none">&lsaquo;</span> Gruppen
      </nuxt-link>
      <h1 class="text-sogblue xs:min-w-0 min-w-full text-4xl leading-tight">
        {{ thisGroup.name }}
      </h1>
    </div>
    <hr class="border-gray-light my-4" />
    <h2 class="text-sogblue-light text-3xl mb-4">Administrator:innen</h2>
    <div v-if="!thisGroup.admins.length">
      Diese Gruppe hat keine Administrator:innen.
    </div>
    <div v-else class="flex flex-wrap">
      <div
        v-for="admin in thisGroup.admins"
        :key="admin.name"
        class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0"
      >
        <div class="py-2 px-4 flex-grow border rounded border-gray">
          {{ admin.name }}
        </div>
      </div>
    </div>
    <div v-if="thisGroup.membership === 'admin'">
      <hr class="border-gray-light my-4" />
      <h2 class="text-sogblue-light text-3xl mb-4">Mitglieder</h2>
      <div v-if="!thisGroup.members.length" class="text-gray">
        Diese Gruppe hat keine Mitglieder.
      </div>
      <div v-else class="flex flex-wrap">
        <div
          v-for="member in thisGroup.members"
          :key="member.name"
          class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0"
        >
          <div class="py-2 px-4 flex-grow border rounded border-gray">
            {{ member.name }}
          </div>
        </div>
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
