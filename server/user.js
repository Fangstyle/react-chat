const express = require('express')
const Router = express.Router()
const utility = require('utility')
const model = require('./model')
const User = model.getModel('user')

Router.get('/info', (req, res) => {
  res.json({
    code: 1
  })
  // User.remove({}, (err, doc) => {})
})

Router.get('/list', (req, res) => {
  const {type} = req.query
  User.find({}, (err, doc) => {
    return res.json({code: 0, data: doc})
  })
})

Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne(user, (err, doc) => {
    if (doc) {
      return res.json({code: 0, msg: '用户昵称重复，请重复输入'})
    }
    User.create({user, type, pwd: pwdMd5(pwd)}, (err, doc) => {
      if (err) {
        res.json({code: 1, msg: '服务器出错了'})
      }
      return res.json({code: 0, msg: 'success'})
    })
  })
})

Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  User.findOne({user,pwd: pwdMd5(pwd)}, {pwd: 0}, (err, doc) => {
    if(!doc) {
      return res.json({code: 1, msg: '密码错误'})
    }
    return res.json({code: 0, data: doc})
  })
})

function pwdMd5 (pwd) {
  const salt = 'xiaozhen#99dsfahu31'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = Router