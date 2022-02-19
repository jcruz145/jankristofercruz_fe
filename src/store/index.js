import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contactDrawer: false,
    availableCollections: [],
    currentCollection: ''
  },
  getters: {
    contactDrawerState (state) {
      return state.contactDrawer;
    },
    availableCollections (state) {
      return state.availableCollections;
    },
    currentCollection (state) {
      return state.currentCollection;
    }
  },
  mutations: {
    setContactDrawerState (state, val) {
      state.contactDrawer = val;
    },
    setAvailableCollections (state, val) {
      state.availableCollections = val;
    },
    currentCollection (state, val) {
      state.currentCollection = val;
    }
  },
  actions: {
    openContactDrawer ({commit}) {
      commit('setContactDrawerState', true)
    },
    closeContactDrawer ({commit}) {
      commit('setContactDrawerState', false)
    },
    async retrieveAvailableCollections ({commit}, prismic) {
      let response = await prismic.client.getSingle("available_search_collections");
      let arr = [];
      response.data.collections.forEach(item => {
        arr.push(item.collection.uid)
      });
      commit('setAvailableCollections', arr);
    },
    setCurrentCollection({commit}, val) {
      console.log('commiting: ' + val)
      commit('currentCollection', val);
    }
  },
  modules: {
  }
})
