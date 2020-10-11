<template>
  <div>
    <h1
      v-if="this.$store.getters['groups/requests'].length"
      class="mb-4 text-sogblue-light text-3xl"
    >
      Anfragen an mich
    </h1>
    <div class="flex flex-wrap">
      <div
        v-for="request in this.$store.getters['groups/requests']"
        :key="request.id"
        class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0 relative"
      >
        <nuxt-link
          :to="'/groups/' + request.id"
          class="py-2 px-4 flex-grow border-l border-t border-b rounded-l border-gray"
        >
          {{ request.name }}
        </nuxt-link>
        <nuxt-link
          :to="'/groups/' + request.id"
          class="flex-none bg-sogblue-light rounded-r w-10 p-3 cursor-pointer"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M4.5.257l3.771 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.771-3.77c-.172.584-.258 1.188-.258 1.792 0 1.602.607 3.202 1.83 4.426 1.351 1.351 3.164 1.958 4.931 1.821.933-.072 1.852.269 2.514.931l9.662 9.662c.578.578 1.337.868 2.097.868 1.661 0 3.001-1.364 2.966-3.03-.016-.737-.306-1.47-.868-2.033l-9.662-9.663c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.83-4.428-1.83-.603 0-1.207.086-1.791.257zm17.5 20.743c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z"
            />
          </svg>
        </nuxt-link>
        <div
          class="bg-red-600 rounded-full w-6 h-6 text-center text-white absolute leading-6"
          style="top: -6px; right: -6px"
        >
          {{ request.count }}
        </div>
      </div>
    </div>
    <hr
      v-if="this.$store.getters['groups/requests'].length"
      class="border-gray-light my-4"
    />
    <div class="w-full flex flex-wrap justify-between mb-4">
      <div
        class="mb-4 xs:mr-4 flex-grow xs:flex-grow-0 w-auto inline-flex border border-sogblue rounded"
      >
        <button
          class="px-1 xs:px-4 py-2 flex-grow border-r border-sogblue leading-tight text-sm xs:text-base"
          :class="typeSelected === 'all' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('all')"
        >
          Alle Gruppen
        </button>
        <button
          class="px-1 xs:px-4 py-2 flex-grow border-r border-sogblue leading-tight text-sm xs:text-base"
          :class="typeSelected === 'personal' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('personal')"
        >
          Meine Gruppen
        </button>
        <button
          class="px-1 xs:px-4 py-2 flex-grow border-r border-sogblue leading-tight text-sm xs:text-base"
          :class="typeSelected === 'requests' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('requests')"
        >
          Meine Anfragen
        </button>
        <button
          class="px-1 xs:px-4 py-2 flex-grow text-sm xs:text-base"
          :class="typeSelected === 'admin' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('admin')"
        >
          <span>Koor&shy;dination</span>
        </button>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Gruppe suchen"
        class="bg-gray-light rounded mb-4 flex-grow xs:flex-grow-0 appearance-none text-sogblue-darker focus:shadow-outline focus:bg-white p-2"
        @focus="changeTypeSelected('search')"
      />
    </div>
    <div
      v-if="
        groupsSelected && !groupsSelected.length && typeSelected === 'admin'
      "
      class="text-gray"
    >
      Du hast in keiner Gruppe Koordinator:innen-Rechte.
    </div>
    <div
      v-else-if="
        groupsSelected && !groupsSelected.length && typeSelected === 'personal'
      "
      class="text-gray"
    >
      Du bist noch nicht Mitglied in einer Gruppe.
    </div>
    <div
      v-else-if="
        groupsSelected && !groupsSelected.length && typeSelected === 'requests'
      "
      class="text-gray"
    >
      Es gibt keine offenen Gruppenmitgliedschafts-Anfragen, die du gestellt
      hast.
    </div>
    <div
      v-else-if="
        typeSelected === 'search' && (!groupsSelected || !groupsSelected.length)
      "
      class="text-gray"
    >
      Keine passenden Gruppen gefunden.
    </div>
    <div
      v-else-if="groupsSelected && !groupsSelected.length && loading"
      class="text-gray"
    >
      Lade Gruppen ...
    </div>
    <div v-else-if="groupsSelected && !groupsSelected.length" class="text-gray">
      Keine Gruppen verfügbar.
    </div>

    <div v-if="typeSelected === 'all'">
      <div v-for="(category, index) in nonEmptyCategories" :key="category.name">
        <GroupListing :groups="category.getter" :name="category.name" />
        <hr
          v-if="index !== nonEmptyCategories.length - 1"
          class="border-gray-light my-4"
        />
      </div>
    </div>
    <GroupListing v-else-if="groupsSelected" :groups="groupsSelected" name="" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GroupListing from '~/components/grouplisting'

export default {
  components: {
    GroupListing,
  },
  fetch() {
    this.$store.dispatch('groups/loadGroups')
  },
  fetchOnServer: false,
  data: () => {
    return {
      typeSelected: 'all',
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
      if (this.typeSelected === 'requests')
        return this.$store.getters['groups/myRequestedGroups']
      if (this.typeSelected === 'search')
        return this.$store.getters['groups/allGroups'].filter((group) =>
          group.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      return null
    },
    nonEmptyCategories() {
      return this.$store.getters['groups/allGroupsByCategory'].filter(
        (c) => c.getter.length
      )
    },
    ...mapGetters({
      loading: 'groups/loading',
    }),
  },
  methods: {
    changeTypeSelected(type) {
      if (type !== 'search') this.searchQuery = ''
      this.typeSelected = type
    },
  },
  head: () => {
    return {
      title: 'Gruppen',
    }
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
