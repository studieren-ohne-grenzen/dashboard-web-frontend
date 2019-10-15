<template>
  <div>
    <div class="sm:flex">
      <div
        class="flex-shrink-0 h-40 w-40 sm:h-48 sm:w-48 my-2 sm:m-2 mx-auto sm:mr-10 bg-gray rounded-full text-lightgrey text-center"
      ></div>
      <form class="self-center flex-grow">
        <label class="block text-sogblue-dark mb-1">
          Name
        </label>
        <input
          disabled
          type="text"
          value="Elisabeth Maria Schulze-Böhmermann"
          class="rounded bg-lightgray text-gray p-2 mb-4 w-full sm:max-w-md"
        />
        <label class="block text-sogblue-dark mb-1">
          Benutzername
        </label>
        <input
          disabled
          type="text"
          value="elisabeth.maria.schulze.boehmermann"
          class="rounded bg-lightgray text-gray p-2 mb-4 w-full sm:max-w-md"
        />
        <div class="block text-gray">
          Dein Name kann nur von der
          <a href="mailto:it@studieren-ohne-grenzen.org" class="underline"
            >SOG IT</a
          >
          geändert werden.
        </div>
      </form>
    </div>
    <h1
      class="text-sogblue-light text-3xl mt-8 mb-2 sm:ml-2 sm:float-left w-40 sm:w-48 sm:mr-10"
    >
      Sicherheit
    </h1>
    <button
      v-if="!changePwd"
      type="button"
      class="rounded py-2 px-4 sm:mt-8 bg-sogblue hover:bg-sogblue-darker text-white"
      @click="togglePwd"
    >
      Passwort ändern
    </button>
    <form v-if="changePwd" class="sm:flex w-full flex-wrap items-end">
      <div class="flex-grow sm:max-w-xs sm:mx-2" style="min-width: 14rem">
        <label class="block text-sogblue-dark mb-1">
          Aktuelles Passwort
        </label>
        <input
          type="password"
          class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
      </div>
      <div class="sm:flex flex-grow">
        <div class="flex-grow sm:mx-2" style="min-width: 14rem">
          <label class="block text-sogblue-dark mb-1">
            Neues Passwort
          </label>
          <input
            type="password"
            class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
          />
        </div>
        <div class="flex-grow sm:mx-2" style="min-width: 14rem">
          <label class="block text-sogblue-dark mb-1">
            Neues Passwort wiederholen
          </label>
          <input
            type="password"
            class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
          />
        </div>
      </div>
      <button
        type="button"
        class="w-40 rounded p-2 flex-grow-0 sm:ml-2 mb-4 bg-sogblue hover:bg-sogblue-darker text-white"
        style="min-width: 10rem"
      >
        Ändern
      </button>
    </form>
    <h1 class="text-sogblue-light text-3xl mt-8 mb-2">
      Alternative Email-Adresse
    </h1>
    <form class="sm:flex w-full items-end">
      <div class="flex-grow">
        <label class="block text-sogblue-dark mb-1">
          Email-Adresse
        </label>
        <input
          type="email"
          placeholder="elli.maria@gmail.com"
          class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
      </div>
      <div class="sm:ml-4 flex-grow">
        <label class="block text-sogblue-dark mb-1">
          Email-Adresse wiederholen
        </label>
        <input
          type="email"
          placeholder="elli.maria@gmail.com"
          class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
      </div>
      <button
        type="button"
        class="w-40 rounded p-2 flex-grow-0 sm:ml-4 mb-4 bg-sogblue hover:bg-sogblue-darker text-white"
      >
        Email ändern
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      changePwd: false
    }
  },
  methods: {
    togglePwd() {
      this.changePwd = true
    }
  }
}
</script>

<style></style>
