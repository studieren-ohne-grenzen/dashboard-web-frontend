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
        <img
          v-if="group.membership == 'admin'"
          src="wrench.png"
          class="bg-sogblue rounded-r h-10 p-3"
        />
        <img
          v-else-if="group.membership == 'member'"
          src="minus.png"
          class="bg-red rounded-r h-10 p-3"
        />
        <img
          v-else-if="group.membership == 'pending'"
          src="minus.png"
          class="bg-yellow rounded-r h-10 p-3"
        />
        <img
          v-else-if="group.membership == ''"
          src="plus.png"
          class="bg-green rounded-r h-10 p-3"
        />
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
}
</script>

<style></style>
