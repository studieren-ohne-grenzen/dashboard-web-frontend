<template>
  <form @keydown.enter="resetPassword">
    <label class="block text-sogblue-dark mb-1">Neues Passwort</label>
    <input
      v-model="newPassword1"
      type="password"
      placeholder="********"
      :class="pwdError !== '' ? 'border-red-500 border-2' : 'border-none'"
      class="p-2 mb-8 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
    />
    <label class="block text-sogblue-dark mb-1">
      Neues Passwort wiederholen
    </label>
    <input
      v-model="newPassword2"
      type="password"
      placeholder="********"
      :class="pwdError !== '' ? 'border-red-500 border-2' : 'border-none'"
      class="p-2 mb-8 w-full rounded appearance-none bg-gray-light text-sogblue-darker focus:shadow-outline focus:bg-white"
    />
    <div v-if="pwdError !== ''" class="w-full text-red-600 mb-8">
      {{ pwdError }}
    </div>
    <button
      :disabled="!changePwdSubmittable"
      :class="
        changePwdSubmittable
          ? 'cursor-pointer bg-sogblue hover:bg-sogblue-darker'
          : 'cursor-default bg-sogblue-lightest hover:bg-sogblue-lightest'
      "
      class="rounded py-2 px-4 text-white"
      @click="resetPassword"
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
  },
  data() {
    return {
      newPassword1: '',
      newPassword2: '',
      changePwdSubmittable: false,
      pwdError: '',
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
    resetPassword() {},
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
