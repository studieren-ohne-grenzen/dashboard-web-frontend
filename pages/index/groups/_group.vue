<template>
  <div>
    Untergruppe!
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.group)
  }
}
</script>

<style></style>
