<template>
  <div>
    <div v-if="$store.getters['user/inactive']" class="sm:flex mb-8">
      <h2
        class="flex-none text-red-600 dark:text-red-400 text-3xl mt-4 mb-2 sm:ml-2 w-40 sm:w-48 sm:mr-10"
      >
        Aktivierung
      </h2>
      <div class="text-red-600 dark:text-red-400 sm:mt-4">
        <div class="mb-4">
          Dein SOG-Benutzerkonto wurde noch nicht aktiviert. Eine:r der
          folgenden Koordinator:innen muss deine Mitgliedschaft im Verein und in
          der Gruppe
          {{ pendingGroupName }} erst noch bestätigen.
        </div>
        <div class="flex flex-wrap">
          <div
            v-for="admin in pendingGroupOwners"
            :key="admin.uid"
            class="mr-4 mb-4 flex flex-no-wrap min-h-10 min-w-full xs:min-w-0"
          >
            <div
              class="flex-grow py-2 px-4 text-sogblue-dark border border-r-0 rounded-l border-gray dark:border-0 dark:bg-gray-800 dark:text-gray-300"
              :title="admin.mail"
            >
              {{ admin.cn }}
            </div>
            <a
              :title="admin.mail"
              class="border-t border-b border-sogblue-light rounded-r dark:border-0 dark:bg-sogblue-darker"
              :href="'mailto:' + admin.mail"
            >
              <svg
                class="text-white dark:text-gray-300 flex-none fill-current bg-sogblue-light w-10 p-2 rounded-r cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <hr v-if="$store.getters['user/inactive']" style="clear: left" />
    <div class="sm:flex mb-8">
      <div
        class="hidden sm:block sm:invisible flex-shrink-0 h-40 w-40 sm:h-48 sm:w-48 my-2 sm:m-2 mx-auto sm:mr-10 bg-gray rounded-full text-lightgrey text-center"
      ></div>
      <div class="self-center flex-grow">
        <div class="sog_textlabel">Name</div>
        <div class="sog_textfield w-full sm:max-w-lg">
          {{ name }}
        </div>
        <div class="sog_textlabel">Benutzername</div>
        <div class="sog_textfield w-full sm:max-w-lg">
          {{ username }}
        </div>
        <div class="block sog_status">
          Dein Name kann nur von der
          <a href="mailto:it@studieren-ohne-grenzen.org" class="underline"
            >SOG IT</a
          >
          geändert werden.
        </div>
      </div>
    </div>
    <div>
      <hr />
      <h2 class="mt-4 mb-2 sm:ml-2 sm:float-left w-40 sm:w-48 sm:mr-10">
        Sicherheit
      </h2>
      <button
        v-if="!changePwd"
        type="button"
        class="sm:mt-4 sog_button_active"
        @click="togglePwd"
      >
        Passwort ändern
      </button>
      <form
        v-if="changePwd"
        class="sm:flex w-full flex-wrap items-end"
        @submit.prevent="changePassword"
      >
        <div class="flex-grow sm:max-w-md sm:mx-2 sm:min-w-56">
          <label class="sog_textlabel">Aktuelles Passwort</label>
          <input
            v-model="oldPassword"
            v-focus
            type="password"
            :class="
              errorOldPassword ? 'border-red-500 border-2' : 'border-none'
            "
            class="sog_texteditor w-full"
          />
        </div>
        <div class="sm:flex flex-grow">
          <div class="flex-grow sm:mx-2 sm:min-w-56">
            <label class="sog_textlabel">Neues Passwort</label>
            <input
              v-model="newPassword1"
              type="password"
              :class="
                errorNewPassword ? 'border-red-500 border-2' : 'border-none'
              "
              class="sog_texteditor w-full"
            />
          </div>
          <div class="flex-grow sm:mx-2 sm:min-w-56">
            <label class="sog_textlabel">Neues Passwort wiederholen</label>
            <input
              v-model="newPassword2"
              type="password"
              :class="
                errorNewPassword ? 'border-red-500 border-2' : 'border-none'
              "
              class="sog_texteditor w-full"
            />
          </div>
        </div>
        <div class="flex-grow sm:mx-2 lg:hidden w-full block text-red-600 mb-4">
          {{ pwdError }}
        </div>
        <div class="flex-grow-0 flex-shrink-0 sm:mx-2">
          <button
            type="submit"
            class="mb-4"
            :disabled="!changePwdSubmittable"
            :class="
              changePwdSubmittable ? 'sog_button_active' : 'sog_button_inactive'
            "
          >
            Ändern
          </button>
          <button
            type="reset"
            class="ml-2 sog_button_secondary"
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
    <div style="clear: left" class="mt-8">
      <hr />
      <h2 class="text-3xl mt-4 mb-2 sm:ml-2 sm:float-left sm:w-48 sm:mr-10">
        Email
      </h2>
      <div class="flex flex-wrap sm:mt-8">
        <div class="flex-grow">
          <div class="text-sogblue-dark dark:text-gray-300 mb-1">
            SOG-Mailadresse
          </div>
          <div class="sog_textfield w-full sm:max-w-lg">
            {{ sogMail }}
          </div>
          <div class="sog_status mb-4 sm:max-w-lg">
            Deine SOG-Mailadresse kann nur von der
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
          <div v-if="!changeMail" class="sog_textlabel">
            Alternative Mailadresse
          </div>
          <div
            v-if="!changeMail"
            :class="altMailConfirmed ? '' : '!text-gray'"
            class="sog_textfield w-full sm:max-w-lg"
          >
            {{ altMail }}
            <span v-if="!altMailConfirmed"> (nicht bestätigt)</span>
          </div>
          <button
            v-if="!changeMail"
            type="button"
            class="sog_button_active"
            @click="toggleMail"
          >
            Alternative Mail-Adresse ändern
          </button>
        </div>
      </div>
      <form
        v-if="changeMail"
        class="sm:flex flex-wrap w-full items-end"
        @submit.prevent="changeEmail"
      >
        <div class="sm:flex flex-grow sm:mx-2">
          <div class="flex-grow flex-1 sm:min-w-56">
            <label class="sog_textlabel">Neue alternative Mailadresse</label>
            <input
              v-model="newEmail1"
              v-focus
              type="text"
              :placeholder="altMail"
              :class="
                emailError !== '' ? 'border-red-500 border-2' : 'border-none'
              "
              class="sog_texteditor w-full"
            />
          </div>
        </div>
        <div class="flex-grow sm:mx-2 block lg:hidden w-full text-red-600 mb-4">
          {{ emailError }}
        </div>
        <div class="flex-grow-0 flex-shrink-0 sm:mx-2">
          <button
            type="submit"
            :disabled="!changeEmailSubmittable"
            :class="
              changeEmailSubmittable
                ? 'sog_button_active'
                : 'sog_button_inactive'
            "
            class="mb-4"
          >
            Ändern
          </button>
          <button
            type="reset"
            class="ml-2 sog_button_secondary"
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
    <div>
      <hr />
      <h2 class="mt-4 mb-2 sm:ml-2 sm:float-left w-40 sm:w-48 sm:mr-10">
        Darstellung
      </h2>
      <button
        v-if="!forcedDarkMode"
        type="button"
        class="sm:mt-4 sog_button_active"
        @click="forceDarkMode"
      >
        Dark-Mode erzwingen
      </button>
      <button
        v-else
        type="button"
        class="sm:mt-4 sog_button_active"
        @click="stopForcingDarkMode"
      >
        Dark-Mode nicht mehr erzwingen
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import zxcvbn from '~/components/zxcvbnGerman/zxcvbn'
import validate from '~/components/validateEmails'

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
      changeEmailSubmittable: false,
      emailError: '',
    }
  },
  fetch() {
    this.$store.dispatch('user/loadUserDetails')
  },
  fetchOnServer: false,
  head: () => {
    return {
      title: 'Mein Profil',
    }
  },
  computed: {
    ...mapGetters({
      name: 'user/name',
      username: 'user/username',
      sogMail: 'user/sogMail',
      altMail: 'user/altMail',
      altMailConfirmed: 'user/altMailConfirmed',
      pendingGroupName: 'user/pendingGroupName',
      pendingGroupOwners: 'user/pendingGroupOwners',
      forcedDarkMode: 'user/forcedDarkMode',
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
    forceDarkMode() {
      this.$store.dispatch('user/alertForceDarkMode')
    },
    stopForcingDarkMode() {
      this.$store.dispatch('user/alertStopForcingDarkMode')
    },
    changeEmail() {
      this.$store.dispatch('user/alertChangeAltMail', this.newEmail1)
      this.untoggleMail()
    },
    changePassword() {
      this.$store.dispatch('user/changePasswordWithOld', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword1,
      })
      this.untogglePwd()
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
        if (zxcvbnResult.feedback.warning)
          this.pwdError =
            'Passwort zu unsicher: ' + zxcvbnResult.feedback.warning + '. '
        else this.pwdError = 'Passwort zu unsicher. '
        for (const s in zxcvbnResult.feedback.suggestions) {
          this.pwdError += zxcvbnResult.feedback.suggestions[s] + '. '
        }
      } else {
        this.changePwdSubmittable = true
        this.pwdError = ''
      }
    },
    validateEmails() {
      this.errorNewEmail = false
      this.changeEmailSubmittable = false
      if (this.newEmail1 === '') {
        this.emailError = ''
      } else if (!validate(this.newEmail1)) {
        this.emailError = 'Keine gültige Mailadresse eingegeben.'
      } else if (this.newEmail1 === this.sogMail) {
        this.emailError =
          'Alternative Mailadresse darf nicht mit SOG-Mailadresse übereinstimmen.'
      } else {
        this.changeEmailSubmittable = true
        this.emailError = ''
      }
    },
  },
}
</script>

<style></style>
