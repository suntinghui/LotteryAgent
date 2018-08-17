const loading = require('../../utils/loading.js')
const util = require('../../utils/util.js')
const dataDic = require('../../utils/dataDic.js')

var app = getApp()

var that = null

var buyerId = null

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["粉丝群", "群评论"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    hiddenmodalput: true,
    replyContent: "",
    commentId: "",

    fanList: [],
    commentList: []
  },

  onLoad: function() {
    buyerId = wx.getStorageSync(app.globalData.kBuyer)

    that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    if (e.currentTarget.id == '0') {
      this.queryFans()
    } else if (e.currentTarget.id == '1') {
      this.queryCommentChats()
    }
  },

  onShow: function(e) {
    this.queryFans()
    this.queryCommentChats()
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

  // 开始私聊
  chatAction: function(e) {
    var temp = null;

    var customerId = e.target.dataset.userid;
    for (var i = 0; i < this.data.fanList.length; i++) {
      if (this.data.fanList[i].USER_Uid == customerId) {
        temp = this.data.fanList[i]
        break;
      }
    }

    wx.navigateTo({
      url: '/pages/fanchat/index?item=' + JSON.stringify(temp),
    })

  },

  // 查询群聊内容
  queryCommentChats: function(e) {
    loading.show("请稍候");

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + '/comments/',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      success: function(res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        loading.hide();

        that.processComments(res.data)
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

  processComments: function(data) {
    var commentList = new Array()

    for (var i = 0; i < data.length; i++) {
      var groupCom = new Array() // 表示每一个群聊内容
      var item = data[i] // 服务器传过来的每一组群聊JSON，
      groupCom.push(this.createChatItem(item))

      for (var j = 0; item.replies != null && j < item.replies.length; j++) {
        groupCom.push(this.createChatItem(item.replies[j]))
      }

      commentList.push({
        open: false,
        data: groupCom
      })
    }

    this.setData({
      commentList: commentList
    })

  },

  createChatItem: function(item) {
    var isTopic = (item.CMMT_FthUid == null)
    return {
      isFather: isTopic,
      CMMT_Uid: item.CMMT_Uid,
      CMMT_Customer_nick: item.CMMT_Customer.nick,
      CMMT_Customer_pic: item.CMMT_Customer.pic,
      CMMT_Text: item.CMMT_Text,
      CreateDateFormat: (item.CreateDateFormat == null ? "刚刚" : item.CreateDateFormat)
    }
  },

  // 回复
  replyAction: function(e) {
    loading.show("请稍候");

    wx.request({
      url: app.globalData.HOST + '/api/v1/buyer/' + buyerId + '/comments/',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'token ' + util.getCookie()
      },
      data: {
        CMMT_TGUid: buyerId,
        CMMT_FthUid: that.data.commentId,
        CMMT_USUid: buyerId,
        CMMT_Text: that.data.replyContent,
      },
      success: function(res) {
        console.log(res.statusCode + "--" + JSON.stringify(res.data));

        loading.hide();

        // 发送成功后清除保存的回复内容
        that.setData({
          replyContent: ""
        })

        that.queryCommentChats()

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

  // 打开折叠的聊天内容  
  showAction: function(event) {
    var which = event.target.dataset.which
    this.data.commentList[which].open = true;
    this.setData(this.data)
  },

  // 折叠聊天内容
  closeAction: function(event) {
    var which = event.target.dataset.which
    this.data.commentList[which].open = false;
    this.setData(this.data)
  },

  replyContent: function(e) {
    this.data.replyContent = e.detail.value;
  },

  //点击按钮弹出指定的hiddenmodalput弹出框
  showReplyAction: function(e) {
    this.data.commentId = e.target.dataset.uid

    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  //取消按钮
  replyCancel: function() {
    this.setData({
      hiddenmodalput: true
    });
  },

  //确认
  replyConfirm: function() {
    if (this.data.replyContent.length == 0) {
      loading.showToast("内容不能为空")
      return
    }

    this.setData({
      hiddenmodalput: true
    })

    this.replyAction()
  }

});