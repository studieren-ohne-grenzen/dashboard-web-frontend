<template>
  <div class="bggradient w-screen h-screen">
    <div class="flex flex-wrap sm:pt-4 max-w-5xl m-auto">
      <div
        class="inline-block w-screen text-center sm:w-auto py-4 sm:py-2 pl-2 lg:pl-0 sm:pr-4 text-sogblue-lightest font-normal"
      >
        SOG Dashboard Logo
      </div>
      <ul class="flex flex-grow">
        <li class="tabactive ml-2 sm:ml-0">
          <nuxt-link
            class="inline-block py-2 px-3 sm:px-8 font-normal"
            to="/groups"
          >
            Gruppen
          </nuxt-link>
        </li>
        <li class="tabinactive">
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
    <div class="max-w-5xl bg-white sm:mx-2 lg:mx-auto sm:rounded">
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
  background-image: linear-gradient(10deg, #0098cf 0%, #00679e 100%);
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
