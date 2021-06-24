<template>
  <div>
    <transition name="fade">
      <h2
        v-if="
          $store.getters['groups/requests'].length ||
          $store.getters['groups/adminOfManyGroups']
        "
      >
        Anfragen an mich
      </h2>
    </transition>
    <transition name="fade">
      <div
        v-if="$store.getters['groups/adminOfManyGroups']"
        class="sog_status mb-8"
      >
        Du koordinierst sehr viele Gruppen, weshalb Anfragen an dich nicht für
        alle Gruppen auf einmal geladen werden können. Öffne eine spezifische
        Gruppe, um die Anfragen an dich in dieser Gruppe zu sehen.
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="$store.getters['groups/requests'].length"
        class="sog_status mb-4"
      >
        In den folgenden von dir koordinierten Gruppen möchten Mitglieder
        beitreten:
        <GroupListing
          class="mt-4"
          :groups="$store.getters['groups/requests']"
          name=""
        />
      </div>
    </transition>
    <transition name="fade">
      <hr v-if="$store.getters['groups/requests'].length" />
    </transition>
    <div class="w-full flex flex-wrap justify-between mb-4">
      <div class="mb-4 xs:mr-4 flex-grow xs:flex-grow-0 w-auto inline-flex">
        <button
          v-for="(type, index) in typesAvailable"
          :key="type.name"
          class="group_selector border-t border-b border-r"
          :class="{
            groupactive: typeSelected === type.name,
            groupinactive: typeSelected !== type.name,
            'rounded-r': index === typesAvailable.length - 1,
            'rounded-l border-l': index === 0,
          }"
          @click="changeTypeSelected(type.name)"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="type.description"></span>
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

    <transition name="fade" mode="out-in">
      <div v-if="typeSelected === 'all'" key="all">
        <div
          v-if="!groupsSelected || !groupsSelected.length"
          class="sog_status"
        >
          {{ statusMessage }}
        </div>
        <div
          v-for="(category, index) in nonEmptyCategories"
          :key="category.name"
        >
          <GroupListing :groups="category.getter" :name="category.name" />
          <hr v-if="index !== nonEmptyCategories.length - 1" />
        </div>
      </div>
      <div v-else-if="groupsSelected" :key="typeSelected">
        <div
          v-if="!groupsSelected || !groupsSelected.length"
          class="sog_status"
        >
          {{ statusMessage }}
        </div>
        <GroupListing :groups="groupsSelected" name="" />
      </div>
    </transition>
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
      typesAvailable: [
        { name: 'all', description: 'Alle Gruppen' },
        { name: 'personal', description: 'Meine Gruppen' },
        { name: 'requests', description: 'Meine Anfragen' },
        { name: 'admin', description: 'Koor&shy;dination' },
      ],
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
    statusMessage() {
      if (this.typeSelected === 'admin') {
        return 'Du hast in keiner Gruppe Koordinator:innen-Rechte.'
      } else if (this.typeSelected === 'personal') {
        return 'Du bist noch nicht Mitglied in einer Gruppe.'
      } else if (this.typeSelected === 'requests') {
        return 'Es gibt keine offenen Gruppenmitgliedschafts-Anfragen, die du gestellt hast.'
      } else if (this.typeSelected === 'search') {
        return 'Keine passenden Gruppen gefunden.'
      } else if (this.loading) {
        return 'Lade Gruppen ...'
      }
      return 'Keine Gruppen verfügbar.'
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

<style lang="postcss">
.group_selector {
  @apply px-1 xs:px-4 py-2 flex-grow;
  @apply border-sogblue dark:border-gray-800;
  @apply leading-tight text-sm xs:text-base;
  @apply transition-colors outline-none focus:outline-none;
}
.groupactive {
  @apply text-white;
  @apply bg-sogblue-default dark:bg-gray-700;
}
.groupinactive {
  @apply bg-sogblue-default bg-opacity-0 text-sogblue-default;
  @apply dark:text-gray-300 dark:bg-gray-900;
}
.groupinactive:hover {
  @apply bg-opacity-10;
  @apply dark:bg-gray-800 dark:text-white;
}
</style>
