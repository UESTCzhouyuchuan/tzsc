// miniprogram/pages/personInfo/personInfo.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    stay_time: 70,
    avatorUrl: '',
    name: '',
    gender: '',
    birth: '',
    introduce: '',
    schoolNum: '',
    contact: '',
    contactDot: true,
    openid: '',
    num: null,
    sex: ['未知', '男', '女']
  },
  changeInfo(e) {
    const key = e.currentTarget.dataset.key
    wx.navigateTo({
      url: '/pages/changeInfo/changeInfo?key=' + key,
    })
  },
  changeDate(e) {
    const date = e.detail.value
    if (this.data.login && date != this.data.birth) {
      const t = this
      wx.cloud.callFunction({
        name: 'changeInfo',
        data: {
          key: 'birth',
          value: date
        },
        success(res) {
          // console.log(res.result)
          if (res.result.stats.updated > 0) {
            // console.log("change birth success")
            t.setData({
              birth: date,
            })
            if (!app.globalData.userInfo.birth) {
              t.setData({
                num: t.data.num + 10
              })
            }
            app.globalData.userInfo.birth = date
          }
        }
      })
    }
  },
  changeAvatar() {
    if (this.data.login) {
      const t = this
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          if (res.tempFiles.length > 0) {
            const filePath = res.tempFilePaths[0]
            // 上传图片
            const cloudPath = 'userAvatar/' + app.globalData.openid + (new Date()).getTime() + filePath.match(/\.[^.]+?$/)[0]
            // console.log(filePath,cloudPath)
            // 删除原来的照片
            wx.showLoading({
              title: '正在上传',
              mask: true
            })
            const fileID = app.globalData.userInfo.fileID
            if (fileID) {
              wx.cloud.deleteFile({
                fileList: [fileID],
                success: res => {
                  if (res.fileList[0].status == 0) {
                    t.uploadImg(filePath, cloudPath)
                  }
                }
              })
            } else {
              t.uploadImg(filePath, cloudPath)
            }
          }
        },
      })
    }
  },
  uploadImg(filePath, cloudPath) {
    const t = this
    wx.cloud.uploadFile({
      filePath,
      cloudPath,
      success(res) {
        const fileID = res.fileID
        if (res.statusCode == 200 && fileID) {
          t.setData({
            avatarUrl: filePath
          })
          app.globalData.userInfo.avatarUrl = filePath
          wx.cloud.callFunction({
            name: 'changeInfo',
            data: {
              key: 'fileID',
              value: fileID
            },
            success(res) {
              console.log(res)
              if (res.result.errMsg.indexOf('ok') > -1) {
                console.log('Change avatar success')
                wx.showToast({
                  title: '更新成功',
                  icon: 'success',
                  duration: 800
                })
              }
            },
            fail(err) {
              console.log(err)
            }
          })
        }
      }
    })
  },
  changeSex(e) {
    if (this.data.login) {
      const that = this
      wx.showActionSheet({
        itemList: ['自然人', '帅仔', '靓女'],
        success(res) {
          const index = res.tapIndex
          if (index != that.data.gender) {
            wx.cloud.callFunction({
              name: 'changeInfo',
              data: {
                key: 'gender',
                value: index
              },
              success(res) {
                if (res.result.stats.updated > 0) {
                  that.setData({
                    gender: index
                  })
                  app.globalData.userInfo.gender = index
                }
              },
              fail(err) {
                console.log('Error', err)
              }
            })
          }
        },
        fail(res) {
          console.log(res.errMsg)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userInfo = app.globalData.userInfo
    if (userInfo && userInfo.login) {
      this.setData({
        login: userInfo.login,
        name: userInfo.name,
        birth: userInfo.birth,
        gender: userInfo.gender,
        avatarUrl: userInfo.avatarUrl,
        introduce: userInfo.introduce,
        schoolNum: userInfo.schoolNum,
        contact: userInfo.contact
      })
    }
    let num = 0;
    if (app.globalData.userInfo.login) {
      num = 30;
      if (this.data.birth) {
        num += 10;
      }
      if (this.data.schoolNum) {
        num += 10;
      }
      if (this.data.introduce != '这个人懒死了，什么都没写_(┐「ε:)_') {
        num += 20;
      }
      if (this.data.contact.qq || this.data.contact.wx || this.data.contact.phone) {
        num += 30;
        this.setData({
          contactDot: false
        })
      } else {
        this.setData({
          contactDot: true
        })
      }
    }
    // console.log(num)
    this.setData({
      num: num
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