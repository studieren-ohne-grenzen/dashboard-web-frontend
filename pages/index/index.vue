<template>
  <div>
    <h1 v-if="requests.length" class="text-sogblue-light text-3xl">
      Neue Anfragen
    </h1>
    <hr v-if="requests.length" class="border-lightgray my-4" />
    <div class="w-auto inline-flex border border-sogblue rounded">
      <button
        class="px-4 py-2 border-r border-sogblue"
        :class="allGroups ? 'groupactive' : 'groupinactive'"
        @click="showAllGroups"
      >
        Alle Gruppen
      </button>
      <button
        class="px-4 py-2 border-r border-sogblue"
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
        Administrieren
      </button>
    </div>
    <div v-for="group in groups" :key="group">
      <div>{{ group.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      requests: ['request1', 'request2'],
      allGroups: true,
      myGroups: false,
      adminGroups: false
    }
  },
  computed: {
    groups() {
      if (this.allGroups) return this.$store.getters.allGroups
      if (this.myGroups) return this.$store.getters.myGroups
      if (this.adminGroups) return this.$store.getters.adminGroups
      return null
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
