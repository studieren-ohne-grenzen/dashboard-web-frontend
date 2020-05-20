<template>
  <div>
    <div v-if="name.length" class="mb-4 text-sogblue">
      {{ name }}
    </div>
    <div class="flex flex-wrap">
      <div v-for="group in groups" :key="group.name" class="mr-4 mb-4">
        <div
          class="pt-2 px-4 float-left h-10 border-l border-t border-b rounded-l border-gray"
        >
          {{ group.name }}
        </div>
        <svg
          v-if="group.membership == 'admin'"
          class="text-white fill-current bg-sogblue rounded-r h-10 p-3 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M4.5.257l3.771 3.771c.409 1.889-2.33 4.66-4.242 4.242l-3.771-3.77c-.172.584-.258 1.188-.258 1.792 0 1.602.607 3.202 1.83 4.426 1.351 1.351 3.164 1.958 4.931 1.821.933-.072 1.852.269 2.514.931l9.662 9.662c.578.578 1.337.868 2.097.868 1.661 0 3.001-1.364 2.966-3.03-.016-.737-.306-1.47-.868-2.033l-9.662-9.663c-.662-.661-1.002-1.581-.931-2.514.137-1.767-.471-3.58-1.82-4.93-1.225-1.224-2.825-1.83-4.428-1.83-.603 0-1.207.086-1.791.257zm17.5 20.743c0 .553-.447 1-1 1-.553 0-1-.448-1-1s.447-1 1-1 1 .447 1 1z"
          />
        </svg>
        <svg
          v-else-if="group.membership == 'member'"
          class="text-white fill-current bg-red rounded-r h-10 p-3 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 10h24v4h-24z" />
        </svg>
        <svg
          v-else-if="group.membership == 'pending'"
          class="text-white fill-current bg-yellow rounded-r h-10 p-3 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 10h24v4h-24z" />
        </svg>
        <svg
          v-else-if="group.membership == ''"
          class="text-white fill-current bg-green rounded-r h-10 p-3 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          @click="requestGroupMembership(group.id)"
        >
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupListing',
  props: {
    name: {
      type: String,
      required: true,
    },
    groups: {
      type: Array,
      required: true,
    },
  },
  methods: {
    requestGroupMembership(groupID) {
      this.$store.dispatch('groups/alertRequestMembership', { groupID })
    },
  },
}
</script>

<style></style>
