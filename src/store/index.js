import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contactDrawer: false
  },
  getters: {
    contactDrawerState (state) {
      return state.contactDrawer;
    }
  },
  mutations: {
    setContactDrawerState (state, val) {
      state.contactDrawer = val;
    } 
  },
  actions: {
    openContactDrawer ({commit}) {
      commit('setContactDrawerState', true)
    },
    closeContactDrawer ({commit}) {
      commit('setContactDrawerState', false)
    },
  },
  modules: {
  }
})
