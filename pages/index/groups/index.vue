<template>
  <div>
    <h1
      v-if="
        $store.getters['groups/requests'].length ||
        $store.getters['groups/adminOfManyGroups']
      "
      class="text-sogblue-light dark:text-gray-400 text-3xl"
    >
      Anfragen an mich
    </h1>
    <div
      v-if="$store.getters['groups/adminOfManyGroups']"
      class="text-gray dark:text-gray-300 mb-8"
    >
      Du koordinierst sehr viele Gruppen, weshalb Anfragen an dich nicht für
      alle Gruppen auf einmal geladen werden können. Öffne eine spezifische
      Gruppe, um die Anfragen an dich in dieser Gruppe zu sehen.
    </div>
    <div
      v-else-if="$store.getters['groups/requests'].length"
      class="text-gray dark:text-gray-300 mb-4"
    >
      In den folgenden von dir koordinierten Gruppen möchten Mitglieder
      beitreten:
    </div>
    <div v-if="$store.getters['groups/requests'].length" class="flex flex-wrap">
      <div
        v-for="request in $store.getters['groups/requests']"
        :key="request.id"
        class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0 relative"
      >
        <nuxt-link
          :to="'/groups/' + request.id"
          class="py-2 px-4 flex-grow border-l border-t border-b rounded-l border-gray dark:border-0 dark:bg-gray-800 dark:text-gray-300"
        >
          {{ request.name }}
        </nuxt-link>
        <nuxt-link
          :to="'/groups/' + request.id"
          class="flex-none bg-sogblue-light dark:bg-sogblue-darker rounded-r w-10 p-2 cursor-pointer"
        >
          <svg
            class="text-white dark:text-gray-300 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"
            />
          </svg>
        </nuxt-link>
        <div
          class="bg-red-600 dark:bg-red-900 rounded-full w-6 h-6 text-center text-white dark:text-gray-300 absolute leading-6"
          style="top: -6px; right: -6px"
        >
          {{ request.count }}
        </div>
      </div>
    </div>
    <hr
      v-if="$store.getters['groups/requests'].length"
      class="border-gray-light dark:border-gray-700 my-4"
    />
    <div class="w-full flex flex-wrap justify-between mb-4">
      <div
        class="mb-4 xs:mr-4 flex-grow xs:flex-grow-0 w-auto inline-flex border border-sogblue dark:border-gray-800 rounded"
      >
        <button
          class="px-1 xs:px-4 py-2 flex-grow border-r border-sogblue dark:border-gray-900 leading-tight text-sm xs:text-base rounded-l"
          :class="typeSelected === 'all' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('all')"
        >
          Alle Gruppen
        </button>
        <button
          class="px-1 xs:px-4 py-2 flex-grow border-r border-sogblue dark:border-gray-900 leading-tight text-sm xs:text-base"
          :class="typeSelected === 'personal' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('personal')"
        >
          Meine Gruppen
        </button>
        <button
          class="px-1 xs:px-4 py-2 flex-grow border-r border-sogblue dark:border-gray-900 leading-tight text-sm xs:text-base"
          :class="typeSelected === 'requests' ? 'groupactive' : 'groupinactive'"
          @click="changeTypeSelected('requests')"
        >
          Meine Anfragen
        </button>
        <button
          class="px-1 xs:px-4 py-2 flex-grow text-sm xs:text-base rounded-r"
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
        class="flex-grow xs:flex-grow-0 sog_texteditor"
        @focus="changeTypeSelected('search')"
      />
    </div>
    <div
      v-if="
        groupsSelected && !groupsSelected.length && typeSelected === 'admin'
      "
      class="text-gray dark:text-gray-300"
    >
      Du hast in keiner Gruppe Koordinator:innen-Rechte.
    </div>
    <div
      v-else-if="
        groupsSelected && !groupsSelected.length && typeSelected === 'personal'
      "
      class="text-gray dark:text-gray-300"
    >
      Du bist noch nicht Mitglied in einer Gruppe.
    </div>
    <div
      v-else-if="
        groupsSelected && !groupsSelected.length && typeSelected === 'requests'
      "
      class="text-gray dark:text-gray-300"
    >
      Es gibt keine offenen Gruppenmitgliedschafts-Anfragen, die du gestellt
      hast.
    </div>
    <div
      v-else-if="
        typeSelected === 'search' && (!groupsSelected || !groupsSelected.length)
      "
      class="text-gray dark:text-gray-300"
    >
      Keine passenden Gruppen gefunden.
    </div>
    <div
      v-else-if="groupsSelected && !groupsSelected.length && loading"
      class="text-gray dark:text-gray-300"
    >
      Lade Gruppen ...
    </div>
    <div
      v-else-if="groupsSelected && !groupsSelected.length"
      class="text-gray dark:text-gray-300"
    >
      Keine Gruppen verfügbar.
    </div>

    <div v-if="typeSelected === 'all'">
      <div v-for="(category, index) in nonEmptyCategories" :key="category.name">
        <GroupListing :groups="category.getter" :name="category.name" />
        <hr
          v-if="index !== nonEmptyCategories.length - 1"
          class="border-gray-light dark:border-gray-700 my-4"
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
  data: () => {
    return {
      typeSelected: 'all',
      searchQuery: '',
    }
  },
  fetch() {
    this.$store.dispatch('groups/loadGroups')
  },
  fetchOnServer: false,
  head: () => {
    return {
      title: 'Gruppen',
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
}
</script>

<style lang="postcss">
.groupactive {
  @apply text-white;
  @apply bg-sogblue-default dark:bg-gray-700;
}
.groupactive:hover {
  @apply bg-sogblue-darker dark:bg-gray-600;
}
.groupinactive {
  @apply text-sogblue-default dark:text-gray-300 dark:bg-gray-800;
}
.groupinactive:hover {
  @apply text-white;
  @apply bg-sogblue-light dark:bg-gray-700;
}
</style>
