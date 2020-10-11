<template>
  <div v-if="groups.length">
    <div v-if="name.length" class="mb-4 text-sogblue-light text-3xl">
      {{ name }}
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="group in groups"
        :key="group.name"
        class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0"
      >
        <nuxt-link
          :to="'/groups/' + encodeURIComponent(group.id)"
          class="py-2 px-4 flex-grow border-l border-t border-b rounded-l border-gray"
        >
          {{ group.name }}
        </nuxt-link>
        <nuxt-link
          v-if="group.membership == 'admin'"
          :to="'/groups/' + encodeURIComponent(group.id)"
          class="flex-none bg-sogblue-light rounded-r w-10 p-2 cursor-pointer"
        >
          <svg
            class="text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"
            />
          </svg>
        </nuxt-link>
        <svg
          v-else-if="group.membership == 'member'"
          class="text-white flex-none fill-current bg-gray-reddish rounded-r w-10 p-2 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          @click="cancelMembership(group.id)"
        >
          <path
            d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-8v2h8v-2z"
          />
        </svg>
        <svg
          v-else-if="group.membership == 'pending'"
          class="text-white flex-none fill-current bg-gray-yellowish rounded-r w-10 p-3 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          @click="cancelMembershipRequest(group.id)"
        >
          <path
            d="M17.026 22.957c10.957-11.421-2.326-20.865-10.384-13.309l2.464 2.352h-9.106v-8.947l2.232 2.229c14.794-13.203 31.51 7.051 14.794 17.675z"
          />
        </svg>
        <svg
          v-else-if="group.membership == ''"
          class="text-white flex-none fill-current bg-gray-greenish rounded-r w-10 p-2 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          @click="requestGroupMembership(group.id)"
        >
          <path
            d="M9.602 3.7c-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 3.321 0 5.97 2.117 5.97 6.167 0 3.555-1.949 6.833-2.383 7.833h-2.115c.392-1.536 2.499-4.366 2.499-7.842 0-5.153-5.867-4.985-7.369-2.458zm13.398 15.3h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"
          />
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
    cancelMembershipRequest(groupID) {
      this.$store.dispatch('groups/alertCancelMembershipRequest', { groupID })
    },
    cancelMembership(groupID) {
      this.$store.dispatch('groups/alertCancelMembership', { groupID })
    },
  },
}
</script>

<style></style>
