const mongoose = require('mongoose')
// 连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/chat'
mongoose.connect(DB_URL, {useNewUrlParser: true})
mongoose.connection.on('connected', () => {
  console.log('mango connect success')
})

const model = {
  user: {
    'user': {type: String, 'require': true},
    'pwd': {type: String, 'require': true},
    'type': {'type': String, 'require': true},
    //头像
    'avatar': {'type': String},
    // 个人简介或者职位简介
    'desc': {'type': String},
    // 职位名
    'title': {'type': String},
    // 如果你是boss 还有两个字段
    'company': {'type': String},
    'money': {'type': String}
  },
  chat: {}
}

for (let key in model) {
  mongoose.model(key, new mongoose.Schema(model[key]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
// // 类似于 mysql的表 --> mongo 的文档的概念
// const User = mongoose.model('user', new mongoose.Schema({
//   user: {type: String, require: true},
//   age: {type: String, require: true}
// }))

// User.create({
//   user: '小明',
//   age: 20
// }, (err, doc) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(doc)
//   }
// })

// User.update({'user': '小明'}, {'$set': {age: 28}}, (err, doc) => {
//   console.log(doc)
// })
// User.remove({age: 24}, (err, doc) => {
//   console.log(doc)
// })