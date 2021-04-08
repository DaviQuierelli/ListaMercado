import Vue from "vue-native-core";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qtdeItens: 0,
  },
  mutations: {
    additem(state) {
      state.qtdeItens++;
    },
    removeitem(state) {
      state.qtdeItens--;
    },
    zeraitem(state) {
      state.qtdeItens = 0;
    },
    inicio(state, valor) {
      //alert('valor '+valor.ini)
      state.qtdeItens = valor.ini;
    },
  },
  actions: {},
});
