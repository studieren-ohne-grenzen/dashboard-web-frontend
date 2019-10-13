<template>
  <div class="bggradient w-screen h-screen">
    <div class="flex flex-wrap sm:pt-4 max-w-5xl m-auto">
      <div class="w-screen sm:w-auto py-4 pb-6 sm:py-2 pl-2 lg:pl-0 sm:pr-12">
        <img
          alt="Dashboard Logo"
          src="logo.png"
          class="m-auto"
          style="max-width: 10rem"
        />
      </div>
      <ul class="flex flex-grow">
        <li
          class="ml-2 sm:ml-0"
          :class="
            this.$router.currentRoute.path.substr(0, 7) == '/groups'
              ? 'tabactive'
              : 'tabinactive'
          "
        >
          <nuxt-link
            class="inline-block py-2 px-3 sm:px-8 font-normal"
            to="/groups"
          >
            Gruppen
          </nuxt-link>
        </li>
        <li
          class="ml-2 sm:ml-0"
          :class="
            this.$router.currentRoute.path == '/profile'
              ? 'tabactive'
              : 'tabinactive'
          "
        >
          <nuxt-link
            class="inline-block py-2 px-3 sm:px-8 font-normal"
            to="/profile"
          >
            Profil
          </nuxt-link>
        </li>
        <li class="px-1 flex-grow">
          <nuxt-link
            class="inline-block float-right py-2 pr-2 lg:pr-0 sm:pl-4 text-sogblue-lightest hover:text-white font-normal"
            to="/"
          >
            Abmelden
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="max-w-5xl bg-white sm:mx-2 lg:mx-auto sm:rounded p-4">
      <nuxt-child></nuxt-child>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.bggradient {
  background-color: #00679e;
  background-image: linear-gradient(20deg, #57b4dc 0%, #00679e 100%);
}

.tabactive {
  @apply px-1 bg-white rounded-t text-sogblue-darker;
}

.tabactive:hover {
  @apply text-sogblue;
}

.tabinactive {
  @apply px-1 text-sogblue-lightest;
}

.tabinactive:hover {
  @apply text-white;
}
</style>
