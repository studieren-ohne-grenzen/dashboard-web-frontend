export default {
  showAlert(state) {
    state.alert.active = true
  },
  hideAlert(state) {
    state.alert.active = false
  },
}
