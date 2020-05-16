const compareGroups = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA > nameB) return 1
  if (nameB > nameA) return -1
  else return 0
}

export default {
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
  allGroupsByCategory(state, getters) {
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
