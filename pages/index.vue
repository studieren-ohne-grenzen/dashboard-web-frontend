<template>
  <div>
    <div class="flex flex-wrap sm:pt-4 bggradient">
      <div
        class="inline-block w-screen text-center sm:w-auto py-4 sm:py-2 px-4 text-sogblue-lightest font-normal"
      >
        SOG Dashboard Logo
      </div>
      <ul class="flex flex-grow">
        <li class="px-1">
          &nbsp;
        </li>
        <li class="px-1 bg-white rounded-t">
          <nuxt-link
            class="inline-block py-2 px-3 sm:px-8 text-sogblue-darker hover:text-sogblue font-normal"
            to="/profile"
          >
            Profil
          </nuxt-link>
        </li>
        <li class="px-1">
          <nuxt-link
            class="inline-block py-2 px-3 sm:px-8 text-sogblue-lightest hover:text-white font-normal"
            to="/groups"
          >
            Gruppen
          </nuxt-link>
        </li>
        <li class="px-1 flex-grow">
          <nuxt-link
            class="inline-block float-right py-2 px-2 sm:pr-4 text-sogblue-lightest hover:text-white font-normal"
            to="/"
          >
            Abmelden
          </nuxt-link>
        </li>
      </ul>
    </div>
    <nuxt-child></nuxt-child>
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
</style>
