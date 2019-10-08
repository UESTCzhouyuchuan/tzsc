// miniprogram/pages/my/my.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    loginTimer: null,
    agreeRegulations: false,
    infoFillDot: false
  },
  loginFun(userInfo) {
    const that = this
    const openid = app.globalData.openid
    const db = wx.cloud.database()
    db.collection('userList').where({
      _openid: openid
    }).get().then(res => {
      if (res.data.length == 0) {
        let data_ = {
          userInfo: userInfo,
          name: userInfo.nickName,
          login: true,
          schoolNum: '',
          gender: userInfo.gender,
          fileID: '',
          introduce: '这个人懒死了，什么都没写_(┐「ε:)_',
          birth: '',
          contact: {
            phone: '',
            qq: '',
            wx: ''
          },
          created: new Date(),
          favorite: []
        }
        db.collection('userList').add({
          data: data_,
          success(res) {
            // console.log("注册success")
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 500
            })
            that.setData({
              login: true
            })
            wx.hideLoading()
            app.globalData.userInfo = data_
            app.globalData.userInfo.avatarUrl = app.globalData.userInfo.userInfo.avatarUrl
            wx.showModal({
              title: '完善信息',
              content: '为了你的方便, 请完善信息',
              success(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/personInfo/personInfo',
                  })
                }
              }
            })
          }
        })
      } else {
        const id = res.data[0]._id
        db.collection('userList').doc(id).update({
          data: {
            login: true
          },
          success: res => {
            // console.log("登陆success")
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 800
            })
            // that指的是全局this
            that.setData({
              login: true
            })
            wx.hideLoading()
            app.globalData.userInfo.login = true
          }
        })
      }
    })

  },
  agree(e) {
    if (e.detail.value.length == 1) {
      this.setData({
        agreeRegulations: true
      })
    } else {
      this.setData({
        agreeRegulations: false
      })
    }
  },
  login(e) {
    if (this.data.login == false) {
      const userInfo = e.detail.userInfo
      if (userInfo != undefined) {
        let timer = this.data.loginTimer
        wx.showLoading({
          title: 'loading....',
          mask: true
        })
        if (timer) {
          clearTimeout(timer)
          console.log("抖动")
          timer = setTimeout((userInfo) => {
            this.loginFun(userInfo)
          }, 2500);
        } else {
          this.loginFun(userInfo)
          timer = 1
        }
        this.setData({
          loginTimer: timer
        })
      } else {
        wx.showModal({
          title: '缺少权限',
          content: '死鬼，不给权限就不和你玩了，哼😕'
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(app, new Date())
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const userInfo = app.globalData.userInfo
    if (userInfo) {
      this.setData({
        login: userInfo.login
      })
      let infoFillDot = (!userInfo.contact.qq && !userInfo.contact.wx && !userInfo.contact.phone) || !userInfo.schoolNum;
      this.setData({
        infoFillDot: infoFillDot
      })
      // console.log(this.data.infoFillDot)
    }
    this.setData({
      loginTimer: null
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '正在刷新',
      mask: true
    })
    this.onShow()
    setTimeout(() => {
      wx.hideLoading()
    }, 800)
    wx.stopPullDownRefresh()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})