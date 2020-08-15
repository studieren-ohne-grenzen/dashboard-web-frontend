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
  async signOut(_) {
    await this.$auth.logout()
    location.reload()
  },

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

  changePasswordWithOld({ commit }, { oldPassword, newPassword }) {
    this.$axios
      .post('api/users/set_password', {
        // TODO: redeploy vogelnest - should be api/users/set_password_with_old
        old_password: oldPassword,
        new_password: newPassword,
      })
      .then(
        commit(
          'alertbox/showAlert',
          {
            title: 'Passwort geändert',
            message:
              'Dein Passwort wurde erfolgreich geändert. Melde dich mit deinem neuen Passwort an.',
            showCancel: false,
            defaultToAction: true,
            actionName: 'Neu anmelden',
            action: 'user/signOut',
          },
          { root: true }
        )
      )
      .catch((error) => {
        if (error.response) {
          commit(
            'alertbox/showAlert',
            {
              title: 'Fehler',
              message:
                'Beim Ändern des Passworts ist ein Fehler aufgetreten: ' +
                error.response.data,
              showCancel: false,
              defaultToAction: true,
            },
            { root: true }
          )
        } else {
          commit(
            'alertbox/showAlert',
            {
              title: 'Kommunikationsfehler',
              message:
                'Kommunikationsfehler beim Ändern des Passworts: ' + error,
              showCancel: false,
              defaultToAction: true,
            },
            { root: true }
          )
        }
      })
  },

  async loadUserDetails({ commit }) {
    try {
      const data = await this.$axios.$get('api/whoami')
      commit('setUserDetails', {
        name: data.cn,
        username: data.uid,
        sogMail: data.mail,
        altMail: data.mail_alternative,
      })
    } catch (errors) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message: 'Kommunikationsfehler beim Laden der Nuterdaten: ' + errors,
          showCancel: false,
          defaultToAction: true,
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
