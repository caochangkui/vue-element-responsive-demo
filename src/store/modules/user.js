const user = {
  state: {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
  },

  mutations: {
    BIND_LOGIN: (state, data) => {
      localStorage.setItem('token', data)
      state.token = data
    },
    BIND_LOGOUT: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
    SAVE_USER: (state, data) => {
      localStorage.setItem('username', data)
      state.username = data
    }
  },

  // actions: {
  //   bindLogin({ commit }, data){
  //     commit('BIND_LOGIN', data)
  //   },
  //   bindLogout({ commit }){
  //     commit('BIND_LOGOUT')
  //   },
  //   saveUser({ commit }, data){
  //     commit('SAVE_USER', data)
  //   }
  // }
}

export default user
