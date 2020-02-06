import {groupBy} from '../../array-utils'

const state = {
  appSwitcherData: {
    products: [],
  },
}

const getters = {
  familyProducts(state, getters, rootState) {
    return groupBy(state.appSwitcherData.products, 'familyName')
  },

  favoriteProducts(state, getters, rootState) {
    return state.appSwitcherData.products.filter(({isFavorite}) => isFavorite)
  },
}

const actions = {}

const mutations = {
  setAppSwitcherData(state, data) {
    state.appSwitcherData.products.splice(0, state.appSwitcherData.products.length, ...data.products)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
