import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'dashboard',
    paths: [
      'groups.groupList',
      'users.users',
      'user.name',
      'user.username',
      'user.sogMail',
      'user.altMail',
      'user.darkMode',
    ],
  })(store)
}
