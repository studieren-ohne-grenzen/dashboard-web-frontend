import compareByName from '~/components/compare'

export const state = () => ({
  allUsers: [],
})

export const getters = {
  all: (state) => [...state.allUsers].sort(compareByName),
}

export const mutations = {
  setAllUsers(state, users) {
    state.allUsers = users
  },
}
