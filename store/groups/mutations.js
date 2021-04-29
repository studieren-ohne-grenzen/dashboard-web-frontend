export default {
  updateGroups(state, groups) {
    for (const g in state.groupList) {
      const pos = groups.map((g) => g.id).indexOf(state.groupList[g].id)
      if (pos >= 0) {
        state.groupList[g].name = groups[pos].name
        state.groupList[g].membership = groups[pos].membership
        state.groupList[g].groupType = groups[pos].groupType
        groups.splice(pos, 1)
      }
    }
    for (const g in groups) {
      state.groupList.push(groups[g])
    }
  },
  setAdminOfManyGroups(state, value) {
    state.adminOfManyGroups = value
  },
  setCurrentGroupID(state, groupID) {
    state.currentGroupID = groupID
  },
  startLoading(state) {
    state.groupsAreLoading = true
  },
  stopLoading(state) {
    state.groupsAreLoading = false
  },
  groupSetUsers(
    state,
    {
      groupID,
      admins,
      members,
      guests,
      activePendingMembers,
      inactivePendingMembers,
    }
  ) {
    const group = state.groupList.find((group) => group.id === groupID)
    if (admins) group.admins = admins
    if (members) group.members = members
    if (guests) group.guests = guests
    if (activePendingMembers) group.activePendingMembers = activePendingMembers
    if (inactivePendingMembers)
      group.inactivePendingMembers = inactivePendingMembers
  },
  setMType(state, { groupID, mType }) {
    state.groupList.find((group) => group.id === groupID).membership = mType
  },
  addGuest(state, { name, email, groupID }) {
    const guest = {
      name,
      email,
      uid: 'guest.' + name.toLowerCase().replace(/ /i, '.'),
    }
    state.groupList.find((group) => group.id === groupID).guests.push(guest)
  },
  removeGuest(state, { uid, groupID }) {
    state.groupList.find(
      (group) => group.id === groupID
    ).guests = state.groupList
      .find((group) => group.id === groupID)
      .guests.filter((g) => g.uid !== uid)
  },
  removeMember(state, { uid, groupID }) {
    state.groupList.find(
      (group) => group.id === groupID
    ).members = state.groupList
      .find((group) => group.id === groupID)
      .members.filter((g) => g.uid !== uid)
  },
  addMember(state, { user, groupID }) {
    state.groupList.find((group) => group.id === groupID).members.push(user)
  },
  removeAdmin(state, { uid, groupID }) {
    state.groupList.find(
      (group) => group.id === groupID
    ).admins = state.groupList
      .find((group) => group.id === groupID)
      .admins.filter((g) => g.uid !== uid)
  },
  addAdmin(state, { user, groupID }) {
    state.groupList.find((group) => group.id === groupID).admins.push(user)
  },
  removeActivePendingMember(state, { uid, groupID }) {
    state.groupList.find(
      (group) => group.id === groupID
    ).activePendingMembers = state.groupList
      .find((group) => group.id === groupID)
      .activePendingMembers.filter((g) => g.uid !== uid)
  },
  removeInactivePendingMember(state, { uid, groupID }) {
    state.groupList.find(
      (group) => group.id === groupID
    ).inactivePendingMembers = state.groupList
      .find((group) => group.id === groupID)
      .inactivePendingMembers.filter((g) => g.uid !== uid)
  },
  setRequests(state, requests) {
    state.requests = requests
  },
}
