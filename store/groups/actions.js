export default {
  alertRequestMembership({ commit, getters }, { groupID }) {
    const groupName = getters.allGroups.find((group) => group.id === groupID)
      .name
    const title = 'Gruppenmitgliedschaft anfragen'
    const message =
      'Eine Mitgliedschaft wird bei den Administratoren der ' +
      groupName +
      ' angefragt. Sie müssen dich freischalten, bevor du Mitglied wirst.'
    const defaultToAction = true
    const actionName = 'Mitgliedschaft anfragen'
    commit(
      'alertbox/showAlert',
      {
        title,
        message,
        defaultToAction,
        actionName,
        action: 'groups/requestMembership',
        params: { groupID },
      },
      { root: true }
    )
  },
  requestMembership({ commit }, { groupID }) {
    commit('setMType', { groupID, mType: 'pending' })
  },
}
