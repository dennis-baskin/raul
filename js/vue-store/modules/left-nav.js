const state = {
  leftNavExpanded: true,
  leftNavInitialTransition: '',
  leftNavTheme: 'light',
}

const getters = {
  isLeftNavExpanded(state, getters, rootState, rootGetters) {
    return state.leftNavExpanded
  },

  leftNavTheme(state, getters, rootState, rootGetters) {
    return state.leftNavTheme
  },
}

const actions = {
  initializeLeftNavExpanded({commit, getters}) {
    const expandedInitially = window.localStorage.getItem('left-nav-expanded')

    if (expandedInitially === 'false') {
      commit('collapseLeftNav')
    }
  },

  toggleLeftNavExpanded({commit, getters}) {
    RAUL.header.changeNavState()

    commit('toggleLeftNavExpanded', !getters.isLeftNavExpanded)
    window.localStorage.setItem('left-nav-expanded', getters.isLeftNavExpanded.toString())
  },

  toggleLeftNavTheme({commit}) {
    commit('toggleLeftNavTheme')
  },

  collapseLeftNav({commit}) {
    commit('collapseLeftNav')
  },
}

const mutations = {
  collapseLeftNav(state) {
    state.leftNavExpanded = false
  },

  expandLeftNav(state) {
    state.leftNavExpanded = true
  },

  toggleLeftNavExpanded(state, isExpanded) {
    state.leftNavExpanded = isExpanded
  },

  toggleLeftNavTheme(state) {
    state.leftNavTheme = state.leftNavTheme === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('nav-theme', state.leftNavTheme)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
