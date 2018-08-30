var wxStar = require('../template/ratingStarTemp/index.js');
const loading = require('../../utils/loading.js')
const util = require('../../utils/util.js')

var app = getApp()

var that = null

Page({
  data: {

  },
  onLoad: function(options) {
    that = this
    // wxStar初始化
    wxStar.wxStar(this, 9, false);
  },

  onShow: function() {
    this.queryInfo()
    this.queryFans()
  },

  // 变更个人信息
  updateInfo: function() {
    wx.navigateTo({
      url: '/pages/userinfo/index'
    })
  },

  // 显示协议
  showAgreement: function() {
    wx.navigateTo({
      url: '/pages/agreement/index'
    })
  },

  resetStar: function() {
    this.wxStarInit(0);
  },

  alertStar: function() {
    var self = this;
    wx.showModal({
      title: '提示',
      content: '当前选中' + self.wxStarCont() + '星',
    })
  },
  
  starChangeCb: function() {
    console.log('选择星之后的回调~');
  },

  // 查询买伴个人信息
  queryInfo: function(e) {
    loading.show("请稍候");

    var buyerId = wx.getStorageSync(app.globalData.kBuyer);

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
          agentInfo: res.data
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


  // 查询买伴粉丝列表  
  queryFans: function(e) {
    loading.show("请稍候");

    var buyerId = wx.getStorageSync(app.globalData.kBuyer);

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + '/fans/',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: function(res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        loading.hide();

        that.setData({
          fanList: res.data
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

  // 粉丝解约
  breakOff: function(e) {
    var uid = e.target.dataset.uid
    console.log(uid)

    wx.showModal({
      title: '提示',
      content: '您确定与其解约吗？',
      confirmText: "解约",
      success: function(res) {
        if (res.confirm) {
          loading.showToast("已解约")
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },


})