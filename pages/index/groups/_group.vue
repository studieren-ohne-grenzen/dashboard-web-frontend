<template>
  <div>
    <div class="w-full flex flex-wrap justify-between mb-4">
      <h1 class="xs:min-w-0 min-w-full leading-tight">
        {{ thisGroup.name === '' ? 'Lade Gruppe ...' : thisGroup.name }}
      </h1>
      <input
        v-if="thisGroup.membership === 'admin'"
        v-model="searchQuery"
        type="text"
        placeholder="Mitglieder suchen"
        class="mt-4 sm:mt-0 flex-grow xs:flex-grow-0 sog_texteditor"
      />
      <button
        v-if="thisGroup.membership === 'member' && thisGroup.id !== 'allgemein'"
        class="button_red action_button main_action_button"
        @click="cancelMembership(thisGroup.id)"
      >
        Gruppe verlassen
      </button>
      <button
        v-else-if="thisGroup.membership === 'pending'"
        class="button_yellow action_button main_action_button"
        @click="cancelMembershipRequest(thisGroup.id)"
      >
        Mitgliedschafts-Anfrage abbrechen
      </button>
      <button
        v-else-if="thisGroup.membership === ''"
        class="button_green action_button main_action_button"
        @click="requestGroupMembership(thisGroup.id)"
      >
        Mitgliedschaft anfragen
      </button>
    </div>
    <div v-if="thisGroup.membership === 'admin'">
      <hr />
      <h2 class="section">Anfragen</h2>
      <div class="sog_status mb-4">
        Die folgenden Mitglieder möchten der Gruppe beitreten.
      </div>
      <div
        v-if="!activePendingFiltered.length && !inactivePendingFiltered.length"
        class="sog_status"
      >
        {{ noRequestsInfo }}
      </div>
      <div v-else class="flex flex-wrap">
        <People-Listing
          :people="activePendingFiltered"
          :this-group="thisGroup"
          type="activePending"
        />
        <People-Listing
          :people="inactivePendingFiltered"
          :this-group="thisGroup"
          type="inactivePending"
        />
      </div>
    </div>
    <hr />
    <h2>Koordinator:innen</h2>
    <div class="sog_status mb-4">
      {{ adminInfo }}
    </div>
    <div v-if="!adminsFiltered.length" class="sog_status">
      {{ noAdminsInfo }}
    </div>
    <People-Listing
      v-else
      :people="adminsFiltered"
      :this-group="thisGroup"
      type="admin"
    />
    <div v-if="thisGroup.membership === 'admin' && !addUsersActive">
      <hr />
      <div class="w-full flex flex-wrap justify-between items-center">
        <h2>Mitglieder</h2>
        <button
          class="w-full xs:w-auto sog_button_active"
          @click="openAddUsers"
        >
          Mitglied hinzufügen
        </button>
      </div>
      <div class="sog_status mb-4">
        Mitglieder haben Zugriff auf den Mattermost-Channel und den
        Nextcloud-Ordner und stehen auf der Mailing-Liste der Gruppe.
      </div>
      <div v-if="!membersFiltered.length" class="sog_status">
        {{ noMembersInfo }}
      </div>
      <People-Listing
        v-else
        :people="membersFiltered"
        :this-group="thisGroup"
        type="member"
      />
    </div>
    <div v-else-if="thisGroup.membership === 'admin'">
      <hr />
      <div class="w-full flex flex-wrap justify-between mb-4 items-center">
        <h2 class="mb-2">Mitglieder hinzufügen</h2>
        <button
          class="w-full xs:w-auto sog_button_active"
          @click="closeAddUsers"
        >
          Fertig
        </button>
      </div>
      <div v-if="!nonMembers.length" class="sog_status">
        Es konnten keine weiteren Mitglieder gefunden werden.
      </div>
      <People-Listing
        v-else
        :people="nonMembers"
        :this-group="thisGroup"
        type="nonMember"
      />
    </div>
    <div v-if="thisGroup.membership === 'admin' && !addGuestsActive">
      <hr />
      <div class="w-full flex flex-wrap justify-between items-center">
        <h2 class="mb-1">Gäste</h2>
        <button
          class="w-full xs:w-auto sog_button_active"
          @click="openAddGuests"
        >
          Gast hinzufügen
        </button>
      </div>
      <div class="sog_status mb-4">
        Gäste sind Nicht-Vereinsmitglieder und haben keinen Zugriff auf die
        SOG-Tools. Sie sind aber auf der Mailing-Liste dieser Gruppe
        eingetragen.
      </div>
      <div v-if="!guestsFiltered.length" class="sog_status">
        {{ noGuestsInfo }}
      </div>
      <People-Listing
        v-else
        :people="guestsFiltered"
        :this-group="thisGroup"
        type="guest"
      />
    </div>
    <div v-else-if="thisGroup.membership === 'admin'">
      <hr />
      <div class="w-full flex flex-wrap justify-between mb-4 items-center">
        <h2 class="mb-2">Gäste hinzufügen</h2>
        <button
          class="w-full xs:w-auto sog_button_active"
          @click="closeAddGuests"
        >
          Fertig
        </button>
      </div>
      <form class="sm:flex flex-wrap w-full items-end">
        <div class="sm:flex flex-grow sm:mx-2">
          <div class="flex-grow flex-1 sm:min-w-56">
            <label class="block text-sogblue-dark dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              v-model="guestName"
              type="text"
              placeholder="Vorname Nachname"
              :class="
                nameError !== '' ? 'border-red-500 border-2' : 'border-none'
              "
              class="sog_texteditor w-full"
            />
          </div>
          <div class="sm:ml-4 flex-grow flex-1 sm:min-w-56">
            <label class="block text-sogblue-dark dark:text-gray-300 mb-1">
              Email-Adresse
            </label>
            <input
              v-model="guestEmail"
              type="text"
              :class="
                emailError !== '' ? 'border-red-500 border-2' : 'border-none'
              "
              class="w-full sog_texteditor"
            />
          </div>
        </div>
        <div class="flex-grow sm:mx-2 block lg:hidden w-full text-red-600 mb-4">
          {{ nameError }} {{ emailError }}
        </div>
        <div class="flex-grow-0 flex-shrink-0 sm:mx-2">
          <button
            type="button"
            :disabled="!addGuestSubmittable"
            :class="
              addGuestSubmittable ? 'sog_button_active' : 'sog_button_inactive'
            "
            class="mb-4"
            @click="addGuest"
          >
            Hinzufügen
          </button>
        </div>
        <div class="flex-grow sm:mx-2 w-full hidden lg:block text-red-600 mb-1">
          {{ nameError }} {{ emailError }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import validate from '~/components/validateEmails'
import compareByName from '~/components/compare'
import PeopleListing from '~/components/peopleListing'

export default {
  components: {
    PeopleListing,
  },
  // TODO: test for actual group names
  validate({ params }) {
    return true
  },
  data() {
    return {
      addUsersActive: false,
      addGuestsActive: false,
      searchQuery: '',
      guestName: '',
      guestEmail: '',
      emailError: '',
      nameError: '',
      addGuestSubmittable: false,
    }
  },
  head() {
    return {
      title: this.thisGroup.name,
    }
  },
  computed: {
    thisGroup() {
      if (this.$store.getters['groups/currentGroup']) {
        return this.$store.getters['groups/currentGroup']
      } else
        return {
          name: '',
          id: '',
          membership: '',
          groupType: null,
          admins: [],
          members: [],
          guests: [],
          activePendingMembers: [],
          inactivePendingMembers: [],
        }
    },
    membersFiltered() {
      return [
        ...this.thisGroup.members.filter((m) =>
          m.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ),
      ].sort(compareByName)
    },
    adminsFiltered() {
      return [
        ...this.thisGroup.admins.filter((a) =>
          a.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ),
      ].sort(compareByName)
    },
    guestsFiltered() {
      return [
        ...this.thisGroup.guests.filter((g) =>
          g.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ),
      ].sort(compareByName)
    },
    activePendingFiltered() {
      return [
        ...this.thisGroup.activePendingMembers.filter((p) =>
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ),
      ].sort(compareByName)
    },
    inactivePendingFiltered() {
      return [
        ...this.thisGroup.inactivePendingMembers.filter((p) =>
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        ),
      ].sort(compareByName)
    },
    ...mapGetters({
      allUsers: 'users/all',
      loading: 'groups/loading',
    }),
    nonMembers() {
      const members = this.thisGroup.members
      const admins = this.thisGroup.admins
      let users = this.$store.getters['users/all']
      for (const m in members) {
        users = users.filter((u) => members[m].uid !== u.uid)
      }
      for (const a in admins) {
        users = users.filter((u) => admins[a].uid !== u.uid)
      }
      return users.filter((u) =>
        u.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    adminInfo() {
      switch (this.thisGroup.membership) {
        case 'admin':
          return 'Koordinator:innen können Mitglieder hinzufügen, entfernen und andere Koordinator:innen ernennen.'
        case 'member':
          return (
            'Diese Koordinator:innen verwalten ' +
            this.thisGroup.name +
            '. Sie können dich zur Koordinator:in ernennen.'
          )
        case 'pending':
          return (
            'Diese Koordinator:innen verwalten ' +
            this.thisGroup.name +
            '. Sie müssen dich als Mitglied freischalten, bevor du Zugriff auf den Mattermost-Kanal und den Nextcloud-Ordner der Gruppe hast.'
          )
        default:
          return (
            'Diese Koordinator:innen verwalten ' +
            this.thisGroup.name +
            '. Sie müssen dich als Mitglied freischalten, nachdem du eine Mitgliedschafts-Anfrage gestellt erhältst.'
          )
      }
    },
    noAdminsInfo() {
      if (this.loading) return 'Lade Koordinator:innen ...'
      else if (this.searchQuery !== '')
        return 'Keine Koordinator:inne gefunden.'
      else return 'Diese Gruppe hat keine Koordinator:innen.'
    },
    noRequestsInfo() {
      if (this.loading) return 'Lade Anfragen ...'
      else if (this.searchQuery !== '')
        return 'Keine passenden Anfragen gefunden.'
      else return 'Keine ausstehenden Anfragen.'
    },
    noMembersInfo() {
      if (this.loading) return 'Lade Mitglieder ...'
      else if (this.searchQuery !== '')
        return 'Keine passenden Mitglieder gefunden.'
      else return 'Diese Gruppe hat keine regulären Mitglieder.'
    },
    noGuestsInfo() {
      if (this.loading) return 'Lade Gäste ...'
      else if (this.searchQuery !== '') return 'Keine passenden Gäste gefunden.'
      else return 'Diese Gruppe hat keine Gäste.'
    },
  },
  watch: {
    guestName() {
      this.validateGuest()
    },
    guestEmail() {
      this.validateGuest()
    },
  },
  mounted() {
    this.$store.commit(
      'groups/setCurrentGroupID',
      decodeURIComponent(this.$route.params.group)
    )
    if (this.thisGroup.membership === 'admin')
      this.$store.dispatch('groups/loadGroupAsAdmin')
    else if (this.thisGroup.id === '') {
      this.$store.dispatch('groups/loadGroupAsUnknown')
    } else {
      this.$store.dispatch('groups/loadGroupDetails')
    }
  },
  methods: {
    addGuest() {
      this.$store.dispatch('groups/alertAddGuest', {
        name: this.guestName,
        email: this.guestEmail,
        groupID: this.thisGroup.id,
      })
      this.guestName = ''
      this.guestEmail = ''
      this.addGuestsActive = false
    },
    requestGroupMembership(groupID) {
      this.$store.dispatch('groups/alertRequestMembership', { groupID })
    },
    cancelMembershipRequest(groupID) {
      this.$store.dispatch('groups/alertCancelMembershipRequest', { groupID })
    },
    cancelMembership(groupID) {
      this.$store.dispatch('groups/alertCancelMembership', { groupID })
    },
    openAddUsers() {
      this.addUsersActive = true
      this.searchQuery = ''
    },
    closeAddUsers() {
      this.addUsersActive = false
      this.searchQuery = ''
    },
    openAddGuests() {
      this.addGuestsActive = true
      this.searchQuery = ''
    },
    closeAddGuests() {
      this.addGuestsActive = false
      this.searchQuery = ''
      this.nameError = ''
      this.emailError = ''
      this.guestName = ''
      this.guestEmail = ''
    },
    validateGuest() {
      this.addGuestSubmittable = false
      if (this.guestEmail === '') {
        this.emailError = ''
      } else if (this.guestName === '') {
        this.nameError = 'Gast hat keinen Namen.'
      } else if (!validate(this.guestEmail)) {
        this.emailError = 'Keine gültige Mailadresse eingegeben.'
      } else {
        this.addGuestSubmittable = true
        this.emailError = ''
        this.nameError = ''
      }
    },
  },
}
</script>

<style lang="postcss">
.main_action_button {
  @apply text-white rounded my-4 p-2 xs:mt-0 xs:ml-2 flex-grow xs:flex-grow-0;
}

.section {
  @apply text-sogblue-light dark:text-white text-3xl;
}
</style>
