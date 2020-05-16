export default () => ({
  groupList: [
    {
      name: 'AG Design',
      membership: 'member',
      groupType: 'bundesweit',
    },
    {
      name: 'LG Aachen',
      membership: 'member',
      groupType: 'lokalgruppe',
    },
    {
      name: 'AG Kongo - Mweso Stipendienprogramm',
      membership: '',
      groupType: 'projektgruppe',
    },
    {
      name: 'LG Konstanz',
      membership: 'admin',
      groupType: 'lokalgruppe',
    },
    {
      name: 'Ressort IT',
      membership: 'pending',
      groupType: 'bundesweit',
    },
    {
      name: 'AG Öffentlichkeitsarbeit',
      membership: '',
      groupType: 'bundesweit',
    },
    {
      name: 'AG Ruanda',
      membership: '',
      groupType: 'projektgruppe',
    },
  ],
  requests: [],
  alert: {
    title: 'Default Title',
    active: false,
    message: 'Default Message',
    defaultToAction: false,
    showCancel: true,
    actionName: 'OK',
    cancelName: 'Abbrechen',
  },
})
