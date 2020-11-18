import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store =new Vuex.Store({
  plugins: [createPersistedState()],
  state:{
    count:0,
    user:null,
  },
  mutations:{
    setCount:(state,c)=>state.count=c,
    setTheme: (state, t) => state.theme = t,
    setUser: (state, user) => state.user=user,
  },
  getters:{
    getCount: (state)=>
    {
      return state.count
    },
    getTheme: (state) => {
      return state.theme
    },
    getUser:(state)=>{
      return state.user
    }
  }
})
export default store;