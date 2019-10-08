// miniprogram/pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommends: ['书籍', '电脑桌', '台灯', '耳机'],
    recommendIndex: 0,
    notice: '广播，广播！周玉川，大帅逼!周玉川，大帅逼!',
    imgs: ["http://img002.fview.cn/Public/upload/block/c038ec8eb35b30b73b83fff2376306f5.png",
      "http://img002.fview.cn/Public/upload/block/dc31d4d5df8821ad27e82e65ec168123.png",
      'http://img002.fview.cn/Public/upload/block/639c0ac217f1822dede433320299a1f2.png'
    ],
    duration: 0,
    speed: 2000,
    wrapWidth: 0,
    width: 0,
    noticeAnimation: null,
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let recommendIndex
    this.recomTimer = setInterval(() => {
      recommendIndex = (this.data.recommendIndex + 1) % this.data.recommends.length
      this.setData({
        recommendIndex: recommendIndex
      })
    }, 5000)
  },
  goToSearch() {
    wx.navigateTo({
      url: '/pages/search/search?sendkey=' + this.data.recommends[this.data.recommendIndex],
    })
  },
  initAnimation() {
    wx.createSelectorQuery().in(this).select('.noticeBar-wrap').boundingClientRect((wrap) => {
      wx.createSelectorQuery().in(this).select('.noticeBar-content').boundingClientRect((content) => {
        const duration = content.width / 40 * this.data.speed;
        const animation = wx.createAnimation({
          duration: duration,
          timingFunction: "linear",
        });
        this.setData({
          wrapWidth: wrap.width,
          width: content.width,
          duration: duration,
          animation: animation
        }, () =>{
          this.startAnimation();
        });

      }).exec();
    }).exec();
  },
  startAnimation() {
    // console.log(this.data.animation)
    if (this.data.animation.option.transition.duration !== 0){
      this.data.animation.option.transition.duration = 0;
      const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step();
      this.setData({
        noticeAnimation: resetAnimation.export()
      });
    }
    this.data.animation.option.transition.duration = this.data.duration;
    const noticeAnimation = this.data.animation.translateX(-this.data.width).step();
    setTimeout(() => {
      this.setData({
        noticeAnimation: noticeAnimation.export()
      });
    }, 100);
    const timer = setTimeout(() => {
      this.startAnimation();
    }, this.data.duration);
    this.setData({
      timer
    })
  },
  destroyTimer(){
    if (this.data.timer){
      clearTimeout(this.data.timer)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.initAnimation();
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
    this.destroyTimer();
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