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

// 路由
app.use(users.routes()).use(users.allowedMethods())

app.listen(8888, () => {
  console.log('This server is running at http://localhost:' + 8888)
})
