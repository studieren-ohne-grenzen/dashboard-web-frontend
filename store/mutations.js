export default {
  hideAlert(state) {
    state.alert.active = false
  },
  showAlert(state, options) {
    state.alert.title = options.title || 'Default Title'
    state.alert.message = options.message || 'Default Message'
    if (options.defaultToAction !== undefined)
      state.alert.defaultToAction = options.defaultToAction
    else state.alert.defaultToAction = false
    if (options.showCancel !== undefined)
      state.alert.showCancel = options.showCancel
    else state.alert.showCancel = true
    state.alert.actionName = options.actionName || 'OK'
    state.alert.cancelName = options.cancelName || 'Abbrechen'
    state.alert.active = true
  },
}
