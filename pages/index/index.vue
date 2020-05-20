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
    <div class="w-full flex flex-wrap justify-between">
      <div
        class="mb-4 xs:mr-4 flex-grow xs:flex-grow-0 w-auto inline-flex border border-sogblue rounded"
      >
        <button
          class="px-4 py-2 flex-grow border-r border-sogblue leading-tight"
          :class="typeSelected === 'all' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('all')"
        >
          Alle Gruppen
        </button>
        <button
          class="px-4 py-2 flex-grow border-r border-sogblue leading-tight"
          :class="typeSelected === 'personal' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('personal')"
        >
          Meine Gruppen
        </button>
        <button
          class="px-4 py-2 flex-grow"
          :class="typeSelected === 'admin' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('admin')"
        >
          <span class="s:hidden">Admin</span>
          <span class="hidden s:inline">Administrieren</span>
        </button>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Gruppe suchen"
        class="bg-lightgray rounded mb-4 flex-grow xs:flex-grow-0 appearance-none text-sogblue-darker focus:shadow-outline focus:bg-white p-2"
        @focus="changeTypeSelected('search')"
      />
    </div>
    <div
      v-if="
        groupsSelected && !groupsSelected.length && typeSelected === 'admin'
      "
      class="text-gray"
    >
      Du hast in keiner Gruppe Administrator-Rechte.
    </div>
    <div
      v-else-if="
        groupsSelected && !groupsSelected.length && typeSelected === 'personal'
      "
      class="text-gray"
    >
      Du bist noch nicht Mitglied in einer Gruppe.
    </div>
    <div v-else-if="groupsSelected && !groupsSelected.length" class="text-gray">
      Keine Gruppen verfügbar.
    </div>

    <div v-if="typeSelected === 'all'">
      <GroupListing
        v-for="category in this.$store.getters['groups/allGroupsByCategory']"
        :key="category.name"
        :groups="category.getter"
        :name="category.name"
      />
    </div>
    <GroupListing v-else-if="groupsSelected" :groups="groupsSelected" name="" />
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
      typeSelected: 'personal',
      searchQuery: '',
    }
  },
  computed: {
    groupsSelected() {
      if (this.typeSelected === 'personal')
        return this.$store.getters['groups/myGroups']
      if (this.typeSelected === 'admin')
        return this.$store.getters['groups/adminGroups']
      if (this.typeSelected === 'all')
        return this.$store.getters['groups/allGroups']
      if (this.typeSelected === 'search')
        return this.$store.getters['groups/allGroups'].filter((group) =>
          group.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      return null
    },
  },
  methods: {
    changeTypeSelected(type) {
      if (type !== 'search') this.searchQuery = ''
      this.typeSelected = type
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
