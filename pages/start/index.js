const util = require('../../utils/util.js')

var app = getApp();

Page({
  data: {
    remind: '加载中',
    angle: 0,

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      this.nextPage();

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          wx.setStorageSync(app.globalData.kUserInfo, res.userInfo)

          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },

  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },

  getUserInfo: function(e) {
    console.log("++++++++++++++"+JSON.stringify(e))
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync(app.globalData.kUserInfo, e.detail.userInfo)

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    this.login(e);
  },

  login: function(e) {
    util.showLoading("加载中")

    var that = this;

    wx.login({
      timeout: 20000,
      success: function(res) {
        console.log(res.errMsg + "--" + res.code);

        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.HOST+'/api/v1/buyer/login/',
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code,
              iv: e.detail.iv,
              encrypteddata: e.detail.encryptedData
            },
            success: function(res) {
              console.log(res.statusCode + "--" + JSON.stringify(res.data));

              util.hideLoading();

              if (res.data.error) {
                wx.showModal({
                  title: '提示',
                  content: "登录失败：" + res.data.error,
                  showCancel: false
                })

              } else {

                app.globalData.cookie = res.data.info.cookie;

                wx.setStorageSync(app.globalData.kCookie, res.data.info.cookie);

                app.globalData.buyer = res.data.buyer;
                wx.setStorageSync(app.globalData.kBuyer, res.data.buyer);

                that.nextPage();
              }

            },
            fail: function(e) {
              console.log("request login fail......");

              util.hideLoading();

              wx.showModal({
                title: '提示',
                content: '登录失败：(' + e.errMsg + ")",
                showCancel: false,
                success: function(res) {
                  if (res.confirm) {
                    app.globalData.userInfo = null
                    wx.setStorageSync(app.globalData.kUserInfo, null)


                    that.setData({
                      userInfo: null,
                      hasUserInfo: null
                    })
                  }
                }
              })

            },
            complete: function() {
              console.log("request login complete......");
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: function() {
        console.log("request code fail......");
        util.hideLoading();
      },
      complete: function() {
        console.log("request code complete......");
      }
    })
  },

  nextPage: function() {
    if (!app.globalData.userInfo)
      return;

    if (app.globalData.buyer) {
      wx.switchTab({
        url: '/pages/exchange/index',
      })

    } else {
      wx.navigateTo({
        url: '/pages/register1/index'
      })

    }

  },


});