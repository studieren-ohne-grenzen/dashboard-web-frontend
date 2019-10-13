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
    <h1 class="text-sogblue-light text-3xl mt-8 mb-2">
      Passwort
    </h1>
    <form class="sm:flex w-full items-end">
      <div class="flex-grow">
        <label class="block text-sogblue-dark mb-1">
          Neues Passwort
        </label>
        <input
          type="password"
          placeholder="********"
          class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
      </div>
      <div class="sm:ml-4 flex-grow">
        <label class="block text-sogblue-dark mb-1">
          Neues Passwort wiederholen
        </label>
        <input
          type="password"
          placeholder="********"
          class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
        />
      </div>
      <button
        type="button"
        class="w-40 rounded p-2 flex-grow-0 sm:ml-4 mb-4 bg-sogblue hover:bg-sogblue-darker text-white"
      >
        Passwort ändern
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
export default {}
</script>

<style></style>
