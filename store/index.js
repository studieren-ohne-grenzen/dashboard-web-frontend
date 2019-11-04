const gType = {
  other: 0,
  member: 1,
  admin: 2
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
    return state.groupList
  },
  myGroups(state) {
    return state.groupList.filter(
      (groupList) =>
        groupList.type === gType.member || groupList.type === gType.admin
    )
  },
  adminGroups(state) {
    return state.groupList.filter((groupList) => groupList.type === gType.admin)
  }
}
