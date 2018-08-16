var wxStar = require('../template/ratingStarTemp/index.js');
const loading = require('../../utils/loading.js')
const util = require('../../utils/util.js')
const dataDic = require('../../utils/dataDic.js')

var app = getApp()

var perImgUrl = ""

var buyerId = ""

var that = null

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onLoad: function() {
    that = this
    buyerId = wx.getStorageSync(app.globalData.kBuyer)
    this.queryInfo()
  },

  changeHeadImg: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        perImgUrl = res.tempFilePaths[0];

        that.setData({
          perImgUrl: res.tempFilePaths[0]
        })
      }
    })
  },

  // 查询买伴个人信息
  queryInfo: function(e) {
    loading.show("请稍候");

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + "/",
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: function(res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        loading.hide();

        that.setData({
          agentInfo: res.data,
          perImgUrl: res.data.AGET_PicUrl
        })

      },
      fail: function(e) {
        console.log("request login fail......");

        loading.hide();

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

  formSubmit: function(e) {
    if (!this.checkInput())
      return;

    var that = this;

    loading.show("请稍候");

    var buyerId = wx.getStorageSync(app.globalData.kBuyer);

    wx.uploadFile({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId,
      method: "POST",
      header: {
        'content-type': 'multipart/form-data',
        'Authorization': 'token ' + util.getCookie()
      },
      filePath: perImgUrl,
      name: 'AGET_PicUrl',
      formData: {
        'AGET_Mobile': e.detail.value.AGET_Mobile,
        'AGET_Address': e.detail.value.AGET_Address,
        'AGET_SecondName': e.detail.value.AGET_SecondName,
        'AGET_SecondMobile': e.detail.value.AGET_SecondMobile
      },
      success: function(res) {
        console.log(JSON.stringify(res))

        // 上传成功，继续上传申请人照片
        if (res.statusCode == "200" || res.statusCode == '201') {
          console.log((JSON.parse(res.data)).AGET_Uid);
          wx.setStorageSync(app.globalData.kBuyer, (JSON.parse(res.data)).AGET_Uid);

          loading.showToast("修改成功")

        } else {
          loading.hide();

          wx.showModal({
            title: '提示',
            content: (JSON.parse(res.data)).status + "(" + res.statusCode + ")",
            showCancel: false,
          })
        }
      },
      fail: function(e) {
        loading.hide();

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