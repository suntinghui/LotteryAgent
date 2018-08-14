const loading = require('../../utils/loading.js')
const util = require('../../utils/util.js')
const dataDic = require('../../utils/dataDic.js')

var app = getApp();
var that = null

var userInfo = null
var buyerId = null

Page({

  data: {
    fanItem: {},
    newMsg: "",
    msgList: []
  },

  onLoad: function(option) {
    this.setData({
      fanItem: JSON.parse(option.item)
    })

    userInfo = wx.getStorageSync(app.globalData.kUserInfo)
    buyerId = wx.getStorageSync(app.globalData.kBuyer);

    that = this;
  },

  onShow: function(e) {
    this.queryChats()
  },

  bindInputMsg: function(e) {
    this.data.newMsg = e.detail.value
  },

  sendMsg: function() {
    var newMsg = this.data.newMsg;
    if (newMsg.length == 0) {
      loading.showToast("内容不能为空")
      return
    }

    this.sendChat();
  },

  sendChat: function(e) {
    loading.show("正在发送");

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + '/customer/' + that.data.fanItem.USER_Uid + '/chats/',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      data: {
        MESG_ToUid: that.data.fanItem.USER_Uid,
        MESG_FromUid: buyerId,
        MESG_Text: that.data.newMsg
      },
      success: function(res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        // 清空输入框的内容
        that.setData({
          newMsg: ""
        })

        loading.hide();

        that.queryChats();

      },
      fail: function(e) {
        console.log("request login fail......");

        loading.hide();

        wx.showModal({
          title: '提示',
          content: '发送失败：(' + e.errMsg + ")",
          showCancel: false,
        })

      }
    })

  },

  queryChats: function(e) {
    loading.show("请稍候");

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + '/customer/' + that.data.fanItem.USER_Uid + '/chats/',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: function(res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        loading.hide();

        var tempList = res.data
        for (var i = 0; i < tempList.length; i++) {
          if (tempList[i].MESG_FromUid == buyerId) {
            tempList[i].MESG_FromMe = true
            tempList[i].MESG_MyUrl = userInfo.avatarUrl
          }
        }

        that.setData({
          msgList: tempList
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


})