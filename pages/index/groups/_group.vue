<template>
  <div>
    Untergruppe!
  </div>
</template>

<script>
export default {
  validate({ params }) {
    // TODO: test for actual group names
    return /^\d+$/.test(params.group)
  }
}
</script>

<style></style>
