import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ListingData: [],
    totalCount: 0,
  },
  getters: {
    getListingData: (state) => state.ListingData,
    getCount: (state) => state.totalCount,

  },
  mutations: {
    setListingData(state, payload) {
      state.ListingData = payload;
    },
    setTotalCount(state, payload) {
      state.totalCount = payload;
    },
  },
  actions: {
    fetchListingData(
      { commit }, data
    ) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://jsonplaceholder.typicode.com/posts?_start=${(data.currentPage - 1) * data.itemsPerPage}&_limit=${data.itemsPerPage}`)
          .then(
            (response) => {
              commit("setListingData", response.data);
              commit("setTotalCount", parseInt(response.headers['x-total-count']));
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
