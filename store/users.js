export const state = () => ({
  users: [
    {
      name: 'Jean-Paul Sartre',
      email: 'jean.paul.sartre@studieren-ohne-grenzen.org',
      uid: 'jean.paul.sartre',
    },
    {
      name: 'Imre Kertész',
      email: 'imre.kertesz@studieren-ohne-grenzen.org',
      uid: 'imre.kertesz',
    },
    {
      name: 'Max Frisch',
      email: 'max.frisch@studieren-ohne-grenzen.org',
      uid: 'max.frisch',
    },
    {
      name: 'Herta Müller',
      email: 'herta.mueller@studieren-ohne-grenzen.org',
      uid: 'herta.mueller',
    },
    {
      name: 'Elfriede Jelinek',
      email: 'elfriede.jelinek@studieren-ohne-grenzen.org',
      uid: 'elfriede.jelinek',
    },
    {
      name: 'Günter Grass',
      email: 'guenter.grass@studieren-ohne-grenzen.org',
      uid: 'guenter.grass',
    },
    {
      name: 'Heinrich Böll',
      email: 'heinrich.boell@studieren-ohne-grenzen.org',
      uid: 'heinrich.boell',
    },
    {
      name: 'Pablo Neruda',
      email: 'pablo.neruda@studieren-ohne-grenzen.org',
      uid: 'pablo.neruda',
    },
  ],
})

export const getters = {
  all: (state) => state.users,
}
