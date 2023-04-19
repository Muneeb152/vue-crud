import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ListingData: [],
  },
  getters: {
    getListingData: (state) => state.ListingData,
  },
  mutations: {
    setListingData(state, payload) {
      state.ListingData = payload;
    },
  },
  actions: {
    fetchListingData(
      {commit}, options
    ) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://jsonplaceholder.typicode.com/posts?_start=${(options.page - 1) * options.itemsPerPage}&_limit=${options.itemsPerPage}`)
          .then(
            (response) => {
              commit("setListingData", response.data);
              resolve(response);
            },
            (error) => {
              console.log(error);
              reject(error);
            }
          );
      });
    },

  },
  modules: {

  }
})
