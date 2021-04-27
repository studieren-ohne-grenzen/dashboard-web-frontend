<template>
  <form @submit.prevent="resetPassword">
    <label class="sog_textlabel">Neues Passwort</label>
    <input
      v-model="newPassword1"
      type="password"
      placeholder="********"
      :class="pwdError !== '' ? 'border-red-500 border-2' : 'border-none'"
      class="mb-8 w-full sog_texteditor"
    />
    <label class="sog_textlabel">Neues Passwort wiederholen</label>
    <input
      v-model="newPassword2"
      type="password"
      placeholder="********"
      :class="pwdError !== '' ? 'border-red-500 border-2' : 'border-none'"
      class="mb-8 w-full sog_texteditor"
    />
    <div v-if="pwdError !== ''" class="w-full text-red-600 mb-8">
      {{ pwdError }}
    </div>
    <button
      :disabled="!changePwdSubmittable"
      :class="
        changePwdSubmittable ? 'sog_button_active' : 'sog_button_inactive'
      "
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
