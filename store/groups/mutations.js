export default {
  setGroups(state, groups) {
    state.groupList = groups
  },
  groupSetUsers(state, { groupID, admins, members, guests, pendingMembers }) {
    const group = state.groupList.find((group) => group.id === groupID)
    group.admins = admins
    group.members = members
    group.guests = guests
    group.pendingMembers = pendingMembers
  },
  setMType(state, { groupID, mType }) {
    state.groupList.find((group) => group.id === groupID).membership = mType
  },
  addGuest(state, { name, email, groupID }) {
    const guest = {
      name,
      email,
      uid: 'guest' + name.toLowerCase().replace(/ /i, '.'),
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
}
