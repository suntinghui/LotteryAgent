var wxStar = require('../template/ratingStarTemp/index.js');


Page({
  data: {
    signedList: [{}, {}, {}]

  },
  onLoad: function(options) {
    // wxStar初始化
    wxStar.wxStar(this, 9, false);
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
  }
})