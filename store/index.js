const gType = {
  other: 0,
  member: 1,
  admin: 2
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
    { name: 'AG Design', type: gType.member },
    { name: 'LG Aachen', type: gType.admin },
    { name: 'AG Kongo - Mweso Stipendienprogramm', type: gType.other },
    { name: 'LG Konstanz', type: gType.other },
    { name: 'Ressort IT', type: gType.member },
    { name: 'AG Öffentlichkeitsarbeit', type: gType.other },
    { name: 'AG Ruanda', type: gType.other }
  ]
})

export const getters = {
  allGroups(state) {
    return [...state.groupList].sort(compareGroups)
  },
  myGroups(state) {
    return [
      ...state.groupList.filter(
        (groupList) =>
          groupList.type === gType.member || groupList.type === gType.admin
      )
    ].sort(compareGroups)
  },
  adminGroups(state) {
    return [
      ...state.groupList.filter((groupList) => groupList.type === gType.admin)
    ].sort(compareGroups)
  }
}
