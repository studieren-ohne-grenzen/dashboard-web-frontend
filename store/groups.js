export const state = () => ({
  groupList: [
    {
      name: 'AG Design',
      membership: 'member',
      groupType: 'bundesweit',
    },
    {
      name: 'LG Aachen',
      membership: 'member',
      groupType: 'lokalgruppe',
    },
    {
      name: 'AG Kongo - Mweso Stipendienprogramm',
      membership: '',
      groupType: 'projektgruppe',
    },
    {
      name: 'LG Konstanz',
      membership: 'admin',
      groupType: 'lokalgruppe',
    },
    {
      name: 'Ressort IT',
      membership: 'pending',
      groupType: 'bundesweit',
    },
    {
      name: 'AG Öffentlichkeitsarbeit',
      membership: '',
      groupType: 'bundesweit',
    },
    {
      name: 'AG Ruanda',
      membership: '',
      groupType: 'projektgruppe',
    },
  ],
  requests: [],
})

const compareGroups = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA > nameB) return 1
  if (nameB > nameA) return -1
  else return 0
}

export const getters = {
  allGroupsLokal(state) {
    return [
      ...state.groupList.filter((group) => group.groupType === 'lokalgruppe'),
    ].sort(compareGroups)
  },
  allGroupsProjekt(state) {
    return [
      ...state.groupList.filter((group) => group.groupType === 'projektgruppe'),
    ].sort(compareGroups)
  },
  allGroupsBund(state) {
    return [
      ...state.groupList.filter((group) => group.groupType === 'bundesweit'),
    ].sort(compareGroups)
  },
  allGroupsOther(state) {
    return [
      ...state.groupList.filter((group) => group.groupType === 'other'),
    ].sort(compareGroups)
  },
  allGroupsByCategory(_, getters) {
    return [
      {
        name: 'Bundesweite Gruppen',
        getter: getters.allGroupsBund,
      },
      {
        name: 'Projektgruppen',
        getter: getters.allGroupsProjekt,
      },
      {
        name: 'Lokalgruppen',
        getter: getters.allGroupsLokal,
      },
      {
        name: 'Andere Gruppen',
        getter: getters.allGroupsOther,
      },
    ]
  },
  allGroups(state) {
    return [...state.groupList].sort(compareGroups)
  },
  myGroups(state) {
    return [...state.groupList.filter((group) => group.membership !== '')].sort(
      compareGroups
    )
  },
  adminGroups(state) {
    return [
      ...state.groupList.filter((group) => group.membership === 'admin'),
    ].sort(compareGroups)
  },
  requests(state) {
    return state.requests
  },
}

export const actions = {
  requestGroupMembership({ commit }, groupName) {
    groupName = groupName || 'Gruppe'
    const title = 'Gruppenmitgliedschaft anfragen'
    const message =
      'Eine Mitgliedschaft wird bei den Administratoren der ' +
      groupName +
      ' angefragt. Sie müssen dich freischalten, bevor du Mitglied wirst.'
    const defaultToAction = true
    const actionName = 'Mitgliedschaft anfragen'
    commit(
      'alertbox/showAlert',
      { title, message, defaultToAction, actionName },
      { root: true }
    )
  },
}
