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
          <a
            class="inline-block py-2 px-3 sm:px-8 text-sogblue-darker hover:text-sogblue font-normal"
            href="/profile"
          >
            Profil
          </a>
        </li>
        <li class="px-1">
          <a
            class="inline-block py-2 px-3 sm:px-8 text-sogblue-lightest hover:text-white font-normal"
            href="/groups"
          >
            Gruppen
          </a>
        </li>
        <li class="px-1 flex-grow">
          <a
            class="inline-block float-right py-2 px-2 sm:pr-4 text-sogblue-lightest hover:text-white font-normal"
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
  background-color: #00679e;
  background-image: linear-gradient(10deg, #0098cf 0%, #00679e 100%);
}
</style>
