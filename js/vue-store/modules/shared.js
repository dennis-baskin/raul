const state = {
  moreContextOpened: false,
}

const getters = {
  isMoreContextOpened(state, getters, rootState, rootGetters) {
    return state.moreContextOpened
  },
}

const actions = {
  closeMoreContext({commit}) {
    commit('closeMoreContext')
  },

  toggleMoreContext({commit}) {
    commit('toggleMoreContext')
  },
}

const mutations = {
  closeMoreContext(state) {
    state.moreContextOpened = false
  },

  toggleMoreContext(state) {
    state.moreContextOpened = !state.moreContextOpened
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
