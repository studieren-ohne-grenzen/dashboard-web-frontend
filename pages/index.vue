<template>
  <div class="bggradient w-screen h-screen">
    <ul class="flex justify-around border-white pt-4">
      <li class="inline-block border-b py-2 px-4 font-semibold text-white">
        Dashboard
      </li>
      <li class="px-4 border-l border-t border-r rounded-t border-white">
        <a
          class="inline-block py-2 px-4 text-white font-semibold hover:text-sogblue-lighter"
          href="#"
        >
          Profil
        </a>
      </li>
      <li class="border-b border-white px-4">
        <a
          class="inline-block py-2 px-4 text-white hover:text-sogblue-lighter font-semibold"
          href="#"
        >
          Gruppen
        </a>
      </li>
      <li class="flex-grow float-right border-b border-white">
        <a
          class="inline-block py-2 px-4 text-white hover:text-sogblue-lighter font-semibold"
          href="#"
        >
          Abmelden
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style>
.bggradient {
  background-image: linear-gradient(30deg, #57b4dc 0%, #007ebb 100%);
}
</style>
