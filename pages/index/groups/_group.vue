<template>
  <div>
    <div class="w-full flex flex-wrap justify-between mb-4">
      <h1 class="text-sogblue xs:min-w-0 min-w-full text-4xl leading-tight">
        {{ thisGroup.name }}
      </h1>
      <input
        v-if="thisGroup.membership === 'admin'"
        v-model="searchQuery"
        type="text"
        placeholder="Mitglieder suchen"
        class="bg-gray-light rounded mb-4 mt-4 sm:mt-0 flex-grow xs:flex-grow-0 appearance-none text-sogblue-darker focus:shadow-outline focus:bg-white p-2"
      />
    </div>
    <hr class="border-gray-light my-4" />
    <h2 class="text-sogblue-light text-3xl mb-4">Administrator:innen</h2>
    <div v-if="!adminsFiltered.length && searchQuery === ''" class="text-gray">
      Diese Gruppe hat keine Administrator:innen.
    </div>
    <div v-else-if="!adminsFiltered.length" class="text-gray">
      Keine Administrator:innen gefunden.
    </div>
    <div v-else class="flex flex-wrap">
      <div
        v-for="admin in adminsFiltered"
        :key="admin.uid"
        class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0"
      >
        <div
          :class="thisGroup.membership === 'admin' ? 'border-r-0' : 'rounded-r'"
          class="py-2 px-4 flex-grow border rounded-l border-gray"
        >
          {{ admin.name }}
        </div>
        <svg
          v-if="thisGroup.membership === 'admin'"
          class="text-white flex-none fill-current bg-gray-reddish rounded-r w-10 p-2 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          @click="removeAdmin(admin.uid)"
        >
          <path
            d="M11.383 15.941l-3.758 8.059-.967-2.658-2.658.968 3.517-7.541c.678.216 1.137.162 1.849.162.744.513 1.072.844 2.017 1.01zm3.252-1.009c-.738.506-1.049.831-1.994 1.004l3.759 8.064.967-2.658 2.633.968-3.495-7.549c-.686.222-1.146.171-1.87.171zm-2.635-11.932c-2.205 0-4 1.795-4 4s1.795 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zm6.926 5.278c.051.146.074.296.074.445 0 .449-.222.883-.615 1.156-1.256.87-1.09.651-1.562 2.067-.198.591-.77.99-1.414.99h-.004c-1.549-.005-1.279-.088-2.528.789-.262.183-.569.275-.877.275s-.615-.092-.876-.275c-1.249-.878-.98-.794-2.528-.789h-.004c-.645 0-1.216-.399-1.413-.99-.473-1.417-.311-1.198-1.562-2.067-.395-.274-.617-.708-.617-1.157 0-.148.024-.298.074-.444.483-1.411.484-1.139 0-2.555-.05-.147-.074-.297-.074-.445 0-.45.222-.883.616-1.157 1.251-.868 1.089-.648 1.562-2.067.197-.591.769-.99 1.413-.99h.004c1.545.005 1.271.095 2.528-.79.262-.182.569-.274.877-.274s.615.091.876.274c1.249.878.98.795 2.528.79h.004c.645 0 1.216.399 1.414.99.473 1.416.307 1.197 1.562 2.067.394.274.616.707.616 1.156 0 .148-.023.299-.074.445-.483 1.411-.485 1.139 0 2.556zm-1.926-1.278c0-2.761-2.238-5-5-5-2.761 0-5 2.239-5 5s2.239 5 5 5c2.762 0 5-2.238 5-5z"
          />
        </svg>
      </div>
    </div>
    <div v-if="thisGroup.membership === 'admin' && !addUsersActive">
      <hr class="border-gray-light my-4" />
      <div class="w-full flex flex-wrap justify-between mb-4 items-center">
        <h2 class="text-sogblue-light text-3xl mb-2">Mitglieder</h2>
        <button
          class="rounded w-full xs:w-auto py-2 px-4 text-white bg-sogblue hover:bg-sogblue-darker"
          @click="openAddUsers"
        >
          Mitglieder hinzufügen
        </button>
      </div>
      <div
        v-if="!membersFiltered.length && searchQuery === ''"
        class="text-gray"
      >
        Diese Gruppe hat keine regulären Mitglieder.
      </div>
      <div v-else-if="!membersFiltered.length" class="text-gray">
        Keine Mitglieder gefunden.
      </div>
      <div v-else class="flex flex-wrap">
        <div
          v-for="member in membersFiltered"
          :key="member.uid"
          class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0"
        >
          <div
            class="py-2 px-4 flex-grow border border-r-0 rounded-l border-gray"
          >
            {{ member.name }}
          </div>
          <svg
            class="text-white flex-none fill-current bg-gray-greenish w-10 p-2 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            @click="makeAdmin(member.uid)"
          >
            <path
              d="M11.383 15.941l-3.758 8.059-.967-2.658-2.658.968 3.517-7.541c.678.216 1.137.162 1.849.162.744.513 1.072.844 2.017 1.01zm3.252-1.009c-.738.506-1.049.831-1.994 1.004l3.759 8.064.967-2.658 2.633.968-3.495-7.549c-.686.222-1.146.171-1.87.171zm-2.635-11.932c-2.205 0-4 1.795-4 4s1.795 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zm6.926 5.278c.051.146.074.296.074.445 0 .449-.222.883-.615 1.156-1.256.87-1.09.651-1.562 2.067-.198.591-.77.99-1.414.99h-.004c-1.549-.005-1.279-.088-2.528.789-.262.183-.569.275-.877.275s-.615-.092-.876-.275c-1.249-.878-.98-.794-2.528-.789h-.004c-.645 0-1.216-.399-1.413-.99-.473-1.417-.311-1.198-1.562-2.067-.395-.274-.617-.708-.617-1.157 0-.148.024-.298.074-.444.483-1.411.484-1.139 0-2.555-.05-.147-.074-.297-.074-.445 0-.45.222-.883.616-1.157 1.251-.868 1.089-.648 1.562-2.067.197-.591.769-.99 1.413-.99h.004c1.545.005 1.271.095 2.528-.79.262-.182.569-.274.877-.274s.615.091.876.274c1.249.878.98.795 2.528.79h.004c.645 0 1.216.399 1.414.99.473 1.416.307 1.197 1.562 2.067.394.274.616.707.616 1.156 0 .148-.023.299-.074.445-.483 1.411-.485 1.139 0 2.556zm-1.926-1.278c0-2.761-2.238-5-5-5-2.761 0-5 2.239-5 5s2.239 5 5 5c2.762 0 5-2.238 5-5z"
            />
          </svg>
          <svg
            class="text-white flex-none fill-current bg-gray-reddish rounded-r w-10 p-3 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            @click="removeMember(member.uid)"
          >
            <path d="M0 10h24v4h-24z" />
          </svg>
        </div>
      </div>
    </div>
    <div v-else-if="thisGroup.membership === 'admin'">
      <hr class="border-gray-light my-4" />
      <div class="w-full flex flex-wrap justify-between mb-4 items-center">
        <h2 class="text-sogblue-light text-3xl mb-2">Mitglieder hinzufügen</h2>
        <button
          class="rounded w-full xs:w-auto py-2 px-4 text-white bg-sogblue hover:bg-sogblue-darker"
          @click="closeAddUsers"
        >
          Fertig
        </button>
      </div>
      <div v-if="!nonMembers.length" class="text-gray">
        Es konnten keine weiteren Mitglieder gefunden werden.
      </div>
      <div v-else class="flex flex-wrap">
        <div
          v-for="user in nonMembers"
          :key="user.uid"
          class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0"
        >
          <div
            class="py-2 px-4 flex-grow border border-r-0 rounded-l border-gray"
          >
            {{ user.name }}
          </div>
          <svg
            class="text-white flex-none fill-current bg-gray-greenish w-10 p-3 rounded-r cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            @click="addUser(user.uid)"
          >
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="thisGroup.membership === 'admin' && !addGuestsActive">
      <hr class="border-gray-light my-4" />
      <div class="w-full flex flex-wrap justify-between mb-4 items-center">
        <h2 class="text-sogblue-light text-3xl mb-2">Gäste</h2>
        <button
          class="rounded w-full xs:w-auto py-2 px-4 text-white bg-sogblue hover:bg-sogblue-darker"
          @click="openAddGuests"
        >
          Gäste hinzufügen
        </button>
      </div>
      <div
        v-if="!guestsFiltered.length && searchQuery === ''"
        class="text-gray"
      >
        Diese Gruppe hat keine Gäste.
      </div>
      <div v-else-if="!guestsFiltered.length" class="text-gray">
        Keine Gäste gefunden.
      </div>
      <div v-else class="flex flex-wrap">
        <div
          v-for="guest in guestsFiltered"
          :key="guest.uid"
          class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0"
        >
          <div
            class="py-2 px-4 flex-grow border border-r-0 rounded-l border-gray"
          >
            {{ guest.name }}
          </div>
          <svg
            class="text-white flex-none fill-current bg-gray-reddish rounded-r w-10 p-3 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            @click="removeGuest(guest.uid)"
          >
            <path d="M0 10h24v4h-24z" />
          </svg>
        </div>
      </div>
    </div>
    <div v-else-if="thisGroup.membership === 'admin'">
      <hr class="border-gray-light my-4" />
      <div class="w-full flex flex-wrap justify-between mb-4 items-center">
        <h2 class="text-sogblue-light text-3xl mb-2">Gäste hinzufügen</h2>
        <button
          class="rounded w-full xs:w-auto py-2 px-4 text-white bg-sogblue hover:bg-sogblue-darker"
          @click="closeAddGuests"
        >
          Fertig
        </button>
      </div>
      <form class="sm:flex flex-wrap w-full items-end">
        <div class="sm:flex flex-grow sm:mx-2">
          <div class="flex-grow flex-1 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Name
            </label>
            <input
              v-model="guestName"
              type="text"
              placeholder="Vorname Nachname"
              :class="
                nameError !== '' ? 'border-red-500 border-2' : 'border-none'
              "
              class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
          <div class="sm:ml-4 flex-grow flex-1 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Email-Adresse
            </label>
            <input
              v-model="guestEmail"
              type="text"
              :class="
                emailError !== '' ? 'border-red-500 border-2' : 'border-none'
              "
              class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
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
              addGuestSubmittable
                ? 'cursor-pointer bg-sogblue hover:bg-sogblue-darker'
                : 'cursor-default bg-sogblue-lightest hover:bg-sogblue-lightest'
            "
            class="rounded py-2 px-4 mb-4 text-white"
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

