// miniprogram/pages/changeInfo/changeInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stay_time: 70,
    curPage: null,
    introduceLen: 0,
    introduceMaxLen: 100,
    saveBottom: 0,
    qq: '',
    wx: '',
    phone: '',
    introduce: '',
    name: '',
    schoolNum: '',
  },
  textareaBlur(e) {
    this.setData({
      saveBottom: 0
    })
  },
  textareaFocus(e) {
    this.setData({
      saveBottom: e.detail.height
    })
  },
  Input(e) {
    const input = e.detail.value
    const contact = ['qq', 'wx', 'phone']
    const info = e.currentTarget.dataset.info
    const maxLen = this.data.introduceMaxLen
    let data = {}
    data[info] = input
    data.introduceLen = input.length
    this.setData(data)
    // console.log(this.data[info])
  },
  save(e) {
    const userInfo = app.globalData.userInfo
    const info = e.currentTarget.dataset.info
    if (info == 'contact') {
      if (this.data.qq != userInfo.contact.qq ||
        this.data.wx != userInfo.contact.wx ||
        this.data.phone != userInfo.contact.phone) {
        wx.showLoading({
          title: '正在修改',
          mask: true
        })
        const contact = {}
        contact.qq = this.data.qq
        contact.wx = this.data.wx
        contact.phone = this.data.phone
        wx.cloud.callFunction({
          name: 'changeInfo',
          data: {
            key: 'contact',
            value: contact
          },
          success: res => {
            console.log("change contact success: ", res)
            app.globalData.userInfo.contact = contact
            userInfo.contact = contact
            wx.hideLoading()
            wx.navigateBack()
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 800
            })
          },
          fail(err) {
            console.log("change contact fail: ", err)
          }
        })
      } else {
        wx.navigateBack()
      }
    } else if (info == 'name') {
      const name = this.data.name
      if ((/[\w\u4e00-\u9fa5]+?$/).test(name)) {
        if (name != userInfo.name){
          wx.showLoading({
            title: '正在修改',
            mask:true
          })
          wx.cloud.callFunction({
            name: 'changeInfo',
            data: {
              key: 'name',
              value: name
            },
            success: res => {
              console.log("change name success: ", res)
              app.globalData.userInfo.name = name
              userInfo.name = name
              wx.hideLoading()
              wx.navigateBack()
              wx.showToast({
                title: '更新成功',
                icon: 'success',
                duration: 800
              })
            },
            fail(err) {
              console.log("change name fail: ", err)
            }
          })
        } else {
          wx.navigateBack({
          })
        }
      } else {
        wx.showToast({
          title: '格式不正确',
          icon: 'none'
        })
      }
    } else if (info == 'schoolNum') {
      const schoolNum = this.data.schoolNum
      if (schoolNum.length != 13) {
        wx.showToast({
          title: '位数不正确,请检查位数是否为13位',
          icon: 'none'
        })
      } else {
        if (schoolNum != userInfo.schoolNum) {
          wx.showLoading({
            title: '正在修改',
            mask: true
          })
          wx.cloud.callFunction({
            name: 'changeInfo',
            data: {
              key: 'schoolNum',
              value: schoolNum
            },
            success: res => {
              console.log("change schoolNum success: ", res)
              app.globalData.userInfo.schoolNum = schoolNum
              userInfo.schoolNum = schoolNum
              wx.hideLoading()
              wx.navigateBack()
              wx.showToast({
                title: '更新成功',
                icon: 'success',
                duration: 800
              })
            },
            fail(err) {
              console.log("change schoolNum fail: ", err)
            }
          })
        } else {
          wx.navigateBack()
        }
      }
    } else {
      let introduce = this.data.introduce
      if (!introduce) {
        introduce = '这个人懒死了，什么都没写_(┐「ε:)_'
      }
      if (introduce != userInfo.introduce) {
        wx.showLoading({
          title: '正在修改',
          mask: true
        })
        wx.cloud.callFunction({
          name: 'changeInfo',
          data: {
            key: 'introduce',
            value: introduce
          },
          success: res => {
            console.log("change introduce success: ", res)
            app.globalData.userInfo.introduce = introduce
            userInfo.introduce = introduce
            wx.hideLoading()
            wx.navigateBack()
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 800
            })
          },
          fail(err) {
            console.log("change introduce fail: ", err)
          }
        })
      } else {
        wx.navigateBack()
      }

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      curPage: options.key
    })
    const userInfo = app.globalData.userInfo
    if (userInfo && userInfo.login) {
      this.setData({
        qq: userInfo.contact.qq,
        wx: userInfo.contact.wx,
        phone: userInfo.contact.phone,
        introduce: userInfo.introduce,
        introduceLen: userInfo.introduce.length,
        name: userInfo.name,
        schoolNum: userInfo.schoolNum,
      })
      if (userInfo.introduce == "这个人懒死了，什么都没写_(┐「ε:)_") {
        this.setData({
          introduce: ''
        })
      }
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