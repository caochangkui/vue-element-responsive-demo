const jwt = require('jsonwebtoken')

// jsonwebtoken中文文档：https://segmentfault.com/a/1190000009494020
module.exports = function (user_id) {
  const token = jwt.sign(
    {
      user_id: user_id
    },
    'cedric1990',
    {
      expiresIn: '60s'
    }
  )

  return token
}