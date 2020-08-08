<template>
  <div>
    <div class="sm:flex mb-8">
      <div
        class="hidden sm:block sm:invisible flex-shrink-0 h-40 w-40 sm:h-48 sm:w-48 my-2 sm:m-2 mx-auto sm:mr-10 bg-gray rounded-full text-lightgrey text-center"
      ></div>
      <div class="self-center flex-grow">
        <div class="block text-sogblue-dark mb-1">
          Name
        </div>
        <div
          class="rounded bg-gray-light text-sogblue-dark p-2 mb-4 w-full sm:max-w-lg"
        >
          {{ name }}
        </div>
        <div class="block text-sogblue-dark mb-1">
          Benutzername
        </div>
        <div
          class="rounded bg-gray-light text-sogblue-dark p-2 mb-4 w-full sm:max-w-lg"
        >
          {{ username }}
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
      <hr class="border-gray-light my-4" />
      <h1
        class="text-sogblue-light text-3xl mt-4 mb-2 sm:ml-2 sm:float-left w-40 sm:w-48 sm:mr-10"
      >
        Sicherheit
      </h1>
      <button
        v-if="!changePwd"
        type="button"
        class="rounded py-2 px-4 sm:mt-4 bg-sogblue hover:bg-sogblue-darker text-white"
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
            v-model="oldPassword"
            v-focus
            type="password"
            :class="
              errorOldPassword ? 'border-red-500 border-2' : 'border-none'
            "
            class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
          />
        </div>
        <div class="sm:flex flex-grow">
          <div class="flex-grow sm:mx-2 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Neues Passwort
            </label>
            <input
              v-model="newPassword1"
              type="password"
              :class="
                errorNewPassword ? 'border-red-500 border-2' : 'border-none'
              "
              class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
          <div class="flex-grow sm:mx-2 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Neues Passwort wiederholen
            </label>
            <input
              v-model="newPassword2"
              type="password"
              :class="
                errorNewPassword ? 'border-red-500 border-2' : 'border-none'
              "
              class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
        </div>
        <div
          class="flex-grow sm:mx-2 block lg:hidden w-full block text-red-600 mb-4"
        >
          {{ pwdError }}
        </div>
        <div class="flex-grow-0 flex-shrink-0 sm:mx-2">
          <button
            type="button"
            class="rounded py-2 px-4 mb-4 text-white"
            :disabled="!changePwdSubmittable"
            :class="
              changePwdSubmittable
                ? 'cursor-pointer bg-sogblue hover:bg-sogblue-darker'
                : 'cursor-default bg-sogblue-lightest hover:bg-sogblue-lightest'
            "
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
        <div class="flex-grow sm:mx-2 w-full hidden lg:block text-red-600 mb-1">
          {{ pwdError }}
        </div>
      </form>
    </div>
    <div style="clear: left;" class="mt-8">
      <hr class="border-gray-light my-4" />
      <h1
        class="text-sogblue-light text-3xl mt-4 mb-2 sm:ml-2 sm:float-left sm:w-48 sm:mr-10"
      >
        Email
      </h1>
      <div class="flex flex-wrap sm:mt-8">
        <div class="flex-grow">
          <div class="text-sogblue-dark mb-1">
            SOG-Email
          </div>
          <div
            class="rounded bg-gray-light text-sogblue-dark p-2 mb-4 w-full sm:max-w-lg"
          >
            {{ sogMail }}
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
            class="rounded bg-gray-light text-sogblue-dark p-2 mb-4 w-full sm:max-w-lg"
          >
            {{ altMail }}
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
              v-model="newEmail1"
              v-focus
              type="text"
              :placeholder="altMail"
              :class="
                emailError !== '' ? 'border-red-500 border-2' : 'border-none'
              "
              class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
          <div class="sm:ml-4 flex-grow flex-1 sm:min-w-56">
            <label class="block text-sogblue-dark mb-1">
              Alternative Email wiederholen
            </label>
            <input
              v-model="newEmail2"
              type="text"
              :class="
                emailError !== '' ? 'border-red-500 border-2' : 'border-none'
              "
              class="p-2 mb-4 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
            />
          </div>
        </div>
        <div
          class="flex-grow sm:mx-2 block lg:hidden w-full block text-red-600 mb-4"
        >
          {{ emailError }}
        </div>
        <div class="flex-grow-0 flex-shrink-0 sm:mx-2">
          <button
            type="button"
            :disabled="!changeEmailSubmittable"
            :class="
              changeEmailSubmittable
                ? 'cursor-pointer bg-sogblue hover:bg-sogblue-darker'
                : 'cursor-default bg-sogblue-lightest hover:bg-sogblue-lightest'
            "
            class="rounded py-2 px-4 mb-4 text-white"
            @click="changeEmail"
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
        <div class="flex-grow sm:mx-2 w-full hidden lg:block text-red-600 mb-1">
          {{ emailError }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import zxcvbn from 'zxcvbn' // TODO: use German dictionary from https://github.com/qutorial/tryzxcvbn

export default {
  directives: {
    focus: {
      inserted: (el) => {
        el.focus()
      },
    },
  },
  data: () => {
    return {
      changePwd: false,
      changeMail: false,
      newPassword1: '',
      newPassword2: '',
      oldPassword: '',
      changePwdSubmittable: false,
      errorNewPassword: false,
      errorOldPassword: false,
      pwdError: '',
      newEmail1: '',
      newEmail2: '',
      changeEmailSubmittable: false,
      emailError: '',
    }
  },
  computed: {
    ...mapGetters({
      name: 'user/name',
      username: 'user/username',
      password: 'user/password',
      sogMail: 'user/sogMail',
      altMail: 'user/altMail',
    }),
  },
  watch: {
    newPassword1() {
      this.validatePasswords()
    },
    newPassword2() {
      this.validatePasswords()
    },
    oldPassword() {
      this.validatePasswords()
    },
    newEmail1() {
      this.validateEmails()
    },
    newEmail2() {
      this.validateEmails()
    },
  },
  methods: {
    changeEmail() {
      this.$store.dispatch('user/alertChangeAltMail', this.newEmail1)
    },
    togglePwd() {
      this.changePwd = true
    },
    untogglePwd() {
      this.changePwd = false
      this.newPassword = ''
      this.newPassword1 = ''
      this.newPassword2 = ''
      this.oldPassword = ''
      this.errorOldPassword = false
      this.errorNewPassword = false
      this.changePwdSubmittable = false
      this.pwdError = ''
    },
    toggleMail() {
      this.changeMail = true
    },
    untoggleMail() {
      this.changeMail = false
      this.newEmail1 = ''
      this.newEmail2 = ''
      this.newEmail = ''
      this.changeEmailSubmittable = false
    },
    validatePasswords() {
      const zxcvbnResult = zxcvbn(this.newPassword2)
      this.errorOldPassword = false
      this.errorNewPassword = false
      this.changePwdSubmittable = false
      if (
        this.oldPassword === '' &&
        (this.newPassword1 !== '' || this.newPassword2 !== '')
      ) {
        this.pwdError = 'Altes Passwort eingeben.'
        this.errorOldPassword = true
      } else if (this.newPassword2 === '') {
        this.pwdError = ''
      } else if (this.newPassword1 !== this.newPassword2) {
        this.pwdError = 'Neue Passwörter stimmen nicht überein.'
        this.errorNewPassword = true
      } else if (zxcvbnResult.score < 3) {
        this.errorNewPassword = true
        if (zxcvbnResult.feedback.suggestions[0])
          this.pwdError =
            'Passwort zu unsicher: ' + zxcvbnResult.feedback.suggestions[0]
        else this.pwdError = 'Passwort zu unsicher.'
      } else {
        this.changePwdSubmittable = true
        this.pwdError = ''
      }
    },
    validateEmails() {
      this.errorNewEmail = false
      this.changeEmailSubmittable = false
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (this.newEmail2 === '') {
        this.emailError = ''
      } else if (this.newEmail1 !== this.newEmail2) {
        this.emailError = 'Email-Adressen stimmen nicht überein.'
      } else if (!re.test(String(this.newEmail2).toLowerCase())) {
        this.emailError = 'Keine gültige Mailadresse eingegeben.'
      } else {
        this.changeEmailSubmittable = true
        this.emailError = ''
      }
    },
  },
  head: () => {
    return {
      title: 'Mein Profil',
    }
  },
}
</script>

<style></style>
