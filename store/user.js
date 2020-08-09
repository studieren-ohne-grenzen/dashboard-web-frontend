export const state = () => ({
  name: '',
  username: '',
  sogMail: '',
  altMail: '',
})

export const getters = {
  name: (state) => state.name,
  username: (state) => state.username,
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
  async downloadUserDetails({ commit }) {
    try {
      const data = await this.$axios.$get('api/whoami')
      commit('setUserDetails', {
        name: data.cn,
        username: data.uid,
        sogMail: data.mail,
        altMail: data.mail_alternative,
      })
    } catch (err) {
      const message = 'Kommunikationsfehler bei Download der Nuterdaten'
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message,
          defaultToAction: false,
          showCancel: false,
        },
        { root: true }
      )
    }
  },
}

export const mutations = {
  setAltMail(state, altMail) {
    state.altMail = altMail
  },
  setUserDetails(state, user) {
    state.name = user.name
    state.username = user.username
    state.sogMail = user.sogMail
    state.altMail = user.altMail
  },
}
