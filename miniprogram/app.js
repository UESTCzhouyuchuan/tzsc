//app.js
App({
  globalData: {
    openid: null,
    userInfo: false
  },
  onLaunch: function() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'littlemarket',
        traceUser: true,
      })
    }
    let openid = wx.getStorageSync('openid')
    if (!openid) {
      console.log("No openid")
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          openid = res.result.openid;
          wx.setStorageSync('openid', res.result.openid)
          this.getLogin(openid)
          // console.log(res.result.openid, this.globalData.openid)
        },
        fail: err => {
          console.log("Error mesg: ", err)
          wx.showToast({
            title: '获取信息失败请检查网络',
          })
        }
      })
    } else {
      this.getLogin(openid)
    }
    // console.log(this, new Date())
  },
  getLogin(openid){
    this.globalData.openid = openid
    const db = wx.cloud.database()
    db.collection('userList').where({
      _openid: openid
    }).get()
      .then(res => {
        if (res.data.length === 0) {
          //未注册
        } else {
          const userInfo = res.data[0]
          this.globalData.userInfo = userInfo;
          const t = this
          // console.log(this, new Date())
          if (userInfo.fileID) {
            wx.cloud.getTempFileURL({
              fileList: [userInfo.fileID],
              success: res => {
                const file = res.fileList[0]
                if (file.status == 0 && file.tempFileURL) {
                  console.log("在appjs通过fileid获得头像图片")
                  t.globalData.userInfo.avatarUrl = file.tempFileURL
                }
              }
            })
          } else {
            t.globalData.userInfo.avatarUrl = userInfo.userInfo.avatarUrl
          }
        }
      })
  }
})