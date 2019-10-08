// miniprogram/pages/system/system.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const t = this
    wx.getSystemInfo({
      success: function(res) {
        t.setData({
          brand: res.brand,
          model: res.model,
          pixelRatio: res.pixelRatio,
          screenWidth: res.screenWidth,
          screenHeight: res.screenHeight,
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          statusBarHeight: res.statusBarHeight,
          language: res.language,
          version: res.version,
          system: res.system,
          platform: res.platform,
          fontSizeSetting: res.fontSizeSetting,
          SDKVersion: res.SDKVersion
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})