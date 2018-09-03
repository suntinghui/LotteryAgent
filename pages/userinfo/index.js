var wxStar = require('../template/ratingStarTemp/index.js');
const util = require('../../utils/util.js')

var app = getApp()

var DEFAULT_REMINTIME = 10;

var timer1 = null;
var remainTime1 = DEFAULT_REMINTIME;

var timer2 = null;
var remainTime2 = DEFAULT_REMINTIME;

var perImgUrl = ""

var buyerId = ""

var that = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canResend1: false,
    resendText1: "发送",
    canResend2: false,
    resendText2: "发送",

    AGET_Mobile: "",
    AGET_SecondMobile: "",
  },

  onLoad: function () {
    that = this
    buyerId = wx.getStorageSync(app.globalData.kBuyer)
    this.queryInfo()
  },

  sendSMSAction1: function () {

    if (this.data.AGET_Mobile.length != 11) {
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
        phone: that.data.AGET_Mobile
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

    if (this.data.AGET_SecondMobile.length != 11) {
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
        phone: that.data.AGET_SecondMobile
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

  getMobile: function (e) {
    this.data.AGET_Mobile = e.detail.value
  },

  getSecondMobile: function (e) {
    this.data.AGET_SecondMobile = e.detail.value
  },

  changeHeadImg: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        perImgUrl = res.tempFilePaths[0];

        that.setData({
          perImgUrl: res.tempFilePaths[0]
        })
      }
    })
  },

  // 查询买伴个人信息
  queryInfo: function (e) {
    util.showLoading("请稍候");

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + "/",
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: function (res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        util.hideLoading();

        that.data.AGET_Mobile = res.data.AGET_Mobile
        that.data.AGET_SecondMobile = res.data.AGET_SecondMobile

        that.setData({
          agentInfo: res.data,
          perImgUrl: res.data.AGET_PicUrl
        })

      },
      fail: function (e) {
        console.log("request login fail......");

        util.hideLoading();

        wx.showModal({
          title: '提示',
          content: '失败：(' + e.errMsg + ")",
          showCancel: false,
        })

      }
    })

  },

  checkInput: () => {

    return true;
  },

  formSubmit: function (e) {
    if (!this.checkInput())
      return;

    if (perImgUrl == null || perImgUrl.length == 0) {
      this.updateInfo(e)
    } else {
      this.updateInfoWithImg(e)
    }

  },

  updateInfo: function (e) {
    util.showLoading("请稍候");

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + "/",
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      data: {
        'AGET_NickName': e.detail.value.AGET_NickName,
        'AGET_Mobile': e.detail.value.AGET_Mobile,
        'code': e.detail.value.code,
        'AGET_Address': e.detail.value.AGET_Address,
        'AGET_SecondName': e.detail.value.AGET_SecondName,
        'AGET_SecondMobile': e.detail.value.AGET_SecondMobile

      },
      success: function (res) {
        console.log("===" + JSON.stringify(res))

        // 上传成功，继续上传申请人照片
        if (res.statusCode == "200" || res.statusCode == '201') {
          console.log(res.data.AGET_Uid);
          wx.setStorageSync(app.globalData.kBuyer, res.data.AGET_Uid);

          wx.showModal({
            title: '提示',
            content: "修改成功",
            showCancel: false,
          })

        } else {

          wx.showModal({
            title: '提示',
            content: res.data.status + "(" + res.statusCode + ")",
            showCancel: false,
          })
        }

      },
      fail: function (e) {

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

  updateInfoWithImg: function (e) {
    util.showLoading("请稍候");

    wx.uploadFile({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + "/",
      method: "POST",
      header: {
        'content-type': 'multipart/form-data',
        'Authorization': 'token ' + util.getCookie()
      },
      filePath: perImgUrl,
      name: 'AGET_Pic',
      formData: {
        'AGET_NickName': e.detail.value.AGET_NickName,
        'AGET_Mobile': e.detail.value.AGET_Mobile,
        'code': e.detail.value.code,
        'AGET_Address': e.detail.value.AGET_Address,
        'AGET_SecondName': e.detail.value.AGET_SecondName,
        'AGET_SecondMobile': e.detail.value.AGET_SecondMobile
      },
      success: function (res) {
        console.log(JSON.stringify(res))

        // 上传成功，继续上传申请人照片
        if (res.statusCode == "200" || res.statusCode == '201') {
          console.log((JSON.parse(res.data)).AGET_Uid);
          wx.setStorageSync(app.globalData.kBuyer, (JSON.parse(res.data)).AGET_Uid);

          util.showToast("修改成功")

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

})