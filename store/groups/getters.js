import compareByName from '~/components/compare'

export default {
  currentGroupID: (state) => state.currentGroupID,

  currentGroup: (state, getters) =>
    [
      ...state.groupList.filter((group) => group.id === getters.currentGroupID),
    ][0],

  allGroupsLokal: (state) =>
    [
      ...state.groupList.filter((group) => group.groupType === 'lokalgruppe'),
    ].sort(compareByName),

  allGroupsProjekt: (state) =>
    [
      ...state.groupList.filter((group) => group.groupType === 'projektarbeit'),
    ].sort(compareByName),

  allGroupsBund: (state) =>
    [
      ...state.groupList.filter((group) => group.groupType === 'bundesweit'),
    ].sort(compareByName),

  allGroupsOther: (state) =>
    [
      ...state.groupList.filter(
        (group) =>
          group.groupType !== 'lokalgruppe' &&
          group.groupType !== 'projektarbeit' &&
          group.groupType !== 'bundesweit'
      ),
    ].sort(compareByName),

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

  allGroups: (state) => [...state.groupList].sort(compareByName),

  myGroups: (state) =>
    [...state.groupList.filter((group) => group.membership !== '')].sort(
      compareByName
    ),

  adminGroups: (state) =>
    [...state.groupList.filter((group) => group.membership === 'admin')].sort(
      compareByName
    ),

  requests: (state) => state.requests,

  loading: (state) => state.groupsAreLoading,
}
