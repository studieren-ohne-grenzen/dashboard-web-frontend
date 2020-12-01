<template>
  <div>
    <h1 class="mb-4 text-sogblue-light dark:text-white text-3xl">
      Passwort vergeben
    </h1>
    <div class="text-sogblue-dark dark:text-gray-300 mb-8">
      Willkommen im Studieren Ohne Grenzen Vogelnest! Lege ein Passwort fest,
      mit dem du dich in Zukunft bei allen Webdiensten von Studieren ohne
      Grenzen anmelden möchtest.
    </div>
    <ResetPassword
      confirm-text="Passwort festlegen"
      action="user/setPasswordWithKey"
    ></ResetPassword>
  </div>
</template>

<script>
import ResetPassword from '~/components/resetPassword'

export default {
  components: {
    ResetPassword,
  },
}
</script>
