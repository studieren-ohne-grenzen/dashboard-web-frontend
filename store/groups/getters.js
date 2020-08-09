const compareGroups = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA > nameB) return 1
  if (nameB > nameA) return -1
  else return 0
}

export default {
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
    [
      ...state.groupList.filter(
        (group) =>
          group.groupType !== 'lokalgruppe' &&
          group.groupType !== 'projektgruppe' &&
          group.groupType !== 'bundesweit'
      ),
    ].sort(compareGroups),

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
