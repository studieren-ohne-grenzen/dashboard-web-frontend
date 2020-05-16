export default {
  requestGroupMembership({ commit }, groupName) {
    groupName = groupName || 'Gruppe'
    const title = 'Gruppenmitgliedschaft anfragen'
    const message =
      'Eine Mitgliedschaft wird bei den Administratoren der ' +
      groupName +
      ' angefragt. Sie müssen dich freischalten, bevor du Mitglied wirst.'
    const defaultToAction = true
    const actionName = 'Mitgliedschaft anfragen'
    commit('showAlert', { title, message, defaultToAction, actionName })
  },
}
