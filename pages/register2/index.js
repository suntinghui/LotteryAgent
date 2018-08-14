Page({

  data: {
    isRead: false,

    protocolList: [{
      name: "AGREE",
      value: "   我已阅读以上全文"
    }]

  },

  checkboxChange: function (e) {
    this.setData({
      isRead: (e.detail.value.length != 0)
    });
  },

  nextAction: function () {
    wx.navigateTo({
      url: '/pages/register3/index'
    })
  }

})