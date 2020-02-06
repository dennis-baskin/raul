const VALID_SEARCH_EVENTS = [
  'change',
  'blur',
  'focus',
  'keydown',
  'keyup',
  'submit',
]

const DEFAULT_SEARCH_EVENTS = VALID_SEARCH_EVENTS.reduce((accumulator, event) => {
  accumulator[event] = (event, data) => { }
  return accumulator
}, {})

const state = {
  mobileSearchExpanded: false,
  search: DEFAULT_SEARCH_EVENTS,
}

const getters = {
  isMobileSearchExpanded(state) {
    return state.mobileSearchExpanded
  },
}

const actions = {
  callSearchEventHandler({state}, {type, event, data}) {
    if (!VALID_SEARCH_EVENTS.includes(type)) return
    state.search[type](event, data)
  },

  collapseMobileSearch({commit}) {
    commit('collapseMobileSearch')
  },

  expandMobileSearch({commit}) {
    commit('expandMobileSearch')
  },
}

const mutations = {
  collapseMobileSearch() {
    state.mobileSearchExpanded = false
  },

  expandMobileSearch(state) {
    state.mobileSearchExpanded = true
  },

  bindSearchEvents(state, searchEvents) {
    const events = [].concat(...[searchEvents])

    events.forEach(({eventType, callback}) => {
      if (!VALID_SEARCH_EVENTS.includes(eventType)) return
      state.search[eventType] = callback
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
