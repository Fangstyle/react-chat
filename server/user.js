const express = require('express')
const Router = express.Router()
const utility = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd': 0, '__v': 0}

Router.get('/info', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    return res.json({code: 1})
  }
  User.find({_id: userid}, _filter, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
  // User.remove({}, (err, doc) => {})
})


Router.get('/list', function (req, res) {
  const {type} = req.query
  // User.remove({},function(e,d){})
  User.find({type}, function (err, doc) {
    return res.json({code: 0, data: doc})
  })
})
Router.post('/update', function (req, res) {
  const userid = req.cookies.userid
  if (!userid) {
    return json.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

Router.post('/register', (req, res) => {
  const {user, pwd, type} = req.body
  User.findOne(user, (err, doc) => {
    if (doc) {
      return res.json({code: 0, msg: '用户昵称重复，请重复输入'})
    }
    const userModel = new User({user, type, pwd: pwdMd5(pwd)})
    userModel.save(function (e, d) {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})

Router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  User.findOne({user, pwd: pwdMd5(pwd)}, _filter, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '密码错误'})
    }
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})

function pwdMd5 (pwd) {
  const salt = 'xiaozhen#99dsfahu31'
  return utility.md5(utility.md5(pwd + salt))
}

module.exports = Router