### vue + koa2 + MongoDB + Redis 实现一个完整的登录注册

通过 vue-cli3.0 + Element 构建项目前端，Node.js + Koa2 + MongoDB + Redis 实现数据库和接口设计，包括邮箱验证码、用户注册、用户登录、查看删除用户等功能。


## 1. 技术栈

* 前端
    - 初始化项目：[vue-cli3.0 ](https://cli.vuejs.org/guide/)
    - 组件库：[Element-ui](http://element-cn.eleme.io/#/zh-CN/component/quickstart)
    - 路由控制/拦截：[Vue-router ](https://router.vuejs.org/zh/api/)
    - 状态管理：[Vuex](https://vuex.vuejs.org/zh/api/)

* 服务端
    - 运行环境：[Node.js](https://nodejs.org/en/)
    - 后台开发框架：[Koa2](https://koa.bootcss.com/#introduction)
    - 路由中间件：[Koa-router](https://www.npmjs.com/package/koa-router)
    - 发送邮件: [nodemailer](https://nodemailer.com/usage/)

* HTTP通讯
    - 接口请求/拦截：[Axios](https://github.com/axios/axios)
    - Token认证：[jsonwebtoken](https://segmentfault.com/a/1190000009494020)

* 数据库
    - [MongoDB](https://github.com/mongodb/mongo)
    - 数据库操作：[Mongoose](https://mongoosejs.com/docs/guide.html)
    - 缓存工具：[Redis](http://redisdoc.com/)

## 2. 项目依赖：

```
  "dependencies": {
    "axios": "^0.18.0",
    "crypto-js": "^3.1.9-1",
    "echarts": "^4.1.0",
    "element-ui": "^2.4.5",
    "js-cookie": "^2.2.0",
    "jsonwebtoken": "^8.5.0",
    "jspdf": "^1.5.3",
    "koa": "^2.7.0",
    "koa-bodyparser": "^4.2.1",
    "koa-generic-session": "^2.0.1",
    "koa-json": "^2.0.2",
    "koa-redis": "^3.1.3",
    "koa-router": "^7.4.0",
    "mongoose": "^5.4.19",
    "nodemailer": "^5.1.1",
    "nodemon": "^1.18.10",
    "vue": "^2.5.21",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.1"
  }
```


## 3. 前端实现步骤

### 3.1 登录注册页面

通过 vue-cli3.0 + Element 构建项目前端页面

#### 登录页（@/view/users/Login.vue）：

<img src="https://www.cnblogs.com/images/cnblogs_com/cckui/1069317/o_login.jpg" width="330">

#### 注册页（@/view/users/Register.vue）：

发送验证码前需要验证用户名和邮箱，用户名必填，邮箱格式需正确。

<img src="https://www.cnblogs.com/images/cnblogs_com/cckui/1069317/o_register.jpg" width="330">

用户设置页（@/view/users/setting/Setting.vue）

用户登录后，可以进入用户设置页查看用户和删除用户


### 3.2 Vuex 状态管理

通过 vuex 实现保存或删除用户 token，保存用户名等功能。

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter。

根目录下新建store文件夹，创建modules/user.js:

```
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
  }
}

export default user

```

创建文件 getters.js 对数据进行处理输出:


```
const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    username: state => state.user.username
  }
export default getters

```

创建文件 index.js 管理所有状态:

```
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})

export default store
```



### 3.3 路由控制/拦截

路由配置（router.js）：

```
import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import(/* webpackChunkName: "users" */ '@/views/users/Login.vue')
const Register = () => import(/* webpackChunkName: "users" */ '@/views/users/Register.vue')
const Setting = () => import(/* webpackChunkName: "tables" */ '@/views/setting/Setting.vue')

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        breadcrumb: '设置',
        requireLogin: true
      },
    }
  ]
})

```

路由拦截:

关于vue 路由拦截参考：[https://www.cnblogs.com/cckui/p/10319013.html](https://www.cnblogs.com/cckui/p/10319013.html)

```
// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
  store.commit('BIND_LOGIN', localStorage.getItem('token'))
}

// 全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.meta.title) { // 路由发生变化修改页面title
    document.title = to.meta.title
  }
  if (to.meta.requireLogin) {
    if (store.getters.token) {
      if (Object.keys(from.query).length === 0) { // 判断路由来源是否有query，处理不是目的跳转的情况
        next()
      } else {
          let redirect = from.query.redirect // 如果来源路由有query
          if (to.path === redirect) { // 避免 next 无限循环
              next()
          } else {
              next({ path: redirect }) // 跳转到目的路由
          }
      }
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

export default router

```
## 3.4 Axios 封装

封装 Axios

```
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

```


## 4. 服务端和数据库实现

在根目录下创建 server 文件夹，存放服务端和数据库相关代码。

### 4.1 MongoDB和Redis

创建 /server/dbs/config.js ，进行数据库和邮箱配置

```
// mongo 连接地址
const dbs = 'mongodb://127.0.0.1:27017/[数据库名称]'

// redis 地址和端口
const redis = {
  get host() {
    return '127.0.0.1'
  },
  get port() {
    return 6379
  }
}

// qq邮箱配置
const smtp = {
  get host() {
    return 'smtp.qq.com'
  },
  get user() {
    return '1********@qq.com' // qq邮箱名
  },
  get pass() {
    return '*****************' // qq邮箱授权码
  },
  // 生成邮箱验证码
  get code() {
    return () => {
      return Math.random()
        .toString(16)
        .slice(2, 6)
        .toUpperCase()
    }
  },
  // 定义验证码过期时间rules，5分钟
  get expire() {
    return () => {
      return new Date().getTime() + 5 * 60 * 1000
    }
  }
}

module.exports = {
  dbs,
  redis,
  smtp
}

```

使用 qq 邮箱发送验证码，需要在“设置/账户”中打开POP3/SMTP服务和MAP/SMTP服务。

### 4.2 Mongo 模型


创建 /server/dbs/models/users.js:

```
// users模型，包括四个字段
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
})

module.exports = {
  Users: mongoose.model('User', UserSchema)
}

```

### 4.3 接口实现

创建 /server/interface/user.js:


```
const Router = require('koa-router')
const Redis = require('koa-redis') // key-value存储系统, 存储用户名，验证每个用户名对应的验证码是否正确
const nodeMailer = require('nodemailer') // 通过node发送邮件
const User = require('../dbs/models/users').Users
const Email = require('../dbs/config')

// 创建和验证token, 参考4.4
const createToken = require('../token/createToken.js') // 创建token
const checkToken = require('../token/checkToken.js') // 验证token


// 创建路由对象
const router = new Router({
  prefix: '/api' // 接口的统一前缀
})

// 获取redis的客户端
const Store = new Redis().client

// 接口 - 测试
router.get('/test', async ctx => {
  ctx.body = {
    code: 0,
    msg: '测试',
  }
})

// 发送验证码 的接口
router.post('/verify', async (ctx, next) => {
  const username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 拿到过期时间

  console.log(ctx.request.body)
  console.log('当前时间:', new Date().getTime())
  console.log('过期时间：', saveExpire)

  // 检验已存在的验证码是否过期，以限制用户频繁发送验证码
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '发送过于频繁，请稍后再试'
    }
    return
  }

  // QQ邮箱smtp服务权限校验
  const transporter = nodeMailer.createTransport({
    /**
     *  端口465和587用于电子邮件客户端到电子邮件服务器通信 - 发送电子邮件。
     *  端口465用于smtps SSL加密在任何SMTP级别通信之前自动启动。
     *  端口587用于msa
     */
    host: Email.smtp.host,
    port: 587,
    secure: false, // 为true时监听465端口，为false时监听其他端口
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  // 邮箱需要接收的信息
  const ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  // 邮件中需要显示的内容
  const mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`, // 邮件来自
    to: ko.email, // 邮件发往
    subject: '邀请码', // 邮件主题 标题
    html: `您正在注册****，您的邀请码是${ko.code}` // 邮件内容
  }

  // 执行发送邮件
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log('error')
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送，请注意查收，可能会有延时，有效期5分钟'
  }
})

// 接口 - 注册
router.post('/register', async ctx => {
  const { username, password, email, code } = ctx.request.body

  // 验证验证码
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code') // 拿到已存储的真实的验证码
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 过期时间

    console.log(ctx.request.body)
    console.log('redis中保存的验证码：', saveCode)
    console.log('当前时间:', new Date().getTime())
    console.log('过期时间：', saveExpire)

    // 用户提交的验证码是否等于已存的验证码
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新申请'
        }
        return
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
      return
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
    return
  }

  // 用户名是否已经被注册
  const user = await User.find({ username })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '该用户名已被注册'
    }
    return
  }
  // 如果用户名未被注册，则写入数据库
  const newUser = await User.create({
    username,
    password,
    email,
    token: createToken(this.username) // 生成一个token 存入数据库
  })

  // 如果用户名被成功写入数据库，则返回注册成功
  if (newUser) {
    ctx.body = {
      code: 0,
      msg: '注册成功',
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})


// 接口 - 登录
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body

  let doc = await User.findOne({ username })
  if (!doc) {
    ctx.body = {
      code: -1,
      msg: '用户名不存在'
    }
  } else if (doc.password !== password) {
    ctx.body = {
      code: -1,
      msg: '密码错误'
    }
  } else if (doc.password === password) {
    console.log('密码正确')
    let token = createToken(username) // 生成token
    doc.token = token // 更新mongo中对应用户名的token
    try {
      await doc.save() // 更新mongo中对应用户名的token
      ctx.body = {
        code: 0,
        msg: '登录成功',
        username,
        token
      }
    } catch (err) {
      ctx.body = {
        code: -1,
        msg: '登录失败，请重新登录'
      }
    }
  }
})

// 接口 - 获取所有用户 需要验证 token
router.get('/alluser', checkToken, async (ctx, next) => {
  try {
    let result = []
    let doc = await User.find({})
    doc.map((val, index) => {
      result.push({
        email: val.email,
        username: val.username,
      })
    })
    ctx.body = {
      code: 0,
      msg: '查找成功',
      result
    }
  } catch (err) {
    ctx.body = {
      code: -1,
      msg: '查找失败',
      result: err
    }
  }
})

// 接口 - 删除用户 需要验证 token
router.post('/deluser', checkToken, async (ctx, next) => {
  const { username } = ctx.request.body

  try {
    await User.findOneAndRemove({username: username})
    ctx.body = {
      code: 0,
      msg: '删除成功',
    }
  } catch (err) {
    ctx.body = {
      code: -1,
      msg: '删除失败',
    }
  }
})

module.exports = {
  router
}

```


上面实现了五个接口：

- 发送验证码至邮箱： router.post('/verify')
- 注册：router.post('/register')
- 登录：router.post('/login')
- 获取用户列表：router.get('/alluser')
- 删除数据库中的某个用户：router.post('/deluser')

分别对应了前面 3.4 中 axios 中的5个请求地址


### 4.4 JSON Web Token 认证

JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案。详情参考：http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

分别创建 /server/token/createToken.js 和 /server/token/checkToken.js


```
// 创建token
const jwt = require('jsonwebtoken')

module.exports = function (id) {
  const token = jwt.sign(
    {
      id: id
    },
    'cedric1990',
    {
      expiresIn: '300s'
    }
  )

  return token
}
```


```
// 验证token
const jwt = require('jsonwebtoken')

// 检查 token
module.exports = async (ctx, next) => {
  // 检验是否存在 token
  // axios.js 中设置了 authorization
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization')
  }

  const token = authorization.split(' ')[1]

  // 检验 token 是否已过期
  try {
    await jwt.verify(token, 'cedric1990')
  } catch (err) {
    ctx.throw(401, 'invalid token')
  }

  await next()
}

```


### 4.5 服务端入口

根目录创建 server.js:


```
// server端启动入口
const Koa = require('koa')
const app =  new Koa();
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const Redis = require('koa-redis')
const json = require('koa-json') // 美化json格式化
const dbConfig = require('./server/dbs/config')

const users = require('./server/interface/user.js').router

// 一些session和redis相关配置
app.keys = ['keys', 'keyskeys']
app.proxy = true
app.use(
  session({
    key: 'vueEle', // 前缀
    prefix: 'vueEle:uid', // 前缀
    store: new Redis()
  })
)

app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))

app.use(json())

// 连接数据库
mongoose.connect(
  dbConfig.dbs,
  { useNewUrlParser: true }
)

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const db = mongoose.connection
mongoose.Promise = global.Promise // 防止Mongoose: mpromise 错误

db.on('error', function () {
    console.log('数据库连接出错')
})

db.on('open', function () {
    console.log('数据库连接成功')
})

// 路由中间件
app.use(users.routes()).use(users.allowedMethods())

app.listen(8888, () => {
  console.log('This server is running at http://localhost:' + 8888)
})

```



## 5. 跨域处理

详情参考:[https://www.cnblogs.com/cckui/p/10331432.html](https://www.cnblogs.com/cckui/p/10331432.html)

vue 前端启动端口9527 和 koa 服务端启动端口8888不同，需要做跨域处理，打开vue.config.js:

```
devServer: {
    port: 9527,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8888/', // 接口地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
```


## 6. 接口对接


```
import axios from '../../axios.js'
import CryptoJS from 'crypto-js' // 用于MD5加密处理
```


发送验证码：

```
// 用户名不能为空，并且验证邮箱格式
sendCode() {
  let email = this.ruleForm2.email
  if (this.checkEmail(email) && this.ruleForm2.username) {
    axios.userVerify({
      username: encodeURIComponent(this.ruleForm2.username),
      email: this.ruleForm2.email
    }).then((res) => {
      if (res.status === 200 && res.data && res.data.code === 0) {
        this.$notify({
          title: '成功',
          message: '验证码发送成功，请注意查收。有效期5分钟',
          duration: 1000,
          type: 'success'
        })

        let time = 300
        this.buttonText = '已发送'
        this.isDisabled = true
        if (this.flag) {
          this.flag = false;
          let timer = setInterval(() => {
            time--;
            this.buttonText = time + ' 秒'
            if (time === 0) {
              clearInterval(timer);
              this.buttonText = '重新获取'
              this.isDisabled = false
              this.flag = true;
            }
          }, 1000)
        }
      } else {
        this.$notify({
          title: '失败',
          message: res.data.msg,
          duration: 1000,
          type: 'error'
        })
      }
    })
  }
}
```

注册:

```
submitForm(formName) {
  this.$refs[formName].validate(valid => {
    if (valid) {
      axios.userRegister({
        username: encodeURIComponent(this.ruleForm2.username),
        password: CryptoJS.MD5(this.ruleForm2.pass).toString(),
        email: this.ruleForm2.email,
        code: this.ruleForm2.smscode
      }).then((res) => {
        if (res.status === 200) {
          if (res.data && res.data.code === 0) {
            this.$notify({
              title: '成功',
              message: '注册成功。',
              duration: 2000,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({
                path: '/login'
              })
            }, 500)
          } else {
            this.$notify({
              title: '错误',
              message: res.data.msg,
              duration: 2000,
              type: 'error'
            })
          }
        } else {
          this.$notify({
            title: '错误',
            message: `服务器请求出错， 错误码${res.status}`,
            duration: 2000,
            type: 'error'
          })
        }
      })
    } else {
      console.log("error submit!!");
      return false;
    }
  })
},
```
登录：

```
login(formName) {
  this.$refs[formName].validate(valid => {
    if (valid) {
      axios.userLogin({
        username: window.encodeURIComponent(this.ruleForm.name),
        password: CryptoJS.MD5(this.ruleForm.pass).toString()
      }).then((res) => {
        if (res.status === 200) {
          if (res.data && res.data.code === 0) {
            this.bindLogin(res.data.token)
            this.saveUser(res.data.username)
            this.$notify({
              title: '成功',
              message: '恭喜，登录成功。',
              duration: 1000,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({
                path: '/'
              })
            }, 500)
          } else {
            this.$notify({
              title: '错误',
              message: res.data.msg,
              duration: 1000,
              type: 'error'
            })
          }
        } else {
          this.$notify({
            title: '错误',
            message: '服务器出错，请稍后重试',
            duration: 1000,
            type: 'error'
          })
        }
      })
    }
  })
},
```

## 7. 启动项目 测试接口


#### 7.1 vue端：

```
$ npm run serve
```


#### 7.2 启动mogod：

```
$ mongod
```


#### 7.3 启动Redis：

```
$ redis-server
```


#### 7.4 启动服务端server.js：

安装 nodemon 热启动辅助工具：

```
$ npm i nodemon
```


```
$ nodemon server.js  // 注意端口号是否与其他项目冲突
```


## 8. 项目目录

<img src="https://www.cnblogs.com/images/cnblogs_com/cckui/1069317/o_1552553146441.jpg" width="260">


