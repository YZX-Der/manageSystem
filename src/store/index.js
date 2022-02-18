import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    currentMenu: '首页',
    dateTime: null,
    userName: null
  },
  mutations:{
    changeMenu(state,item){
      state.currentMenu = item.label
    },
    getInfo(state,item){
      state.dateTime = item.dateTime
      state.userName = item.userName
    }
  },
  modules:{
    tab
  }
})

export default store