export default {
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
  computed: {
    thisGroup() {
      return this.$store.getters['groups/allGroups'].find(
        (group) =>
          !decodeURIComponent(this.$route.params.group).localeCompare(
            group.name
          )
      )
    },
    membersFiltered() {
      return this.thisGroup.members.filter((m) =>
        m.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    adminsFiltered() {
      return this.thisGroup.admins.filter((a) =>
        a.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    guestsFiltered() {
      return this.thisGroup.guests.filter((g) =>
        g.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    ...mapGetters({
      allUsers: 'users/all',
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
  },
  watch: {
    guestName() {
      this.validateGuest()
    },
    guestEmail() {
      this.validateGuest()
    },
  },
  methods: {
    removeAdmin(uid) {},
    makeAdmin(uid) {},
    removeMember(uid) {},
    removeGuest(uid) {},
    addGuest(uid) {},
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
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.guestEmail === '') {
        this.emailError = ''
      } else if (this.guestName === '') {
        this.nameError = 'Gast hat keinen Namen.'
      } else if (!re.test(String(this.guestEmail).toLowerCase())) {
        this.emailError = 'Keine gültige Mailadresse eingegeben.'
      } else {
        this.addGuestSubmittable = true
        this.emailError = ''
        this.nameError = ''
      }
    },
  },
  head() {
    return {
      title: this.thisGroup.name,
    }
  },
}
</script>

<style></style>
