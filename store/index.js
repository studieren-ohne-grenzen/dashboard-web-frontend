const mType = {
  other: 0,
  member: 1,
  admin: 2,
}

const gType = {
  other: 0,
  lokalgruppe: 1,
  projektgruppe: 2,
  bundesweit: 3,
}

const compareGroups = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA > nameB) return 1
  if (nameB > nameA) return -1
  else return 0
}

export const state = () => ({
  groupList: [
    {
      name: 'AG Design',
      membership: mType.member,
      groupType: gType.bundesweit,
    },
    {
      name: 'LG Aachen',
      membership: mType.member,
      groupType: gType.lokalgruppe,
    },
    {
      name: 'AG Kongo - Mweso Stipendienprogramm',
      membership: mType.other,
      groupType: gType.projektgruppe,
    },
    {
      name: 'LG Konstanz',
      membership: mType.other,
      groupType: gType.lokalgruppe,
    },
    {
      name: 'Ressort IT',
      membership: mType.member,
      groupType: gType.bundesweit,
    },
    {
      name: 'AG Öffentlichkeitsarbeit',
      membership: mType.other,
      groupType: gType.bundesweit,
    },
    {
      name: 'AG Ruanda',
      membership: mType.other,
      groupType: gType.projektgruppe,
    },
  ],
})

export const getters = {
  allGroupsLokal(state) {
    return [
      ...state.groupList.filter(
        (group) => group.groupType === gType.lokalgruppe
      ),
    ].sort(compareGroups)
  },
  allGroupsProjekt(state) {
    return [
      ...state.groupList.filter(
        (group) => group.groupType === gType.projektgruppe
      ),
    ].sort(compareGroups)
  },
  allGroupsBund(state) {
    return [
      ...state.groupList.filter(
        (group) => group.groupType === gType.bundesweit
      ),
    ].sort(compareGroups)
  },
  allGroupsOther(state) {
    return [
      ...state.groupList.filter((group) => group.groupType === gType.other),
    ].sort(compareGroups)
  },
  allGroups(state) {
    return [...state.groupList].sort(compareGroups)
  },
  myGroups(state) {
    return [
      ...state.groupList.filter(
        (group) =>
          group.membership === mType.member || group.membership === mType.admin
      ),
    ].sort(compareGroups)
  },
  adminGroups(state) {
    return [
      ...state.groupList.filter((group) => group.membership === mType.admin),
    ].sort(compareGroups)
  },
}
