<template>
  <div>
    <h1 class="mb-4 text-sogblue-light text-3xl">Passwort zurücksetzen</h1>
    <ResetPassword></ResetPassword>
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
