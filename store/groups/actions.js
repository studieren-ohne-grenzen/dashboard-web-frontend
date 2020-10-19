export default {
  loadGroups({ commit, getters }) {
    commit('startLoading')
    Promise.all([
      this.$axios.get('api/groups'),
      this.$axios.get('api/my_groups'),
    ])
      .then((responses) => {
        let groups = responses[0].data.map((g) => {
          return {
            name: g.cn,
            id: g.ou,
            groupType: g.businessCategory,
            admins: [],
            members: [],
            guests: [],
            membership: '',
          }
        })
        for (const myGroup in responses[1].data) {
          groups = groups.map((g) => {
            if (responses[1].data[myGroup].ou === g.id) {
              g.membership = responses[1].data[myGroup].membership
            }
            return g
          })
        }
        commit('updateGroups', groups)
        commit('stopLoading')
        const adminGroups = getters.adminGroups
        const requests = []
        if (adminGroups.length > 0) {
          for (const i in adminGroups) {
            requests.push(
              this.$axios.get(
                'api/groups/' + adminGroups[i].id + '/active_pending_members'
              )
            )
            requests.push(
              this.$axios.get(
                'api/groups/' + adminGroups[i].id + '/inactive_pending_members'
              )
            )
          }
          Promise.all(requests)
            .then((responses) => {
              const membershipRequests = {}
              for (const i in responses) {
                if (responses[i].data.length) {
                  const id = adminGroups[Math.floor(i / 2)].id
                  const pendingMembers = responses[i].data.map((p) => {
                    return {
                      name: p.cn,
                      email: p.mail,
                      uid: p.uid,
                    }
                  })
                  if (id in membershipRequests) {
                    membershipRequests[id] += pendingMembers.length
                  } else {
                    membershipRequests[id] = pendingMembers.length
                  }
                  if (i % 2 === 0)
                    commit('groupSetUsers', {
                      groupID: id,
                      activePendingMembers: pendingMembers,
                    })
                  else {
                    commit('groupSetUsers', {
                      groupID: id,
                      inactivePendingMembers: pendingMembers,
                    })
                  }
                }
              }
              const groupsWithRequests = []
              for (const id in membershipRequests) {
                groupsWithRequests.push({
                  id,
                  count: membershipRequests[id],
                  name: adminGroups.find((group) => group.id === id).name,
                })
              }
              commit('setRequests', groupsWithRequests)
            })
            .catch((errors) => {
              const message =
                'Fehler beim Laden der offenen Anfragen: \n' + errors
              commit(
                'alertbox/showAlert',
                {
                  title: 'Fehler',
                  message,
                  defaultToAction: false,
                  showCancel: false,
                },
                { root: true }
              )
            })
        }
      })
      .catch((errors) => {
        const message = 'Fehler beim Laden der Gruppen: \n' + errors
        commit(
          'alertbox/showAlert',
          {
            title: 'Fehler',
            message,
            defaultToAction: false,
            showCancel: false,
          },
          { root: true }
        )
      })
  },

  loadGroupAsUnknown({ dispatch, getters, commit }) {
    commit('startLoading')
    Promise.all([
      this.$axios.get('api/groups'),
      this.$axios.get('api/my_groups'),
    ])
      .then((responses) => {
        let groups = responses[0].data.map((g) => {
          return {
            name: g.cn,
            id: g.ou,
            groupType: g.businessCategory,
            admins: [],
            members: [],
            guests: [],
            membership: '',
          }
        })
        for (const myGroup in responses[1].data) {
          groups = groups.map((g) => {
            if (responses[1].data[myGroup].ou === g.id) {
              g.membership = responses[1].data[myGroup].membership
            }
            return g
          })
        }
        commit('updateGroups', groups)
        if (getters.currentGroup.membership === 'admin') {
          dispatch('loadGroupAsAdmin')
        } else {
          dispatch('loadGroupDetails')
        }
      })
      .catch((errors) => {
        const message = 'Fehler beim Laden der Gruppen: \n' + errors
        commit(
          'alertbox/showAlert',
          {
            title: 'Fehler',
            message,
            defaultToAction: false,
            showCancel: false,
          },
          { root: true }
        )
      })
  },

  async loadGroupDetails({ commit, getters }) {
    commit('startLoading')
    const groupID = getters.currentGroupID
    try {
      const data = await this.$axios.$get('api/groups/' + groupID + '/owners')
      const admins = data.map((u) => {
        return {
          name: u.cn,
          email: u.mail,
          uid: u.uid,
        }
      })
      commit('groupSetUsers', {
        groupID,
        admins,
      })
      commit('stopLoading')
    } catch (errors) {
      const message = 'Fehler beim Laden der Gruppe: \n' + errors
      commit(
        'alertbox/showAlert',
        {
          title: 'Fehler',
          message,
          defaultToAction: false,
          showCancel: false,
        },
        { root: true }
      )
    }
  },

  loadGroupAsAdmin({ commit, getters }) {
    commit('startLoading')
    const groupID = getters.currentGroupID
    Promise.all([
      this.$axios.get('api/groups/' + groupID + '/owners'),
      this.$axios.get('api/groups/' + groupID + '/members'),
      this.$axios.get('api/groups/' + groupID + '/guests'),
      this.$axios.get('api/users'),
      this.$axios.get('api/groups/' + groupID + '/active_pending_members'),
      this.$axios.get('api/groups/' + groupID + '/inactive_pending_members'),
    ])
      .then((responses) => {
        const admins = responses[0].data.map((u) => {
          return {
            name: u.cn,
            email: u.mail,
            uid: u.uid,
          }
        })
        const members = responses[1].data
          .map((u) => {
            return {
              name: u.cn,
              email: u.mail,
              uid: u.uid,
            }
          })
          .filter((u) => {
            for (const a in admins) {
              if (admins[a].uid === u.uid) return false
            }
            return true
          })
        const guests = responses[2].data.map((u) => {
          return {
            name: u.cn,
            email: u.mail,
            uid: u.uid,
          }
        })
        const allUsers = responses[3].data.map((u) => {
          return {
            name: u.cn,
            email: u.mail,
            uid: u.uid,
          }
        })
        const activePendingMembers = responses[4].data.map((u) => {
          return {
            name: u.cn,
            email: u.mail,
            uid: u.uid,
          }
        })
        const inactivePendingMembers = responses[5].data.map((u) => {
          return {
            name: u.cn,
            email: u.mail,
            uid: u.uid,
          }
        })
        commit('users/setAllUsers', allUsers, { root: true })
        commit('groupSetUsers', {
          groupID,
          admins,
          members,
          guests,
          activePendingMembers,
          inactivePendingMembers,
        })
        commit('stopLoading')
      })
      .catch((errors) => {
        const message = 'Fehler beim Laden der Gruppe: \n' + errors
        commit(
          'alertbox/showAlert',
          {
            title: 'Fehler',
            message,
            defaultToAction: false,
            showCancel: false,
          },
          { root: true }
        )
      })
  },

  alertRequestMembership({ commit, getters }, { groupID }) {
    const message =
      'Eine Mitgliedschaft wird bei den Koordinator:innen der ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' angefragt. Sie müssen dich freischalten, bevor du Mitglied wirst.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Gruppenmitgliedschaft anfragen',
        message,
        defaultToAction: true,
        actionName: 'Mitgliedschaft anfragen',
        action: 'groups/requestMembership',
        params: { groupID },
      },
      { root: true }
    )
  },
  async requestMembership({ commit, rootGetters }, { groupID }) {
    try {
      const uid = rootGetters['user/username']
      await this.$axios.post('api/groups/' + groupID + '/request_access', {
        uid,
      })
      commit('setMType', { groupID, mType: 'pending' })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message: 'Kommunikationsfehler Anfragen der Mitgliedschaft: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },
  alertInfoAllgemein({ commit }) {
    const message =
      'Alle Mitglieder von Studieren Ohne Grenzen sind Mitglied der Gruppe Allgemein. Daher kannst du die Gruppe nicht verlassen. ' +
      'Wenn du den Verein verlassen möchtest, wende dich bitte über mitglieder@studieren-ohne-grenzen.org an den Vorstand. '
    commit(
      'alertbox/showAlert',
      {
        title: 'Gruppe verlassen nicht möglich',
        message,
        defaultToAction: true,
        showCancel: false,
      },
      { root: true }
    )
  },
  alertCancelMembership({ commit, getters }, { groupID }) {
    const message =
      'Willst du die Gruppe ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' wirklich verlassen? Für einen erneuten Beitritt musst du dann erst wieder eine Anfrage an die Koordinator:innen der Gruppe stellen.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Gruppe verlassen',
        message,
        defaultToAction: false,
        actionName: 'Gruppe verlassen',
        action: 'groups/cancelMembership',
        params: { groupID },
      },
      { root: true }
    )
  },
  async cancelMembership({ commit, rootGetters }, { groupID }) {
    try {
      const uid = rootGetters['user/username']
      await this.$axios.post('api/groups/' + groupID + '/remove_member', {
        uid,
      })
      commit('setMType', { groupID, mType: '' })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message: 'Kommunikationsfehler beim Verlassen der Gruppe: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertCancelMembershipRequest({ commit, getters }, { groupID }) {
    const message =
      'Du bist noch nicht Mitglied von der Gruppe ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      '. Willst du deine Anfrage auf Mitgliedschaft wirklich zurückziehen?'
    commit(
      'alertbox/showAlert',
      {
        title: 'Anfrage zurückziehen',
        message,
        defaultToAction: false,
        actionName: 'Anfrage zurückziehen',
        action: 'groups/cancelMembershipRequest',
        params: { groupID },
      },
      { root: true }
    )
  },
  async cancelMembershipRequest({ commit, rootGetters }, { groupID }) {
    try {
      const uid = rootGetters['user/username']
      await this.$axios.post(
        'api/groups/' + groupID + '/remove_pending_member',
        { uid }
      )
      commit('setMType', { groupID, mType: '' })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message: 'Kommunikationsfehler beim Abbrechen der Anfrage: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertDeclineMembershipRequest({ commit, getters }, { uid, groupID }) {
    const name = getters.allGroups
      .find((group) => group.id === groupID)
      .activePendingMembers.find((member) => member.uid === uid).name
    const message =
      name +
      ' ist noch nicht Mitglied der Gruppe ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      '. Willst du die Anfrage auf Mitgliedschaft wirklich ablehnen?'
    commit(
      'alertbox/showAlert',
      {
        title: 'Anfrage ablehnen',
        message,
        defaultToAction: false,
        actionName: 'Anfrage ablehnen',
        action: 'groups/declineMembershipRequest',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  async declineMembershipRequest({ commit }, { uid, groupID }) {
    try {
      await this.$axios.post(
        'api/groups/' + groupID + '/remove_pending_member',
        { uid }
      )
      commit('removeActivePendingMember', { uid, groupID })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message: 'Kommunikationsfehler beim Ablehnen der Anfrage: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertAddActivePending({ commit, getters }, { uid, groupID }) {
    const name = getters.allGroups
      .find((group) => group.id === groupID)
      .activePendingMembers.find((member) => member.uid === uid).name
    const message =
      'Möchtest du ' +
      name +
      ' wirklich zu ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' hinzufügen? Sie/er ist dann auf die Mailingliste der Gruppe eingetragen und hat Zugriff auf den Mattermost-Channel und den Nextcloud-Ordner der Gruppe. '
    commit(
      'alertbox/showAlert',
      {
        title: 'Mitglied hinzufügen',
        message,
        defaultToAction: true,
        actionName: 'Hinzufügen',
        action: 'groups/addActivePending',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  async addActivePending({ commit, getters }, { uid, groupID }) {
    try {
      const name = getters.allGroups
        .find((group) => group.id === groupID)
        .activePendingMembers.find((member) => member.uid === uid).name
      const email = getters.allGroups
        .find((group) => group.id === groupID)
        .activePendingMembers.find((member) => member.uid === uid).email
      const user = { name, email, uid }
      await this.$axios.post(
        'api/groups/' + groupID + '/accept_pending_member',
        { uid }
      )
      commit('addMember', { user, groupID })
      commit('removeActivePendingMember', { uid, groupID })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message:
            'Kommunikationsfehler beim Hinzufügen des Mitglieds: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertAddInactivePending({ commit, getters }, { uid, groupID }) {
    const name = getters.allGroups
      .find((group) => group.id === groupID)
      .inactivePendingMembers.find((member) => member.uid === uid).name
    const message =
      'Ist ' +
      name +
      ' wirklich ein neues Mitglied von ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      '? Sie/er wird freigeschaltet und erhält dadurch Zugriff auf die SOG-Online-Tools.' +
      ' Sie/er wird außerdem auf die Mailingliste der Gruppe eingetragen und erhält Zugriff auf den Mattermost-Channel und den Nextcloud-Ordner der Gruppe. '
    commit(
      'alertbox/showAlert',
      {
        title: 'Mitglied freischalten',
        message,
        defaultToAction: true,
        actionName: 'Freischalten',
        action: 'groups/addInactivePending',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  async addInactivePending({ commit, getters }, { uid, groupID }) {
    try {
      const name = getters.allGroups
        .find((group) => group.id === groupID)
        .inactivePendingMembers.find((member) => member.uid === uid).name
      const email = getters.allGroups
        .find((group) => group.id === groupID)
        .inactivePendingMembers.find((member) => member.uid === uid).email
      const user = { name, email, uid }
      await this.$axios.post(
        'api/groups/' + groupID + '/accept_pending_member',
        { uid }
      )
      commit('addMember', { user, groupID })
      commit('removeInactivePendingMember', { uid, groupID })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message:
            'Kommunikationsfehler beim Freischalten des Mitglieds: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertAddGuest({ commit, getters }, { name, email, groupID }) {
    const message =
      'Möchtest du ' +
      name +
      ' wirklich zu ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' hinzufügen? Sie/er ist dann auf der Mailingliste der Gruppe eingetragen. ' +
      'Für Zugriff auf weitere SOG-Tools (Wiki, Mattermost, etc.) muss sie/er aber reguläres Mitglied werden.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Gast hinzufügen',
        message,
        defaultToAction: true,
        actionName: 'Hinzufügen',
        action: 'groups/addGuest',
        params: { name, email, groupID },
      },
      { root: true }
    )
  },
  async addGuest({ commit }, { name, email, groupID }) {
    try {
      await this.$axios.post('api/groups/' + groupID + '/add_guest', {
        name,
        mail: email,
      })
      commit('addGuest', { name, email, groupID })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message: 'Kommunikationsfehler beim Hinzufügen des Gasts: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertRemoveGuest({ commit, getters }, { uid, groupID }) {
    const message =
      'Möchtest du ' +
      getters.allGroups
        .find((group) => group.id === groupID)
        .guests.find((g) => g.uid === uid).name +
      ' wirklich aus ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' entfernen? Sie/er ist dann nicht mehr auf der Mailingliste der Gruppe eingetragen.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Gast entfernen',
        message,
        defaultToAction: false,
        actionName: 'Entfernen',
        action: 'groups/removeGuest',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  async removeGuest({ commit }, { uid, groupID }) {
    try {
      await this.$axios.post('api/groups/' + groupID + '/remove_member', {
        uid,
      })
      commit('removeGuest', { uid, groupID })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message:
            'Kommunikationsfehler beim Entfernen des Mitglieds: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertRemoveMember({ commit, getters }, { uid, groupID }) {
    const message =
      'Möchtest du ' +
      getters.allGroups
        .find((group) => group.id === groupID)
        .members.find((g) => g.uid === uid).name +
      ' wirklich aus ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' entfernen? Sie/er hat dann keinen Zugriff mehr auf das Mattermost-Team und den Nextcloud-Ordner' +
      ' und bekommt keine Mails mehr über die Mailingliste.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Mitglied entfernen',
        message,
        defaultToAction: false,
        actionName: 'Entfernen',
        action: 'groups/removeMember',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  async removeMember({ commit }, { uid, groupID }) {
    try {
      await this.$axios.post('api/groups/' + groupID + '/remove_member', {
        uid,
      })
      commit('removeMember', { uid, groupID })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message:
            'Kommunikationsfehler beim Entfernen des Mitglieds: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  async addMember({ commit, rootGetters }, { uid, groupID }) {
    const user = rootGetters['users/all'].find((u) => u.uid === uid)
    try {
      await this.$axios.post('api/groups/' + groupID + '/add_member', { uid })
      commit('addMember', { user, groupID })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message:
            'Kommunikationsfehler beim Hinzufügen des Mitglieds: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertMakeAdmin({ commit, getters }, { uid, groupID }) {
    const message =
      'Möchtest du ' +
      getters.allGroups
        .find((group) => group.id === groupID)
        .members.find((g) => g.uid === uid).name +
      ' wirklich zur Koordinator:in von ' +
      getters.allGroups.find((group) => group.id === groupID).name +
      ' ernennen? Sie/er kann dann die Mitglieder der Gruppe bearbeiten' +
      ' und weitere Mitglieder zu Koordinator:innen ernennen.'
    commit(
      'alertbox/showAlert',
      {
        title: 'Mitglied zur Koordinator:in befördern',
        message,
        defaultToAction: false,
        actionName: 'Befördern',
        action: 'groups/makeAdmin',
        params: { uid, groupID },
      },
      { root: true }
    )
  },
  async makeAdmin({ commit, rootGetters }, { uid, groupID }) {
    try {
      await this.$axios.post('api/groups/' + groupID + '/add_owner', { uid })
      commit('removeMember', { uid, groupID })
      const user = rootGetters['users/all'].find((u) => u.uid === uid)
      commit('addAdmin', { user, groupID })
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message:
            'Kommunikationsfehler beim Befördern des Mitglieds: ' + error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },

  alertRevokeAdmin({ commit, getters, rootGetters }, { uid, groupID }) {
    if (
      getters.allGroups.find((group) => group.id === groupID).admins.length ===
      1
    ) {
      const userName = getters.allGroups
        .find((group) => group.id === groupID)
        .admins.find((g) => g.uid === uid).name
      const message =
        userName +
        ' ist die/der letzte Koordinator:in von ' +
        getters.allGroups.find((group) => group.id === groupID).name +
        '. Füge zunächst weitere Koordinator:innen hinzu, bevor du ' +
        userName +
        ' entfernst.'
      commit(
        'alertbox/showAlert',
        {
          title: 'Koordinators-Rechte entziehen',
          message,
          defaultToAction: true,
          showCancel: false,
          params: { uid, groupID },
        },
        { root: true }
      )
    } else if (uid === rootGetters['user/username']) {
      const message =
        'Willst du wirklich deine Koordinations-Rechte für ' +
        getters.allGroups.find((group) => group.id === groupID).name +
        ' abgeben? Du kannst dann die Mitglieder der Gruppe nicht mehr bearbeiten' +
        ' und keine weiteren Mitglieder zu Koordinator:innen befördern.'
      commit(
        'alertbox/showAlert',
        {
          title: 'Koordinators-Rechte abgeben',
          message,
          defaultToAction: false,
          actionName: 'Rechte abgeben',
          action: 'groups/revokeAdmin',
          params: { uid, groupID },
        },
        { root: true }
      )
    } else {
      const message =
        'Möchtest du ' +
        getters.allGroups
          .find((group) => group.id === groupID)
          .admins.find((g) => g.uid === uid).name +
        ' die Koordinators-Rechte für ' +
        getters.allGroups.find((group) => group.id === groupID).name +
        ' entziehen? Sie/er kann dann die Mitglieder der Gruppe nicht mehr bearbeiten' +
        ' und keine weiteren Mitglieder zu Koordinator:innen befördern.'
      commit(
        'alertbox/showAlert',
        {
          title: 'Koordinators-Rechte entziehen',
          message,
          defaultToAction: false,
          actionName: 'Rechte entziehen',
          action: 'groups/revokeAdmin',
          params: { uid, groupID },
        },
        { root: true }
      )
    }
  },
  async revokeAdmin({ commit, rootGetters }, { uid, groupID }) {
    try {
      await this.$axios.post('api/groups/' + groupID + '/remove_owner', { uid })
      commit('removeAdmin', { uid, groupID })
      const user = rootGetters['users/all'].find((u) => u.uid === uid)
      commit('addMember', { user, groupID })
      if (uid === rootGetters['user/username']) {
        commit('setMType', { groupID, mType: 'member' })
      }
    } catch (error) {
      commit(
        'alertbox/showAlert',
        {
          title: 'Kommunikationsfehler',
          message:
            'Kommunikationsfehler beim Entziehen der Koordinations-Rechte: ' +
            error,
          showCancel: false,
          defaultToAction: true,
        },
        { root: true }
      )
    }
  },
}
