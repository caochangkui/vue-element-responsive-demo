// axios 配置
import axios from 'axios'
import store from './store'
import router from './router'

//创建 axios 实例
let instance = axios.create({
  timeout: 5000, // 请求超过5秒即超时返回错误
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})

instance.interceptors.request.use(
  config => {
    if (store.getters.token) { // 若存在token，则每个Http Header都加上token
      config.headers.Authorization = `token ${store.getters.token}`
      console.log('拿到token')
    }
    console.log('request请求配置', config)
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
instance.interceptors.response.use(
  response => {
    console.log('成功响应：', response)
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 (未授权) 清除 token 并跳转到登录页面
          store.commit('BIND_LOGOUT')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        default:
          console.log('服务器出错，请稍后重试！')
          alert('服务器出错，请稍后重试！')
      }
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  }
)

export default {
  // 发送验证码
  userVerify (data) {
    return instance.post('/api/verify', data)
  },
  // 注册
  userRegister (data) {
    return instance.post('/api/register', data)
  },
  // 登录
  userLogin (data) {
    return instance.post('/api/login', data)
  },
  // 获取用户列表
  getAllUser () {
    return instance.get('/api/alluser')
  },
  // 删除用户
  delUser (data) {
    return instance.post('/api/deluser', data)
  }
}
