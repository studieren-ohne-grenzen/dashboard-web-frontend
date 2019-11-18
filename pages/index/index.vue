<template>
  <div>
    <h1 v-if="requests.length" class="text-sogblue-light text-3xl">
      Neue Anfragen
    </h1>
    <hr v-if="requests.length" class="border-lightgray my-4" />
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
        class="px-4 py-2 xs:hidden"
        :class="adminGroups ? 'groupactive' : 'groupinactive'"
        @click="showAdminGroups"
      >
        Admin
      </button>
      <button
        class="px-4 py-2 hidden xs:inline"
        :class="adminGroups ? 'groupactive' : 'groupinactive'"
        @click="showAdminGroups"
      >
        Administrieren
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
    <div v-if="!allGroups" class="flex flex-wrap">
      <div
        v-for="group in groupsSelected"
        :key="group.name"
        class="py-2 px-4 mr-4 mb-4 border rounded border-gray"
      >
        {{ group.name }}
      </div>
    </div>
    <div v-else>
      <div v-if="groupsBund && groupsBund.length" class="mb-4 text-sogblue">
        Bundesweite Gruppen
      </div>
      <div v-if="groupsBund && groupsBund.length" class="flex flex-wrap">
        <div
          v-for="group in groupsBund"
          :key="group.name"
          class="py-2 px-4 mr-4 mb-4 border rounded border-gray"
        >
          {{ group.name }}
        </div>
      </div>
      <div
        v-if="groupsProjekt && groupsProjekt.length"
        class="mb-4 text-sogblue"
      >
        Projektgruppen
      </div>
      <div v-if="groupsProjekt && groupsProjekt.length" class="flex flex-wrap">
        <div
          v-for="group in groupsProjekt"
          :key="group.name"
          class="py-2 px-4 mr-4 mb-4 border rounded border-gray"
        >
          {{ group.name }}
        </div>
      </div>
      <div v-if="groupsLokal && groupsLokal.length" class="mb-4 text-sogblue">
        Lokalgruppen
      </div>
      <div v-if="groupsLokal && groupsLokal.length" class="flex flex-wrap">
        <div
          v-for="group in groupsLokal"
          :key="group.name"
          class="py-2 px-4 mr-4 mb-4 border rounded border-gray"
        >
          {{ group.name }}
        </div>
      </div>
      <div v-if="groupsOther && groupsOther.length" class="mb-4 text-sogblue">
        Weitere Gruppen
      </div>
      <div v-if="groupsOther && groupsOther.length" class="flex flex-wrap">
        <div
          v-for="group in groupsOther"
          :key="group.name"
          class="py-2 px-4 mr-4 mb-4 border rounded border-gray"
        >
          {{ group.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      allGroups: true,
      myGroups: false,
      adminGroups: false
    }
  },
  computed: {
    groupsSelected() {
      if (this.myGroups) return this.$store.getters.myGroups
      if (this.adminGroups) return this.$store.getters.adminGroups
      if (this.allGroups) return this.$store.getters.allGroups
      return null
    },
    groupsLokal() {
      return this.$store.getters.allGroupsLokal
    },
    groupsProjekt() {
      return this.$store.getters.allGroupsProjekt
    },
    groupsBund() {
      return this.$store.getters.allGroupsBund
    },
    groupsOther() {
      return this.$store.getters.allGroupsOther
    },
    requests() {
      return []
    }
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
    }
  }
}
</script>

<style>
.groupactive {
  @apply text-white bg-sogblue;
}
.groupactive:hover {
  @apply bg-sogblue-darker;
}
.groupinactive {
  @apply text-sogblue;
}
.groupinactive:hover {
  @apply text-white bg-sogblue-light;
}
</style>
