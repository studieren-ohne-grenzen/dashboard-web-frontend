export const state = () => ({
  name: '',
  username: '',
  sogMail: '',
  altMail: '',
  altMailConfirmed: true,
})

export const getters = {
  name: (state) => state.name,
  username: (state) => state.username,
  sogMail: (state) => state.sogMail,
  altMail: (state) => state.altMail,
  altMailConfirmed: (state) => state.altMailConfirmed,
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
  async changeAltMail({ commit }, altMail) {
    try {
      await this.$axios.post('api/users/confirm_email', {
        alternative_mail: altMail,
      })
      commit('setUserDetails', { altMail, altMailConfirmed: false })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message:
            'Kommunikationsfehler beim Ändern der alternativen Mailadresse: ' +
            error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
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

  async loadUserDetails({ commit, getters }) {
    try {
      const data = await this.$axios.$get('api/whoami')
      if (getters.altMail !== '' && !getters.altMailConfirmed) {
        commit('setUserDetails', {
          name: data.cn,
          username: data.uid,
          sogMail: data.mail,
        })
      } else {
        commit('setUserDetails', {
          name: data.cn,
          username: data.uid,
          sogMail: data.mail,
          altMail: data.mail_alternative,
        })
      }
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
  setUserDetails(state, user) {
    if (user.name) state.name = user.name
    if (user.username) state.username = user.username
    if (user.sogMail) state.sogMail = user.sogMail
    if (user.altMail) state.altMail = user.altMail
    if (user.altMailConfirmed !== undefined)
      state.altMailConfirmed = user.altMailConfirmed
  },
}
