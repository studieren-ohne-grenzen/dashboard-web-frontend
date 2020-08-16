<template>
  <div
    class="w-full lg:width-auto lg:width-container min-h-screen h-full lg:pt-8 pb-4 lg:pb-8"
  >
    <div class="flex flex-wrap sm:pt-4 sm:px-2 max-w-5xl m-auto items-end">
      <div class="w-screen sm:w-auto py-4 pb-6 sm:py-2 lg:pl-0 sm:pr-12">
        <img
          alt="Dashboard Logo"
          src="@/static/logo.png"
          class="m-auto"
          style="max-width: 8rem;"
        />
      </div>
      <ul class="flex flex-grow">
        <li
          class="ml-2 sm:ml-0"
          :class="
            this.$router.currentRoute.path === '/' ? 'tabactive' : 'tabinactive'
          "
        >
          <nuxt-link class="inline-block py-2 px-3 sm:px-8 font-normal" to="/">
            Gruppen
          </nuxt-link>
        </li>
        <li
          class="ml-2 sm:ml-0"
          :class="
            this.$router.currentRoute.path === '/profile'
              ? 'tabactive'
              : 'tabinactive'
          "
        >
          <nuxt-link
            class="inline-block py-2 px-3 sm:px-8 font-normal"
            to="/profile"
          >
            Mein Profil
          </nuxt-link>
        </li>
        <li class="px-1 flex-grow">
          <button
            class="inline-block float-right py-2 pr-2 sm:pr-0 sm:pl-4 text-white hover:text-white font-normal"
            @click="logout()"
          >
            Abmelden
          </button>
        </li>
      </ul>
    </div>
    <div class="sm:px-2 lg:mx-auto">
      <div class="max-w-5xl bg-white lg:mx-auto sm:rounded p-4 sm:p-8">
        <nuxt-child></nuxt-child>
      </div>
    </div>
    <AlertBox />
  </div>
</template>

<script>
import AlertBox from '~/components/alertbox'

export default {
  components: {
    AlertBox,
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      location.reload()
    },
  },
  options: {
    auth: true,
  },
}
</script>

<style>
.tabactive {
  @apply px-1;
  @apply h-10;
  @apply bg-white;
  @apply rounded-t;
  @apply text-sogblue-darker;
}

.tabactive:hover {
  @apply text-sogblue;
}

.tabinactive {
  @apply px-1;
  @apply text-white;
}

.tabinactive:hover {
  @apply text-white;
}
</style>
