<template>
  <form @submit.prevent="resetPassword">
    <label class="block text-sogblue-dark dark:text-gray-300 mb-1">
      Neues Passwort
    </label>
    <input
      v-model="newPassword1"
      type="password"
      placeholder="********"
      :class="pwdError !== '' ? 'border-red-500 border-2' : 'border-none'"
      class="p-2 mb-8 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:ring-2 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-white dark:focus:ring-gray-500"
    />
    <label class="block text-sogblue-dark dark:text-gray-300 mb-1">
      Neues Passwort wiederholen
    </label>
    <input
      v-model="newPassword2"
      type="password"
      placeholder="********"
      :class="pwdError !== '' ? 'border-red-500 border-2' : 'border-none'"
      class="p-2 mb-8 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:ring-2 focus:bg-white dark:bg-gray-800 dark:focus:bg-gray-700 dark:text-white dark:focus:ring-gray-500"
    />
    <div v-if="pwdError !== ''" class="w-full text-red-600 mb-8">
      {{ pwdError }}
    </div>
    <button
      :disabled="!changePwdSubmittable"
      :class="
        changePwdSubmittable
          ? 'cursor-pointer bg-sogblue hover:bg-sogblue-darker dark:bg-sogblue dark:hover:bg-sogblue-light'
          : 'cursor-default bg-sogblue-lightest hover:bg-sogblue-lightest dark:bg-gray-800 dark:hover:bg-gray-800'
      "
      class="rounded py-2 px-4 text-white dark:text-black"
    >
      {{ confirmText }}
    </button>
  </form>
</template>

<script>
import zxcvbn from '~/components/zxcvbnGerman/zxcvbn'

export default {
  name: 'ResetPassword',
  props: {
    confirmText: {
      type: String,
      default: 'Passwort ändern',
    },
    action: {
      type: String,
      default: 'user/changePasswordWithKey',
    },
  },
  data() {
    return {
      newPassword1: '',
      newPassword2: '',
      changePwdSubmittable: false,
      pwdError: '',
      key: this.$route.query.key,
    }
  },
  watch: {
    newPassword1() {
      this.validatePasswords()
    },
    newPassword2() {
      this.validatePasswords()
    },
  },
  methods: {
    resetPassword() {
      this.$store.dispatch(this.action, {
        newPassword: this.newPassword2,
        key: this.key,
      })
    },
    validatePasswords() {
      const zxcvbnResult = zxcvbn(this.newPassword2)
      this.changePwdSubmittable = false
      if (this.newPassword2 === '') {
        this.pwdError = ''
      } else if (this.newPassword1 !== this.newPassword2) {
        this.pwdError = 'Passwörter stimmen nicht überein.'
        this.errorNewPassword = true
      } else if (zxcvbnResult.score < 3) {
        this.errorNewPassword = true
        if (zxcvbnResult.feedback.warning)
          this.pwdError =
            'Passwort zu unsicher: ' + zxcvbnResult.feedback.warning + '. '
        else this.pwdError = 'Passwort zu unsicher.'
        for (const s in zxcvbnResult.feedback.suggestions) {
          this.pwdError += zxcvbnResult.feedback.suggestions[s] + '. '
        }
      } else {
        this.changePwdSubmittable = true
        this.pwdError = ''
      }
    },
  },
}
</script>
