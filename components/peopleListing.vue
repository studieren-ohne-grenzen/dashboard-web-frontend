<template>
  <div class="flex flex-wrap">
    <div
      v-for="person in people"
      :key="person.uid"
      class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0 group"
    >
      <div
        class="py-2 px-4 flex-grow border-l border-t border-b rounded-l border-gray dark:border-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 dark:text-gray-300 dark:group-hover:text-white transition-colors"
        :class="
          person.uid === 'dashboardadmin' || thisGroup.membership !== 'admin'
            ? 'border-r rounded-r'
            : ''
        "
        :title="person.uid"
      >
        {{ person.name }}
      </div>
      <button
        v-if="type === 'member' || type === 'activePending'"
        :title="firstButtonTitle"
        :class="firstButtonColor"
        class="flex-none w-10 cursor-pointer p-2 action_button"
        @click="firstButtonAction(person.uid)"
      >
        <svg
          class="text-white dark:text-gray-300 dark:hover:text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path :d="icons[firstButtonIcon]" />
        </svg>
      </button>
      <button
        v-if="
          person.uid !== 'dashboardadmin' && thisGroup.membership === 'admin'
        "
        :title="secondButtonTitle"
        :class="secondButtonColor"
        class="flex-none rounded-r w-10 cursor-pointer p-2 action_button"
        @click="secondButtonAction(person.uid)"
      >
        <svg
          class="text-white dark:text-gray-300 dark:hover:text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path :d="icons[secondButtonIcon]" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PeopleListing',
  props: {
    people: {
      type: Array,
      default: () => [],
    },
    thisGroup: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      icons: {
        'user plus':
          'M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z',
        'user minus':
          'M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-8v2h8v-2z',
        'admin icon':
          'M11.383 15.941l-3.758 8.059-.967-2.658-2.658.968 3.517-7.541c.678.216 1.137.162 1.849.162.744.513 1.072.844 2.017 1.01zm3.252-1.009c-.738.506-1.049.831-1.994 1.004l3.759 8.064.967-2.658 2.633.968-3.495-7.549c-.686.222-1.146.171-1.87.171zm-2.635-11.932c-2.205 0-4 1.795-4 4s1.795 4 4 4c2.206 0 4-1.794 4-4s-1.794-4-4-4zm6.926 5.278c.051.146.074.296.074.445 0 .449-.222.883-.615 1.156-1.256.87-1.09.651-1.562 2.067-.198.591-.77.99-1.414.99h-.004c-1.549-.005-1.279-.088-2.528.789-.262.183-.569.275-.877.275s-.615-.092-.876-.275c-1.249-.878-.98-.794-2.528-.789h-.004c-.645 0-1.216-.399-1.413-.99-.473-1.417-.311-1.198-1.562-2.067-.395-.274-.617-.708-.617-1.157 0-.148.024-.298.074-.444.483-1.411.484-1.139 0-2.555-.05-.147-.074-.297-.074-.445 0-.45.222-.883.616-1.157 1.251-.868 1.089-.648 1.562-2.067.197-.591.769-.99 1.413-.99h.004c1.545.005 1.271.095 2.528-.79.262-.182.569-.274.877-.274s.615.091.876.274c1.249.878.98.795 2.528.79h.004c.645 0 1.216.399 1.414.99.473 1.416.307 1.197 1.562 2.067.394.274.616.707.616 1.156 0 .148-.023.299-.074.445-.483 1.411-.485 1.139 0 2.556zm-1.926-1.278c0-2.761-2.238-5-5-5-2.761 0-5 2.239-5 5s2.239 5 5 5c2.762 0 5-2.238 5-5z',
      },
    }
  },
  computed: {
    firstButtonTitle() {
      switch (this.type) {
        case 'activePending':
          return 'Mitglied hinzufügen'
        case 'member':
          return 'Zur Koordinator:in befördern'
        default:
          return ''
      }
    },
    secondButtonTitle() {
      switch (this.type) {
        case 'activePending':
          return 'Anfrage ablehnen'
        case 'inactivePending':
          return 'Mitglied freischalten'
        case 'admin':
          return 'Koordinator:innen-Rechte entziehen'
        case 'member':
          return 'Mitglied aus Gruppe entfernen'
        case 'nonMember':
          return 'Benutzer:in zur Gruppe hinzufügen'
        case 'guest':
          return 'Gast entfernen'
        default:
          return ''
      }
    },
    firstButtonColor() {
      if (this.type === 'activePending' || this.type === 'member')
        return 'button_green'
      else return ''
    },
    secondButtonColor() {
      if (this.type === 'inactivePending' || this.type === 'nonMember')
        return 'button_green'
      else if (
        this.type === 'activePending' ||
        this.type === 'admin' ||
        this.type === 'member' ||
        this.type === 'guest'
      )
        return 'button_red'
      else return ''
    },
    firstButtonIcon() {
      switch (this.type) {
        case 'activePending':
          return 'user plus'
        case 'member':
          return 'admin icon'
        default:
          return ''
      }
    },
    secondButtonIcon() {
      switch (this.type) {
        case 'activePending':
          return 'user minus'
        case 'inactivePending':
          return 'user plus'
        case 'admin':
          return 'admin icon'
        case 'member':
          return 'user minus'
        case 'nonMember':
          return 'user plus'
        case 'guest':
          return 'user minus'
        default:
          return ''
      }
    },
  },
  methods: {
    firstButtonAction(uid) {
      if (this.type === 'activePending') {
        this.$store.dispatch('groups/alertAddActivePending', {
          uid,
          groupID: this.thisGroup.id,
        })
      } else if (this.type === 'member') {
        this.$store.dispatch('groups/alertMakeAdmin', {
          uid,
          groupID: this.thisGroup.id,
        })
      }
    },
    secondButtonAction(uid) {
      if (this.type === 'activePending') {
        this.$store.dispatch('groups/alertDeclineMembershipRequest', {
          uid,
          groupID: this.thisGroup.id,
        })
      } else if (this.type === 'inactivePending') {
        this.$store.dispatch('groups/alertAddInactivePending', {
          uid,
          groupID: this.thisGroup.id,
        })
      } else if (this.type === 'admin') {
        this.$store.dispatch('groups/alertRevokeAdmin', {
          uid,
          groupID: this.thisGroup.id,
        })
      } else if (this.type === 'member') {
        this.$store.dispatch('groups/alertRemoveMember', {
          uid,
          groupID: this.thisGroup.id,
        })
      } else if (this.type === 'nonMember') {
        // TODO: emit event to close view with non-members
        this.$store.dispatch('groups/addMember', {
          uid,
          groupID: this.thisGroup.id,
        })
      } else if (this.type === 'guest') {
        this.$store.dispatch('groups/alertRemoveGuest', {
          uid,
          groupID: this.thisGroup.id,
        })
      }
    },
  },
}
</script>

<style></style>
