const compareUsers = (a, b) => {
  const nameA = a.name.toUpperCase()
  const nameB = b.name.toUpperCase()
  if (nameA > nameB) return 1
  if (nameB > nameA) return -1
  else return 0
}

export const state = () => ({
  allUsers: [],
})

export const getters = {
  all: (state) => [...state.allUsers].sort(compareUsers),
}

export const mutations = {
  setAllUsers(state, users) {
    state.allUsers = users
  },
}
