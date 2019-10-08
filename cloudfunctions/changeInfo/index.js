// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'littlemarket',
  traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => {
  const {key, value} = event
  let data_={}
  data_[key] = value
  const db = cloud.database()
  const {OPENID} = cloud.getWXContext()
  let result = 0
  try{
    return await db.collection('userList').where({
      _openid: OPENID
    })
      .update({
        data: data_
      })
  }catch(err){
    console.log(err)
  }
}