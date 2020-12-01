export const state = () => ({
  name: '',
  username: '',
  sogMail: '',
  altMail: '',
  altMailConfirmed: true,
  inactive: false,
  pendingGroupName: '',
  pendingGroupOwners: [],
  darkMode: false,
  localDarkMode: false,
})

export const getters = {
  name: (state) => state.name,
  username: (state) => state.username,
  sogMail: (state) => state.sogMail,
  altMail: (state) => state.altMail,
  altMailConfirmed: (state) => state.altMailConfirmed,
  inactive: (state) => state.inactive,
  pendingGroupName: (state) => state.pendingGroupName,
  pendingGroupOwners: (state) => state.pendingGroupOwners,
  forcedDarkMode: (state) => state.darkMode,
  darkMode: (state) => state.darkMode || state.localDarkMode,
}

export const actions = {
  async signOut(_) {
    await this.$auth.logout()
  },
  alertForceDarkMode({ commit }) {
    const message =
      'Ob das Vogelnest im dunklen oder im hellen Design angezeigt wird,' +
      ' richtet sich aktuell nach deiner Betriebssystem-Einstellung.' +
      ' Wenn du den Dark-Mode erzwingst, wird das Vogelnest dir in Zukunft' +
      ' immer im dunklen Design angezeigt, unabhängig von deiner aktuellen' +
      ' Betriebssystem-Einstellung.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Dark-Mode erzwingen',
        message,
        defaultToAction: true,
        actionName: 'Dark-Mode erzwingen',
        action: 'user/setDarkMode',
        params: { darkModeState: true },
      },
      { root: true }
    )
  },
  alertStopForcingDarkMode({ commit }) {
    const message =
      'Ob das Vogelnest im dunklen oder im hellen Design angezeigt wird,' +
      ' richtet sich in Zukunft wieder nach deiner aktuellen Betriebssystem-Einstellung,' +
      ' wenn du den Dark-Mode nicht mehr erzwingst.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Dark-Mode nicht mehr erzwingen',
        message,
        defaultToAction: true,
        actionName: 'Nicht mehr erzwingen',
        action: 'user/setDarkMode',
        params: { darkModeState: false },
      },
      { root: true }
    )
  },
  setDarkMode({ commit }, { darkModeState }) {
    commit('setDarkMode', { darkModeState })
  },
  alertChangeAltMail({ commit }, altMail) {
    const message =
      'Um deine alternative Mailadresse zu ändern, öffne den Link,' +
      ' den wir dir an deine neue alternative Mailadresse (' +
      altMail +
      ') geschickt haben.'
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
      await this.$axios.post('api/users/set_alternative_mail', {
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

  requestPassword({ commit }, altMail) {
    this.$axios
      .post('api/users/reset_password', {
        alternative_mail: altMail,
      })
      .then(
        commit(
          'alertbox/showAlert',
          {
            title: 'Passwort zurückgesetzt',
            message:
              'Wir haben dir einen Link an ' +
              altMail +
              ' gesendet. Folge dem Link, um ein neues Passwort zu vergeben.',
            defaultToAction: true,
            actionName: 'Zurück zum Login',
            action: '/login',
            actionIsRedirect: true,
            showCancel: false,
          },
          { root: true }
        )
      )
      .catch((error) => {
        commit(
          'alertbox/showAlert',
          {
            title: 'Kommunikationsfehler',
            message:
              'Kommunikationsfehler beim Zurücksetzen des Passworts: ' + error,
            showCancel: false,
            defaultToAction: true,
          },
          { root: true }
        )
      })
  },

  changePasswordWithKey({ commit }, { key, newPassword }) {
    this.$axios
      .post('api/users/set_password_with_key', {
        key,
        new_password: newPassword,
      })
      .then(
        commit(
          'alertbox/showAlert',
          {
            title: 'Passwort geändert',
            message: 'Dein Passwort wurde erfolgreich geändert.',
            defaultToAction: true,
            actionName: 'Zum Login',
            action: '/login',
            actionIsRedirect: true,
            showCancel: false,
          },
          { root: true }
        )
      )
      .catch((error) => {
        commit(
          'alertbox/showAlert',
          {
            title: 'Kommunikationsfehler',
            message: 'Kommunikationsfehler beim Ändern des Passworts: ' + error,
            showCancel: false,
            defaultToAction: true,
          },
          { root: true }
        )
      })
  },

  setPasswordWithKey({ commit }, { key, newPassword }) {
    this.$axios
      .post('api/users/set_password_with_key', {
        key,
        new_password: newPassword,
      })
      .then(
        commit(
          'alertbox/showAlert',
          {
            title: 'Passwort festgelegt',
            message: 'Dein Passwort wurde erfolgreich festgelegt.',
            defaultToAction: true,
            actionName: 'Zum Login',
            action: '/login',
            actionIsRedirect: true,
            showCancel: false,
          },
          { root: true }
        )
      )
      .catch((error) => {
        commit(
          'alertbox/showAlert',
          {
            title: 'Kommunikationsfehler',
            message:
              'Kommunikationsfehler beim Festlegen des Passworts: ' + error,
            showCancel: false,
            defaultToAction: true,
          },
          { root: true }
        )
      })
  },

  changePasswordWithOld({ commit }, { oldPassword, newPassword }) {
    this.$axios
      .post('api/users/set_new_password_with_old_password', {
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

  loadUserDetails({ commit, getters }) {
    Promise.all([
      this.$axios.$get('api/inactive_info'),
      this.$axios.$get('api/whoami'),
    ])
      .then((responses) => {
        if (getters.altMail !== '' && !getters.altMailConfirmed) {
          commit('setUserDetails', {
            name: responses[1].cn,
            username: responses[1].uid,
            sogMail: responses[1].mail,
            inactive: responses[0].inactive,
            pendingGroupName: responses[0].pending_group_name,
            pendingGroupOwners: responses[0].pending_group_owners,
          })
        } else {
          commit('setUserDetails', {
            name: responses[1].cn,
            username: responses[1].uid,
            sogMail: responses[1].mail,
            altMail: responses[1].mail_alternative,
            inactive: responses[0].inactive,
            pendingGroupName: responses[0].pending_group_name,
            pendingGroupOwners: responses[0].pending_group_owners,
          })
        }
      })
      .catch((errors) => {
        commit(
          'alertbox/showAlert',
          {
            title: 'Kommunikationsfehler',
            message:
              'Kommunikationsfehler beim Laden der Nutzerdaten: ' + errors,
            showCancel: false,
            defaultToAction: true,
          },
          { root: true }
        )
      })
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
    if (user.inactive !== undefined) state.inactive = user.inactive
    if (user.pendingGroupName) state.pendingGroupName = user.pendingGroupName
    if (user.pendingGroupOwners)
      state.pendingGroupOwners = user.pendingGroupOwners
  },
  setDarkMode(state, { darkModeState }) {
    state.darkMode = darkModeState
  },
  setLocalDarkMode(state, { darkModeState }) {
    state.localDarkMode = darkModeState
  },
}
