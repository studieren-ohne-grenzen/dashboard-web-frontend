export const state = () => ({
  name: 'Bertrand Arthur William Russell',
  username: 'bertrand.russell',
  password: '',
  sogMail: 'bertrand.russell@studieren-ohne-grenzen.org',
  altMail: 'bertrand@russell.info',
})

export const getters = {
  name: (state) => state.name,
  username: (state) => state.username,
  // ToDo better password handling!
  password: (state) => state.password,
  sogMail: (state) => state.sogMail,
  altMail: (state) => state.altMail,
}

export const actions = {
  alertChangeAltMail({ commit, getters }, altMail) {
    const message =
      'Deine alternative Emailadresse wird von ' +
      getters.altMail +
      ' geändert zu ' +
      altMail +
      '. Du bekommst zur Bestätigung eine Mail an ' +
      altMail +
      ' zugeschickt.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Alternative Mailadresse ändern',
        message,
        defaultToAction: true,
        actionName: 'Mailadresse ändern',
        action: 'user/changeAltMail',
        params: altMail,
      },
      { root: true }
    )
  },
  changeAltMail({ commit }, altMail) {
    // API request to be implemented here
    commit('setAltMail', altMail)
  },
}

export const mutations = {
  setAltMail(state, altMail) {
    state.altMail = altMail
  },
}
