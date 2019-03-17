// 数据库和邮箱配置文件
const dbs = 'mongodb://127.0.0.1:27017/vue-element-login-register'
const redis = {
  get host() {
    return '127.0.0.1'
  },
  get port() {
    return 6379
  }
}
const smtp = {
  get host() {
    return 'smtp.qq.com'
  },
  get user() {
    return '*********@qq.com' // qq邮箱名
  },
  get pass() {
    return '*************' // qq邮箱授权码
  },
  // 邮箱验证码
  get code() {
    return () => {
      return Math.random()
        .toString(16)
        .slice(2, 6)
        .toUpperCase()
    }
  },
  // 定义验证码过期时间rules，5分钟内邮箱
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
