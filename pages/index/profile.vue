<template>
  <div>
    <div class="sm:flex">
      <div
        class="flex-shrink-0 h-40 w-40 sm:h-48 sm:w-48 my-2 sm:m-2 mx-auto sm:mr-10 bg-gray rounded-full text-lightgrey text-center"
      ></div>
      <div class="self-center flex-grow">
        <div class="block text-sogblue-dark mb-1">
          Name
        </div>
        <div
          class="rounded bg-lightgray text-sogblue-dark p-2 mb-4 w-full sm:max-w-lg"
        >
          Elisabeth Maria Schulze-Böhmermann
        </div>
        <div class="block text-sogblue-dark mb-1">
          Benutzername
        </div>
        <div
          class="rounded bg-lightgray text-sogblue-dark p-2 mb-4 w-full sm:max-w-lg"
        >
          elisabeth.maria.schulze.boehmermann
        </div>
        <div class="block text-gray">
          Dein Name kann nur von der
          <a href="mailto:it@studieren-ohne-grenzen.org" class="underline"
            >SOG IT</a
          >
          geändert werden.
        </div>
      </div>
    </div>
    <div>
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
        <div class="flex-grow sm:max-w-md sm:mx-2 sm:min-w-56">
          <label class="block text-sogblue-dark mb-1">
            Aktuelles Passwort
          </label>
          <input
            v-focus
            type="password"
            class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
          />
        </div>
        <div class="sm:flex flex-grow">
          <div class="flex-grow sm:mx-2 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Neues Passwort
            </label>
            <input
              type="password"
              class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
          <div class="flex-grow sm:mx-2 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Neues Passwort wiederholen
            </label>
            <input
              type="password"
              class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
        </div>
        <div class="flex-grow-0 flex-shrink-0 sm:mx-2">
          <button
            type="button"
            class="rounded py-2 px-4 mb-4 bg-sogblue hover:bg-sogblue-darker text-white"
          >
            Ändern
          </button>
          <button
            type="button"
            class="rounded py-2 px-4 ml-2 bg-white border border-sogblue hover:bg-sogblue-light text-sogblue hover:text-white"
            @click="untogglePwd"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
    <div style="clear: left" class="mt-8">
      <h1
        class="text-sogblue-light text-3xl sm:mt-0 mb-2 sm:ml-2 sm:float-left sm:w-48 sm:mr-10"
      >
        Email
      </h1>
      <div class="flex flex-wrap">
        <div class="flex-grow">
          <div class="text-sogblue-dark mb-1">
            SOG-Email
          </div>
          <div
            class="rounded bg-lightgray text-sogblue-dark p-2 mb-4 w-full sm:max-w-lg"
          >
            elisabeth.maria.schulze.boehmermann<wbr />@<wbr />studieren-ohne-grenzen.org
          </div>
          <div class="text-gray mb-4 sm:max-w-lg">
            Deine SOG-Email kann nur von der
            <a href="mailto:it@studieren-ohne-grenzen.org" class="underline"
              >SOG IT</a
            >
            geändert werden. Weitere Infos rund um deinen SOG-Mailaccount
            findest du im
            <a
              href="https://wiki.studieren-ohne-grenzen.org/bin/view/SOG%20Systeme/E-Mail/"
              class="underline"
              >XWiki</a
            >.
          </div>
          <div v-if="!changeMail" class="text-sogblue-dark mb-1">
            Alternative Email
          </div>
          <div
            v-if="!changeMail"
            class="rounded bg-lightgray text-sogblue-dark p-2 mb-4 w-full sm:max-w-lg"
          >
            eli.maria@gmail.com
          </div>
          <button
            v-if="!changeMail"
            type="button"
            class="rounded py-2 px-4 bg-sogblue hover:bg-sogblue-darker text-white"
            @click="toggleMail"
          >
            Alternative Email-Adresse ändern
          </button>
        </div>
      </div>
      <form v-if="changeMail" class="sm:flex flex-wrap w-full items-end">
        <div class="sm:flex flex-grow sm:mx-2">
          <div class="flex-grow flex-1 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Alternative Email
            </label>
            <input
              v-focus
              type="email"
              placeholder="eli.maria@gmail.com"
              class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
          <div class="sm:ml-4 flex-grow flex-1 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Alternative Email wiederholen
            </label>
            <input
              type="email"
              class="p-2 mb-4 w-full rounded appearance-none bg-lightgray text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
        </div>
        <div class="flex-grow-0 flex-shrink-0 sm:mx-2">
          <button
            type="button"
            class="rounded py-2 px-4 mb-4 bg-sogblue hover:bg-sogblue-darker text-white"
          >
            Ändern
          </button>
          <button
            type="button"
            class="rounded py-2 px-4 ml-2 bg-white border border-sogblue hover:bg-sogblue-light text-sogblue hover:text-white"
            @click="untoggleMail"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      }
    }
  },
  data: () => {
    return {
      changePwd: false,
      changeMail: false
    }
  },
  methods: {
    // TODO: reset forms on untoggle
    togglePwd() {
      this.changePwd = true
    },
    untogglePwd() {
      this.changePwd = false
    },
    toggleMail() {
      this.changeMail = true
    },
    untoggleMail() {
      this.changeMail = false
    }
  }
}
</script>

<style></style>
