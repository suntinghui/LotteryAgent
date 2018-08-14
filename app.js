const dataDic = require('/utils/dataDic.js')

//app.js
App({
  onLaunch: function () {
    this.globalData.userInfo = wx.getStorageSync(this.globalData.kUserInfo);
    this.globalData.cookie = wx.getStorageSync(this.globalData.kCookie);
    this.globalData.buyer = wx.getStorageSync(this.globalData.kBuyer);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 每次进入都重新获取一下数据字典，以保证当次启动为最新数据 
    dataDic.getDic(this.globalData.HOST);
  },


  globalData: {
    HOST:"http://192.168.3.24:8000",

    kUserInfo:"kUserInfo",
    kCookie:"kCookie",
    kBuyer:"kBuyer",
    kDataDic:"kDataDic",

    userInfo: null,
    cookie:null,
    pk_buyer:null
  }
})