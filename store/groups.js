export const state = () => ({
  groupList: [
    {
      id: 1,
      name: 'AG Design',
      membership: 'member',
      groupType: 'bundesweit',
    },
    {
      id: 2,
      name: 'LG Aachen',
      membership: 'member',
      groupType: 'lokalgruppe',
    },
    {
      id: 3,
      name: 'AG Kongo - Mweso Stipendienprogramm',
      membership: '',
      groupType: 'projektgruppe',
    },
    {
      id: 4,
      name: 'LG Konstanz',
      membership: 'admin',
      groupType: 'lokalgruppe',
    },
    {
      id: 5,
      name: 'Ressort IT',
      membership: 'pending',
      groupType: 'bundesweit',
    },
    {
      id: 6,
      name: 'AG Öffentlichkeitsarbeit',
      membership: '',
      groupType: 'bundesweit',
    },
    {
      id: 7,
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
  allGroupsLokal: (state) =>
    [
      ...state.groupList.filter((group) => group.groupType === 'lokalgruppe'),
    ].sort(compareGroups),

  allGroupsProjekt: (state) =>
    [
      ...state.groupList.filter((group) => group.groupType === 'projektgruppe'),
    ].sort(compareGroups),

  allGroupsBund: (state) =>
    [
      ...state.groupList.filter((group) => group.groupType === 'bundesweit'),
    ].sort(compareGroups),

  allGroupsOther: (state) =>
    [...state.groupList.filter((group) => group.groupType === 'other')].sort(
      compareGroups
    ),

  allGroupsByCategory: (_, getters) => [
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
  ],

  allGroups: (state) => [...state.groupList].sort(compareGroups),

  myGroups: (state) =>
    [...state.groupList.filter((group) => group.membership !== '')].sort(
      compareGroups
    ),

  adminGroups: (state) =>
    [...state.groupList.filter((group) => group.membership === 'admin')].sort(
      compareGroups
    ),

  requests: (state) => state.requests,
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
