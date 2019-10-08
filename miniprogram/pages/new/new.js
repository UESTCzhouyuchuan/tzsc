// miniprogram/pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaNotice: ['入手渠道','转手原因','规格尺寸','新旧程度','使用感受'],
    textareaFocus:false,
    showTextareaTips: false,
    noticeText: '',
    swiperHeight: null,
    curTab: '0', //publish,reward
    tabBar: ['发布闲置', '发布悬赏令'],
    showTextareaTipsBottom: null,
    pictures: [],
    name:'',
    introduce: '',
    tags: [],
    school: null,// 0清水河，1代表沙河
    originalPrice: null,
    currentPrice: null,
  },
  selectTab(e){
    this.setData({
      curTab: e.currentTarget.dataset.index
    })
  },
  switchTab(e){
    this.setData({
      curTab: e.detail.current
    })
  },
  textareaTipBlur(e){
    this.setData({
      showTextareaTips: false
    })
  },
  textareaInput(e){
    this.setData({
      introduce: e.detail.value
    })
    console.log(e.detail.value.height)
  },
  textareaBindFocus(e){
    if (!this.data.showTextareaTipsBottom) {
      this.setData({
        showTextareaTips: true,
        showTextareaTipsBottom: 100
      })
    }
  },
  textareaTip(e){
    const tip = e.currentTarget.dataset.textareaTip
    const introduce = this.data.introduce
    this.setData({
      introduce: introduce + (introduce ? '\n' : '') + tip + ':',
      textareaFocus:true
    })
  },
  noperate(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const t = this
    wx.getSystemInfo({
      success: function(res) {
        wx.createSelectorQuery().in(t).select('.scroll-wrap').boundingClientRect((scrollwrap) => {
          t.setData({
            swiperHeight: res.windowHeight-scrollwrap.height
          }, () => {
            // console.log(t.data.swiperHeight)
          })
        }).exec();
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