// miniprogram/pages/set/set.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false
  },
  clearStor() {
    wx.getStorageInfo({
      success(res) {
        if (res.keys.length == 1 && res.keys[0] == 'openid') {
          wx.showToast({
            title: '当前无缓存可清理',
            duration: 500
          })
        } else {
          wx.showLoading({
            title: '正在清理',
            mask: true
          })
          for (let item of res.keys) {
            if (item != 'openid') {
              wx.removeStorage({
                key: item,
                success: function(res) {
                  console.log('clear', item)
                },
              })
            }
          }
          wx.showToast({
            title: '清除成功',
            duration: 800,
            icon: 'success'
          })
          wx.hideLoading()
        }
      },
      fail(err) {
        console.log
      }
    })
  },
  logout() {
    // console.log(this.data.login)
    wx.showModal({
      title: '要不再看看',
      content: '确认退出？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'changeInfo',
            data: {
              key: 'login',
              value: false
            },
            success(res) {
              console.log(res)
              app.globalData.userInfo.login = false
              wx.navigateBack({
                delta: 1,
              })
            },
            fail(err) {
              console.log('Error', err)
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        login: app.globalData.userInfo.login
      })
    }
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