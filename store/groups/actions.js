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
}
