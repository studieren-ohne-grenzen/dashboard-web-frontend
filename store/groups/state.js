export default () => ({
  groupList: [
    {
      id: 1,
      name: 'AG Design',
      membership: 'member',
      groupType: 'bundesweit',
      members: [],
      admins: [
        { name: 'Max Frisch', email: 'max.frisch@studieren-ohne-grenzen.org' },
        {
          name: 'Herta Müller',
          email: 'herta.mueller@studieren-ohne-grenzen.org',
          uid: 'herta.mueller',
        },
      ],
    },
    {
      id: 2,
      name: 'LG Aachen',
      membership: 'member',
      groupType: 'lokalgruppe',
      members: [],
      admins: [
        {
          name: 'Imre Kertész',
          email: 'imre.kertesz@studieren-ohne-grenzen.org',
          uid: 'imre.kertesz',
        },
      ],
    },
    {
      id: 3,
      name: 'AG Kongo - Mweso Stipendienprogramm',
      membership: '',
      groupType: 'projektgruppe',
      members: [],
      admins: [
        {
          name: 'Jean-Paul Sartre',
          email: 'jean.paul.sartre@studieren-ohne-grenzen.org',
          uid: 'jean.paul.sartre',
        },
      ],
    },
    {
      id: 4,
      name: 'LG Konstanz',
      membership: 'admin',
      groupType: 'lokalgruppe',
      members: [
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
      ],
      admins: [
        {
          name: 'Elfriede Jelinek',
          email: 'elfriede.jelinek@studieren-ohne-grenzen.org',
          uid: 'elfriede.jelinek',
        },
      ],
    },
    {
      id: 5,
      name: 'Ressort IT',
      membership: 'pending',
      groupType: 'bundesweit',
      members: [],
      admins: [
        {
          name: 'Günter Grass',
          email: 'guenter.grass@studieren-ohne-grenzen.org',
          uid: 'guenter.grass',
        },
      ],
    },
    {
      id: 6,
      name: 'AG Öffentlichkeitsarbeit',
      membership: 'admin',
      groupType: 'bundesweit',
      members: [],
      admins: [
        {
          name: 'Heinrich Böll',
          email: 'heinrich.boell@studieren-ohne-grenzen.org',
          uid: 'heinrich.boell',
        },
      ],
    },
    {
      id: 7,
      name: 'AG Ruanda',
      membership: '',
      groupType: 'projektgruppe',
      members: [],
      admins: [
        {
          name: 'Pablo Neruda',
          email: 'pablo.neruda@studieren-ohne-grenzen.org',
          uid: 'pablo.neruda',
        },
      ],
    },
  ],
  requests: [],
})
