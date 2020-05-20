<template>
  <div>
    <h1
      v-if="this.$store.getters['groups/requests'].length"
      class="text-sogblue-light text-3xl"
    >
      Neue Anfragen
    </h1>
    <hr
      v-if="this.$store.getters['groups/requests'].length"
      class="border-lightgray my-4"
    />
    <div class="mb-4 w-auto inline-flex border border-sogblue rounded">
      <button
        class="px-4 py-2 border-r border-sogblue leading-tight"
        :class="allGroups ? 'groupactive' : 'groupinactive'"
        @click="showAllGroups"
      >
        Alle Gruppen
      </button>
      <button
        class="px-4 py-2 border-r border-sogblue leading-tight"
        :class="myGroups ? 'groupactive' : 'groupinactive'"
        @click="showMyGroups"
      >
        Meine Gruppen
      </button>
      <button
        class="px-4 py-2"
        :class="adminGroups ? 'groupactive' : 'groupinactive'"
        @click="showAdminGroups"
      >
        <span class="xs:hidden">Admin</span>
        <span class="hidden xs:inline">Administrieren</span>
      </button>
    </div>
    <div v-if="!groupsSelected.length && adminGroups" class="text-gray">
      Du hast in keiner Gruppe Administrator-Rechte.
    </div>
    <div v-else-if="!groupsSelected.length && myGroups" class="text-gray">
      Du bist noch nicht Mitglied in einer Gruppe.
    </div>
    <div v-else-if="!groupsSelected.length && allGroups" class="text-gray">
      Keine Gruppen verfügbar.
    </div>

    <GroupListing v-if="!allGroups" :groups="groupsSelected" name="" />
    <div
      v-for="category in this.$store.getters['groups/allGroupsByCategory']"
      v-else
      :key="category.name"
    >
      <GroupListing
        v-if="category.getter.length"
        :groups="category.getter"
        :name="category.name"
      />
    </div>
  </div>
</template>

<script>
import GroupListing from '../../components/grouplisting'

export default {
  components: {
    GroupListing,
  },
  data: () => {
    return {
      allGroups: false,
      myGroups: true,
      adminGroups: false,
    }
  },
  computed: {
    groupsSelected() {
      if (this.myGroups) return this.$store.getters['groups/myGroups']
      if (this.adminGroups) return this.$store.getters['groups/adminGroups']
      if (this.allGroups) return this.$store.getters['groups/allGroups']
      return null
    },
  },
  methods: {
    showAllGroups() {
      this.allGroups = true
      this.myGroups = false
      this.adminGroups = false
    },
    showMyGroups() {
      this.allGroups = false
      this.myGroups = true
      this.adminGroups = false
    },
    showAdminGroups() {
      this.allGroups = false
      this.myGroups = false
      this.adminGroups = true
    },
  },
}
</script>

<style>
/* @apply is tailwind specific, not to be confused with the deprecated css @apply*/
.groupactive {
  @apply text-white;
  @apply bg-sogblue;
}
.groupactive:hover {
  @apply bg-sogblue-darker;
}
.groupinactive {
  @apply text-sogblue;
}
.groupinactive:hover {
  @apply text-white;
  @apply bg-sogblue-light;
}
</style>
