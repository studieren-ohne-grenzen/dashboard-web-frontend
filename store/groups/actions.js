export default {
  alertRequestMembership({ commit, getters }, { groupID }) {
    const message =
      'Eine Mitgliedschaft wird bei den Administrator:innen der ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' angefragt. Sie müssen dich freischalten, bevor du Mitglied wirst.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Gruppenmitgliedschaft anfragen',
        message,
        defaultToAction: true,
        actionName: 'Mitgliedschaft anfragen',
        action: 'groups/requestMembership',
        params: { groupID },
      },
      { root: true }
    )
  },
  requestMembership({ commit }, { groupID }) {
    // API request to be implemented here
    commit('setMType', { groupID, mType: 'pending' })
  },

  alertCancelMembership({ commit, getters }, { groupID }) {
    const message =
      'Willst du die Gruppe ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' wirklich verlassen? Für einen erneuten Beitritt musst du dann erst wieder eine Anfrage an die Administrator:innen der Gruppe stellen.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Gruppe verlassen',
        message,
        defaultToAction: false,
        actionName: 'Gruppe verlassen',
        action: 'groups/cancelMembership',
        params: { groupID },
      },
      { root: true }
    )
  },
  cancelMembership({ commit }, { groupID }) {
    // API request to be implemented here
    commit('setMType', { groupID, mType: '' })
  },

  alertCancelMembershipRequest({ commit, getters }, { groupID }) {
    const message =
      'Du bist noch nicht Mitglied von der Gruppe ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      '. Willst du deine Anfrage auf Mitgliedschaft wirklich zurückziehen?'
    commit(
      'alertbox/showAlert',
      {
        title: 'Anfrage zurückziehen',
        message,
        defaultToAction: false,
        actionName: 'Anfrage zurückziehen',
        action: 'groups/cancelMembershipRequest',
        params: { groupID },
      },
      { root: true }
    )
  },
  cancelMembershipRequest({ commit }, { groupID }) {
    // API request to be implemented here
    commit('setMType', { groupID, mType: '' })
  },

  alertAddGuest({ commit, getters }, { name, email, groupID }) {
    const message =
      'Möchtest du ' +
      name +
      ' wirklich zu ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' hinzufügen? Sie/er ist dann auf der Mailingliste der Gruppe eingetragen. ' +
      'Für Zugriff auf weitere SOG-Tools (Wiki, Mattermost, etc.) muss sie/er aber reguläres Mitglied werden.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Gast hinzufügen',
        message,
        defaultToAction: true,
        actionName: 'Hinzufügen',
        action: 'groups/addGuest',
        params: { name, email, groupID },
      },
      { root: true }
    )
  },
  addGuest({ commit }, { name, email, groupID }) {
    // API request to be implemented here
    commit('addGuest', { name, email, groupID })
  },

  alertRemoveGuest({ commit, getters }, { uid, groupID }) {
    const message =
      'Möchtest du ' +
      getters.allGroups
        .find((group) => group.id === groupID)
        .guests.find((g) => g.uid === uid).name +
      ' wirklich aus ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' entfernen? Sie/er ist dann nicht mehr auf der Mailingliste der Gruppe eingetragen.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Gast entfernen',
        message,
        defaultToAction: false,
        actionName: 'Entfernen',
        action: 'groups/removeGuest',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  removeGuest({ commit }, { uid, groupID }) {
    // API request to be implemented here
    commit('removeGuest', { uid, groupID })
  },

  alertRemoveMember({ commit, getters }, { uid, groupID }) {
    const message =
      'Möchtest du ' +
      getters.allGroups
        .find((group) => group.id === groupID)
        .members.find((g) => g.uid === uid).name +
      ' wirklich aus ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' entfernen? Sie/er hat dann keinen Zugriff mehr auf das Mattermost-Team und den Nextcloud-Ordner' +
      ' und bekommt keine Mails mehr über die Mailingliste.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Mitglied entfernen',
        message,
        defaultToAction: false,
        actionName: 'Entfernen',
        action: 'groups/removeMember',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  removeMember({ commit }, { uid, groupID }) {
    // API request to be implemented here
    commit('removeMember', { uid, groupID })
  },

  addMember({ commit, rootGetters }, { uid, groupID }) {
    // API request to be implemented here
    const user = rootGetters['users/all'].find((u) => u.uid === uid)
    commit('addMember', { user, groupID })
  },

  alertMakeAdmin({ commit, getters }, { uid, groupID }) {
    const message =
      'Möchtest du ' +
      getters.allGroups
        .find((group) => group.id === groupID)
        .members.find((g) => g.uid === uid).name +
      ' wirklich zur Koordinator:in von ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' ernennen? Sie/er kann dann die Mitglieder der Gruppe bearbeiten' +
      ' und weitere Mitglieder zu Koordinator:innen ernennen.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Mitglied zur Koordinator:in befördern',
        message,
        defaultToAction: false,
        actionName: 'Befördern',
        action: 'groups/makeAdmin',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  makeAdmin({ commit, rootGetters }, { uid, groupID }) {
    // API request to be implemented here
    commit('removeMember', { uid, groupID })
    const user = rootGetters['users/all'].find((u) => u.uid === uid)
    commit('addAdmin', { user, groupID })
  },

  alertRevokeAdmin({ commit, getters }, { uid, groupID }) {
    if (
      getters.allGroups.find((group) => group.id === groupID).admins.length ===
      1
    ) {
      const userName = getters.allGroups
        .find((group) => group.id === groupID)
        .admins.find((g) => g.uid === uid).name
      const message =
        userName +
        ' ist die/der letzte Koordinator:in von ' +
        getters.allGroups.find((group) => group.id === groupID).name +
        '. Füge zunächst weitere Koordinator:innen hinzu, bevor du ' +
        userName +
        ' entfernst.'
      commit(
        'alertbox/showAlert',
        {
          title: 'Koordinator:innen-Rechte entziehen',
          message,
          defaultToAction: true,
          actionName: 'OK',
          showCancel: false,
          action: '',
          params: { uid, groupID },
        },
        { root: true }
      )
    } else {
      const message =
        'Möchtest du ' +
        getters.allGroups
          .find((group) => group.id === groupID)
          .admins.find((g) => g.uid === uid).name +
        ' die Koordinator:innen-Rechte für ' +
        getters.allGroups.find((group) => group.id === groupID).name +
        ' entziehen? Sie/er kann dann die Mitglieder der Gruppe nicht mehr bearbeiten' +
        ' und keine weiteren Mitglieder zu Koordinator:innen ernennen.'
      commit(
        'alertbox/showAlert',
        {
          title: 'Koordinator:innen-Rechte entziehen',
          message,
          defaultToAction: false,
          actionName: 'Entziehen',
          action: 'groups/revokeAdmin',
          params: { uid, groupID },
        },
        { root: true }
      )
    }
  },
  revokeAdmin({ commit, rootGetters }, { uid, groupID }) {
    // API request to be implemented here
    commit('removeAdmin', { uid, groupID })
    const user = rootGetters['users/all'].find((u) => u.uid === uid)
    commit('addMember', { user, groupID })
  },
}
