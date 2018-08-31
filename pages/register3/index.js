const util = require('../../utils/util.js')

var cardImgUrl = null;
var perImgUrl = null;

var AGET_Mobile = null;
var AGET_SecondMobile = null;

var shopList = null;
var shopArr = null;
var shopIndex = 0;
var AGET_SPUid = null;

var timer1 = null;
var remainTime1 = DEFAULT_REMINTIME;

var timer2 = null;
var remainTime2 = DEFAULT_REMINTIME;

var DEFAULT_REMINTIME = 10;

var app = getApp();

var that = null;

Page({

  data: {
    shopIndex: 0,

    canResend1: false,
    resendText1: "发送",
    canResend2: false,
    resendText2: "发送",

    AGET_Mobile: "",
    AGET_SecondMobile: "",
    week: [],
    time: []
  },

  onLoad: function () {
    that = this;
  },

  onShow: function () {
    this.requestWeekMode()
    this.requestWorkMode()

    this.queryShopList()
  },

  bindKeyMobileInput: function (e) {
    AGET_Mobile = e.detail.value;
  },

  bindKeySecMobileInput: function (e) {
    AGET_SecondMobile = e.detail.value;
  },

  queryShopList: function () {
    wx.request({
      url: app.globalData.HOST + '/api/v1/shops/',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: (res) => {
        console.log(JSON.stringify(res))
        shopList = [{
          SHOP_Uid: "",
          SHOP_Title: "请选择"
        }];
        res.data.forEach(function (value, index, array) {
          shopList.push(value);
        })

        shopArr = [];
        for (var i = 0; i < shopList.length; i++) {
          shopArr.push(shopList[i].SHOP_Title);
        }

        that.setData({
          shopArr: shopArr
        })
      },
      fail: (e) => {
        util.showToast(e.data)
      }
    })
  },

  bindShopChange: function (e) {
    shopIndex = e.detail.value;

    this.setData({
      shopIndex: e.detail.value
    })

    AGET_SPUid = shopList[shopIndex].SHOP_Uid
  },

  requestWorkMode: function (e) {
    wx.request({
      url: app.globalData.HOST + '/api/v1/dictionaries/?field=AGET_WorkMode',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        that.setData({
          time: res.data
        })

      },
      fail: function (e) {
        console.log("request dictionaries fail......");

        wx.showModal({
          title: '提示',
          content: '数据获取失败，是否重试',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              requestWorkMode()
            }
          }
        })

      }
    })
  },

  requestWeekMode: function (e) {
    wx.request({
      url: app.globalData.HOST + '/api/v1/dictionaries/?field=AGET_WeekMode',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        that.setData({
          week: res.data
        })

      },
      fail: function (e) {
        console.log("request dictionaries fail......");

        wx.showModal({
          title: '提示',
          content: '数据获取失败，是否重试',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              requestWeekMode()
            }
          }
        })

      }
    })
  },

  sendSMSAction1: function () {
    if (AGET_Mobile.length != 11) {
      util.showToast("请输入11位手机号");
      return;
    }

    that.setData({
      canResend1: true
    })

    util.showLoading("请稍候");

    wx.request({
      url: app.globalData.HOST + '/api/v1/sms/ ',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      data: {
        phone: AGET_Mobile
      },
      success: (res) => {
        util.hideLoading();

        remainTime1 = DEFAULT_REMINTIME;
        that.countDown1();

        wx.showToast({
          title: '短信已发送',
        })
      },
      fail: (e) => {
        wx.showModal({
          title: '提示',
          content: '出现错误：' + e.data,
          showCancel: false
        })

        that.setData({
          canResend1: false
        })

      },
      complete: (e) => {
        util.hideLoading();
      }
    })

  },

  countDown1: function () {
    timer1 = setTimeout(function () {
      console.log(remainTime1--);

      that.setData({
        canResend1: (remainTime1 != 0),
        resendText1: ("发送" + ((remainTime1 != 0) ? "(" + remainTime1 + ")" : ""))
      })

      if (remainTime1 == 0) {
        clearTimeout(timer1);
      } else {
        that.countDown1();
      }

    }, 1000)
  },

  sendSMSAction2: function () {

    if (AGET_SecondMobile.length != 11) {
      util.showToast("请输入11位手机号");
      return;
    }

    that.setData({
      canResend2: true
    })

    util.showLoading("请稍候");

    wx.request({
      url: app.globalData.HOST + '/api/v1/sms/',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      data: {
        phone: AGET_SecondMobile
      },
      success: (res) => {
        util.hideLoading();

        remainTime2 = DEFAULT_REMINTIME;
        that.countDown2();

        wx.showToast({
          title: '短信已发送',
        })
      },
      fail: (e) => {
        wx.showModal({
          title: '提示',
          content: '出现错误：' + e.data,
          showCancel: false
        })

        that.setData({
          canResend2: false
        })

      },
      complete: (e) => {
        util.hideLoading();
      }
    })
  },

  countDown2: function () {
    timer2 = setTimeout(function () {
      console.log(remainTime2--);

      that.setData({
        canResend2: (remainTime2 != 0),
        resendText2: ("发送" + ((remainTime2 != 0) ? "(" + remainTime2 + ")" : ""))
      })

      if (remainTime2 == 0) {
        clearTimeout(timer2);
      } else {
        that.countDown2();
      }

    }, 1000)
  },

  chooseCardImg: function (e) {

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        cardImgUrl = res.tempFilePaths[0];

        that.setData({
          cardImgUrl: res.tempFilePaths[0]
        })
      }
    })
  },

  choosePerImg: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        perImgUrl = res.tempFilePaths[0];

        that.setData({
          perImgUrl: res.tempFilePaths[0]
        })

        // that.updateInfo();
      }
    })
  },

  checkInput: (e) => {
    console.log(JSON.stringify(e))

    if (util.isNullOrEmpty(cardImgUrl)) {
      util.showToast("请选择身份证照片");
      return false;
    }

    if (util.isNullOrEmpty(perImgUrl)) {
      util.showToast("请选择申请人照片");
      return false;
    }

    if (util.isNullOrEmpty(e.detail.value.AGET_Mobile)) {
      util.showToast("请输入手机号");
      return false;
    }

    if (e.detail.value.AGET_Mobile.length != 11) {
      util.showToast("手机号必须11位");
      return false;
    }

    if (util.isNullOrEmpty(e.detail.value.code)) {
      util.showToast("请输入验证码");
      return false;
    }

    if (AGET_SPUid == null || AGET_SPUid.length == 0) {
      util.showToast("请选择注册门店");
      return false;
    }

    if (util.isNullOrEmpty(e.detail.value.AGET_Address)) {
      util.showToast("请输入居住地址");
      return false;
    }

    if (util.isNullOrEmpty(e.detail.value.AGET_WeekMode)) {
      util.showToast("请选择工作日");
      return false;
    }

    if (util.isNullOrEmpty(e.detail.value.AGET_WorkMode)) {
      util.showToast("请选择工作时段");
      return false;
    }


    if (util.isNullOrEmpty(e.detail.value.AGET_SecondName)) {
      util.showToast("请输入其他联系人");
      return false;
    }

    if (util.isNullOrEmpty(e.detail.value.AGET_SecondMobile)) {
      util.showToast("请输入联系人手机号");
      return false;
    }

    if (e.detail.value.AGET_SecondMobile.length != 11) {
      util.showToast("手机号必须11位");
      return false;
    }

    if (e.detail.value.AGET_Mobile == e.detail.value.AGET_SecondMobile) {
      util.showToast("两个手机号不能相同")
      return false;
    }

    return true;
  },

  formSubmit: function (e) {
    if (!this.checkInput(e))
      return;

    util.showLoading("请稍候");

    var buyerId = wx.getStorageSync(app.globalData.kBuyer);

    wx.uploadFile({
      url: app.globalData.HOST + '/api/v1/buyers/',
      method: "POST",
      header: {
        'content-type': 'multipart/form-data',
        'Authorization': 'token ' + util.getCookie()
      },
      filePath: cardImgUrl,
      name: 'AGET_CardPic',
      formData: {
        'AGET_Mobile': e.detail.value.AGET_Mobile,
        'code': e.detail.value.code,
        'AGET_Address': e.detail.value.AGET_Address,
        'AGET_SPUid': AGET_SPUid,
        'AGET_WeekMode': util.array2Str(e.detail.value.AGET_WeekMode),
        'AGET_WorkMode': e.detail.value.AGET_WorkMode,
        'AGET_SecondName': e.detail.value.AGET_SecondName,
        'AGET_SecondMobile': e.detail.value.AGET_SecondMobile
      },
      success: function (res) {
        console.log(JSON.stringify(res))

        // 上传成功，继续上传申请人照片
        if (res.statusCode == "200" || res.statusCode == '201') {
          console.log((JSON.parse(res.data)).AGET_Uid);
          wx.setStorageSync(app.globalData.kBuyer, (JSON.parse(res.data)).AGET_Uid);

          that.updateInfo();

        } else {
          util.hideLoading();

          wx.showModal({
            title: '提示',
            content: (JSON.parse(res.data)).status + "(" + res.statusCode + ")",
            showCancel: false,
          })
        }
      },
      fail: function (e) {
        util.hideLoading();

        console.log(JSON.stringify(e))

        wx.showModal({
          title: '提示',
          content: JSON.stringify(e),
          showCancel: false
        })
      }
    })

  },

  updateInfo: function () {
    util.showLoading("请稍候");

    var pk_buyer = util.getPK_Buyer();

    wx.uploadFile({
      url: app.globalData.HOST + '/api/v1/buyer/' + pk_buyer + "/",
      method: "POST",
      header: {
        'content-type': 'multipart/form-data',
        'Authorization': 'token ' + util.getCookie()
      },
      filePath: perImgUrl,
      name: 'AGET_Pic',
      success: function (res) {
        console.log(JSON.stringify(res))

        if (res.statusCode == "200" || res.statusCode == '201') {
          wx.showModal({
            title: '提示',
            content: '注册成功',
            showCancel: false,
            success: function () {
              console.log("registe done....")

              wx.switchTab({
                url: '/pages/exchange/index',
              })
            }
          });

        } else {
          util.hideLoading();

          wx.showModal({
            title: '提示',
            content: "数据异常，请重试",
            showCancel: false,
          })
        }
      },
      fail: function (e) {
        util.hideLoading();

        console.log(JSON.stringify(e))

        wx.showModal({
          title: '提示',
          content: JSON.stringify(e),
          showCancel: false
        })
      },
      complete: function (e) {
        util.hideLoading();
      }
    })
  },

})