<template>
  <div>
    <h1 class="mb-4 text-sogblue-light text-3xl">Passwort zurücksetzen</h1>
    <ResetPassword />
    <AlertBox />
  </div>
</template>

<script>
import ResetPassword from '~/components/resetPassword'
import AlertBox from '~/components/alertbox'

export default {
  components: {
    ResetPassword,
    AlertBox,
  },
}
</script>
