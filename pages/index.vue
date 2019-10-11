<template>
  <div class="bggradient w-screen h-screen">
    <div class="flex flex-wrap border-white sm:pt-4">
      <div
        class="inline-block w-screen sm:w-auto sm:border-b py-2 px-4 font-semibold text-white"
      >
        SOG Dashboard Logo
      </div>
      <ul class="flex flex-grow">
        <li class="px-1 border-b border-white">
          &nbsp;
        </li>
        <li class="px-1 border-l border-t border-r rounded-t border-white">
          <a
            class="inline-block py-2 px-3 sm:px-8 text-white font-semibold hover:text-sogblue-lighter"
            href="#"
          >
            Profil
          </a>
        </li>
        <li class="px-1 border-b border-white">
          <a
            class="inline-block py-2 px-3 sm:px-8 text-white hover:text-sogblue-lighter font-semibold"
            href="#"
          >
            Gruppen
          </a>
        </li>
        <li class="px-1 flex-grow border-b border-white">
          <a
            class="inline-block float-right py-2 px-2 sm:px-8 text-white hover:text-sogblue-lighter font-semibold"
            href="#"
          >
            Abmelden
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.bggradient {
  background-image: linear-gradient(30deg, #0098cf 0%, #00679e 100%);
}
</style>
