export const state = () => ({
  name: 'Bertrand Arthur William Russell',
  username: 'bertrand.russell',
  password: '1234secure',
  sogMail: 'bertrand.russell@studieren-ohne-grenzen.org',
  alternativeMail: 'bertrand@russell.info',
})

export const getters = {
  name: (state) => state.name,
  username: (state) => state.username,
  // ToDo better password handling!
  password: (state) => state.password,
  sogMail: (state) => state.sogMail,
  alternativeMail: (state) => state.alternativeMail,
}
