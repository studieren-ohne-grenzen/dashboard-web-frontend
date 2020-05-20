export const state = () => ({
  alert: {
    title: 'Default Title',
    active: false,
    message: 'Default Message',
    defaultToAction: false,
    showCancel: true,
    actionName: 'OK',
    cancelName: 'Abbrechen',
    action: 'alertbox/hideAlert',
    params: {},
  },
})

export const getters = {
  alert(state) {
    return state.alert
  },
}

export const mutations = {
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
    state.alert.action = options.action || 'alertbox/hideAlert'
    state.alert.params = options.params || {}
    state.alert.active = true
  },
}
