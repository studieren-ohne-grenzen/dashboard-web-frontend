export default {
  setMType(state, { groupID, mType }) {
    state.groupList.find((group) => group.id === groupID).membership = mType
  },
}
